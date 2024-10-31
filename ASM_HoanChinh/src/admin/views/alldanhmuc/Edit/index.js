import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Card, CardContent, Divider, Box, Typography, TextField, Button } from "@mui/material";
import { getAllDanhmucById, updateAllDanhmuc } from "../../../../services/Alldanhmuc";
import { useSnackbar } from "notistack";

const EditAllDanhmuc = () => {
  const { control, register, handleSubmit, formState, setValue } = useForm();
  const [alldanhmuc, setAllDanhmuc] = useState({});
  const params = useParams();
  const id = params.id_alldanhmuc;
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const accounts = JSON.parse(localStorage.getItem("accounts"));

  useEffect(() => {
    inData();
  }, []);

  const inData = async () => {
    const res = await getAllDanhmucById(id);
    setAllDanhmuc(res.data);
    setValue("ten_danhmuc", res.data.ten_danhmuc || "");
  };

  const onSubmit = async (value) => {
    try {
      await updateAllDanhmuc(id, {
        ten_danhmuc: value?.ten_danhmuc,
        created_user: accounts?.id_nguoidung,
        updated_user: accounts?.id_nguoidung
      });
      enqueueSnackbar("Cập nhật danh mục thành công!", { variant: "success" });
      navigate("/admin/alldanhmuc");
    } catch (error) {
      enqueueSnackbar("Có lỗi xảy ra khi cập nhật danh mục!", {
        variant: "error",
      });
      console.error("Lỗi khi cập nhật danh mục:", error);
    }
  };

  const handleCancle = () => {
    navigate("/admin/alldanhmuc");
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
            <div className="container" key={String(alldanhmuc.ten_danhmuc)}>
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Tên danh mục
                </label>
                <Controller
                  name="ten_danhmuc"
                  control={control}
                  defaultValue={alldanhmuc.ten_danhmuc}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="text"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                  {...register("ten_danhmuc", {
                    required: {
                      value: true,
                      message: "Danh mục không được bỏ trống",
                    },
                  })}
                />
                {formState?.errors?.ten_danhmuc && (
                  <small className="text-danger">
                    {formState?.errors?.ten_danhmuc?.message}
                  </small>
                )}
              </div>
              <div className="mb-3">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit(onSubmit)}
                  sx={{ width: "100px", marginRight:2 }}
                >
                  {`Sửa`}
                </Button>

                <Button
                  type="button"
                  variant="contained"
                  color="error"
                  onClick={handleCancle}
                  sx={{ width: "100px" }}
                >
                  {`Hủy`}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditAllDanhmuc;
