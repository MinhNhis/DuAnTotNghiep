import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { Card, CardContent, Divider, Box, Typography, TextField, Select, MenuItem, Button } from "@mui/material";
import { editQuanan, getQuananById } from "../../../../services/Quanan";
import { getGioithieu } from "../../../../services/Gioithieu";
import { useSnackbar } from 'notistack';

const AddQuanAn = () => {
    const params = useParams();
    const id = params.id_quanan;
    const [quanan, setQuanAn] = useState([]);
    const [account, setAccounts] = useState(null);
    const { control, register, handleSubmit, setValue, formState } = useForm();
    const [gioithieu, setGioiThieu] = useState([]);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const accounts = JSON.parse(localStorage.getItem("accounts"));
        setAccounts(accounts);
        initFata();
    }, []);

    const initFata = async () => {
        const result = await getQuananById(id);
        setQuanAn(result.data);

        const result_gioithieu = await getGioithieu();
        setGioiThieu(result_gioithieu.data);
        const selectedGioithieu = result_gioithieu.data.find((e) => e.id_gioithieu === result.data.id_gioithieu);
        console.log(selectedGioithieu);

        if (selectedGioithieu) {
            setValue('id_gioithieu', selectedGioithieu.id_gioithieu);
        }

        setValue("ten_quan_an", result.data.ten_quan_an || "");
        setValue("dia_chi", result.data.dia_chi || "");
        setValue("dien_thoai", result.data.dien_thoai || "");
        setValue("gio_hoat_dong", result.data.gio_hoat_dong || "");
        setValue("link_website", result.data.link_website || "");
        setValue("link_facebook", result.data.link_facebook || "");
        setValue("so_luong_cho", result.data.so_luong_cho || "");
    };

    const onSubmit = async (value) => {
        try {
            await editQuanan(id, {
                ten_quan_an: value?.ten_quan_an,
                dia_chi: value?.dia_chi,
                dien_thoai: value?.dien_thoai,
                gio_hoat_dong: value?.gio_hoat_dong,
                link_website: value?.link_website,
                hinh_anh: value?.hinh_anh[0],
                so_luong_cho: value?.so_luong_cho,
                link_facebook: value?.link_facebook,
                id_gioithieu: value?.id_gioithieu,
                created_user: account?.id_nguoidung,
                updated_user: account?.id_nguoidung
            });
            enqueueSnackbar('Cập nhật quán ăn thành công!', { variant: 'success' });
            navigate("/admin/quanan");
        } catch (error) {
            enqueueSnackbar('Có lỗi xảy ra khi cập nhật quán ăn!', { variant: 'error' });
        }
        console.log(value);
    };

    const navigate = useNavigate();

    const handleCancle = () => {
        navigate("/admin/quanan");
    };

    return (
        <div>
            <Card variant="outlined" sx={{ p: 0 }}>
                <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
                    <Box flexGrow={1}>
                        <Typography
                            sx={{ fontSize: "18px", fontWeight: "bold", textAlign: "center" }}
                        >
                            {`Cập Nhật Quán Ăn`}
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
                                        <TextField
                                            type="text"
                                            fullWidth variant="outlined"
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
                                        <TextField
                                            type="text"
                                            fullWidth variant="outlined"
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
                                        <TextField
                                            type="number"
                                            fullWidth variant="outlined"
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
                                        <TextField
                                            type="text"
                                            fullWidth variant="outlined"
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
                                        <TextField
                                            type="text"
                                            fullWidth variant="outlined"
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
                                        <TextField
                                            type="text"
                                            fullWidth variant="outlined"
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
                                        <label className="form-label">Số lượng chỗ</label>
                                        <TextField
                                            type="number"
                                            fullWidth
                                            variant="outlined"
                                            id="so_luong_cho"
                                            placeholder="Số lượng chỗ"
                                            {...register("so_luong_cho", {
                                                required: {
                                                    value: true,
                                                    message: "Số lượng chỗ không được bỏ trống",
                                                },
                                                validate: (so_luong_cho) => {
                                                    if (so_luong_cho < 0) {
                                                        return "Số lượng không hợp lệ"
                                                    }
                                                    return true
                                                }
                                            })}
                                        />

                                        {formState?.errors?.so_luong_cho && (
                                            <small className="text-danger">
                                                {formState?.errors?.so_luong_cho?.message}
                                            </small>
                                        )}
                                    </div>
                                </div>

                                <div className="col-6">
                                    <label className="form-label">Hình ảnh</label>
                                    <TextField
                                        type="file"
                                        fullWidth
                                        variant="outlined"
                                        name="images"
                                        id="images"
                                        {...register("hinh_anh", {
                                            required: {
                                                value: true,
                                                message: "Hình ảnh không được bỏ trống"
                                            }
                                        })}
                                    />
                                    {formState?.errors?.hinh_anh && (
                                        <small className="text-danger">
                                            {formState?.errors?.hinh_anh?.message}
                                        </small>
                                    )}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="mb-3">
                                        <label className="form-label">Giới thiệu</label>
                                        <Controller
                                            name="id_gioithieu"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => (
                                                <Select
                                                    {...field}
                                                    fullWidth
                                                    variant="outlined"
                                                >
                                                    <MenuItem selected value={"-1"}>
                                                        Giới thiệu
                                                    </MenuItem>
                                                    {gioithieu.map((value, index) => {
                                                        if (
                                                            value?.created_user === account?.id_nguoidung ||
                                                            value?.updated_user === account?.id_nguoidung ||
                                                            account?.vai_tro === 0
                                                        ) {
                                                            return (
                                                                <MenuItem key={value.id_gioithieu} value={value.id_gioithieu}>
                                                                    {value.gioi_thieu}
                                                                </MenuItem>
                                                            );
                                                        }
                                                        return null;
                                                    })}
                                                </Select>
                                            )}
                                            {...register("id_gioithieu", {
                                                validate: (id_gioithieu) => {
                                                    if (id_gioithieu === "-1") {
                                                        return "Giới thiệu không được bỏ trống";
                                                    }
                                                    return true;
                                                },
                                            })}
                                        />
                                        {formState?.errors?.id_gioithieu && (
                                            <small className="text-danger">
                                                {formState?.errors?.id_gioithieu?.message}
                                            </small>
                                        )}
                                    </div>
                                </div>
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
            </Card>
        </div>
    );
};

export default AddQuanAn;
