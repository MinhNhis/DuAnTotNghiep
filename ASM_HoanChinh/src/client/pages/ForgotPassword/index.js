// components/ForgotPassword.js
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {BASE_URL} from "../../../config/ApiConfig";


const ForgotPassword = () => {
  const { register, handleSubmit, formState } = useForm();
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('danger');
  const PageUrl = BASE_URL

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
        setMessage('Email đã được gửi, hãy kiểm tra hòm thư của bạn.');
        
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
      <h2>Forgot Password</h2>
      {message && <div className="alert alert-danger">{message}</div>}
      <form onSubmit={handleSubmit(submit)}>
        <div className="input-field mb-2">
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
        <button type="submit" className="btn btn-primary w-100 mt-3">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
