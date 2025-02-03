import React, { useEffect, useState } from "react";
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import './index.css';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { GoogleMap, LoadScript, Marker, LoadScriptNext } from '@react-google-maps/api';
import { Card, CardContent, Divider, Box, Typography, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import { useSnackbar } from 'notistack';

import { addQuanan, getQuanan } from "../../../../services/Quanan";
import { tiennghi } from "../../../../services/Tiennghi";
import { getDichvu } from "../../../../services/Dichvu";
import { khongkhi } from "../../../../services/Khongkhi";
import { kehoach } from "../../../../services/Kehoach";
import { baidoxe } from "../../../../services/Baidoxe";
import { getLKH } from "../../../../services/Khachhang";
const mapContainerStyle = {
  width: '100%',
  height: '50vh',
};
const AddQuanAn = () => {
  const { register, handleSubmit, setValue, getValues, formState } = useForm();
  const [map, setMap] = useState(null);
  const [address, setAddress] = useState(null);
  const [quanan, setQuanan] = useState([]);
  const [tiennghis, setTienNghi] = useState([]);
  const [dichvus, setDichvu] = useState([]);
  const [khongkhis, setKhongkhi] = useState([]);
  const [kehoachs, setKehoach] = useState([]);
  const [baidoxes, setBaidoxe] = useState([]);
  const [loaikh, setLoaikh] = useState([]);
  const [account, setAccounts] = useState(null);
  const [coordinates, setCoordinates] = useState({ lat: 10.0447975, lng: 105.7475986 });
  const [openDialog, setOpenDialog] = useState(false);
  const [values, setValues] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  // const location = useGeolocation();
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

    const resQuan = await getQuanan();
    setQuanan(resQuan.data)

  };
  const checkAddressExists = async (address) => {
    if (!address) return false;
    const apiKey = 'AIzaSyBzpubjljfcqi-sdF4Ta6sOqjCljxttN38';
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`,
        { signal: controller.signal }
      );
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        if (data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry.location;
          setCoordinates({ lat, lng });
          return true;
        }
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        console.error("Lỗi Request");
      } else {
        console.error("Lỗi khi kiểm tra địa chỉ:", error);
      }
    }

    return false;
  };

  const doiToaDoThanhViTri = async (lat, lng) => {
    const apiKey = 'AIzaSyBzpubjljfcqi-sdF4Ta6sOqjCljxttN38';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === 'OK' && data.results.length > 0) {
        const address = data.results[0].formatted_address;
        console.log('Địa chỉ:', address);
        return address;
      } else {
        console.error('Không tìm thấy địa chỉ');
        return null;
      }
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
      return null;
    }
  };

  const handleMapClick = async (event) => {
    const newCoordinates = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    const address = await doiToaDoThanhViTri(newCoordinates.lat, newCoordinates.lng)
    setAddress(address)
    setCoordinates(newCoordinates);
  };
  const handleMarkerDragEnd = async (event) => {
    const newCoordinates = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    const address = await doiToaDoThanhViTri(newCoordinates.lat, newCoordinates.lng);
    setAddress(address);
    setCoordinates(newCoordinates);
  };
  const onSubmit = async (value) => {
    try {
      const addressExists = await checkAddressExists(value?.dia_chi);

      if (!addressExists) {
        enqueueSnackbar('Địa chỉ không tồn tại trên bản đồ!', { variant: 'error' });
        return;
      }
      setValues(value)
      setOpenDialog(true);
      setAddress(value.dia_chi)
      if (openDialog) {
        await addQuanan({
          ten_quan_an: value?.ten_quan_an,
          dia_chi: address,
          lat: coordinates?.lat,
          lng: coordinates?.lng,
          dien_thoai: value?.dien_thoai,
          gio_mo_cua: value?.gio_mo_cua,
          gio_dong_cua: value?.gio_dong_cua,
          link_website: value?.link_website,
          hinh_anh: value?.hinh_anh[0],
          so_luong_cho: value?.so_luong_cho,
          mo_ta: value?.mo_ta,
          is_delete: 0,
          link_facebook: value?.link_facebook,
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
      }

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
            <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
              THÊM DANH SÁCH QUÁN ĂN
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
                    <label className="form-label">
                      Tên Quán Ăn
                      <span style={{ color: 'red', marginLeft: '5px' }}>*</span>
                    </label>
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
                          item?.id_tiennghi === 27 || item.id_tiennghi === 28 ||
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
                    <label className="form-label">
                      Số điện thoại
                      <span style={{ color: 'red', marginLeft: '5px' }}>*</span>
                    </label>
                    <TextField
                      type="text"
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
                        },
                        minLength: {
                          value: 10,
                          message: "Số điện thoại không đúng định dạng"
                        },
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "Số điện thoại không đúng định dạng",
                        },
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
                  <div className="mb-3">
                    <label className="form-label">
                      Không gian
                    </label>
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
                          item?.id_khongkhi === 80 ||
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
                  <div className="row">
                    <div className="col-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Giờ mở cửa
                          <span style={{ color: 'red', marginLeft: '5px' }}>*</span>
                        </label>
                        <TextField
                          type="text"
                          fullWidth
                          variant="outlined"
                          min={0}
                          name="gio_mo_cua"
                          id="gio_mo_cua"
                          defaultValue={'00:00:00'}
                          placeholder="Giờ hoạt động"
                          {...register("gio_mo_cua", {
                            validate: (thoi_gian) => {
                              if (thoi_gian === "00:00:00") {
                                return "Thời gian không được bỏ trống";
                              }
                              const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
                              if (!timeRegex.test(thoi_gian)) {
                                return "Thời gian không đúng định dạng";
                              }
                              return true;
                            }
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
                        <label className="form-label">
                          Giờ đóng cửa
                          <span style={{ color: 'red', marginLeft: '5px' }}>*</span>
                        </label>
                        <TextField
                          type="text"
                          fullWidth
                          variant="outlined"
                          min={0}
                          name="gio_dong_cua"
                          id="gio_dong_cua"
                          defaultValue={"00:00:00"}
                          placeholder="Giờ đóng cửa"
                          {...register("gio_dong_cua", {
                            validate: (thoi_gian) => {
                              const gioMoCua = getValues("gio_mo_cua");
                              if (thoi_gian === "00:00:00") {
                                return "Thời gian không được bỏ trống";
                              }
                              const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
                              if (!timeRegex.test(thoi_gian)) {
                                return "Thời gian không đúng định dạng";
                              }
                              if (gioMoCua && new Date(`1970-01-01T${thoi_gian}`) < new Date(`1970-01-01T${gioMoCua}`)) {
                                return "Giờ đóng cửa phải lớn hơn giờ mở cửa";
                              }
                              return true;
                            }
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

                <div className="col-6" style={{ display: 'none' }}>
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
                          item?.id_baidoxe === 20 || item?.id_baidoxe === 21 || item?.id_baidoxe === 22 ||
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
                  <label className="form-label">
                    Hình ảnh
                    <span style={{ color: 'red', marginLeft: '5px' }}>*</span>
                  </label>
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
                          item?.id_dichvu === 45 || item?.id_dichvu === 46 ||
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
                    <label className="form-label">
                      Địa chỉ
                      <span style={{ color: 'red', marginLeft: '5px' }}>*</span>
                    </label>
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
                        // required: {
                        //   value: true,
                        //   message: "Link Website không được bỏ trống",
                        // },
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
                    <label className="form-label">
                      Số lượng chỗ
                      <span style={{ color: 'red', marginLeft: '5px' }}>*</span>
                    </label>
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
                        max: {
                          value: 1000,
                          message: 'Số lượng chỗ không vượt quá 1000'
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
                        // required: {
                        //   value: true,
                        //   message: "Link Facebook không được bỏ trống",
                        // },
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
                    <label className="form-label">Mô tả giới thiệu
                      <span style={{ color: 'red', marginLeft: '5px' }}>*</span>
                    </label>
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
                          item?.id_kehoach === 24 ||
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
                <div className="mb-3" style={{ display: openDialog ? 'block' : 'none' }}>
                  <p><strong>Vui lòng xác nhận vị trí !</strong></p>
                  <LoadScriptNext googleMapsApiKey="AIzaSyBzpubjljfcqi-sdF4Ta6sOqjCljxttN38">
                    <GoogleMap
                      mapContainerStyle={mapContainerStyle}
                      center={coordinates}
                      zoom={14}
                      onLoad={(mapInstance) => setMap(mapInstance)}
                      onClick={handleMapClick}
                    >
                      {quanan.map((e, index) => (
                        <Marker
                          key={index}
                          position={coordinates}
                          label={address}
                          draggable={true}
                          onDragEnd={handleMarkerDragEnd}
                        />
                      ))}
                    </GoogleMap>
                  </LoadScriptNext>
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