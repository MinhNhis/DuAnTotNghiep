import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Card, CardContent, Divider, Box, Typography, TextField, Button } from "@mui/material";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { getBaivietById, updatebaiviet } from "../../../../services/Baiviet";
import { useSnackbar } from 'notistack';

const UpdateBaiViet = () => {
    const params = useParams();
    const id = params.id_baiviet;
    const { register, handleSubmit, setValue, control, formState } = useForm();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    useEffect(() => {
        initData();
    }, []);

    const initData = async () => {
        const result = await getBaivietById(id);
        setValue("tieu_de", result.data.tieu_de || "");
        setValue("noi_dung", result.data.noi_dung || "");
    };

    const onSubmit = async (value) => {
        const ngayhientai = new Date().toISOString().split('T')[0];
        await updatebaiviet(id, {
            tieu_de: value?.tieu_de,
            noi_dung: value?.noi_dung,
            hinh_anh: value?.hinh_anh[0],
            ngay_dang: ngayhientai
        });
        enqueueSnackbar('Cập nhật bài viết thành công!', { variant: 'success' });
        navigate("/admin/bai-viet");
    };

    const handleCancel = () => {
        navigate("/admin/bai-viet");
    };

    return (
        <div>
            <Card variant="outlined" sx={{ p: 0 }}>
                <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
                    <Box flexGrow={1}>
                        <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
                            CẬP NHẬT BÀI VIẾT
                        </Typography>
                    </Box>
                </Box>
                <Divider />
                <CardContent sx={{ padding: "30px" }}>
                    <form>
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
                                        {...register("hinh_anh")}
                                    />
                                    {formState?.errors?.hinh_anh && (
                                        <small className="text-danger">
                                            {formState?.errors?.hinh_anh?.message}
                                        </small>
                                    )}
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="mb-5">
                                    <label htmlFor="noi_dung" className="form-label">Nội dung</label>
                                    <Controller
                                        name="noi_dung"
                                        control={control}
                                        defaultValue=""
                                        rules={{ required: { value: true, message: "Nội dung không được bỏ trống" } }}
                                        render={({ field }) => (
                                            <ReactQuill
                                                style={{
                                                    height: "120px",
                                                }}
                                                value={field.value}
                                                onChange={(content) => field.onChange(content)}
                                            />
                                        )}
                                    />
                                </div>
                                {formState?.errors?.noi_dung && (
                                        <small className="text-danger">{formState?.errors?.noi_dung?.message}</small>
                                    )}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12" style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    sx={{ width: "100px"}}
                                    onClick={handleSubmit(onSubmit)}
                                >
                                    Cập nhật
                                </Button>

                                <Button
                                    color="error"
                                    variant="contained"
                                    sx={{ width: "100px", marginRight: 115}}
                                    onClick={handleCancel}
                                >
                                    Hủy
                                </Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default UpdateBaiViet;