import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BASE_URL } from "../../../config/ApiConfig";
import { TextField, Button } from "@mui/material";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const { register, handleSubmit, formState } = useForm();
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('danger');
  const { enqueueSnackbar } = useSnackbar();
  const PageUrl = BASE_URL;
  const navigate = useNavigate()

  const submit = async (data) => {
    try {
      const response = await fetch(`${PageUrl}/api/reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      if (response.ok && responseData.message === 'Password reset email sent.') {
        enqueueSnackbar("Mật khẩu đã được gửi về email", {
          variant: "success",
        })
        navigate('/')
      } else {
        enqueueSnackbar(responseData.message, {
          variant: "error",
        });
      }
    } catch (error) {
      console.error('Error:', error);
      enqueueSnackbar('Đã xảy ra lỗi, vui lòng thử lại sau.', {
        variant: "error"
      });
    }
  };

  return (
    <div>
      <h1 className="mb-3">Quên Mật Khẩu</h1>

      <form onSubmit={handleSubmit(submit)}>
        <div className="input-field mb-2 mt-3">
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
        {formState?.errors?.email && (
          <small className="text-danger mb-1">
            {formState?.errors?.email?.message}
          </small>
        )}
        <div className="form-details">
          <p>
            Vui lòng nhập đúng email đã đăng ký.
          </p>
        </div>

        <Button type="submit" className="btn btn-primary w-100 "
          sx={{
            borderRadius: "5px",
            height: "37px",
            backgroundColor: "#d4a762",
            color: "white",
            fontWeight: "bold",
          }}>
          Đặt Lại Mật Khẩu
        </Button>
        {message && (
          <div className={`alert alert-${messageType} mt-2`}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default ForgotPassword;