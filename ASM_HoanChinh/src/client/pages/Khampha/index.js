import React, { useState, useEffect } from 'react';
import { baiviet } from '../../../services/Baiviet'; // Thay thế bằng đường dẫn đến service của bạn
import { BASE_URL } from '../../../config/ApiConfig';

const KhamPha = () => {
    const [quanAn, setQuanAn] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await
                    baiviet();
                setQuanAn(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const capitalizeFirstLetter = (string) => {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
        <div className="container-fluid bg-light py-6 my-6 mt-0 pb-4">
            {/* ... phần header */}
            {isLoading ? (
                <div>Đang tải dữ liệu...</div>
            ) : error ? (
                <div>Có lỗi xảy ra: {error}</div>
            ) : (
                <div>
                    {quanAn.map((value) => (
                        <div className="container py-4" key={value.id}> {/* Make sure to provide a unique key */}
                            <div className="row g-4 align-items-center">
                                <div className="col-lg-5">
                                    <img src={`${BASE_URL}/uploads/${value?.hinh_anh}`} className="img-fluid rounded" style={{ height: "320px", width: "500px" }} alt="Giới Thiệu Nhà Hàng" />
                                </div>
                                <div className="col-lg-7">
                                    <h2 className="display-5 mb-2" style={{ color: '#D4A762',}}>{value?.tieu_de}</h2>
                                    <p className="mb-3">Cập nhật lần cuối: {value.ngay_dang}</p>
                                    <p className="mb-3 "  style={{fontSize : '20px', color:'black', textIndent: '20px'}}>
                                        <p dangerouslySetInnerHTML={{ __html: capitalizeFirstLetter(value?.noi_dung) }}></p>
                                        <p className=''> Tác giả: {value.created_user === 2 ?"FoodSeeker": ""}</p>
                                    </p>
                                </div>
                            </div>
                            <hr />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default KhamPha;