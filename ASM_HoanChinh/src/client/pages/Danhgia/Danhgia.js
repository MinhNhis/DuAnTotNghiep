import React, { useEffect, useState } from "react";
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSnackbar } from "notistack";

import { set, useForm } from "react-hook-form";
import { addDanhgia } from "../../../services/Danhgia";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { getQuananById } from "../../../services/Quanan";
import { useCookies } from "react-cookie";
import { getDatcho } from "../../../services/Datcho";

const Danhgia = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState } = useForm()
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams()
    const id = params.id
    const [quanan, setQuanan] = useState([])
    const [error, setError] = useState()
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
        const cleaned = ('' + phoneNumber).replace(/\D/g, '');
        if (cleaned.length < 4) {
            return cleaned;
        }
        const firstPart = cleaned.slice(0, 4);
        const secondPart = cleaned.slice(4);
        return secondPart.replace(/(\d{3})(?=\d)/g, '$1 ').trim();
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
        if (serviceRating !== 0 && foodRating !== 0 && atmosphereRating !== 0 && rating !== 0) {
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
        } else {
            enqueueSnackbar("Bạn chưa chọn đánh giá", {
                variant: "error",
              });
        }

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
                                        <h2 className="display-5 mb-0" style={{ fontSize: '35px' }}>Hãy cho chúng tôi biết đánh giá của bạn về quán ăn: {quanan?.ten_quan_an}</h2>
                                        <div className="col-md-6 col-lg-7 mb-4">
                                            <div className="text-dark mb-2" style={{ fontSize: '20px', fontWeight: 'bold' }}>
                                                Đánh giá quán ăn?
                                                <div>
                                                    {[...Array(5)].map((_, index) => (
                                                        <span key={index} onClick={() => handleClick(index)}>
                                                            {index < rating ? (
                                                                <StarIcon style={{ fontSize: '40px', color: '#d4a762' }} />
                                                            ) : (
                                                                <StarOutlineIcon style={{ fontSize: '40px' }} />
                                                            )}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            {rating === 0 && (
                                                <small className="text-danger">
                                                    {'Vui lòng chọn đánh giá'}
                                                </small>
                                            )}
                                            <div className="text-dark mb-4 mt-3" style={{ fontSize: '20px', fontWeight: 'bold' }}>
                                                Đánh giá khác?
                                            </div>
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="mb-0" style={{ display: 'flex' }}>
                                                        <label className="form-label text-dark">Đánh giá dịch vụ</label>
                                                        <div style={{ marginLeft: '50px' }}>
                                                            {[...Array(5)].map((_, index) => (
                                                                <span key={index} onClick={() => handleServiceRating(index + 1)}>
                                                                    {index < serviceRating ? (
                                                                        <StarIcon style={{ fontSize: '25px', color: '#d4a762' }} />
                                                                    ) : (
                                                                        <StarOutlineIcon style={{ fontSize: '25px' }} />
                                                                    )}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    {serviceRating === 0 && (
                                                        <small className="text-danger">
                                                            {"Vui lòng chọn đánh giá dịch vụ"}
                                                        </small>
                                                    )}
                                                    <div className="mb-0" style={{ display: 'flex' }}>
                                                        <label className="form-label text-dark">Đánh giá đồ ăn</label>
                                                        <div style={{ marginLeft: '60px' }}>
                                                            {[...Array(5)].map((_, index) => (
                                                                <span key={index} onClick={() => handleFoodRating(index + 1)}>
                                                                    {index < foodRating ? (
                                                                        <StarIcon style={{ fontSize: '25px', color: '#d4a762' }} />
                                                                    ) : (
                                                                        <StarOutlineIcon style={{ fontSize: '25px' }} />
                                                                    )}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    {foodRating === 0 && (
                                                        <small className="text-danger">
                                                            {"Vui lòng chọn đánh giá đồ ăn"}
                                                        </small>
                                                    )}
                                                    <div className="mb-0" style={{ display: 'flex' }}>
                                                        <label className="form-label text-dark">Đánh giá không khí</label>
                                                        <div style={{ marginLeft: '30px' }}>
                                                            {[...Array(5)].map((_, index) => (
                                                                <span key={index} onClick={() => handleAtmosphereRating(index + 1)}>
                                                                    {index < atmosphereRating ? (
                                                                        <StarIcon style={{ fontSize: '25px', color: '#d4a762' }} />
                                                                    ) : (
                                                                        <StarOutlineIcon style={{ fontSize: '25px' }} />
                                                                    )}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    {atmosphereRating === 0 && (
                                                        <small className="text-danger">
                                                            {"Vui lòng chọn đánh giá không khí"}
                                                        </small>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-lable text-dark" style={{ fontSize: '20px', fontWeight: 'bold' }}>Nội dung đánh giá</label>
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
                                                <label className="form-lable text-dark" style={{ fontSize: '20px', fontWeight: 'bold' }}>Một số hình ảnh</label>
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

                                            <button className="w-25 btn btn-primary form-control p-3 border-primary bg-primary rounded-pill" type="submit" onClick={handleSubmit(submit)}>Gửi đánh giá</button>
                                        </div>
                                    </>

                                    : <div className="col-md-6 col-lg-7 mb-4">
                                        <h2 className="display-5 mb-0" style={{ fontSize: '35px' }}>Bạn chưa sử dụng dịch vụ hoặc chưa đặt chỗ tại quán sẽ không thể đánh giá. Xin hãy quay lại !</h2>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>

    ) : <Navigate to={"/login"} />
}

export default Danhgia