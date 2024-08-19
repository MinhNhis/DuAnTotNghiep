import request from "../../config/ApiConfig";

const loginApi = async ({ email, mat_khau }) => {
  const res = await request({
    method: "POST",
    path: "/api/login",
    data: {
      email: email,
      mat_khau: mat_khau,
      device: "website",
    },
  });

  return res;
};

export { loginApi };
