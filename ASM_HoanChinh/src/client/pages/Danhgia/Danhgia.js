import React, { useEffect, useState } from "react";
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


import { set, useForm } from "react-hook-form";
import { addDanhgia } from "../../../services/Danhgia";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { getQuananById } from "../../../services/Quanan";
import { useCookies } from "react-cookie";
import { getDatcho } from "../../../services/Datcho";

const Danhgia = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState } = useForm()
    const params = useParams()
    const id = params.id
    const [quanan, setQuanan] = useState([])
    const [datcho, setDatcho] = useState([]);
    const [luot, setLuot] = useState(0)
    const accounts = JSON.parse(localStorage.getItem("accounts"))

    useEffect(() => {
        initData();
        //checkLuot()
    }, [])

    const initData = async () => {
        const resultQa = await getQuananById(id)
        setQuanan(resultQa?.data)

        const resultDc = await getDatcho()
        setDatcho(resultDc?.data)

        let count = 0;
        resultDc.data.forEach((value) => {
            if (value?.id_nguoidung === accounts?.id_nguoidung && value?.id_quanan === resultQa?.data?.id_quanan && value?.trang_thai != 2) {
                count = count + 1;
            }
        });
        setLuot(count);
    }


    const [rating, setRating] = useState(0);
    const [serviceRating, setServiceRating] = useState(0); // Đánh giá dịch vụ
    const [foodRating, setFoodRating] = useState(0); // Đánh giá đồ ăn
    const [atmosphereRating, setAtmosphereRating] = useState(0); // Đánh giá không khí

    const handleClick = (index) => {
        setRating(index + 1);
    };

    const formatPhoneNumber = (phoneNumber) => {
        // Loại bỏ tất cả các ký tự không phải số
        const cleaned = ('' + phoneNumber).replace(/\D/g, '');

        // Kiểm tra độ dài của số điện thoại
        if (cleaned.length < 4) {
            return cleaned; // Nếu số điện thoại ngắn hơn 4 ký tự, trả về như hiện tại
        }

        // Chia số điện thoại thành 4 ký tự đầu và phần còn lại
        const firstPart = cleaned.slice(0, 4); // 4 số đầu
        const secondPart = cleaned.slice(4); // Phần còn lại

        // Kết hợp với khoảng cách giữa các số
        return secondPart.replace(/(\d{3})(?=\d)/g, '$1 ').trim(); // Cách ở mỗi nhóm 3 số
    }
    const handleServiceRating = (value) => {
        setServiceRating(value);
    }

    const handleFoodRating = (value) => {
        setFoodRating(value);
    }

    const handleAtmosphereRating = (value) => {
        setAtmosphereRating(value);
    }


    const submit = async (value) => {
        await addDanhgia({
            binh_luan: value?.noi_dung,
            danh_gia_dich_vu: serviceRating,
            danh_gia_do_an: foodRating,
            danh_gia_khong_khi: atmosphereRating,
            sao: rating,
            hinh_anh: value?.danh_gia_hinh_anh[0],
            id_nguoidung: accounts?.id_nguoidung,
            id_quanan: quanan?.id_quanan
        })
        navigate(`/chi-tiet/${quanan.id_quanan}`)
    }
    const [cookies, setCookie, removeCookie] = useCookies(["token", "role"]);

    useEffect(() => {
        getUserInfo();
    }, [cookies]);

    const getUserInfo = async () => {
        const accounts = JSON.parse(localStorage.getItem("accounts"))

        if (accounts?.vai_tro !== cookies.vai_tro) {
            setCookie("role", accounts?.vai_tro);
        }
    };
    return cookies?.token && cookies?.role === 1 ? (
        <>

            <div className="container-fluid contact py-3 wow " data-wow-delay="0.1s">
                <div className="container">
                    <div className="p-5 bg-light rounded contact-form">
                        <div className="row g-4">
                            <div className="col-12">
                                <Link to={`/chi-tiet/${quanan.id_quanan}`}><small className="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3"><ArrowBackIcon /> Quay lại</small></Link>
                            </div>
                            {
                                luot > 0 ?
                                    <>
                                        <h1 className="display-5 mb-0">Hãy cho chúng tôi biết đánh giá của bạn về quán ăn: {quanan?.ten_quan_an}
                                        </h1>
                                        <div className="col-md-6 col-lg-7 mb-4">
                                            <div className="text-dark mb-2" style={{ fontSize: '25px', fontWeight: 'bold' }}>
                                                Đánh giá quán ăn?
                                                <div>
                                                    {[...Array(5)].map((_, index) => (
                                                        <span key={index} onClick={() => handleClick(index)}>
                                                            {index < rating ? (
                                                                <StarIcon style={{ fontSize: '50px', color: '#d4a762' }} />
                                                            ) : (
                                                                <StarOutlineIcon style={{ fontSize: '50px' }} />
                                                            )}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="text-dark mb-4 mt-3" style={{ fontSize: '25px', fontWeight: 'bold' }}>
                                                Đánh giá khác?
                                            </div>
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="mb-2">
                                                        <label className="form-label text-dark">Đánh giá dịch vụ</label>
                                                        <div>
                                                            {[...Array(5)].map((_, index) => (
                                                                <span key={index} onClick={() => handleServiceRating(index + 1)}>
                                                                    {index < serviceRating ? (
                                                                        <StarIcon style={{ fontSize: '50px', color: '#d4a762' }} />
                                                                    ) : (
                                                                        <StarOutlineIcon style={{ fontSize: '50px' }} />
                                                                    )}
                                                                </span>
                                                            ))}
                                                        </div>
                                                        {/* Hiển thị thông báo lỗi nếu cần */}
                                                        {formState?.errors?.danh_gia_dv && (
                                                            <small className="text-danger">
                                                                {formState?.errors?.danh_gia_dv?.message}
                                                            </small>
                                                        )}
                                                    </div>
                                                    <div className="mb-2">
                                                        <label className="form-label text-dark">Đánh giá đồ ăn</label>
                                                        <div>
                                                            {[...Array(5)].map((_, index) => (
                                                                <span key={index} onClick={() => handleFoodRating(index + 1)}>
                                                                    {index < foodRating ? (
                                                                        <StarIcon style={{ fontSize: '50px', color: '#d4a762' }} />
                                                                    ) : (
                                                                        <StarOutlineIcon style={{ fontSize: '50px' }} />
                                                                    )}
                                                                </span>
                                                            ))}
                                                        </div>
                                                        {/* Hiển thị thông báo lỗi nếu cần */}
                                                        {formState?.errors?.danh_gia_do_an && (
                                                            <small className="text-danger">
                                                                {formState?.errors?.danh_gia_do_an?.message}
                                                            </small>
                                                        )}
                                                    </div>
                                                    <div className="mb-2">
                                                        <label className="form-label text-dark">Đánh giá không khí</label>
                                                        <div>
                                                            {[...Array(5)].map((_, index) => (
                                                                <span key={index} onClick={() => handleAtmosphereRating(index + 1)}>
                                                                    {index < atmosphereRating ? (
                                                                        <StarIcon style={{ fontSize: '50px', color: '#d4a762' }} />
                                                                    ) : (
                                                                        <StarOutlineIcon style={{ fontSize: '50px' }} />
                                                                    )}
                                                                </span>
                                                            ))}
                                                        </div>
                                                        {/* Hiển thị thông báo lỗi nếu cần */}
                                                        {formState?.errors?.danh_gia_khong_khi && (
                                                            <small className="text-danger">
                                                                {formState?.errors?.danh_gia_khong_khi?.message}
                                                            </small>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-lable text-dark" style={{ fontSize: '25px', fontWeight: 'bold' }}>Nội dung đánh giá</label>
                                                <textarea className="w-100 form-control mb-4 p-3 border-primary bg-light text-dark" rows="4" cols="10" placeholder="Your Message"
                                                          {...register("noi_dung", {
                                                              required: {
                                                                  value: true,
                                                                  message: "Nội dung không được bỏ trống"
                                                              }
                                                          })}
                                                ></textarea>
                                                {formState?.errors?.noi_dung && (
                                                    <small className="text-danger">
                                                        {formState?.errors?.noi_dung?.message}
                                                    </small>
                                                )}
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-lable text-dark" style={{ fontSize: '25px', fontWeight: 'bold' }}>Một số hình ảnh</label>
                                                <input className="form-control form-control-lg mb-4 p-3 border-primary bg-light" id="formFileLg" type="file"{...register("danh_gia_hinh_anh", {
                                                    required: {
                                                        value: true,
                                                        message: "Hình ảnh không được bỏ trống"
                                                    }
                                                })} />
                                                {formState?.errors?.danh_gia_hinh_anh && (
                                                    <small className="text-danger">
                                                        {formState?.errors?.danh_gia_hinh_anh?.message}
                                                    </small>
                                                )}
                                            </div>

                                            <button className="w-100 btn btn-primary form-control p-3 border-primary bg-primary rounded-pill mt-5" type="submit" onClick={handleSubmit(submit)}>Gửi đánh giá</button>
                                        </div>
                                    </>

                                    : <div className="col-md-6 col-lg-7 mb-4">
                                        <h1>Bạn chưa sử dụng dịch vụ hoặc chưa đặt chỗ tại quán sẽ không thể đánh giá. Xin hãy quay lại !</h1>
                                    </div>
                            }
                            <div className="col-md-6 col-lg-5">
                                <div>
                                    <div className="d-inline-flex w-100 border border-primary p-4 rounded mb-4">
                                        <i className="fas fa-map-marker-alt fa-2x text-primary me-4"></i>
                                        <div className="">
                                            <h4>Địa chỉ</h4>
                                            <p>{quanan?.dia_chi}</p>
                                        </div>
                                    </div>
                                    <div className="d-inline-flex w-100 border border-primary p-4 rounded">
                                        <i className="fa fa-phone-alt fa-2x text-primary me-4"></i>
                                        <div className="">
                                            <h4>Số điện thoại</h4>
                                            <p className="mb-2">{quanan?.dien_thoai ? `${quanan.dien_thoai.slice(0, 4)} ${formatPhoneNumber(quanan.dien_thoai.slice(0))}` : "Không có số điện thoại"}</p>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </>

    ) : <Navigate to={"/login"} />
}

export default Danhgia