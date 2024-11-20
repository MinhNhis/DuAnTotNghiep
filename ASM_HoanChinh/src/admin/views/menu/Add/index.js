import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Card, CardContent, Divider, Box, Typography, TextField, Select, MenuItem, Button } from "@mui/material";
import { useSnackbar } from 'notistack';
import { addMenu } from "../../../../services/MenuPhu";
import { getDanhmuc } from "../../../../services/Danhmuc";
import { getQuanan } from "../../../../services/Dichvu";
const AddMenu = () => {
    const { register, handleSubmit, formState } = useForm();
    const [danhmuc, setDanhmuc] = useState([]);
    const [quanan, setQuanan] = useState([]);
    const [account, setAccounts] = useState(null);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const accounts = JSON.parse(localStorage.getItem("accounts"));
        setAccounts(accounts);
        initData();
    }, []);

    const initData = async () => {
        const resultDanhmuc = await getDanhmuc();
        setDanhmuc(resultDanhmuc.data);

        const resultQuanan = await getQuanan();
        setQuanan(resultQuanan.data);
    };
    const fill = quanan.find((e) => e.created_user === account.id_nguoidung)
    const onSubmit = async (value) => {
        try {
            await addMenu({
                ten_menu: value?.ten_menu,
                gia: value?.gia,
                id_danhmuc: value?.danh_muc,
                id_quanan: fill.id_quanan,
                hinh_anh: value?.hinh_anh[0],
                created_user: account.id_nguoidung
            });
            enqueueSnackbar('Thêm menu thành công!', { variant: 'success' });
            navigate("/admin/menu");
        } catch (error) {
            enqueueSnackbar('Có lỗi xảy ra khi thêm menu!', { variant: 'error' });
            console.error('Lỗi khi thêm menu:', error);
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
                            {`Thêm Menu`}
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
                                        <label className="form-label">Tên Menu</label>
                                        <TextField
                                            type="text"
                                            variant="outlined"
                                            fullWidth
                                            id="name"
                                            placeholder="Tên Menu"
                                            {...register("ten_menu", {
                                                required: {
                                                    value: true,
                                                    message: "Tên menu không được bỏ trống",
                                                },
                                            })}
                                        />
                                        {formState?.errors?.ten_menu && (
                                            <small className="text-danger">
                                                {formState?.errors?.ten_menu?.message}
                                            </small>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-lablr">Danh mục</label>
                                        <Select fullWidth defaultValue={"-1"} {...register("danh_muc", {
                                            validate: (danh_muc) => {
                                                if (danh_muc === "-1") {
                                                    return "Danh mục không được bỏ trống";
                                                }
                                                return true;
                                            }
                                        })}>
                                            <MenuItem selected value={"-1"} disabled>Danh mục</MenuItem>
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
                                        {formState?.errors?.danh_muc && (
                                            <small className="text-danger">
                                                {formState?.errors?.danh_muc?.message}
                                            </small>
                                        )}
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="mb-2">
                                        <label className="form-label">Giá</label>
                                        <TextField
                                            type="number"
                                            variant="outlined"
                                            fullWidth
                                            min={0}
                                            name="price"
                                            id="price"
                                            placeholder="Giá"
                                            {...register("gia", {
                                                required: {
                                                    value: true,
                                                    message: "Giá không được bỏ trống",
                                                },
                                                min: {
                                                    value: 0,
                                                    message: "Giá không được nhập nhỏ hơn 0",
                                                },
                                            })}
                                        />
                                        {formState?.errors?.gia && (
                                            <small className="text-danger">
                                                {formState?.errors?.gia?.message}
                                            </small>
                                        )}
                                    </div>
                                    {/* <div className="mn-3">
                                        <label className="form-lablr">Quán ăn</label>
                                        <Select fullWidth defaultValue={'-1'} {...register("quan_an", {
                                            validate: (quan_an) => {
                                                if (quan_an === "-1") {
                                                    return "Quán ăn không được bỏ trống";
                                                }
                                                return true;
                                            }
                                        })}>
                                            <MenuItem selected value={fill.id_quanan} disabled>{fill.ten_quan_an}</MenuItem>
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
                                        {formState?.errors?.quan_an && (
                                            <small className="text-danger">
                                                {formState?.errors?.quan_an?.message}
                                            </small>
                                        )}
                                    </div> */}
                                    <div className="mb-3">
                                        <label className="form-label">Hình ảnh</label>
                                        <TextField
                                            type="file"
                                            cvariant="outlined"
                                            fullWidth
                                            name="images"
                                            id="images"
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
                                </div>
                            </div>

                            <div className="mb-3">
                                <Button variant="contained" color="primary" sx={{ width: "100px" }} onClick={handleSubmit(onSubmit)}>{`Thêm`} </Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AddMenu;
