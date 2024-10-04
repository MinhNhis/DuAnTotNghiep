import React, { useEffect, useState } from "react";
import { TableRow } from "@mui/material";

import { getMenus, paginator } from "../../../services/MenuPhu";
import { BASE_URL } from "../../../config/ApiConfig";
import { getDanhmuc } from "../../../services/Danhmuc";
import { getQuanan } from "../../../services/Quanan";
import { Link } from "react-router-dom";
import PaginationRounded from "../../../admin/components/Paginator";

const Menu = () => {
    const [danhmuc, setDanhmuc] = useState([]);
    const [menu, setMenu] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [error, setError] = useState(null);
    const [quanan, setQuanan] = useState([]);



    const initQuanan = async () => {
        const res = await getQuanan();
        setQuanan(res.data)
    }

    const initDanhmuc = async () => {
        const res = await getDanhmuc();
        if (res && res.data) {
            setDanhmuc(res.data);
        } else {
            setError('Failed to load categories');
        }
    };

    const initPage = async (data) => {
        try {
            setMenu(data.data);
        } catch (error) {
            setError('Failed to load menus');
        }
    };



    const initData = async () => {
        try {

            const result = await getMenus();
            let filteredMenus = result.data;

            if (selectedCategory) {
                const categoryName = danhmuc.find((category) => category.id_danhmuc === selectedCategory)?.danh_muc;
                if (categoryName) {
                    filteredMenus = result.data.filter(item => {
                        const category = danhmuc.find(cat => cat.id_danhmuc === item.id_danhmuc);
                        return category && category.danh_muc.toLowerCase() === categoryName.toLowerCase();
                    });
                }
                setMenu(filteredMenus);
            }


        } catch (error) {
            setError('Failed to load menus');
        }
    };

    useEffect(() => {
        initDanhmuc();
        initQuanan();
        initData();
    }, [selectedCategory]);



    const handleCategoryClick = (categoryId) => {
        setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
    };


    const filteredDanhmuc = danhmuc.filter((danhmuc, index, self) =>
        index === self.findIndex((t) => t.danh_muc.toLowerCase() === danhmuc.danh_muc.toLowerCase())
    );

    if (error) return <p>{error}</p>;

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
                    <ul className="nav nav-pills d-inline-flex justify-content-center mb-5 wow" data-wow-delay="0.1s">
                        {filteredDanhmuc.map((danhmuc, index) => (
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
                                {selectedCategory && menu.length === 0 && (
                                    <div className="col-12 text-center">
                                        <p className="text-muted">Không có món ăn nào trong danh mục này.</p>
                                    </div>
                                )}
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
                                <TableRow
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        marginTop: "20px",
                                        button: {
                                            backgroundColor: "#d4a762",
                                            color: "#fff",
                                            borderRadius: "50%",
                                            width: "20px",
                                            height: "20px",
                                            fontSize: "0.8rem",
                                            margin: "0 5px",
                                            "&.Mui-selected": {
                                                backgroundColor: "#b0853d",
                                            }
                                        },
                                    }}
                                >
                                    <PaginationRounded onDataChange={initPage} paginator={paginator}
                                    />
                                </TableRow>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Menu;



