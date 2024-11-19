import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Card, CardContent, Divider, Box, Typography, Button, TextField } from "@mui/material";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { addbaiviet } from "../../../../services/Baiviet";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack';

const AddBaiViet = () => {
  const { register, handleSubmit, control, formState } = useForm();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const submit = async (value) => {
    try {
      const ngayhientai = new Date().toISOString().split('T')[0];

      await addbaiviet({
        tieu_de: value?.tieu_de,
        noi_dung: value?.noi_dung,
        hinh_anh: value?.hinh_anh[0] || '',
        ngay_dang: value?.ngay_dang || ngayhientai
      });
      enqueueSnackbar('Thêm bài viết thành công!', { variant: 'success' });
      navigate("/admin/bai-viet");
    } catch (error) {
      enqueueSnackbar('Có lỗi xảy ra khi thêm bài viết!', { variant: 'error' });
      console.error("Lỗi khi thêm bài viết:", error);
    }
  };
  const handleClose = () => {
    navigate('/admin/bai-viet');
  };

  return (
      <div className="container">
        <Card variant="outlined" sx={{ p: 0 }}>
          <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
            <Box flexGrow={1}>
              <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
                THÊM BÀI VIẾT
              </Typography>
            </Box>
          </Box>
          <Divider />
          <CardContent sx={{ padding: "30px" }}>
            <div className="row">
              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="tieu_de" className="form-label">
                    Tiêu đề
                  </label>
                  <TextField
                      type="text"
                      fullWidth
                      variant="outlined"
                      label="Tiêu đề"
                      {...register("tieu_de", {
                        required: {
                          value: true,
                          message: "Tiêu đề không được bỏ trống",
                        },
                      })}
                  />
                  {formState?.errors?.tieu_de && (
                      <small className="text-danger">
                        {formState?.errors?.tieu_de?.message}
                      </small>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="hinh_anh" className="form-label">
                    Hình ảnh
                  </label>
                  <TextField
                      type="file"
                      fullWidth
                      variant="outlined"
                      {...register("hinh_anh", {
                        required: {
                          value: true,
                          message: "Vui lòng chọn hình ảnh",
                        },
                      })}
                  />
                  {formState?.errors?.hinh_anh && (
                      <small className="text-danger">
                        {formState?.errors?.hinh_anh?.message}
                      </small>
                  )}
                </div>
              </div>
              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="noi_dung" className="form-label">Nội dung</label>
                  <Controller
                      name="noi_dung"
                      control={control}
                      defaultValue=""
                      rules={{ required: { value: true, message: "Nội dung không được bỏ trống" } }}
                      render={({ field }) => (
                          <ReactQuill
                              style={{
                                height : "120px",
                              }}
                              value={field.value}
                              onChange={(content) => field.onChange(content)}  // Cập nhật giá trị nội dung
                          />
                      )}
                  />
                  {formState?.errors?.noi_dung && (
                      <small className="text-danger">{formState?.errors?.noi_dung?.message}</small>
                  )}
                </div>
              </div>
            </div>
            <div className="mb-3">
              <Button
                  color="primary"
                  variant="contained"
                  className="mt-0.75 "
                  sx={{ width: "100px" }}
                  onClick={handleSubmit(submit)}
              >
                Thêm
              </Button>
              <Button
                  color="danger"
                  variant="contained"
                  className="mt-2 m-lg-2"
                  sx={{ width: "100px" }}
                  onClick={handleClose}

              >
                Hủy
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
  );
};

export default AddBaiViet;