import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import { Card, CardContent, Divider, Box, Typography, TextField, Select, MenuItem, Button } from "@mui/material";
import { addDanhmuc } from "../../../../services/Danhmuc";
import { getAllDanhmuc } from "../../../../services/Alldanhmuc";

const AddDanhmuc = () => {
  const { register, handleSubmit, formState } = useForm();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const accounts = JSON.parse(localStorage.getItem("accounts"));
  const [account, setAccounts] = useState(null);
  const [alldanhmuc, setAllDanhmuc] = useState([]);

  useEffect(() => {
    const accounts = JSON.parse(localStorage.getItem("accounts"));
    setAccounts(accounts);
    initData();
  }, []);

  const onSubmit = async (value) => {
    try {
      await addDanhmuc({
        danh_muc: value?.danh_muc,
        created_user: accounts?.id_nguoidung,
        updated_user: accounts?.id_nguoidung,
        id_alldanhmuc: value.alldanhmuc
      });
      enqueueSnackbar("Thêm danh mục thành công!", { variant: "success" });
      navigate("/admin/danhmuc");
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


              <div className="mb-3">
                <label className="form-lablr"> Tất Cả Danh mục</label>
                <Select fullWidth defaultValue={"-1"} {...register("alldanhmuc", {
                  validate: (ten_danhmuc) => {
                    if (ten_danhmuc === "-1") {
                      return "Danh mục không được bỏ trống";
                    }
                    return true;
                  }
                })}>
                  <MenuItem selected value={"-1"} disabled>Tất Cả Danh mục</MenuItem>
                  {alldanhmuc.filter((e) =>
                    e?.created_user === account?.id_nguoidung &&
                    account?.vai_tro === 2
                  ).map((value, index) => {
                    return (
                      <MenuItem key={value.id_alldanhmuc} value={value.id_alldanhmuc}>
                        {value.ten_danhmuc}
                      </MenuItem>
                    );
                  })}
                </Select>
                {formState?.errors?.alldanhmuc && (
                  <small className="text-danger">
                    {formState?.errors?.alldanhmuc?.message}
                  </small>
                )}
              </div>



              <div className="mb-3 ">
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
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddDanhmuc;
