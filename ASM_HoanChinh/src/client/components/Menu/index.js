
import React, { useEffect, useState } from "react";
import { TableRow } from "@mui/material";

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
    const [selectedCategoryName, setSelectedCategoryName] = useState('');

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
            setMenu(result.data.filter(item => {
                const itemName = item.ten_menu.toLowerCase();
                const categoryName = selectedCategoryName.toLowerCase();

                // Kiểm tra nếu tên món bao gồm tên danh mục hoặc nếu là đồ uống hoặc ăn vặt
                return itemName.includes(categoryName) ||
                    (selectedCategoryName === 'Đồ uống' &&
                        (itemName.includes('cà phê') ||
                            itemName.includes('nước ép') ||
                            itemName.includes('soda'))) ||
                    (selectedCategoryName === 'Ăn vặt' &&
                        (itemName.includes('xúc xích') ||
                            itemName.includes('thịt')));
            }));
        } else {
            setMenu(data.data);
        }
    };

    const handleCategoryClick = (categoryId, categoryName) => {
        if (selectedCategory === categoryId) {
            setSelectedCategory(null);
            setSelectedCategoryName('');
        } else {
            setSelectedCategory(categoryId);
            setSelectedCategoryName(categoryName);
        }
    };

    const filteredDanhmuc = Danhmuc.filter((danhmuc, index, self) =>
        index === self.findIndex((t) => (
            t.danh_muc.toLowerCase() === danhmuc.danh_muc.toLowerCase()
        ))
    );

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
                                    onClick={() => handleCategoryClick(danhmuc.id_danhmuc, danhmuc.danh_muc)} // Pass category name
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
                                    <PaginationRounded onDataChange={initData} paginator={paginator}
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

