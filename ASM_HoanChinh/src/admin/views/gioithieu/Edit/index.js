import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Card,
    CardContent,
    Divider,
    Box,
    Typography,
    Button,
    FormControl,
    MenuItem,
    InputLabel,
    Select,
    Grid,
} from "@mui/material";

import { useForm, Controller } from "react-hook-form";
import { getDichvu } from "../../../../services/Dichvu";
import {
    editGioithieu,
    getBaidoxe,
    getCacDichvu,
    getGioithieuById,
    getKehoach,
    getKhachhang,
    getKhongkhi,
    getTiennghi
} from "../../../../services/Gioithieu";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from 'notistack';

const EditGioiThieu = () => {
    const navigate = useNavigate()
    const params = useParams()
    const id = params.id
    const { control, register, handleSubmit, setValue, formState: { errors }, formState } = useForm({
        defaultValues: {
            tuychondichvu: '',
            dichvu: '',
            baidoxe: '',
            khongkhi: '',
            khachhang: '',
            kehoach: '',
            tiennghi: '',
        },
    })
    const [gioithieu, setGioithieu] = useState({});
    const [dichvu, setDichvu] = useState([]);
    const [khongkhi, setKhongkhi] = useState([]);
    const [kehoach, setKehoach] = useState([]);
    const [tiennghi, setTiennghi] = useState([]);
    const [khachhang, setKhachhang] = useState([]);
    const [baidoxe, setBaidoxe] = useState([]);
    const [cacdichvu, setCacdichvu] = useState([]);
    const [account, setAccounts] = useState(null);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const accounts = JSON.parse(localStorage.getItem("accounts"));
        setAccounts(accounts);
        initData()
    }, [])

    const initData = async () => {
        const resultGioithieu = await getGioithieuById(id)
        setGioithieu(resultGioithieu.data);

        const resultDichvu = await getDichvu();
        setDichvu(resultDichvu.data)
        const selectedDichvu = resultDichvu.data.find((e) => e.id_dichvu === resultGioithieu.data.id_dichvu);
        if (selectedDichvu) {
            setValue('dichvu', selectedDichvu.id_dichvu);
        }

        const resultKhongkhi = await getKhongkhi();
        setKhongkhi(resultKhongkhi.data)
        const selectedKhongkhi = resultKhongkhi.data.find((e) => e.id_khongkhi === resultGioithieu.data.id_khongkhi);
        if (selectedKhongkhi) {
            setValue('khongkhi', selectedKhongkhi.id_khongkhi);
        }
        const resultKehoach = await getKehoach();
        setKehoach(resultKehoach.data)
        const selectedKehoach = resultKehoach.data.find((e) => e.id_kehoach === resultGioithieu.data.id_kehoach);
        if (selectedKehoach) {
            setValue('kehoach', selectedKehoach.id_kehoach);
        }
        const resultTiennghi = await getTiennghi();
        setTiennghi(resultTiennghi.data)
        const selectedTiennghi = resultTiennghi.data.find((e) => e.id_tiennghi === resultGioithieu.data.id_tiennghi);
        if (selectedTiennghi) {
            setValue('tiennghi', selectedTiennghi.id_tiennghi);
        }
        const resultKhachhang = await getKhachhang();
        setKhachhang(resultKhachhang.data)
        const selectedKhachhang = resultKhachhang.data.find((e) => e.id_loaikh === resultGioithieu.data.id_loaikh);
        if (selectedKhachhang) {
            setValue('khachhang', selectedKhachhang.id_loaikh);
        }
        const resultBaidoxe = await getBaidoxe();
        setBaidoxe(resultBaidoxe.data)
        const selectedBaidoxe = resultBaidoxe.data.find((e) => e.id_baidoxe === resultGioithieu.data.id_baidoxe);
        if (selectedBaidoxe) {
            setValue('baidoxe', selectedBaidoxe.id_baidoxe);
        }
        const resultCacdichvu = await getCacDichvu();
        setCacdichvu(resultCacdichvu.data);

        const selectedCacdichvu = resultCacdichvu.data.find((e) => e.id_cacdichvu === resultGioithieu.data.id_tuychondichvu);
        if (selectedCacdichvu) {
            setValue('tuychondichvu', selectedCacdichvu.id_cacdichvu
            );
        }
    }

    const submit = async (value) => {
        console.log("value====", value);
        try {
            await editGioithieu(id, {
                gioi_thieu: value?.gioithieu,
                id_tuychondichvu: value?.tuychondichvu,
                id_dichvu: value?.dichvu,
                id_baidoxe: value?.baidoxe,
                id_anuong: value?.anuong,
                id_khongkhi: value?.khongkhi,
                id_loaikh: value?.khachhang,
                id_kehoach: value?.kehoach,
                id_tiennghi: value?.tiennghi,
                created_user: account.id_nguoidung,
                updated_user: account.id_nguoidung
            })
            enqueueSnackbar('Cập nhật thành công!', { variant: 'success' });
            navigate("/admin/gioi-thieu");
        } catch (error) {
            enqueueSnackbar('Cập nhật thất bại!', { variant: 'error' });
        }
    }

    const handleCancle = () => {
        navigate('/admin/gioi-thieu')
    }

    return (
        <div>
            <Card variant="outlined" sx={{ p: 0, }}>
                <Box sx={{ padding: "15px 30px", }} display="flex" alignItems="center">
                    <Box flexGrow={1}>
                        <Typography sx={{ fontSize: "18px", fontWeight: "bold", }}>
                            CẬP NHẬT GIỚI THIỆU
                        </Typography>
                    </Box>
                </Box>
                <Divider />
                <CardContent sx={{ padding: "30px", }}>
                    <form>
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                {/* Các tùy chọn dịch vụ */}
                                <div className="mb-3">
                                    <label className="form-label" style={{ fontSize: "16px", fontWeight: "bold" }}>Các tùy chọn dịch vụ</label>
                                    <Grid item lg={4} md={6} sm={12}>
                                        <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
                                            <InputLabel id="service-options-label">Tùy chọn dịch vụ</InputLabel>
                                            <Controller
                                                name="tuychondichvu"
                                                control={control}
                                                rules={{ required: 'Vui lòng chọn tùy chọn dịch vụ' }}
                                                render={({ field }) => (
                                                    <Select
                                                        labelId="service-options-label"
                                                        id="service-options"
                                                        label="Tùy chọn dịch vụ"
                                                        {...field}
                                                    >
                                                        {cacdichvu.map((value, index) => {
                                                            if (
                                                                value?.created_user === account?.id_nguoidung ||
                                                                value?.updated_user === account?.id_nguoidung ||
                                                                account?.vai_tro === 0
                                                            ) {
                                                                return (
                                                                    <MenuItem key={value.id_cacdichvu} value={value.id_cacdichvu}>
                                                                        {value.tuy_chon_dv}
                                                                    </MenuItem>
                                                                );
                                                            }
                                                            return null;
                                                        })}
                                                    </Select>
                                                )}
                                            />
                                            {errors.tuychondichvu && (
                                                <small className="text-danger">
                                                    {errors.tuychondichvu.message}
                                                </small>
                                            )}
                                        </FormControl>
                                    </Grid>
                                </div>

                                {/* Dịch vụ */}
                                <div className="mb-3">
                                    <label className="form-label" style={{ fontSize: "16px", fontWeight: "bold" }}>Dịch vụ</label>
                                    <Grid item lg={4} md={6} sm={12}>
                                        <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
                                            <InputLabel id="service-options-label">Dịch vụ</InputLabel>
                                            <Controller
                                                name="dichvu"
                                                control={control}
                                                rules={{ required: 'Vui lòng chọn dịch vụ' }}
                                                render={({ field }) => (
                                                    <Select
                                                        labelId="service-options-label"
                                                        id="service-options"
                                                        label="Tùy chọn dịch vụ"
                                                        {...field}
                                                    >
                                                        {dichvu.map((value, index) => {
                                                            if (
                                                                value?.created_user === account?.id_nguoidung ||
                                                                value?.updated_user === account?.id_nguoidung ||
                                                                account?.vai_tro === 0
                                                            ) {
                                                                return (
                                                                    <MenuItem key={value.id_dichvu} value={value.id_dichvu}>
                                                                        {value.dich_vu}
                                                                    </MenuItem>
                                                                );
                                                            }
                                                            return null;
                                                        })}
                                                    </Select>
                                                )}
                                            />
                                            {errors.dichvu && (
                                                <small className="text-danger">
                                                    {errors.dichvu.message}
                                                </small>
                                            )}
                                        </FormControl>
                                    </Grid>
                                </div>

                                {/* Bãi đỗ xe */}
                                <div className="mb-3">
                                    <label className="form-label" style={{ fontSize: "16px", fontWeight: "bold" }}>Bãi đỗ xe</label>
                                    <Grid item lg={4} md={6} sm={12}>
                                        <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
                                            <InputLabel id="service-options-label">Bãi đỗ xe</InputLabel>
                                            <Controller
                                                name="baidoxe"
                                                control={control}
                                                rules={{ required: 'Vui lòng chọn bãi đỗ xe' }}
                                                render={({ field }) => (
                                                    <Select
                                                        labelId="service-options-label"
                                                        id="service-options"
                                                        label="Tùy chọn dịch vụ"
                                                        {...field}
                                                    >
                                                        {baidoxe.map((value, index) => {
                                                            if (
                                                                value?.created_user === account?.id_nguoidung ||
                                                                value?.updated_user === account?.id_nguoidung ||
                                                                account?.vai_tro === 0
                                                            ) {
                                                                return (
                                                                    <MenuItem key={value.id_baidoxe} value={value.id_baidoxe}>
                                                                        {value.bai_do_xe}
                                                                    </MenuItem>
                                                                );
                                                            }
                                                            return null;
                                                        })}
                                                    </Select>
                                                )}
                                            />
                                            {errors.baidoxe && (
                                                <small className="text-danger">
                                                    {errors.baidoxe.message}
                                                </small>
                                            )}
                                        </FormControl>
                                    </Grid>
                                </div>
                                <div className="mb-3">
                                    <div className="form-floating">
                                        <textarea className="form-control" defaultValue={gioithieu.gioi_thieu} placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: "100px" }}
                                            {
                                            ...register("gioithieu", {
                                                required: {
                                                    value: true,
                                                    message: "Nội dung giới thiệu không được bỏ trống"
                                                }
                                            })
                                            }
                                        ></textarea>
                                        <label className="form-lable"></label>
                                    </div>
                                    {formState?.errors?.gioithieu && (
                                        <small className="text-danger">
                                            {formState?.errors?.gioithieu?.message}
                                        </small>
                                    )}
                                </div>
                            </div>

                            <div className="col-lg-6 col-md-6 col-sm-12">
                                {/* Không khí */}
                                <div className="mb-3">
                                    <label className="form-label" style={{ fontSize: "16px", fontWeight: "bold" }}>Không khí</label>
                                    <Grid item lg={4} md={6} sm={12}>
                                        <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
                                            <InputLabel id="service-options-label">Không khí</InputLabel>
                                            <Controller
                                                name="khongkhi"
                                                control={control}
                                                rules={{ required: 'Vui lòng chọn không khí' }}
                                                render={({ field }) => (
                                                    <Select
                                                        labelId="service-options-label"
                                                        id="service-options"
                                                        label="Tùy chọn dịch vụ"
                                                        {...field}
                                                    >
                                                        {khongkhi.map((value, index) => {
                                                            if (
                                                                value?.created_user === account?.id_nguoidung ||
                                                                value?.updated_user === account?.id_nguoidung ||
                                                                account?.vai_tro === 0
                                                            ) {
                                                                return (
                                                                    <MenuItem key={value.id_khongkhi} value={value.id_khongkhi}>
                                                                        {value.khong_khi}
                                                                    </MenuItem>
                                                                );
                                                            }
                                                            return null;
                                                        })}
                                                    </Select>
                                                )}
                                            />
                                            {errors.khongkhi && (
                                                <small className="text-danger">
                                                    {errors.khongkhi.message}
                                                </small>
                                            )}
                                        </FormControl>
                                    </Grid>
                                </div>

                                {/* Khách hàng */}
                                <div className="mb-3">
                                    <label className="form-label" style={{ fontSize: "16px", fontWeight: "bold" }}>Khách hàng</label>
                                    <Grid item lg={4} md={6} sm={12}>
                                        <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
                                            <InputLabel id="service-options-label">Khách hàng</InputLabel>
                                            <Controller
                                                name="khachhang"
                                                control={control}
                                                rules={{ required: 'Vui lòng chọn khách hàng' }}
                                                render={({ field }) => (
                                                    <Select
                                                        labelId="service-options-label"
                                                        id="service-options"
                                                        label="Tùy chọn dịch vụ"
                                                        {...field}
                                                    >
                                                        {khachhang.map((value, index) => {
                                                            if (
                                                                value?.created_user === account?.id_nguoidung ||
                                                                value?.updated_user === account?.id_nguoidung ||
                                                                account?.vai_tro === 0
                                                            ) {
                                                                return (
                                                                    <MenuItem key={value.id_loaikh} value={value.id_loaikh}>
                                                                        {value.khach_hang}
                                                                    </MenuItem>
                                                                );
                                                            }
                                                            return null;
                                                        })}
                                                    </Select>
                                                )}
                                            />
                                            {errors.khachhang && (
                                                <small className="text-danger">
                                                    {errors.khachhang.message}
                                                </small>
                                            )}
                                        </FormControl>
                                    </Grid>
                                </div>

                                {/* Kế hoạch */}
                                <div className="mb-3">
                                    <label className="form-label" style={{ fontSize: "16px", fontWeight: "bold" }}>Kế hoạch</label>
                                    <Grid item lg={4} md={6} sm={12}>
                                        <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
                                            <InputLabel id="service-options-label">Kế hoạch</InputLabel>
                                            <Controller
                                                name="kehoach"
                                                control={control}
                                                rules={{ required: 'Vui lòng chọn kế hoạch' }}
                                                render={({ field }) => (
                                                    <Select
                                                        labelId="service-options-label"
                                                        id="service-options"
                                                        label="Tùy chọn dịch vụ"
                                                        {...field}
                                                    >
                                                        {kehoach.map((value, index) => {
                                                            if (
                                                                value?.created_user === account?.id_nguoidung ||
                                                                value?.updated_user === account?.id_nguoidung ||
                                                                account?.vai_tro === 0
                                                            ) {
                                                                return (
                                                                    <MenuItem key={value.id_kehoach} value={value.id_kehoach}>
                                                                        {value.ke_hoach}
                                                                    </MenuItem>
                                                                );
                                                            }
                                                            return null;
                                                        })}
                                                    </Select>
                                                )}
                                            />
                                            {errors.kehoach && (
                                                <small className="text-danger">
                                                    {errors.kehoach.message}
                                                </small>
                                            )}
                                        </FormControl>
                                    </Grid>
                                </div>

                                {/* Tiện nghi */}
                                <div className="mb-3">
                                    <label className="form-label" style={{ fontSize: "16px", fontWeight: "bold" }}>Tiện nghi</label>
                                    <Grid item lg={4} md={6} sm={12}>
                                        <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
                                            <InputLabel id="service-options-label">Tiện nghi</InputLabel>
                                            <Controller
                                                name="tiennghi"
                                                control={control}
                                                rules={{ required: 'Vui lòng chọn tiện nghi' }}
                                                render={({ field }) => (
                                                    <Select
                                                        labelId="service-options-label"
                                                        id="service-options"
                                                        label="Tùy chọn dịch vụ"
                                                        {...field}
                                                    >
                                                        {tiennghi.map((value, index) => {
                                                            if (
                                                                value?.created_user === account?.id_nguoidung ||
                                                                value?.updated_user === account?.id_nguoidung ||
                                                                account?.vai_tro === 0
                                                            ) {
                                                                return (
                                                                    <MenuItem key={value.id_tiennghi} value={value.id_tiennghi}>
                                                                        {value.tien_nghi}
                                                                    </MenuItem>
                                                                );
                                                            }
                                                            return null;
                                                        })}
                                                    </Select>
                                                )}
                                            />
                                            {errors.tiennghi && (
                                                <small className="text-danger">
                                                    {errors.tiennghi.message}
                                                </small>
                                            )}
                                        </FormControl>
                                    </Grid>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Button color="primary" variant="contained" onClick={handleSubmit(submit)} style={{ width: "100px" }}>
                                Sửa
                            </Button>
                            <Button color="error" variant="contained" onClick={handleCancle} style={{ color: "white", width: "100px", marginLeft: "10px" }}>
                                Hủy
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default EditGioiThieu;
