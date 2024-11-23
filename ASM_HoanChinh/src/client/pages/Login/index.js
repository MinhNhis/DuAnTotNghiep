import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../../../services/Auth";
import { useSnackbar } from "notistack";
import ForgotPassword from "../ForgotPassword";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { BASE_URL } from "../../../config/ApiConfig";
import { TextField, Button } from "@mui/material";

const Login = () => {
  const accounts = JSON.parse(localStorage.getItem("accounts")) || {};
  const { register, handleSubmit, formState } = useForm();
  const [cookie, setCookie] = useCookies();
  const [userLogin, setUserLogin] = useState();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);
  const clientId =
    "330129041706-5ag8cfd691vsful1sjjr6lq3ug10r94q.apps.googleusercontent.com";

  useEffect(() => {
    if (userLogin) {
      localStorage.setItem("accounts", JSON.stringify(userLogin));
      setCookie("role", userLogin.vai_tro);
      if (userLogin.vai_tro === 1) {
        const link = localStorage.getItem("Link");
        if (link === null) {
          navigate('/')
        } else {
          navigate(`/${link}`);
          localStorage.removeItem("Link");
        }
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
          setUserLogin(data.user);
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
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="col-12 col-sm-10 col-md-8 col-lg-4 col-xl-3">
        <div className="card shadow-sm p-4 border-3">
          <div className="card-header bg-transparent border-0 pb-0">
            <Link
              to="/"
              className="btn-close position-absolute top-0 end-0 mt-2 me-2"
            ></Link>
          </div>
          {!showForgotPasswordForm ? (
            <div className="card-body">
              <h4 className="text-center mb-3 fw-bold">ĐĂNG NHẬP</h4>
              <p className="text-center text-muted mb-4">
                Vui lòng đăng nhập bằng thông tin cá nhân để tiếp tục
              </p>
              <form onSubmit={handleSubmit(submit)} className="text-center">
                <div className="form-group mb-1">
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    {...register("email", {
                      required: "Email không được bỏ trống",
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Email không hợp lệ",
                      },
                    })}
                    error={!!formState.errors.email}
                    helperText={formState.errors.email?.message}
                    sx={{
                      mb: 2,
                      "& .MuiInputBase-root": {
                        height: "50px",
                        fontSize: "0.9rem",
                      },
                      "& .MuiInputLabel-root": {
                        top: "-3px",
                        fontSize: "1rem",
                      },
                      "& .MuiFormHelperText-root": {
                        fontSize: "0.85rem",
                        color: "#d32f2f",
                        marginTop: "2px",
                        marginLeft: "2px",
                      },
                    }}
                  />
                </div>
                <div className="form-group mb-1">
                  <TextField
                    label="Mật Khẩu"
                    type="password"
                    variant="outlined"
                    fullWidth
                    {...register("mat_khau", {
                      required: "Mật khẩu không được bỏ trống",
                      minLength: {
                        value: 6,
                        message: "Mật khẩu phải ít nhất 6 kí tự",
                      },
                    })}
                    error={!!formState.errors.mat_khau}
                    helperText={formState.errors.mat_khau?.message}
                    sx={{
                      mb: 2,
                      "& .MuiInputBase-root": {
                        height: "50px",
                        fontSize: "0.9rem",
                      },
                      "& .MuiInputLabel-root": {
                        top: "-3px",
                        fontSize: "1rem",
                      },
                      "& .MuiFormHelperText-root": {
                        fontSize: "0.85rem",
                        color: "#d32f2f",
                        marginTop: "2px",
                        marginLeft: "2px",
                      },
                    }}
                  />
                </div>
                <div
                  className="mb-2"
                  style={{ textAlign: "left", display: "block" }}
                >
                  <Link
                    to="#"
                    onClick={handleShowForgotPasswordForm}
                    className="text-decoration-none"
                  >
                    Quên mật khẩu?
                  </Link>
                </div>
                <Button
                  type="submit"
                  className="btn btn-primary w-100"
                  sx={{
                    borderRadius: "5px",
                    height: "37px",
                    backgroundColor: "#d4a762",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Đăng Nhập
                </Button>
              </form>
              <div className="d-flex justify-content-center mt-2">
                <GoogleOAuthProvider clientId={clientId}>
                  <div>
                    <GoogleLogin
                      onSuccess={handleGoogleLogin}
                      width={299}
                      theme="dark"
                      size="large"
                      borderRadius={"30px"}
                    />
                  </div>
                </GoogleOAuthProvider>
              </div>
              <p className="text-center mt-3">
                Bạn chưa có tài khoản?{" "}
                <Link to="/register" className="text-decoration-none">
                  Đăng ký
                </Link>
              </p>
            </div>
          ) : (
            <ForgotPassword />
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;