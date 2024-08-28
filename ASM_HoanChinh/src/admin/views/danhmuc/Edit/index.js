import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Card, CardContent, Divider, Box, Typography } from "@mui/material";
import { getDanhmucById, updateDanhmuc } from "../../../../services/Danhmuc";
import { useSnackbar } from "notistack";

const EditDanhmuc = () => {
  const { control, register, handleSubmit, formState, setValue } = useForm();
  const [danhmuc, setDanhmuc] = useState({});
  const params = useParams();
  const id = params.id_danhmuc;
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    inData();
  }, []);

  const inData = async () => {
    const res = await getDanhmucById(id);
    setDanhmuc(res.data);
    setValue("danh_muc", res.data.danh_muc || "");
  };

  const onSubmit = async (data) => {
    try {
      await updateDanhmuc(id, {
        danh_muc: data?.danh_muc,
      });
      enqueueSnackbar("Cập nhật danh mục thành công!", { variant: "success" });
      navigate("/admin/danhmuc");
    } catch (error) {
      enqueueSnackbar("Có lỗi xảy ra khi cập nhật danh mục!", {
        variant: "error",
      });
      console.error("Lỗi khi cập nhật danh mục:", error);
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
              {`CẬP NHẬT DANH MỤC`}
            </Typography>
          </Box>
        </Box>
        <Divider />
        <CardContent sx={{ padding: "30px" }}>
          <form>
            <div className="container" key={String(danhmuc.danh_muc)}>
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Tên danh mục
                </label>
                <Controller
                  name="danh_muc"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="form-control w-60"
                    />
                  )}
                  {...register("danh_muc", {
                    required: {
                      value: true,
                      message: "Danh mục không được bỏ trống",
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
                onClick={handleSubmit(onSubmit)}
                style={{ width: "100px" }}
              >
                {`Sửa`}
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
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditDanhmuc;
