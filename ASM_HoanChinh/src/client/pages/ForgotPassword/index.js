// components/ForgotPassword.js
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BASE_URL } from "../../../config/ApiConfig";

const ForgotPassword = () => {
  const { register, handleSubmit, formState } = useForm();
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('danger');
  const PageUrl = BASE_URL;

  const submit = async (data) => {
    try {
      console.log('Submitting data:', data);

      const response = await fetch(`${PageUrl}/api/reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      console.log('Response from server:', responseData);

      if (response.ok && responseData.message === 'Password reset email sent.') {
        setMessageType('success');
        setMessage('Hãy kiểm tra hòm thư của bạn.');
      } else {
        setMessage(responseData.message);
        setMessageType('danger');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Đã xảy ra lỗi, vui lòng thử lại sau.');
      setMessageType('danger');
    }
  };

  return (
      <div>
        <h1>Quên Mật Khẩu</h1>

        <form onSubmit={handleSubmit(submit)}>
          <div className="input-field mb-2 mt-3">
            <input
                type="email"
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
              <small className="text-danger mb-1">
                {formState?.errors?.email?.message}
              </small>
          )}
          <div className="form-details">
            <p>
              Vui lòng nhập đúng email đã đăng ký.
            </p>
          </div>

          <button type="submit" className="btn btn-primary w-100 ">
            Đặt Lại Mật Khẩu
          </button>
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