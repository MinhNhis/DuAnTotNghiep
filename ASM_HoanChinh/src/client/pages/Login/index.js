import React, { useEffect, useState } from "react";
import "./style.css";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../../../services/Auth";
import { useSnackbar } from "notistack";
import ForgotPassword from "../ForgotPassword";
import { GoogleLogin } from "@react-oauth/google";
import { BASE_URL } from "../../../config/ApiConfig";

const Login = () => {
  const accounts = JSON.parse(localStorage.getItem("accounts")) || {};
  const { register, handleSubmit, formState } = useForm();
  const [cookie, setCookie] = useCookies();
  const [userLogin, setUserLogin] = useState();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);

  useEffect(() => {
    if (userLogin) {
      localStorage.setItem("accounts", JSON.stringify(userLogin));
      setCookie("role", userLogin.vai_tro);
      if (userLogin.vai_tro === 1) {
        navigate("/");
      } else {
        navigate("/admin");
      }
    }
  }, [userLogin, navigate, setCookie]);

  const submit = async (value) => {
    try {
      const res = await loginApi({ ...value });
      if (res) {
        const date = new Date();
        date.setHours(date.getHours() + 1);
        setUserLogin(res.data);
        setCookie("token", "dummy_token", { path: "/", expires: date });
        setCookie("role", res?.data?.vai_tro, { path: "/", expires: date });
        enqueueSnackbar("Đăng nhập thành công!", { variant: "success" });
      } else {
        enqueueSnackbar("Tài khoản hoặc mật khẩu không chính xác", {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar("Tài khoản hoặc mật khẩu không chính xác!", {
        variant: "error",
      });
    }
  };

  const handleGoogleLogin = (credentialResponse) => {
    const token = credentialResponse.credential;

    fetch(`${BASE_URL}/auth/google`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const date = new Date();
          date.setHours(date.getHours() + 1);
          setUserLogin(data.user); // Lưu thông tin người dùng trong state
          setCookie("token", "dummy_token", { path: "/", expires: date });
          setCookie("role", data.user.vai_tro, { path: "/", expires: date });
          enqueueSnackbar("Đăng nhập với Google thành công!", {
            variant: "success",
          });
        } else {
          enqueueSnackbar("Lỗi khi xác thực với Google!", { variant: "error" });
        }
      })
      .catch((error) => {
        enqueueSnackbar("Có lỗi xảy ra!", { variant: "error" });
        console.error(error);
      });
  };
  const handleShowForgotPasswordForm = () => {
    setShowForgotPasswordForm(true);
    navigate("/forgot-password");
  };


  return (
    <div className="modal-content mt-5">
      <div className="modal-header">
        <Link
          to={"/"}
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></Link>
      </div>
      <div className="modal-body">
        <div className="form-details">
          <p>
            Vui lòng đăng nhập bằng thông tin cá nhân của bạn để tiếp tục kết
            nối với chúng tôi.
          </p>
        </div>
          {!showForgotPasswordForm ? (
        <div className="form-content">
          <h2>ĐĂNG NHẬP</h2>
          <form action="#">
            <div className="input-field mb-3">
              <input
                type="text"
                required
                className="form-control"
                {...register("email", {
                  required: "Email không được bỏ trống",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Email không hợp lệ",
                  },
                })}
              />
              <label>Email</label>
            </div>
            {formState?.errors?.email && (
              <small className="text-danger">
                {formState?.errors?.email?.message}
              </small>
            )}
            <div className="input-field mb-3 mt-3">
              <input
                type="password"
                required
                className="form-control"
                {...register("mat_khau", {
                  required: {
                    value: true,
                    message: "Mật khẩu không được bỏ trống",
                  },
                  minLength: {
                    value: 6,
                    message: "Mật khẩu phải ít nhất 6 kí tự",
                  },
                })}
              />
              <label>Mật Khẩu</label>
            </div>
            {formState?.errors?.mat_khau && (
              <small className="text-danger">
                {formState?.errors?.mat_khau?.message}
              </small>
            )}
            <div className="mb-3">
              <Link to="#" onClick={handleShowForgotPasswordForm} id="signup-link">
                Quên mật khẩu ?
              </Link>
            </div>
            <button
              type="submit"
              className="btn btn-primary mt-3"
              onClick={handleSubmit(submit)}
            >
              Đăng Nhập
            </button>
          </form>
          <div className="d-flex justify-content-center mt-3">
            <GoogleLogin
              style={{ width: '100%', height: '50px' }}
              onSuccess={handleGoogleLogin}
              onError={() => {
                enqueueSnackbar("Đăng nhập Google thất bại", {
                  variant: "error",
                });
              }}
            />
          </div>
          <div className="bottom-link mt-3">
            Bạn chưa có tài khoản?
            <Link to={"/register"} id="signup-link">
              Đăng ký
            </Link>
          </div>
        </div>
          ) : (
              <ForgotPassword />
          )}
      </div>
    </div>
  );
};

export default Login;
