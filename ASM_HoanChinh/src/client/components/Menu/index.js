import React, { useEffect, useState } from "react";
import { TableRow } from "@mui/material";
import './style.css'

import { getMenus, paginator } from "../../../services/MenuPhu";
import { BASE_URL } from "../../../config/ApiConfig";
import { getDanhmuc } from "../../../services/Danhmuc";
import { getQuanan, getQuananById } from "../../../services/Quanan";
import { Link } from "react-router-dom";
import PaginationRounded from "../../../admin/components/Paginator";
import { getAllDanhmuc } from "../../../services/Alldanhmuc";

const Menu = () => {
    const [alldanhmuc, setAllDanhmuc] = useState([]);
    const [danhmuc, setDanhmuc] = useState([]);
    const [menu, setMenus] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [error, setError] = useState(null);
    const [quanan, setQuanan] = useState([]);
    const [isAllSelected, setIsAllSelected] = useState(false);
    const [subCategories, setSubCategories] = useState([]);
    const [showPagination, setShowPagination] = useState(true);


    const initQuanan = async () => {
        const res = await getQuanan();
        setQuanan(res.data);
    };

    const initDanhmuc = async () => {
        const res = await getDanhmuc();
        if (res && res.data) {
            setDanhmuc(res.data);
        } else {
            setError("Failed to load categories");
        }
    };

    const initPage = async (data) => {
        try {
            setMenus(data.data);
        } catch (error) {
            setError("Failed to load menus");
        }
    };
    const AllMenu = async () => {
        const res = await paginator(1);
        setMenus(res.data);
    };

    const initData = async () => {
        if (!selectedSubCategory) {
            setMenus([]);
            return;
        }
        try {
            const result = await getMenus();
            const filteredMenus = result.data.filter(item => item.id_danhmuc === selectedSubCategory);
            setMenus(filteredMenus);
        } catch (error) {
            setError("Failed to load menus");
        }
    };


    const initAllDanhmuc = async () => {
        const res = await getAllDanhmuc();
        if (res && res.data) {
            setAllDanhmuc(res.data);
        } else {
            setError("Failed to load categories");
        }

    };
    useEffect(() => {
        initData();
        initAllDanhmuc();
        initDanhmuc();
        AllMenu();
        initQuanan();
    }, []);

    const handleCategoryClick = (categoryId) => {
        if (categoryId === null) {
            setIsAllSelected(true);
            setSelectedCategory(null);
            setSelectedSubCategory(null);
            setMenus([]);
            AllMenu();
            setShowPagination(true); 
        } else {
            setIsAllSelected(false);
            setSelectedCategory(categoryId);
            setSelectedSubCategory(null);
            const filteredSubCategories = danhmuc.filter(cat => cat.id_alldanhmuc === categoryId);
            setSubCategories(filteredSubCategories);
            setShowPagination(false); 
        }
    };
    const handleSubCategoryClick = async (subCategoryId) => {
        setSelectedSubCategory(subCategoryId);
        try {
            const result = await getMenus();
            const filteredMenus = result.data.filter(item => item.id_danhmuc === subCategoryId);
            setMenus(filteredMenus);
        } catch (error) {
            setError("Failed to load menus");
        }
    };




    if (error) return <p>{error}</p>;

    const formatPrice = (price) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price);
    };

    const checkDanhmuc = (id) => {
        try {
            let count = 0;
            if (!Array.isArray(alldanhmuc)) {
                return;
            }
            danhmuc.forEach(muc => {
                if (id === muc.id_alldanhmuc) {
                    count++;
                }
            });
            return count
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };


    return (
        <div className="tab-class text-center">
            <div className="container">
                <div className="text-center wow " data-wow-delay="0.1s">
                    <h1 className="display-5 mb-5">Menu</h1>
                </div>
                <div className="tab-class text-center">
                    <ul className="nav nav-pills d-inline-flex justify-content-center mb-5 wow" data-wow-delay="0.1s">

                        <li className="nav-item p-2">
                            <button
                                className={`d-flex mx-2 py-2 border border-primary rounded-pill ${isAllSelected ? 'bg-primary' : 'bg-light'}`}
                                onClick={() => handleCategoryClick(null)}
                            >
                                <span className="text-dark" style={{ width: '150px', padding: '4px' }}>All</span>
                            </button>
                        </li>

                        {alldanhmuc.map((danhmuc, index) => (
                            <li key={index} className="nav-item p-2" style={{ position: 'relative' }}>
                                {checkDanhmuc(danhmuc.id_alldanhmuc) ? (
                                    <a
                                        className={`d-flex align-items-center justify-content-between mx-2 py-2 border border-primary bg-light rounded-pill ${selectedCategory === danhmuc.id_alldanhmuc ? 'active' : ''}`}
                                        onClick={() => { handleCategoryClick(danhmuc.id_alldanhmuc); }}
                                        style={{
                                            width: '220px',
                                            padding: '10px 20px',
                                            height: '50px',
                                            textDecoration: 'none',
                                            color: '#333',
                                            transition: 'all 0.3s ease',
                                        }}
                                    >
                                        <span className="text-dark" style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {danhmuc.ten_danhmuc}
                                            {quanan && quanan.length > 0 && (
                                                <span className="ml-2 text-dark" style={{ fontWeight: 'bold' }}>
                                                    - {quanan.find(q => q.created_user === danhmuc.created_user)?.ten_quan_an}
                                                </span>
                                            )}
                                        </span>
                                    </a>
                                ) : null}
                                {selectedCategory === danhmuc.id_alldanhmuc && subCategories.length > 0 && (
                                    <ul className="dropdown-menu2">
                                        {subCategories.map((subCategory, subIndex) => (
                                            <li key={subIndex} className="dropdown-item2" onClick={() => handleSubCategoryClick(subCategory.id_danhmuc)}>
                                                {subCategory.danh_muc}
                                            </li>
                                        ))}
                                    </ul>
                                )}
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
                                {menu.length > 0 && (
                                    <div className="row" style={{ marginLeft: '25px' }}>
                                        {menu.map((menuItem, index) => (
                                            <div key={index} className="col-lg-4 col-md-4 wow mb-2" data-wow-delay="0.1s">
                                                <div className="event-img position-relative d-flex align-items-start" style={{ paddingTop: '20px' }}>
                                                    <Link to={`/chi-tiet/${menuItem.id_quanan}`}>
                                                        {menuItem.hinh_anh && (
                                                            <img
                                                                src={`${BASE_URL}/uploads/${menuItem.hinh_anh}`}
                                                                className="rounded w-80 h-80 me-3"
                                                                alt=""
                                                                style={{ width: "150px", height: "100px" }}
                                                            />
                                                        )}
                                                    </Link>
                                                    <div className="d-flex flex-column justify-content-between" style={{ height: '100%' }}>
                                                        <h5 className="mb-1 text-start" style={{
                                                            whiteSpace: "nowrap",
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis",
                                                            width: "150px",
                                                        }}>
                                                            {menuItem.ten_menu}
                                                        </h5>
                                                        <div className="d-flex flex-column mb-0">
                                                            <p className="mb-0 text-start">Giá: {formatPrice(menuItem.gia)}</p>
                                                            <p className="mb-0 text-dark text-start">
                                                                Quán: {quanan.find(value => value.id_quanan === menuItem.id_quanan)?.ten_quan_an || ''}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {showPagination && (
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
                                                },
                                            },
                                        }}
                                    >
                                        <PaginationRounded
                                            onDataChange={initPage}
                                            paginator={paginator}
                                        />
                                    </TableRow>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Menu;
