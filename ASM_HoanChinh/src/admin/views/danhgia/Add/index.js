import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Card, CardContent, Divider, Box, Typography } from "@mui/material";
import { addDanhgia } from "../../../../services/Danhgia";
import { getQuanan } from "../../../../services/Quanan";
import { getNguoiDung } from "../../../../services/Nguoidung";
import { useSnackbar } from 'notistack'; // Import useSnackbar

const AddDanhGia = () => {
  const { register, handleSubmit, formState } = useForm();
  const [nguoidung, setNguoiDung] = useState([]);
  const [quanan, setQuanAn] = useState([]);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar(); // Destructure enqueueSnackbar

  useEffect(() => {
    initFata();
  }, []);

  const initFata = async () => {
    const result = await getNguoiDung();
    const result2 = await getQuanan();
    setNguoiDung(result.data);
    setQuanAn(result2.data);
  };

  const onSubmit = async (value) => {
    try {
      await addDanhgia({
        binh_luan: value?.binh_luan,
        danh_gia_dich_vu: value?.danh_gia_dich_vu,
        danh_gia_do_an: value?.danh_gia_do_an,
        danh_gia_khong_khi: value?.danh_gia_khong_khi,
        sao: value?.sao,
        hinh_anh: value?.hinh_anh[0],
        id_nguoidung: value?.id_nguoidung,
        id_quanan: value?.id_quanan
      });
      enqueueSnackbar('Thêm đánh giá thành công!', { variant: 'success' }); // Show success message
      navigate("/admin/danhgia");
      console.log(value);
    } catch (error) {
      enqueueSnackbar('Có lỗi xảy ra!', { variant: 'error' }); // Show error message
    }
  };

  const handleCancle = () => {
    navigate("/admin/danhgia");
  };

  return (
    <div>
      <Card variant="outlined" sx={{ p: 0 }}>
        <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
          <Box flexGrow={1}>
            <Typography
              sx={{ fontSize: "18px", fontWeight: "bold", textAlign: "center" }}
            >
              {`Thêm Đánh Giá`}
            </Typography>
          </Box>
        </Box>
        <Divider />
        <CardContent sx={{ padding: "30px" }}>
          <form>
            <div className="container">
              <div className="row">
                <div className="col-6">
                  <div className="mb-3">
                    <label className="form-label">Bình Luận</label>
                    <input
                      type="text"
                      className="form-control w-60"
                      id="name"
                      placeholder="Bình Luận"
                      {...register("binh_luan", {
                        required: {
                          value: true,
                          message: "Bình luận không được bỏ trống",
                        },
                      })}
                    />
                    {formState?.errors?.binh_luan && (
                      <small className="text-danger">
                        {formState?.errors?.binh_luan?.message}
                      </small>
                    )}
                  </div>
                </div>
                <div className="col-6">
                  <div className="mb-3">
                    <label className="form-label">Dịch Vụ</label>
                    <input
                      type="text"
                      className="form-control w-60"
                      min={0}
                      name="danh_gia_dich_vu"
                      id="danh_gia_dich_vu"
                      placeholder="Đánh giá dịch vụ"
                      {...register("danh_gia_dich_vu", {
                        required: {
                          value: true,
                          message: "Đánh giá dịch vụ không được bỏ trống",
                        },
                      })}
                    />
                    {formState?.errors?.danh_gia_dich_vu && (
                      <small className="text-danger">
                        {formState?.errors?.danh_gia_dich_vu?.message}
                      </small>
                    )}
                  </div>
                </div>
                <div className="col-6">
                  <div className="mb-3">
                    <label className="form-label">Món ăn</label>
                    <input
                      type="text"
                      className="form-control w-60"
                      min={0}
                      name="danh_gia_do_an"
                      id="danh_gia_do_an"
                      placeholder="Đánh giá món ăn"
                      {...register("danh_gia_do_an", {
                        required: {
                          value: true,
                          message: "Đánh giá món ăn không được bỏ trống",
                        },
                      })}
                    />
                    {formState?.errors?.danh_gia_do_an && (
                      <small className="text-danger">
                        {formState?.errors?.danh_gia_do_an?.message}
                      </small>
                    )}
                  </div>
                </div>
                <div className="col-6">
                  <div className="mb-3">
                    <label className="form-label">Không khí</label>
                    <input
                      type="text"
                      className="form-control w-60"
                      min={0}
                      name="danh_gia_khong_khi"
                      id="danh_gia_khong_khi"
                      placeholder="Đánh giá không khí"
                      {...register("danh_gia_khong_khi", {
                        required: {
                          value: true,
                          message: "Đánh giá không khí không được bỏ trống",
                        },
                      })}
                    />
                    {formState?.errors?.danh_gia_khong_khi && (
                      <small className="text-danger">
                        {formState?.errors?.danh_gia_khong_khi?.message}
                      </small>
                    )}
                  </div>
                </div>
                <div className="col-6">
                  <div className="mb-3">
                    <label className="form-label">Số Sao</label>
                    <input
                      type="number"
                      className="form-control w-60"
                      min={0}
                      name="sao"
                      id="sao"
                      placeholder="Đánh giá quán ăn"
                      {...register("sao", {
                        required: {
                          value: true,
                          message: "Sao không được bỏ trống",
                        },
                      })}
                    />
                    {formState?.errors?.sao && (
                      <small className="text-danger">
                        {formState?.errors?.sao?.message}
                      </small>
                    )}
                  </div>
                </div>
                <div className="col-6">
                  <label className="form-label">Hình ảnh</label>
                  <input
                    type="file"
                    className="form-control"
                    name="images"
                    id="images"
                    {...register("hinh_anh")}
                  />
                </div>
                <div className="col-6">
                  <div className="mb-3">
                    <label className="form-label">Quán Ăn</label>
                    <select
                      className="form-select w-60"
                      name="id_quanan"
                      id="id_quanan"
                      {...register("id_quanan", {
                        required: {
                          value: null,
                          message: "Quán ăn không được bỏ trống",
                        },
                      })}
                    >
                      <option value="null">Quán ăn</option>
                      {quanan.map((item) => (
                        <option key={item.id_quanan} value={item.id_quanan}>
                          {item.ten_quan_an}
                        </option>
                      ))}
                    </select>
                    {formState?.errors?.id_quanan && (
                      <small className="text-danger">
                        {formState?.errors?.id_quanan?.message}
                      </small>
                    )}
                  </div>
                </div>
                <div className="col-6">
                  <div className="mb-3">
                    <label className="form-label">Người Dùng</label>
                    <select
                      className="form-select w-60"
                      name="id_nguoidung"
                      id="id_nguoidung"
                      {...register("id_nguoidung", {
                        required: {
                          value: null,
                          message: "Người dùng không được bỏ trống",
                        },
                      })}
                    >
                      <option value="null">Người Dùng</option>
                      {nguoidung.map((item) => (
                        <option key={item.id_nguoidung} value={item.id_nguoidung}>
                          {item.ten_nguoi_dung}
                        </option>
                      ))}
                    </select>
                    {formState?.errors?.id_nguoidung && (
                      <small className="text-danger">
                        {formState?.errors?.id_nguoidung?.message}
                      </small>
                    )}
                  </div>
                </div>
              </div>
              <div
                className="mb-3"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "10px",
                  width: "100px"
                }}
              >
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleSubmit(onSubmit)}
                  style={{ flex: 1 }}
                >
                  {`Thêm`}
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleCancle}
                  style={{ flex: 1 }}
                >
                  {`Hủy`}
                </button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddDanhGia;
