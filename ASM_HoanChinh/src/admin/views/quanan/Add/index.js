import React, { useEffect, useState } from "react";
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Card, CardContent, Divider, Box, Typography, TextField, Button } from "@mui/material";
import { useSnackbar } from 'notistack';
import useGeolocation from "../../../../client/components/Map/useGeolocation";

import { addQuanan } from "../../../../services/Quanan";
import { tiennghi } from "../../../../services/Tiennghi";
import { getDichvu } from "../../../../services/Dichvu";
import { khongkhi } from "../../../../services/Khongkhi";
import { kehoach } from "../../../../services/Kehoach";
import { baidoxe } from "../../../../services/Baidoxe";
import { getLKH } from "../../../../services/Khachhang";

const AddQuanAn = () => {
  const { register, handleSubmit, setValue, formState } = useForm();
  const [tiennghis, setTienNghi] = useState([]);
  const [dichvus, setDichvu] = useState([]);
  const [khongkhis, setKhongkhi] = useState([]);
  const [kehoachs, setKehoach] = useState([]);
  const [baidoxes, setBaidoxe] = useState([]);
  const [loaikh, setLoaikh] = useState([]);
  const [account, setAccounts] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const location = useGeolocation();
  const animatedComponents = makeAnimated();

  useEffect(() => {
    const accounts = JSON.parse(localStorage.getItem("accounts"));
    setAccounts(accounts);
    initData();
  }, []);

  const initData = async () => {
    const resTN = await tiennghi();
    setTienNghi(resTN.data)

    const resDv = await getDichvu();
    setDichvu(resDv.data);

    const resKK = await khongkhi();
    setKhongkhi(resKK.data);

    const resKHoach = await kehoach();
    setKehoach(resKHoach.data);

    const resBDX = await baidoxe();
    setBaidoxe(resBDX.data);

    const resLkh = await getLKH();
    setLoaikh(resLkh.data);

  };
  const checkAddressExists = async (address) => {
    if (!address) return false;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`,
        { signal: controller.signal }
      );

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        return data.length > 0;
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        console.error("Request timed out");
      } else {
        console.error("Error checking address:", error);
      }
    }
    return false;
  };

  const onSubmit = async (value) => {
    try {
      const addressExists = await checkAddressExists(value?.dia_chi);
      if (!addressExists) {
        enqueueSnackbar('Địa chỉ không tồn tại trên bản đồ!', { variant: 'error' });
        return;
      }

      await addQuanan({
        ten_quan_an: value?.ten_quan_an,
        dia_chi: value?.dia_chi,
        lat: location?.latitude,
        lng: location?.longitude,
        dien_thoai: value?.dien_thoai,
        gio_mo_cua: value?.gio_mo_cua,
        gio_dong_cua: value?.gio_dong_cua,
        link_website: value?.link_website,
        hinh_anh: value?.hinh_anh[0],
        so_luong_cho: value?.so_luong_cho,
        mo_ta: value?.mo_ta,
        link_facebook: value?.link_facebook,
        id_gioithieu: value?.id_gioithieu,
        created_user: account?.id_nguoidung,
        tiennghiIds: value?.id_tiennghi,
        dichvuIds: value?.id_dichvu,
        khongkhiIds: value?.id_khongkhi,
        kehoachIds: value?.id_kehoach,
        baidoxeIds: value?.id_baidoxe,
        loaikhIds: value?.id_loaikh,
      });

      enqueueSnackbar('Thêm quán ăn thành công!', { variant: 'success' });
      navigate("/admin/QuanAn");
    } catch (error) {
      console.error("Có lỗi xảy ra khi thêm quán ăn:", error);
      enqueueSnackbar('Có lỗi xảy ra khi thêm quán ăn!', { variant: 'error' });
    }
  };

  const handleCancle = () => {
    navigate("/admin/QuanAn");
  };

  return (
    <div>
      <Card variant="outlined" sx={{ p: 0 }}>
        <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
          <Box flexGrow={1}>
            <Typography
              sx={{ fontSize: "18px", fontWeight: "bold", textAlign: "center" }}
            >
              {`Thêm Quán Ăn`}
            </Typography>
          </Box>
        </Box>
        <Divider />
        <CardContent sx={{ padding: "30px" }}>
          <form>
            <div className="container">
              <div className="row">
                <div className="col-6">
                  <div className="mb-3">
                    <label className="form-label">Tên Quán Ăn</label>
                    <TextField
                      type="text"
                      fullWidth
                      variant="outlined"
                      id="ten_quan_an"
                      placeholder="Tên quán ăn"
                      {...register("ten_quan_an", {
                        required: {
                          value: true,
                          message: "Tên quán ăn không được bỏ trống",
                        },
                      })}
                    />

                    {formState?.errors?.ten_quan_an && (
                      <small className="text-danger">
                        {formState?.errors?.ten_quan_an?.message}
                      </small>
                    )}
                  </div>
                </div>
                <div className="col-6">
                  <div className="mb-3">
                    <label className="form-label">Địa chỉ</label>
                    <TextField
                      type="text"
                      fullWidth
                      variant="outlined"
                      min={0}
                      name="dia_chi"
                      id="dia_chi"
                      placeholder="Địa chỉ"
                      {...register("dia_chi", {
                        required: {
                          value: true,
                          message: "Địa chỉ không được bỏ trống",
                        },
                      })}
                    />

                    {formState?.errors?.dia_chi && (
                      <small className="text-danger">
                        {formState?.errors?.dia_chi?.message}
                      </small>
                    )}
                  </div>
                </div>
                <div className="col-6">
                  <div className="mb-3">
                    <label className="form-label">Số điện thoại</label>
                    <TextField
                      type="number"
                      fullWidth
                      variant="outlined"
                      min={0}
                      name="dien_thoai"
                      id="dien_thoai"
                      placeholder="Số điện thoại"
                      {...register("dien_thoai", {
                        required: {
                          value: true,
                          message: "Số điện thoại không được bỏ trống",
                        },
                        maxLength: {
                          value: 10,
                          message: "Số điện thoại không đúng định dạng"
                        }
                      })}
                    />
                    {formState?.errors?.dien_thoai && (
                      <small className="text-danger">
                        {formState?.errors?.dien_thoai?.message}
                      </small>
                    )}
                  </div>
                </div>

                <div className="col-6">
                  <div className="row">
                    <div className="col-6">
                      <div className="mb-3">
                        <label className="form-label">Giờ mở cửa</label>
                        <TextField
                          type="time"
                          fullWidth
                          variant="outlined"
                          min={0}
                          name="gio_mo_cua"
                          id="gio_mo_cua"
                          placeholder="Giờ hoạt động"
                          {...register("gio_mo_cua", {
                            required: {
                              value: true,
                              message: "Giờ hoạt động không được bỏ trống",
                            },
                          })}
                        />
                        {formState?.errors?.gio_mo_cua && (
                          <small className="text-danger">
                            {formState?.errors?.gio_mo_cua?.message}
                          </small>
                        )}
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="mb-3">
                        <label className="form-label">Giờ đóng cửa</label>
                        <TextField
                          type="time"
                          fullWidth
                          variant="outlined"
                          min={0}
                          name="gio_dong_cua"
                          id="gio_dong_cua"
                          placeholder="Giờ đóng cửa"
                          {...register("gio_dong_cua", {
                            required: {
                              value: true,
                              message: "Giờ hoạt động không được bỏ trống",
                            },
                          })}
                        />
                        {formState?.errors?.gio_dong_cua && (
                          <small className="text-danger">
                            {formState?.errors?.gio_dong_cua?.message}
                          </small>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-6">
                  <div className="mb-3">
                    <label className="form-label">Link Website</label>
                    <TextField
                      type="text"
                      fullWidth
                      variant="outlined"
                      min={0}
                      name="link_website"
                      id="link_website"
                      placeholder="Link Website"
                      {...register("link_website", {
                        required: {
                          value: true,
                          message: "Link Website không được bỏ trống",
                        },
                      })}
                    />
                    {formState?.errors?.link_website && (
                      <small className="text-danger">
                        {formState?.errors?.link_website?.message}
                      </small>
                    )}
                  </div>
                </div>

                <div className="col-6">
                  <div className="mb-3">
                    <label className="form-label">Link Facebook</label>
                    <TextField
                      type="text"
                      fullWidth
                      variant="outlined"
                      min={0}
                      name="link_facebook"
                      id="link_facebook"
                      placeholder="Link Website"
                      {...register("link_facebook", {
                        required: {
                          value: true,
                          message: "Link Facebook không được bỏ trống",
                        },
                      })}
                    />
                    {formState?.errors?.link_facebook && (
                      <small className="text-danger">
                        {formState?.errors?.link_facebook?.message}
                      </small>
                    )}
                  </div>
                </div>

                <div className="col-6">
                  <div className="mb-3">
                    <label className="form-label">Số lượng chỗ</label>
                    <TextField
                      type="number"
                      fullWidth
                      variant="outlined"
                      id="so_luong_cho"
                      placeholder="Số lượng chỗ"
                      {...register("so_luong_cho", {
                        required: {
                          value: true,
                          message: "Số lượng chỗ không được bỏ trống",
                        },
                        validate: (so_luong_cho) => {
                          if (so_luong_cho < 0) {
                            return "Số lượng không hợp lệ"
                          }
                          return true
                        }
                      })}
                    />

                    {formState?.errors?.so_luong_cho && (
                      <small className="text-danger">
                        {formState?.errors?.so_luong_cho?.message}
                      </small>
                    )}
                  </div>
                </div>

                <div className="col-6">
                  <label className="form-label">Hình ảnh</label>
                  <TextField
                    type="file"
                    fullWidth
                    variant="outlined"
                    name="images"
                    id="images"
                    {...register("hinh_anh", {
                      required: {
                        value: true,
                        message: "Hình ảnh không được bỏ trống"
                      }
                    })}
                  />
                  {formState?.errors?.hinh_anh && (
                    <small className="text-danger">
                      {formState?.errors?.hinh_anh?.message}
                    </small>
                  )}
                </div>

                <div className="col-6">
                  <div className="mb-3">
                    <label className="form-label">Tiện nghi</label>
                    <Select
                      className="select-2"
                      classNamePrefix="select"
                      isMulti
                      name="id_tiennghi"
                      closeMenuOnSelect={false}
                      options={tiennghis
                        .filter((item) =>
                          item?.created_user === account?.id_nguoidung ||
                          item?.updated_user === account?.id_nguoidung ||
                          account?.vai_tro === 0
                        )
                        .map((item) => ({
                          value: item.id_tiennghi,
                          label: item.tien_nghi,
                        }))}
                      onChange={(selectedOptions) => {
                        setValue(
                          "id_tiennghi",
                          selectedOptions ? selectedOptions.map((option) => option.value) : []
                        );
                      }}
                    />
                  </div>
                </div>

                <div className="col-6">
                  <div className="mb-3">
                    <label className="form-label">Dịch vụ</label>
                    <Select
                      className="select-2"
                      classNamePrefix="select"
                      isMulti
                      name="id_dichvu"
                      closeMenuOnSelect={false}
                      options={dichvus
                        .filter((item) =>
                          item?.created_user === account?.id_nguoidung ||
                          item?.updated_user === account?.id_nguoidung ||
                          account?.vai_tro === 0
                        )
                        .map((item) => ({
                          value: item.id_dichvu,
                          label: item.dich_vu,
                        }))}
                      onChange={(selectedOptions) => {
                        setValue(
                          "id_dichvu",
                          selectedOptions ? selectedOptions.map((option) => option.value) : []
                        );
                      }}
                    />
                  </div>
                </div>

                <div className="col-6">
                  <div className="mb-3">
                    <label className="form-label">Không khí</label>
                    <Select
                      className="select-2"
                      classNamePrefix="select"
                      isMulti
                      name="id_khongkhi"
                      closeMenuOnSelect={false}
                      options={khongkhis
                        .filter((item) =>
                          item?.created_user === account?.id_nguoidung ||
                          item?.updated_user === account?.id_nguoidung ||
                          account?.vai_tro === 0
                        )
                        .map((item) => ({
                          value: item.id_khongkhi,
                          label: item.khong_khi,
                        }))}
                      onChange={(selectedOptions) => {
                        setValue(
                          "id_khongkhi",
                          selectedOptions ? selectedOptions.map((option) => option.value) : []
                        );
                      }}
                    />
                  </div>
                </div>

                <div className="col-6">
                  <div className="mb-3">
                    <label className="form-label">Bãi đỗ xe</label>
                    <Select
                      className="select-2"
                      classNamePrefix="select"
                      isMulti
                      name="id_baidoxe"
                      closeMenuOnSelect={false}
                      options={baidoxes
                        .filter((item) =>
                          item?.created_user === account?.id_nguoidung ||
                          item?.updated_user === account?.id_nguoidung ||
                          account?.vai_tro === 0
                        )
                        .map((item) => ({
                          value: item.id_baidoxe,
                          label: item.bai_do_xe,
                        }))}
                      onChange={(selectedOptions) => {
                        setValue(
                          "id_baidoxe",
                          selectedOptions ? selectedOptions.map((option) => option.value) : []
                        );
                      }}
                    />
                  </div>
                </div>

                <div className="col-6">
                  <div className="mb-3">
                    <label className="form-label">Loại Khách hàng</label>
                    <Select
                      className="select-2"
                      classNamePrefix="select"
                      isMulti
                      name="id_loaikh"
                      closeMenuOnSelect={false}
                      options={loaikh
                        .filter((item) =>
                          item?.created_user === account?.id_nguoidung ||
                          item?.updated_user === account?.id_nguoidung ||
                          account?.vai_tro === 0
                        )
                        .map((item) => ({
                          value: item.id_loaikh,
                          label: item.khach_hang,
                        }))}
                      onChange={(selectedOptions) => {
                        setValue(
                          "id_loaikh",
                          selectedOptions ? selectedOptions.map((option) => option.value) : []
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="mb-3">
                    <label className="form-label">Kế hoạch</label>
                    <Select
                      className="select-2"
                      classNamePrefix="select"
                      isMulti
                      name="id_kehoach"
                      closeMenuOnSelect={false}
                      options={kehoachs
                        .filter((item) =>
                          item?.created_user === account?.id_nguoidung ||
                          item?.updated_user === account?.id_nguoidung ||
                          account?.vai_tro === 0
                        )
                        .map((item) => ({
                          value: item.id_kehoach,
                          label: item.ke_hoach,
                        }))}
                      onChange={(selectedOptions) => {
                        setValue(
                          "id_kehoach",
                          selectedOptions ? selectedOptions.map((option) => option.value) : []
                        );
                      }}
                    />
                  </div>
                </div>

                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label">Mô tả giới thiệu</label>
                    <TextField
                      type="text"
                      fullWidth
                      variant="outlined"
                      id="mo_ta"
                      placeholder="Mô tả giới thiệu..."
                      multiline
                      minRows={4}
                      {...register("mo_ta", {
                        required: {
                          value: true,
                          message: "Mô tả không được bỏ trống",
                        },
                      })}
                    />


                    {formState?.errors?.mo_ta && (
                      <small className="text-danger">
                        {formState?.errors?.mo_ta?.message}
                      </small>
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit(onSubmit)}
                  sx={{ width: "100px", marginRight: 2 }}
                >
                  {`Thêm`}
                </Button>

                <Button
                  type="button"
                  variant="contained"
                  color="error"
                  onClick={handleCancle}
                  sx={{ width: "100px" }}
                >
                  {`Hủy`}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddQuanAn;
