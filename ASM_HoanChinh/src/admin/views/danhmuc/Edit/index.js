import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Card, CardContent, Divider, Box, Typography, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
import { getDanhmucById, updateDanhmuc } from "../../../../services/Danhmuc";
import { useSnackbar } from "notistack";
import { getAllDanhmuc, getAllDanhmucById } from "../../../../services/Alldanhmuc";

const EditDanhmuc = () => {
  const { control, register, handleSubmit, formState, setValue } = useForm();
  const [danhmuc, setDanhmuc] = useState({});
  const params = useParams();
  const [open, setOpen] = useState(true);
  const id = params.id_danhmuc;
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const accounts = JSON.parse(localStorage.getItem("accounts"));
  const [account, setAccounts] = useState(null);
  const [alldanhmuc, setAllDanhmuc] = useState([]);
  const [alldanhmucById, setAllDanhmucById] = useState([])


  useEffect(() => {
    const accounts = JSON.parse(localStorage.getItem("accounts"));
    setAccounts(accounts);
    initData();
    inData();
  }, []);
  const handleClose = () => {
    setOpen(false);
    navigate(`/admin/danhmuc/${danhmuc.id_alldanhmuc}`);
  };

  const initData = async () => {
    const resultAlldanhmuc = await getAllDanhmuc();
    setAllDanhmuc(resultAlldanhmuc.data);
  };

  const inData = async () => {
    const res = await getDanhmucById(id);
    setDanhmuc(res.data);
    setValue("danh_muc", res.data.danh_muc || "");

    const resAllDanhmuc = await getAllDanhmucById(res.data.id_alldanhmuc);
    if (resAllDanhmuc.data && resAllDanhmuc.data.id_alldanhmuc) {
      setAllDanhmucById("ten_danhmuc", resAllDanhmuc.data.id_alldanhmuc);
      setValue("ten_danhmuc", resAllDanhmuc.data.id_alldanhmuc);
    }
  };

  const onSubmit = async (data) => {
    try {
      await updateDanhmuc(id, {
        danh_muc: data?.danh_muc,
        created_user: accounts?.id_nguoidung,
        updated_user: accounts?.id_nguoidung,
        id_alldanhmuc: data?.ten_danhmuc
      });
      enqueueSnackbar("Cập nhật danh mục thành công!", { variant: "success" });
      navigate(`/admin/danhmuc/${danhmuc.id_alldanhmuc}`);
    } catch (error) {
      enqueueSnackbar("Có lỗi xảy ra khi cập nhật danh mục!", {
        variant: "error",
      });
      console.error("Lỗi khi cập nhật danh mục:", error);
    }
  };

  const handleCancle = () => {
    navigate(`/admin/danhmuc/${danhmuc.id_alldanhmuc}`);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
            <Box flexGrow={1}>
              <Typography
                sx={{ fontSize: "18px", fontWeight: "bold", textAlign: "center" }}
              >
                {`CẬP NHẬT DANH MỤC`}
              </Typography>
            </Box>
          </Box>
        </DialogTitle>
        <Divider />
        <DialogContent>
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
                      <TextField
                        {...field}
                        type="text"
                        variant="outlined"
                        fullWidth
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

                <div className="mb-3">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit(onSubmit)}
                    sx={{ width: "100px", marginRight: 2 }}
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
        </DialogContent>
    </Dialog>
  );
};

export default EditDanhmuc;
