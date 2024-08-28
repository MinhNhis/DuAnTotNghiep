import React, { useEffect, useState } from "react";


import { Link, useParams } from "react-router-dom";
import { getQuananById } from "../../../services/Quanan";
import { BASE_URL } from "../../../config/ApiConfig";
import { getAnuong, getBaidoxe, getCacDichvu, getGioithieu, getKehoach, getKhongkhi, getTiennghi } from "../../../services/Gioithieu";
import { getDichvu } from "../../../services/Dichvu";
import { getLKH } from "../../../services/Khachhang";
import { getDanhgia } from "../../../services/Danhgia";
import { getNguoiDung } from "../../../services/Nguoidung";
import { getMenus } from "../../../services/MenuPhu";

const Gioithieu = () => {
    const params = useParams()
    const id = params.id;

    const [quanan, setQuanan] = useState({});
    const [gioithieu, setGioithieu] = useState([]);
    const [danhgia, setDanhgia] = useState([]);
    const [nguoidg, setNguoidanhgia] = useState([]);
    const [menu, setMenu] = useState([]);

    const [cacdichvu, setCacdichvu] = useState([]);
    const [dichvu, setDichvu] = useState([]);
    const [anuong, setAnuong] = useState([]);
    const [baidoxe, setBaidoxe] = useState([]);
    const [kehoach, setKehoach] = useState([]);
    const [loaikhachhang, setLoaikhachhang] = useState([]);
    const [tiennghi, setTiennghi] = useState([]);
    const [khongkhi, setKhongkhi] = useState([]);

    useEffect(() => {
        initData()
    }, [])

    const initData = async () => {
        const resultQa = await getQuananById(id)
        setQuanan(resultQa.data)

        const resultGt = await getGioithieu()
        setGioithieu(resultGt.data)

        const resultDg = await getDanhgia()
        setDanhgia(resultDg.data)

        const resultNdg = await getNguoiDung()
        setNguoidanhgia(resultNdg.data)

        const resultMenu = await getMenus()
        setMenu(resultMenu.data);

        const resultCacdv = await getCacDichvu()
        setCacdichvu(resultCacdv.data)

        const resultDv = await getDichvu()
        setDichvu(resultDv.data)

        const resultAu = await getAnuong()
        setAnuong(resultAu.data)

        const resultBdx = await getBaidoxe()
        setBaidoxe(resultBdx.data)

        const resultKh = await getKehoach()
        setKehoach(resultKh.data)

        const resultLoaikh = await getLKH()
        setLoaikhachhang(resultLoaikh.data)

        const resultTn = await getTiennghi()
        setTiennghi(resultTn.data)

        const resultKk = await getKhongkhi()
        setKhongkhi(resultKk.data)
    }

    const renderStars = (stars) => {
        return [...Array(5)].map((_, i) => (
            i < stars
                ? <i key={i} className="fas fa-star text-primary me-2"></i>
                : <i key={i} className="far fa-star text-primary me-2"></i>
        ));
    };

    return (
        <>
            {/* <Navbar /> */}
            <div className="container-fluid bg-light py-0 my-6 mt-0">
                <div className="container text-center animated bounceInDown">

                </div>
            </div>
            <div className="container-fluid py-1">
                <div className="container">
                    <div class="d-flex align-items-center justify-content-between">
                        <h5 className="display-5 mb-3" style={{ fontSize: '20px', fontWeight: 'bold' }}>{quanan.ten_quan_an}</h5>
                        <Link to={`/danh-gia/${quanan.id_quanan}`} className="d-flex align-items-center" style={{ fontSize: '20px', fontWeight: 'bold' }}>
                            <i class="bi bi-pencil-square me-2"></i>
                            Đánh giá
                        </Link>
                    </div>
                    <p className="mb-4">
                        <i className="fas fa-star text-primary me-2"></i>
                        <i className="fas fa-star text-primary me-2"></i>
                        <i className="fas fa-star text-primary me-2"></i>
                        <i className="fas fa-star text-primary me-2"></i>
                        {
                            gioithieu.map((value) => {
                                return (
                                    value.id_gioithieu === quanan.id_gioithieu ? <div className="text-dark">{value.gioi_thieu}</div> : ''
                                )
                            })
                        }
                    </p>
                    <div class="row mb-3" style={{ height: "400px" }}>
                        <div class="col-8 ">
                            <img src={`${BASE_URL}/uploads/${quanan.hinh_anh}`} className="" alt="" style={{ width: '870px', height: '400px' }} />
                        </div>
                        <div className="col-lg-3" >
                            <div className="row" >
                                {
                                    menu.map((value) => {
                                        return (
                                            value.id_quanan === quanan.id_quanan ?
                                                <div className="col-lg-6">
                                                    <img src={`${BASE_URL}/uploads/${value.hinh_anh}`} className="" alt="" style={{ width: '164px', height: '100px', paddingBottom: "1px" }} />
                                                </div>
                                                : ''
                                        )
                                    })
                                }

                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <Link to={`/dat-cho/${quanan.id_quanan}`} className=" btn btnDatcho" style={{ width: "100px", color: "white" }}>Đặt chỗ</Link>
                    </div>
                    <div className="row mb-3">
                        <div className="col-4 col-md-4">
                            <div className="card" style={{ height: '400px' }}>
                                <div className="card-body">
                                    <h4 className="mb-1" style={{ fontWeight: 'bold' }}>Xếp hạng và đánh giá</h4>
                                    <div className="row g-4 text-dark mb-5">
                                        <div className="col-sm-12">
                                            <h3>4.0
                                                <i className="fas fa-star text-primary me-2"></i>
                                                <i className="fas fa-star text-primary me-2"></i>
                                                <i className="fas fa-star text-primary me-2"></i>
                                                <i className="fas fa-star text-primary me-2"></i>
                                            </h3>
                                            <hr />
                                            <h5 className="mb-3" style={{ fontWeight: 'bold' }}>Xếp hạng</h5>
                                            <div className="row">
                                                <div className="col-6">
                                                    <p><i className="bi bi-cup-straw me-2"></i>Đồ ăn</p>
                                                    <p><i className="bi bi-shop me-2"></i>Dịch vụ</p>
                                                    <p><i className="bi bi-wind me-2"></i>Không khí</p>
                                                </div>
                                                <div className="col-6">
                                                    <p>
                                                        <i className="fas fa-star text-primary me-2"></i>
                                                        <i className="fas fa-star text-primary me-2"></i>
                                                        <i className="fas fa-star text-primary me-2"></i>
                                                        <i className="fas fa-star text-primary me-2"></i>
                                                    </p>
                                                    <p>
                                                        <i className="fas fa-star text-primary me-2"></i>
                                                        <i className="fas fa-star text-primary me-2"></i>
                                                        <i className="fas fa-star text-primary me-2"></i>
                                                        <i className="fas fa-star text-primary me-2"></i>
                                                    </p>
                                                    <p>
                                                        <i className="fas fa-star text-primary me-2"></i>
                                                        <i className="fas fa-star text-primary me-2"></i>
                                                        <i className="fas fa-star text-primary me-2"></i>
                                                        <i className="fas fa-star text-primary me-2"></i>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-4 col-md-4">
                            <div className="card" style={{ height: '400px' }}>
                                <div className="card-body">
                                    <h4 className="mb-3" style={{ fontWeight: 'bold' }}>Giới thiệu</h4>
                                    {
                                        gioithieu.map((value) => {
                                            return (
                                                value.id_gioithieu === quanan.id_gioithieu ?

                                                    <div className="row">
                                                        <div className="col-6">
                                                            <p className="mb-2 text-dark" style={{ fontWeight: 'bold' }}>Các tùy chọn dịch vụ</p>
                                                            <div className="row g-4 text-dark" style={{ whiteSpace: "nowrap" }}>
                                                                <div className="col-sm-4">

                                                                    {cacdichvu.map((cdv, index) => {
                                                                        return (
                                                                            cdv.id_cacdichvu === value.id_tuychondichvu ? <div key={index} >{cdv.tuy_chon_dv}</div> : ''
                                                                        )

                                                                    })}
                                                                </div>
                                                            </div>
                                                            <p className="mb-2 text-dark" style={{ fontWeight: 'bold' }}>Không khí</p>
                                                            <div className="row g-4 text-dark" style={{ whiteSpace: "nowrap" }}>
                                                                <div className="col-sm-4">
                                                                    {khongkhi.map((kk, index) => {
                                                                        return (
                                                                            kk.id_khongkhi === value.id_khongkhi ? <div key={index} >{kk.khong_khi}</div> : ''
                                                                        )

                                                                    })}
                                                                </div>
                                                            </div>
                                                            <p className="mb-2 text-dark" style={{ fontWeight: 'bold' }}>Dịch vụ</p>
                                                            <div className="row g-4 text-dark" style={{ whiteSpace: "nowrap" }}>
                                                                <div className="col-sm-4">
                                                                    {dichvu.map((dv, index) => {
                                                                        return (
                                                                            dv.id_dichvu === value.id_dichvu ? <div key={index} >{dv.dich_vu}</div> : ''
                                                                        )

                                                                    })}
                                                                </div>
                                                            </div>
                                                            <p className="mb-2 text-dark" style={{ fontWeight: 'bold' }}>Tiện nghi</p>
                                                            <div className="row g-4 text-dark" style={{ whiteSpace: "nowrap" }}>
                                                                <div className="col-sm-4">
                                                                    {tiennghi.map((tn, index) => {
                                                                        return (
                                                                            tn.id_tiennghi === value.id_tiennghi ? <div key={index} >{tn.tien_nghi}</div> : ''
                                                                        )

                                                                    })}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <p className="mb-2 text-dark" style={{ fontWeight: 'bold' }}>Ăn uống</p>
                                                            <div className="row g-4 text-dark" style={{ whiteSpace: "nowrap" }}>
                                                                <div className="col-sm-4">
                                                                    {anuong.map((au, index) => {
                                                                        return (
                                                                            au.id_anuong === value.id_anuong ? <div key={index} >{au.an_uong}</div> : ''
                                                                        )
                                                                    })}
                                                                </div>
                                                            </div>
                                                            <p className="mb-2 text-dark" style={{ fontWeight: 'bold' }}>Kế hoạch</p>
                                                            <div className="row g-4 text-dark" style={{ whiteSpace: "nowrap" }}>
                                                                <div className="col-sm-4">
                                                                    {kehoach.map((kh, index) => {
                                                                        return (
                                                                            kh.id_kehoach === value.id_kehoach ? <div key={index} >{kh.ke_hoach}</div> : ''
                                                                        )
                                                                    })}
                                                                </div>
                                                            </div>
                                                            <p className="mb-2 text-dark" style={{ fontWeight: 'bold' }}>Bãi đỗ xe</p>
                                                            <div className="row g-4 text-dark" style={{ whiteSpace: "nowrap" }}>
                                                                <div className="col-sm-4">
                                                                    {baidoxe.map((bdx, index) => {
                                                                        return (
                                                                            bdx.id_baidoxe === value.id_baidoxe ? <div key={index} >{bdx.bai_do_xe}</div> : ''
                                                                        )
                                                                    })}
                                                                </div>
                                                            </div>
                                                            <p className="mb-2 text-dark" style={{ fontWeight: 'bold' }}>Loại khách hàng</p>
                                                            <div className="row g-4 text-dark" style={{ whiteSpace: "nowrap" }}>
                                                                <div className="col-sm-4">
                                                                    {loaikhachhang.map((loaikh, index) => {
                                                                        return (
                                                                            loaikh.id_loaikh === value.id_loaikh ? <div key={index} >{loaikh.khach_hang}</div> : ''
                                                                        )
                                                                    })}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    : ''
                                            )
                                        })
                                    }

                                </div>
                            </div>
                        </div>
                        <div className="col-4 col-md-4">
                            <div className="card" style={{ height: '400px' }}>
                                <div className="card-body">
                                    <h4 className="mb-1" style={{ fontWeight: 'bold' }}>Thông tin liên hệ</h4>
                                    <div className="row g-4 text-dark mb-5">
                                        <div className="col-sm-12">
                                            <div className="card">
                                                <iframe title="lienhe" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22272.472046340183!2d105.72227868079713!3d10.04125830150886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0629f6de3edb7%3A0x527f09dbfb20b659!2zQ2FuIFRobywgTmluaCBLaeG7gXUsIEPhuqduIFRoxqEsIFZpZXRuYW0!5e0!3m2!1sen!2s!4v1721505909169!5m2!1sen!2s" style={{ border: 0, width: '600', height: '150px' }} />
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <i class="fas fa-map-marker-alt me-2"></i>{quanan.dia_chi}
                                        </div>
                                        <div className="col-sm-6">
                                            <i className="bi bi-phone me-2"></i>SĐT:
                                            <p>{quanan.dien_thoai}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-12">
                            <div className="card" style={{ height: '500px' }}>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4">
                                            <h4 className="mb-1" style={{ fontWeight: 'bold' }}>Đánh giá</h4>
                                        </div>
                                        <div className="col-8" >
                                            <h4 className="mb-1" style={{ fontWeight: 'bold' }}>Bài đánh giá</h4>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4" style={{ borderRight: '1px solid #000' }}>
                                            <div className="row">
                                                <div className="col-6 text-dark">
                                                    <p> Tuyệt vời</p>
                                                    <p> Rất tốt</p>
                                                    <p> Trung Bình</p>
                                                    <p> Tệ</p>
                                                    <p> Kinh khủng</p>
                                                </div>
                                                <div className="col-6">
                                                    <p>
                                                        <i className="fas fa-star text-primary me-2"></i>
                                                        <i className="fas fa-star text-primary me-2"></i>
                                                        <i className="fas fa-star text-primary me-2"></i>
                                                        <i className="fas fa-star text-primary me-2"></i>
                                                        <i className="fas fa-star text-primary me-2"></i>
                                                    </p>
                                                    <p>
                                                        <i className="fas fa-star text-primary me-2"></i>
                                                        <i className="fas fa-star text-primary me-2"></i>
                                                        <i className="fas fa-star text-primary me-2"></i>
                                                        <i className="fas fa-star text-primary me-2"></i>
                                                    </p>
                                                    <p>
                                                        <i className="fas fa-star text-primary me-2"></i>
                                                        <i className="fas fa-star text-primary me-2"></i>
                                                        <i className="fas fa-star text-primary me-2"></i>
                                                    </p>
                                                    <p>
                                                        <i className="fas fa-star text-primary me-2"></i>
                                                        <i className="fas fa-star text-primary me-2"></i>
                                                    </p>
                                                    <p>
                                                        <i className="fas fa-star text-primary me-2"></i>
                                                    </p>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="col-8" >
                                            <div className="row" style={{ maxHeight: '400px', overflowY: 'scroll' }}>
                                                {
                                                    danhgia.map((dg, index) => {
                                                        return (
                                                            dg.id_quanan === quanan.id_quanan ?
                                                                <div className="mb-1" key={index}>
                                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                        {nguoidg.map((ndg) => {
                                                                            return (
                                                                                dg.id_nguoidung === ndg.id_nguoidung ? <h5>{ndg.ten_nguoi_dung}</h5> : ''
                                                                            )
                                                                        })}
                                                                        <p style={{ marginLeft: '600px', paddingTop: '10px' }}>{dg.created_at.split('T')[0]}</p>
                                                                    </div>
                                                                    <div>
                                                                        {renderStars(dg.sao)}
                                                                    </div>
                                                                    <div className="mb-1">
                                                                        <img src={`${BASE_URL}/uploads/${dg.hinh_anh}`} alt="image" style={{ width: "150px",  borderRadius: "10px" }} />
                                                                    </div>
                                                                    <div className="text-dark">
                                                                        {dg.binh_luan}
                                                                    </div>
                                                                    <hr/>
                                                                </div>
                                                                : <div className="text-dark"></div>
                                                        )
                                                    })
                                                }
                                            </div>

                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </>
    )
}

export default Gioithieu