import request from "../../config/ApiConfig";

const getThanhtoan = async () => {
    const res = await request({
        method: "GET",
        path: "/api/thanh-toan"
    });

    return res
}

const getThanhtoanById = async (id) => {
    const res = await request({
        method: "GET",
        path: `/api/thanh-toan/${id}`
    });

    return res
}

const addThanhtoan = async ({ ma_don, tong_tien, noi_dung, trang_thai, thoi_gian, ma_giao_dich, id_nguoidung }) => {

    const res = await request({
        method: "POST",
        path: "api/thanh-toan",
        data: {
            ma_don: ma_don,
            tong_tien: tong_tien,
            noi_dung: noi_dung,
            trang_thai: trang_thai,
            thoi_gian: thoi_gian,
            ma_giao_dich: ma_giao_dich,
            id_nguoidung: id_nguoidung
        }
    })

    return res
}

const updateThanhtoan = async (id, { ma_don, tong_tien, noi_dung, trang_thai, thoi_gian, ma_giao_dich, id_nguoidung }) => {

    const res = await request({
        method: "PUT",
        path: `api/thanh-toan/${id}`,
        data: {
            ma_don: ma_don,
            tong_tien: tong_tien,
            noi_dung: noi_dung,
            trang_thai: trang_thai,
            thoi_gian: thoi_gian,
            ma_giao_dich: ma_giao_dich,
            id_nguoidung: id_nguoidung
        }
    })

    return res
}

const addMomo = async ({amount, orderInfo}) => {
    const res = await request({
        method: "POST",
        path: "api/payment",
        data: {
            amount: amount,
            orderInfo: orderInfo,
        }
    })
    return res
}

const checkStatus = async ({orderId}) => {
    const res = await request({
        method: "POST",
        path: "api/check-status",
        data: {
            orderId: orderId,
        }
    })
    return res
}

const sendMail = async ({orderId, transId, name, amount, email}) => {
    const res = await request({
        method: "POST",
        path: "/api/callback",
        data: {
            orderId: orderId,
            transId: transId,
            name: name,
            amount: amount,
            email: email,
        }
    })
    return res
}

export { getThanhtoan, getThanhtoanById, addThanhtoan, addMomo, checkStatus, updateThanhtoan, sendMail}