import request from "../../config/ApiConfig";

const loginApi = async ({ email, mat_khau }) => {
  try {
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
  }
  catch(error){
    throw error
  }  
};

const changPassword = async (id_nguoidung, {mat_khau, newMat_khau}) => {
  try {
    const res = await request({
      method: "PUT",
      path: `/api/changpassword/${id_nguoidung}`,
      data: {
        mat_khau: mat_khau,
        newMat_khau: newMat_khau
      }
    })
    return res
  } catch (error) {
    throw error
  }
}

export { loginApi, changPassword };
