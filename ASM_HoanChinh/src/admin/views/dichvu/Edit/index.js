import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, Divider, Box, Typography, TextField, Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { editDichvu, getDichvuById } from "../../../../services/Dichvu";
import { useSnackbar } from 'notistack';

const EditDichVu = () => {
    const { control, register, handleSubmit, setValue, formState } = useForm();
    const [dichvu, setDichvu] = useState(null);
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id;
    const { enqueueSnackbar } = useSnackbar();
    const accounts = JSON.parse(localStorage.getItem("accounts"));

    const handleCancel = () => {
        navigate('/admin/dich-vu');
    };

    useEffect(() => {
        initData();
    }, []);

    const initData = async () => {
        try {
            const result = await getDichvuById(id);
            setDichvu(result.data);
            setValue('dich_vu', result.data.dich_vu || '');
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu:', error);
        }
    };

    const submit = async (value) => {
        try {
            await editDichvu(id, {
                dich_vu: value?.dich_vu,
                created_user: accounts.id_nguoidung,
                updated_user: accounts.id_nguoidung
            });
            enqueueSnackbar('Cập nhật dịch vụ thành công!', { variant: 'success' }); 
            navigate("/admin/dich-vu");
        } catch (error) {
            enqueueSnackbar('Có lỗi xảy ra, vui lòng thử lại.', { variant: 'error' }); 
        }
    };

    return (
        <div>
            <Card variant="outlined" sx={{ p: 0 }}>
                <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
                    <Box flexGrow={1}>
                        <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
                            CẬP NHẬT DỊCH VỤ
                        </Typography>
                    </Box>
                </Box>
                <Divider />
                <CardContent sx={{ padding: "30px" }}>
                    <form onSubmit={handleSubmit(submit)}>
                        <Controller
                            name="dich_vu"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    variant="outlined"
                                    fullWidth
                                    sx={{ mb: 2 }}
                                    error={!!formState.errors.dich_vu}
                                    helperText={formState.errors.dich_vu ? formState.errors.dich_vu.message : ''}
                                />
                            )}
                            {...register("dich_vu", {
                                required: {
                                    value: true,
                                    message: "Dịch vụ không được bỏ trống"
                                }
                            })}
                        />
                        <div className="mt-3">
                            <Button style={{ width: "100px" }} color="primary" variant="contained" type="submit">
                                Sửa
                            </Button>
                            <Button style={{ width: "100px", marginLeft: "10px", color: "white" }} color="error" variant="contained" onClick={handleCancel}>
                                Hủy
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default EditDichVu;
