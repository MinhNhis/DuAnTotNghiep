import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Card, CardContent, Divider, Box, Typography, TextField, Select, MenuItem, Button } from "@mui/material";
import { getMenuById, updateMenu } from "../../../../services/MenuPhu";
import { BASE_URL } from "../../../../config/ApiConfig";
import { getDanhmuc } from "../../../../services/Danhmuc";
import { getQuanan } from "../../../../services/Dichvu";
import { useSnackbar } from "notistack";

const EditMenu = () => {
  const { control, register, handleSubmit, formState, setValue } = useForm();
  const [menu, setMenu] = useState({});
  const [danhmuc, setDanhmuc] = useState([]);
  const [quanan, setQuanan] = useState([]);
  const [account, setAccounts] = useState(null);
  const params = useParams();
  const id = params.id_menu;
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    const accounts = JSON.parse(localStorage.getItem("accounts"));
    setAccounts(accounts);
    inData();
  }, []);

  const inData = async () => {
    const res = await getMenuById(id);
    setMenu(res.data);
    setValue("ten_menu", res.data.ten_menu || "");
    setValue("gia", res.data.gia || "");

    const resultDanhmuc = await getDanhmuc();
    setDanhmuc(resultDanhmuc.data);
    const selectedDanhmuc = resultDanhmuc.data.find(
      (e) => e.id_danhmuc === res.data.id_danhmuc
    );
    if (selectedDanhmuc) {
      setValue("danh_muc", selectedDanhmuc.id_danhmuc);
    }

    const resultQuanan = await getQuanan();
    setQuanan(resultQuanan.data);
    const selectedQuanan = resultQuanan.data.find(
      (e) => e.id_quanan === res.data.id_quanan
    );
    if (selectedQuanan) {
      setValue("quan_an", selectedQuanan.id_quanan);
    }
  };

  const onSubmit = async (data) => {
    try {
      await updateMenu(id, {
        ten_menu: data?.ten_menu,
        gia: data?.gia,
        id_danhmuc: data?.danh_muc,
        id_quanan: data?.quan_an,
        hinh_anh: data?.hinh_anh[0],
        created_user: account.id_nguoidung,
        updated_user: account.id_nguoidung
      });
      enqueueSnackbar("Cập nhật menu thành công!", { variant: "success" });
      navigate("/admin/menu");
    } catch (error) {
      enqueueSnackbar("Có lỗi xảy ra khi cập nhật menu!", { variant: "error" });
      console.error("Lỗi khi cập nhật menu:", error);
    }
  };

  return (
    <div>
      <Card variant="outlined" sx={{ p: 0 }}>
        <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
          <Box flexGrow={1}>
            <Typography
              sx={{ fontSize: "18px", fontWeight: "bold", textAlign: "center" }}
            >
              CẬP NHẬT MENU
            </Typography>
          </Box>
        </Box>
        <Divider />
        <CardContent sx={{ padding: "30px" }}>
          <form>
            <div className="container" key={String(menu.id_menu)}>
              <div className="row">
                <div className="col-6">
                  <div className="mb-3">
                    <label className="form-label">Tên Menu</label>
                    <Controller
                      name="ten_menu"
                      control={control}
                      defaultValue=""
                      plachoder="Tên Menu"
                      render={({ field }) => (
                        <TextField
                          {...field}
                          type="text"
                          fullWidth
                          variant="outlined"
                        />
                      )}
                      {...register("ten_menu", {
                        required: {
                          value: true,
                          message: "Tên menu không được bỏ trống",
                        },
                      })}
                    />
                    {formState?.errors?.ten_menu && (
                      <small className="text-danger">
                        {formState.errors.ten_menu.message}
                      </small>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-lablr">Danh mục</label>
                    <Controller
                      name="danh_muc"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <Select
                          {...field}
                          fullWidth
                          variant="outlined"
                        >
                          <MenuItem  selected value={"-1"} disabled={true}>
                            Danh mục
                          </MenuItem>
                          {danhmuc.map((value, index) => {
                            if (
                              value?.created_user === account?.id_nguoidung ||
                              value?.updated_user === account?.id_nguoidung ||
                              account?.vai_tro === 0
                            ) {
                              return (
                                <MenuItem key={value.id_danhmuc} value={value.id_danhmuc}>
                                  {value.danh_muc}
                                </MenuItem>
                              );
                            }
                            return null;
                          })}
                        </Select>
                      )}
                      {...register("danh_muc", {
                        validate: (danh_muc) => {
                          if (danh_muc === "-1") {
                            return "Danh mục không được bỏ trống";
                          }
                          return true;
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
                <div className="col-6">
                  <div className="mb-3">
                    <label className="form-label">Giá</label>
                    <Controller
                      name="gia"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          {...field}
                          type="number"
                          min={0}
                          fullWidth
                          variant="outlined"
                        />
                      )}
                      {...register("gia", {
                        required: {
                          value: true,
                          message: "Price không được bỏ trống",
                        },
                        min: {
                          value: 0,
                          message: "Price không được nhập nhỏ hơn 0",
                        },
                      })}
                    />
                    {formState?.errors?.gia && (
                      <small className="text-danger">
                        {formState?.errors?.gia?.message}
                      </small>
                    )}
                  </div>
                  <div className="mn-3">
                    <label className="form-lablr">Quán ăn</label>
                    <Controller
                      name="quan_an"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <Select
                          {...field}
                          variant="outlined"
                          fullWidth
                        >
                          <MenuItem selected value={"-1"} disabled={true}>
                            Quán ăn
                          </MenuItem>
                          {quanan.map((value, index) => {
                            if (
                              value?.created_user === account?.id_nguoidung ||
                              value?.updated_user === account?.id_nguoidung ||
                              account?.vai_tro === 0
                            ) {
                              return (
                                <MenuItem key={value.id_quanan} value={value.id_quanan}>
                                  {value.ten_quan_an}
                                </MenuItem>
                              );
                            }
                            return null;
                          })}
                        </Select>
                      )}
                      {...register("quan_an", {
                        validate: (quan_an) => {
                          if (quan_an === "-1") {
                            return "Quán ăn không được bỏ trống";
                          }
                          return true;
                        },
                      })}
                    />
                    {formState?.errors?.quan_an && (
                      <small className="text-danger">
                        {formState?.errors?.quan_an?.message}
                      </small>
                    )}
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Hình ảnh</label>
                <div className="mb-3 mt-3">
                  <img
                    style={{ width: "100px" }}
                    src={`${BASE_URL}/uploads/${menu.hinh_anh}`}
                    alt="Preview"
                  />
                </div>
                <TextField
                  type="file"
                  fullWidth
                  variant="outlined"
                  {...register("hinh_anh", {
                    required: {
                      value: true,
                      message: "Hình ảnh không được bỏ trống",
                    },
                  })}
                />
                {formState?.errors?.hinh_anh && (
                  <small className="text-danger">
                    {formState?.errors?.hinh_anh?.message}
                  </small>
                )}
              </div>
              <div className="mb-3">
                <Button variant="contained" color="primary" sx={{ width: "100px", marginRight: 2 }} onClick={handleSubmit(onSubmit)}>{`Sửa`} </Button>
                <Link to={"/admin/menu"}><Button variant="contained" color="error" sx={{ width: "100px" }} >{`Hủy`}</Button></Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditMenu;
