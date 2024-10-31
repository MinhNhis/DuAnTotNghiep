import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import { Card, CardContent, Divider, Box, Typography, TextField, Select, MenuItem, Button } from "@mui/material";
import { addAllDanhmuc } from "../../../../services/Alldanhmuc";

const AddAllDanhmuc = () => {
    const { register, handleSubmit, formState } = useForm();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const accounts = JSON.parse(localStorage.getItem("accounts"));
    
    const onSubmit = async (value) => {
        try {
            await addAllDanhmuc({
                ten_danhmuc: value?.danhmuc,
                created_user: accounts.id_nguoidung,
                updated_user: accounts.id_nguoidung
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
                                    {...register("danhmuc", {
                                        required: {
                                            value: true,
                                            message: "Tên danh mục không được bỏ trống",
                                        },
                                    })}
                                />
                                {formState?.errors?.danhmuc && (
                                    <small className="text-danger">
                                        {formState?.errors?.danhmuc?.message}
                                    </small>
                                )}
                            </div>


                            <div className="mb-3">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    sx={{ width: "100px", marginRight: 2 }}
                                    onClick={handleSubmit(onSubmit)}
                                >
                                    {`Add`}
                                </Button>

                                <Button
                                    sx={{ width: "100px" }}
                                    variant="contained"
                                    color="error"
                                    onClick={handleCancle}
                                >
                                    {`Cancle`}
                                </Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AddAllDanhmuc;
