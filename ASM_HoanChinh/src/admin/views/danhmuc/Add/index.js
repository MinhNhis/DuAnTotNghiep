import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import { CardContent, Divider, Box, Typography, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
import { addDanhmuc } from "../../../../services/Danhmuc";
import { getAllDanhmuc } from "../../../../services/Alldanhmuc";

const AddDanhmuc = () => {
  const params = useParams();
  const id = params.id_alldanhmuc;
  const { register, handleSubmit, formState } = useForm();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(true);
  const accounts = JSON.parse(localStorage.getItem("accounts"));
  const [account, setAccounts] = useState(null);
  const [alldanhmuc, setAllDanhmuc] = useState([]);

  useEffect(() => {
    const accounts = JSON.parse(localStorage.getItem("accounts"));
    setAccounts(accounts);
    initData();
  }, []);
  const handleClose = () => {
    setOpen(false);
    navigate('/admin/alldanhmuc')
  };
  const onSubmit = async (value) => {
    try {
      await addDanhmuc({
        danh_muc: value?.danh_muc,
        created_user: accounts?.id_nguoidung,
        updated_user: accounts?.id_nguoidung,
        id_alldanhmuc: id
      });
      enqueueSnackbar("Thêm danh mục thành công!", { variant: "success" });
      navigate("/admin/alldanhmuc");
    } catch (error) {
      enqueueSnackbar("Có lỗi xảy ra khi thêm danh mục!", { variant: "error" });
      console.error("Lỗi khi thêm danh mục:", error);
    }
  };

  const handleCancle = () => {
    navigate("/admin/alldanhmuc");
  };

  const initData = async () => {
    const resultAlldanhmuc = await getAllDanhmuc();
    setAllDanhmuc(resultAlldanhmuc.data);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
            <Box flexGrow={1}>
              <Typography
                sx={{ fontSize: "18px", fontWeight: "bold", textAlign: "center" }}
              >
                {`THÊM DANH MỤC`}
              </Typography>
            </Box>
          </Box>
        </DialogTitle>

        <Divider />
        
        <DialogContent>
          <CardContent sx={{ padding: "30px" }}>
            <form>
              <div className="container">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Tên danh mục
                  </label>
                  <TextField
                    type="text"
                    variant="outlined"
                    fullWidth
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
                <DialogActions sx={{ justifyContent: 'center' }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ width: "100px", marginRight: 2, }}
                    onClick={handleSubmit(onSubmit)}
                  >
                    {`Thêm`}
                  </Button>

                  <Button
                    sx={{ width: "100px" }}
                    variant="contained"
                    color="error"
                    onClick={handleCancle}
                  >
                    {`Hủy`}
                  </Button>
                </DialogActions>
              </div>
            </form>
          </CardContent>
        </DialogContent>
    </Dialog>
  );
};

export default AddDanhmuc;
