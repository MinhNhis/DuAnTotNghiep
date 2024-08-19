import React, { useEffect, useState } from "react";


import { editDatcho, getDatcho } from "../../../services/Datcho";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const ChiTietDon = () => {
    const accounts = JSON.parse(localStorage.getItem("accounts"))
    const { enqueueSnackbar } = useSnackbar();
    const [dondatcho, setDon] = useState([]);
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(null)

    useEffect(() => {
        initData()
    }, [])

    const initData = async () => {
        const resultDon = await getDatcho();
        setDon(resultDon.data)
    }

    const handleClickOpen = (id) => {
        setId(id)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onHuydon = async () => {
        const datcho = dondatcho.find((e) => e.id_datcho === id)
        await editDatcho(id, {
            ten_quan: datcho?.quan_an,
            ten_kh: datcho?.khach_hang,
            sdt_kh: datcho?.sdt,
            email_kh: datcho?.email,
            thoi_gian_dat: datcho?.thoi_gian,
            so_luong_nguoi: datcho?.so_luong,
            trang_thai: 2,
            yeu_cau_khac: datcho?.yeu_cau,
            id_nguoidung: datcho?.id_nguoidung
        })
        setOpen(false);
        enqueueSnackbar("Hủy thành công!", { variant: "success" });
    };

    return (
        <>
            <div className="container-fluid py-6">
                <div className="container">
                    <div className="row g-5 align-items-center">
                        <div className="col-lg-12 wow " data-wow-delay="0.3s">
                            <small className="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">Chi Tiết</small>
                            <h3 className="display-5 mb-4">Thông Tin Đặt Chỗ</h3>
                            {
                                dondatcho.map((value, index) => {
                                    return (
                                        value?.id_nguoidung === accounts?.id_nguoidung ?
                                            <div className="mb-3" key={index}>
                                                <p className="mb-4 text-dark">
                                                    Cảm ơn bạn đã đặt chỗ tại quán {value.ten_quan} ! Dưới đây là thông tin chi tiết về đơn đặt chỗ của bạn:
                                                </p>
                                                <p className="mb-4">
                                                    <strong className="text-dark">Quán ăn:</strong> {value?.ten_quan}<br />
                                                    <strong className="text-dark">Thời gian:</strong> {value?.thoi_gian_dat.split("T")[0]}<br />
                                                    <strong className="text-dark">Số lượng khách:</strong>{value?.so_luong_nguoi}<br />
                                                    <strong className="text-dark">Yêu cầu:</strong> {value?.yeu_cau_khac} <br />
                                                    <strong className="text-dark">Trạng thái:</strong>
                                                    {value?.trang_thai === 0 ? "Đang chờ xử lý" : ""}
                                                    {value?.trang_thai === 1 ? "Đã có chỗ" : ""}
                                                    {value?.trang_thai === 2 ? "Đã hủy" : ""}
                                                </p>

                                                <Button variant="contained" color="error" style={value?.trang_thai === 2 ? { display: "none" } : { display: "flex", width: "100px" }} onClick={() => handleClickOpen(value?.id_datcho)}>
                                                    Hủy đơn
                                                </Button>

                                                <Dialog open={open} onClose={handleClose}>
                                                    <DialogTitle style={{ fontSize: "30px" }}>Xác nhận hủy đơn</DialogTitle>
                                                    <DialogContent>
                                                        <DialogContentText>
                                                            Bạn có chắc chắn muốn hủy đặt chỗ quán {value?.ten_quan} này không?
                                                        </DialogContentText>
                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button onClick={onHuydon} color="error" autoFocus>
                                                            Có
                                                        </Button>
                                                        <Button onClick={handleClose} color="primary">
                                                            Không
                                                        </Button>
                                                    </DialogActions>
                                                </Dialog>
                                                <hr />
                                            </div> : ""
                                    )
                                })
                            }

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChiTietDon;
