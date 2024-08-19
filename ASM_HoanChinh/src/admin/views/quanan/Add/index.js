import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Card, CardContent, Divider, Box, Typography } from "@mui/material";
import { addQuanan } from "../../../../services/Quanan";
import { getGioithieu } from "../../../../services/Gioithieu";
import { useSnackbar } from 'notistack';

const AddQuanAn = () => {
  const { register, handleSubmit, formState } = useForm();
  const [gioithieu, setGioiThieu] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    initFata();
  }, []);

  const initFata = async () => {
    const result = await getGioithieu();
    setGioiThieu(result.data);
  };

  const onSubmit = async (value) => {
    try {
      await addQuanan({
        ten_quan_an: value?.ten_quan_an,
        dia_chi: value?.dia_chi,
        dien_thoai: value?.dien_thoai,
        gio_hoat_dong: value?.gio_hoat_dong,
        link_website: value?.link_website,
        hinh_anh: value?.hinh_anh[0],
        link_facebook: value?.link_facebook,
        id_gioithieu: value?.id_gioithieu
      });
      enqueueSnackbar('Thêm quán ăn thành công!', { variant: 'success' });
      navigate("/admin/QuanAn");
    } catch (error) {
      enqueueSnackbar('Có lỗi xảy ra khi thêm quán ăn!', { variant: 'error' });
    }
    console.log(value);
  };

  const handleCancle = () => {
    navigate("/admin/QuanAn");
  };

  return (
    <div>
      <Card variant="outlined" sx={{ p: 0 }}>
        <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
          <Box flexGrow={1}>
            <Typography
              sx={{ fontSize: "18px", fontWeight: "bold", textAlign: "center" }}
            >
              {`Thêm Quán Ăn`}
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
                    <label className="form-label">Tên Quán Ăn</label>
                    <input
                      type="text"
                      className="form-control w-60"
                      id="ten_quan_an"
                      placeholder="Tên quán ăn"
                      {...register("ten_quan_an", {
                        required: {
                          value: true,
                          message: "Tên quán ăn không được bỏ trống",
                        },
                      })}
                    />

                    {formState?.errors?.ten_quan_an && (
                      <small className="text-danger">
                        {formState?.errors?.ten_quan_an?.message}
                      </small>
                    )}
                  </div>
                </div>
                <div className="col-6">
                  <div className="mb-3">
                    <label className="form-label">Địa chỉ</label>
                    <input
                      type="text"
                      className="form-control w-60"
                      min={0}
                      name="dia_chi"
                      id="dia_chi"
                      placeholder="Địa chỉ"
                      {...register("dia_chi", {
                        required: {
                          value: true,
                          message: "Địa chỉ không được bỏ trống",
                        },
                      })}
                    />

                    {formState?.errors?.dia_chi && (
                      <small className="text-danger">
                        {formState?.errors?.dia_chi?.message}
                      </small>
                    )}
                  </div>
                </div>
                <div className="col-6">
                  <div className="mb-3">
                    <label className="form-label">Số điện thoại</label>
                    <input
                      type="number"
                      className="form-control w-60"
                      min={0}
                      name="dien_thoai"
                      id="dien_thoai"
                      placeholder="Số điện thoại"
                      {...register("dien_thoai", {
                        required: {
                          value: true,
                          message: "Số điện thoại không được bỏ trống",
                        },
                        maxLength: {
                          value: 10,
                          message: "Số điện thoại không đúng định dạng"
                        }
                      })}
                    />
                    {formState?.errors?.dien_thoai && (
                      <small className="text-danger">
                        {formState?.errors?.dien_thoai?.message}
                      </small>
                    )}
                  </div>
                </div>
                <div className="col-6">
                  <div className="mb-3">
                    <label className="form-label">Giờ hoạt động</label>
                    <input
                      type="text"
                      className="form-control w-60"
                      min={0}
                      name="gio_hoat_dong"
                      id="gio_hoat_dong"
                      placeholder="Giờ hoạt động"
                      {...register("gio_hoat_dong", {
                        required: {
                          value: true,
                          message: "Giờ hoạt động không được bỏ trống",
                        },
                      })}
                    />
                    {formState?.errors?.gio_hoat_dong && (
                      <small className="text-danger">
                        {formState?.errors?.gio_hoat_dong?.message}
                      </small>
                    )}
                  </div>
                </div>
                <div className="col-6">
                  <div className="mb-3">
                    <label className="form-label">Link Website</label>
                    <input
                      type="text"
                      className="form-control w-60"
                      min={0}
                      name="link_website"
                      id="link_website"
                      placeholder="Link Website"
                      {...register("link_website", {
                        required: {
                          value: true,
                          message: "Link Website không được bỏ trống",
                        },
                      })}
                    />
                    {formState?.errors?.link_website && (
                      <small className="text-danger">
                        {formState?.errors?.link_website?.message}
                      </small>
                    )}
                  </div>
                </div>

                <div className="col-6">
                  <div className="mb-3">
                    <label className="form-label">Link Facebook</label>
                    <input
                      type="text"
                      className="form-control w-60"
                      min={0}
                      name="link_facebook"
                      id="link_facebook"
                      placeholder="Link Website"
                      {...register("link_facebook", {
                        required: {
                          value: true,
                          message: "Link Facebook không được bỏ trống",
                        },
                      })}
                    />
                    {formState?.errors?.link_facebook && (
                      <small className="text-danger">
                        {formState?.errors?.link_facebook?.message}
                      </small>
                    )}
                  </div>
                </div>

                <div className="col-6">
                  <div className="mb-3">
                    <label className="form-label">Giới thiệu</label>
                    <select
                      className="form-select w-60"
                      name="id_gioithieu"
                      id="id_gioithieu"
                      {...register("id_gioithieu", {
                        required: {
                          value: null,
                          message: "Giới thiệu không được bỏ trống",
                        },
                      })}
                    >
                      <option value="null">Giới thiệu</option>
                      {gioithieu.map((item) => (
                        <option key={item.id_quanan} value={item.id_gioithieu}>
                          {item.gioi_thieu}
                        </option>
                      ))}
                    </select>
                    {formState?.errors?.id_gioithieu && (
                      <small className="text-danger">
                        {formState?.errors?.id_gioithieu?.message}
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
              </div>

              <div className="row">
                <button
                  type="submit"
                  className="btn btn-primary m-lg-2"
                  onClick={handleSubmit(onSubmit)}
                   style={{ width: "100px" }}
                >
                  {`Thêm`}
                </button>

                <button
                  type="button"
                  className="btn btn-danger m-lg-2"
                  onClick={handleCancle}
                   style={{ width: "100px" }}
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

export default AddQuanAn;
