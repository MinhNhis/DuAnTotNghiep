import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";

import "./style.css";
import { Card, CardContent, Divider, Box, Typography } from "@mui/material";
import { addDanhmuc } from "../../../../services/Danhmuc";

const AddDanhmuc = () => {
  const { register, handleSubmit, formState } = useForm();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (value) => {
    try {
      await addDanhmuc({
        danh_muc: value?.danh_muc,
      });
      enqueueSnackbar("Thêm danh mục thành công!", { variant: "success" });
      navigate("/admin/danhmuc");
    } catch (error) {
      enqueueSnackbar("Có lỗi xảy ra khi thêm danh mục!", { variant: "error" });
      console.error("Lỗi khi thêm danh mục:", error);
    }
  };

  const handleCancle = () => {
    navigate("/admin/danhmuc");
  };

  return (
    <div>
      <Card variant="outlined" sx={{ p: 0 }}>
        <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
          <Box flexGrow={1}>
            <Typography
              sx={{ fontSize: "18px", fontWeight: "bold", textAlign: "center" }}
            >
              {`THÊM DANH MỤC`}
            </Typography>
          </Box>
        </Box>
        <Divider />
        <CardContent sx={{ padding: "30px" }}>
          <form>
            <div className="container">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Tên danh mục
                </label>
                <input
                  type="text"
                  className="form-control w-60"
                  name="name"
                  id="name"
                  placeholder="Tên danh mục"
                  {...register("danh_muc", {
                    required: {
                      value: true,
                      message: "Tên danh mục không được bỏ trống",
                    },
                  })}
                />
                {formState?.errors?.danh_muc && (
                  <small className="text-danger">
                    {formState?.errors?.danh_muc?.message}
                  </small>
                )}
              </div>
            </div>

            <div className="mb-3">
              <button
                type="submit"
                className="btn btn-primary m-lg-2"
                style={{ width: "100px" }}
                onClick={handleSubmit(onSubmit)}
              >
                {`Thêm`}
              </button>

              <button
                type="button"
                style={{ width: "100px" }}
                className="btn btn-danger m-lg-2"
                onClick={handleCancle}
              >
                {`Hủy`}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddDanhmuc;
