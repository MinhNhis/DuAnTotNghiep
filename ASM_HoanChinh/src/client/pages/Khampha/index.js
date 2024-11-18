import React from "react";



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
    return (
        <>
            <div className="container-fluid bg-light py-6 my-6 mt-0 pb-4">
                <div className="container text-center animated ">
                    <h1 className="display-1 mb-4">Khám Phá Quán Ăn </h1>
                    <ol className="breadcrumb justify-content-center mb-0 animated ">
                        <li className="breadcrumb-item"><a href="/">Trang Chủ</a></li>
                        <li className="breadcrumb-item text-dark" aria-current="page">Khám Phá</li>
                    </ol>
                </div>
            </div>

            {khamPha.map((value) => (
                <div className="container py-4">
                    <div className="row g-4 align-items-center">
                        <div className="col-lg-5">
                         <img src={`/images/${value?.images}`} className="img-fluid rounded" style={{ height: "320px", width: "500px" }} alt="Giới Thiệu Nhà Hàng" />
                        </div>
                        <div className="col-lg-7">
                            <h1 className="display-5 mb-4">{value?.name}</h1>
                            <p className="mb-4">{value?.descript}</p>
                            <div className="row g-3 text-dark mb-4">
                                <div className="col-sm-6">
                                    <i className="fas fa-share text-primary me-2"></i>Giao Hàng Nhanh Và Tươi
                                </div>
                                <div className="col-sm-6">
                                    <i className="fas fa-share text-primary me-2"></i>Hỗ Trợ Khách Hàng 24/7
                                </div>
                                <div className="col-sm-6">
                                    <i className="fas fa-share text-primary me-2"></i>Tùy Chỉnh Dễ Dàng
                                </div>
                                <div className="col-sm-6">
                                    <i className="fas fa-share text-primary me-2"></i>Ưu Đãi Ngon Cho Bữa Ăn Ngon
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
