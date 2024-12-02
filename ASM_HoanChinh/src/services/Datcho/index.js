import request from "../../config/ApiConfig";

const getDatcho = async () => {
    const res = await request({
        method: "GET",
        path: "/api/dat-cho"
    });

    return res
}

const getDatchoById = async (id) => {
    const res = await request({
        method: "GET",
        path: `/api/dat-cho/${id}`
    });

    return res
}

const addDatcho = async ({ ma_don, tien_coc, ma_giao_dich, ten_quan, ten_kh, sdt_kh, email_kh, ngay_dat, thoi_gian, so_luong_nguoi, trang_thai, ly_do_huy, yeu_cau_khac, id_nguoidung, id_quanan, is_danhgia }) => {

    const res = await request({
        method: "POST",
        path: "api/dat-cho",
        data: {
            ma_don: ma_don,
            tien_coc: tien_coc,
            ma_giao_dich: ma_giao_dich,
            ten_quan: ten_quan,
            ten_kh: ten_kh,
            sdt_kh: sdt_kh,
            email_kh: email_kh,
            ngay_dat: ngay_dat,
            thoi_gian: thoi_gian,
            so_luong_nguoi: so_luong_nguoi,
            trang_thai: trang_thai,
            ly_do_huy: ly_do_huy,
            yeu_cau_khac: yeu_cau_khac,
            id_nguoidung: id_nguoidung,
            id_quanan: id_quanan,
            is_danhgia: is_danhgia

        }
    })

    return res
}

const editDatcho = async (id, { ma_don, ten_quan, ten_kh, sdt_kh, email_kh, ngay_dat, thoi_gian, so_luong_nguoi, trang_thai, ly_do_huy, yeu_cau_khac, id_nguoidung, id_quanan, is_danhgia }) => {

    const res = await request({
        method: "PUT",
        path: `api/dat-cho/${id}`,
        data: {
            ma_don: ma_don,
            ten_quan: ten_quan,
            ten_kh: ten_kh,
            sdt_kh: sdt_kh,
            email_kh: email_kh,
            ngay_dat: ngay_dat,
            thoi_gian: thoi_gian,
            so_luong_nguoi: so_luong_nguoi,
            trang_thai: trang_thai,
            ly_do_huy: ly_do_huy,
            yeu_cau_khac: yeu_cau_khac,
            id_nguoidung: id_nguoidung,
            id_quanan,
            is_danhgia: is_danhgia
        }
    })

    return res
}

const deleteDatcho = async (id) => {

    const res = await request({
        method: "DELETE",
        path: `api/dat-cho/${id}`,
        data: null
    })

    return res
}

const getQuanan = async () => {
    const res = await request({
        method: "GET",
        path: "/api/quanans"
    });

    return res
}

const getKhachhang = async () => {
    const res = await request({
        method: "GET",
        path: "/api/nguoidungs"
    });

    return res
}

const paginator = async (page) => {
    const res = await request({
        method: "GET",
        path: `/api/paginator-datcho?page=${page}&limit=8`
    })

    return res
}

const sendEmail = async (id, reason) => {

    const res = await request({
        method: "POST",
        path: `api/sendMail-dat-cho/${id}`,
        data: { reason }
    })

    return res
}

const sendEmailToQuan = async (id, id_chuquan, reason) => {

    const res = await request({
        method: "POST",
        path: `api/sendMail-dat-cho-user/${id}/${id_chuquan}`,
        data: {
            reason
        }
    })

    return res
}

const datcoc = async ({ amount, orderInfo, id_quanan }) => {
    const res = await request({
        method: "POST",
        path: "api/paymentdatcoc",
        data: {
            amount: amount,
            orderInfo: orderInfo,
            id_quanan: id_quanan
        }
    })
    return res
}

const checkStatusDatCoc = async ({orderId}) => {
    const res = await request({
        method: "POST",
        path: "api/check-status-dat-coc",
        data: {
            orderId: orderId,
        }
    })
    return res
}

export { getDatcho, getDatchoById, addDatcho, editDatcho, deleteDatcho, getQuanan, sendEmail, sendEmailToQuan, getKhachhang, paginator, datcoc }