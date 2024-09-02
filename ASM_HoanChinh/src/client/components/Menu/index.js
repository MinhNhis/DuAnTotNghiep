import React, { useEffect, useState } from "react";
import { getMenus, paginator } from "../../../services/MenuPhu";
import { BASE_URL } from "../../../config/ApiConfig";
import { getDanhmuc } from "../../../services/Danhmuc";
import { getQuanan } from "../../../services/Quanan";
import { Link } from "react-router-dom";
import PaginationRounded from "../../../admin/components/Paginator";



const Menu = () => {
    const [menu, setMenu] = useState([]);
    const [Danhmuc, setDanhmuc] = useState([]);
    const [quanan, setQuanan] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        initDanhmuc();
        //initData();
        initQuanan();
    }, []);

    useEffect(() => {
        if (selectedCategory !== null) {
            initData();
        }
    }, [selectedCategory]);

    const initQuanan = async () => {
        const res = await getQuanan();
        setQuanan(res.data)
    }

    const initDanhmuc = async () => {
        const res = await getDanhmuc();
        setDanhmuc(res.data);
    };

    const initData = async (data) => {
        const result = await getMenus();
        if (selectedCategory) {
            setMenu(result.data.filter(item => item.id_danhmuc === selectedCategory));
        } else {
            setMenu(data.data);
        }
    };

    const handleCategoryClick = (categoryId) => {
        if (selectedCategory === categoryId) {
            setSelectedCategory(null);
        } else {
            setSelectedCategory(categoryId);
        }
    };
    
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    return (
        <div className="tab-class text-center">
            <div className="container">
                <div className="text-center wow " data-wow-delay="0.1s">
                    <h1 className="display-5 mb-5">Menu</h1>
                </div>
                <div className="tab-class text-center">
                    <ul className="nav nav-pills d-inline-flex justify-content-center mb-5 wow " data-wow-delay="0.1s">
                        {Danhmuc.map((danhmuc, index) => (
                            <li key={index} className="nav-item p-2">
                                <a
                                    className={`d-flex mx-2 py-2 border border-primary bg-light rounded-pill ${selectedCategory === danhmuc.id_danhmuc ? 'active' : ''}`}
                                    onClick={() => handleCategoryClick(danhmuc.id_danhmuc)}
                                >
                                    <span className="text-dark" style={{ width: '150px' }}>{danhmuc.danh_muc}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className="tab-content">
                        <div id="tab-1" className="tab-pane fade show p-0 active">
                            <div className="row g-4">
                                {menu.map((menuItem, index) => (
                                    <div key={index} className="col-lg-3 col-md-4 wow " data-wow-delay="0.1s">
                                        <div className="event-img position-relative d-flex align-items-center">
                                            <Link to={`/chi-tiet/${menuItem.id_quanan}`}>
                                                {menuItem.hinh_anh && (
                                                    <img
                                                        src={`${BASE_URL}/uploads/${menuItem.hinh_anh}`}
                                                        className=" rounded w-80 h-80 me-3"
                                                        alt=""
                                                        style={{ width: "150px", height: "100px" }}
                                                    />
                                                )}
                                            </Link>
                                            <div className="d-flex flex-column">
                                                <h5 className="mb-1 " style={{
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    width: '150px'
                                                }}>{menuItem.ten_menu}</h5>
                                                <p className="mb-0 ">Giá: {formatPrice(menuItem.gia)}</p>
                                                <p className="mb-0 text-dark">Quán:
                                                    {
                                                        quanan.map(value => {
                                                            return (value.id_quanan === menuItem.id_quanan ? <> {value.ten_quan_an}</> : "")

                                                        })
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="mt-5 mb-3" style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                                    <PaginationRounded onDataChange={initData} paginator={paginator} />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Menu;
