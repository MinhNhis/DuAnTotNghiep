import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Card, CardContent, Divider, Box, Typography } from "@mui/material";
import { useSnackbar } from 'notistack';
import { addMenu } from "../../../../services/MenuPhu";
import { getDanhmuc } from "../../../../services/Danhmuc";
import { getQuanan } from "../../../../services/Dichvu";
const AddMenu = () => {
    const { register, handleSubmit, formState } = useForm();
    const [danhmuc, setDanhmuc] = useState([]);
    const [quanan, setQuanan] = useState([]);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar(); 

    useEffect(() => {
        initData();
    }, []);

    const initData = async () => {
        const resultDanhmuc = await getDanhmuc();
        setDanhmuc(resultDanhmuc.data);

        const resultQuanan = await getQuanan();
        setQuanan(resultQuanan.data);
    };

    const onSubmit = async (value) => {
        try {
            await addMenu({
                ten_menu: value?.ten_menu,
                gia: value?.gia,
                id_danhmuc: value?.danh_muc,
                id_quanan: value?.quan_an,
                hinh_anh: value?.hinh_anh[0],
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
                                        <input
                                            type="text"
                                            className="form-control w-60"
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
                                    <div className="mn-3">
                                        <label className="form-lablr">Danh mục</label>
                                        <select className="form-select" aria-label="Default select example" {...register("danh_muc", {
                                            validate: (danh_muc) => {
                                                if (danh_muc === "-1") {
                                                    return "Danh mục không được bỏ trống";
                                                }
                                                return true;
                                            }
                                        })}>
                                            <option selected value={"-1"}>Danh mục</option>
                                            {danhmuc.map((value, index) => (
                                                <option key={index} value={value?.id_danhmuc}>{value?.danh_muc}</option>
                                            ))}
                                        </select>
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
                                        <input
                                            type="number"
                                            className="form-control w-60"
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
                                    <div className="mn-3">
                                        <label className="form-lablr">Quán ăn</label>
                                        <select className="form-select" aria-label="Default select example" {...register("quan_an", {
                                            validate: (quan_an) => {
                                                if (quan_an === "-1") {
                                                    return "Quán ăn không được bỏ trống";
                                                }
                                                return true;
                                            }
                                        })}>
                                            <option selected value={"-1"}>Quán ăn</option>
                                            {quanan.map((value, index) => (
                                                <option key={index} value={value?.id_quanan}>{value?.ten_quan_an}</option>
                                            ))}
                                        </select>
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
                                <input
                                    type="file"
                                    className="form-control"
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
                            <div className="row">
                                <button className="btn btn-primary m-lg-2" type="submit" style={{ width: "100px" }} onClick={handleSubmit(onSubmit)}>{`Thêm`} </button>
                                
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AddMenu;
