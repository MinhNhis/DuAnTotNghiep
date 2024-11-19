import React, {useState, useEffect} from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack';
import { editQuananMoTa, getQuanan } from "../../../../services/Quanan";

import {
  Card,
  CardContent,
  Divider,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { addDichvu } from "../../../../services/Dichvu";

const AddDichVu = () => {
  const { register, handleSubmit, formState } = useForm();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [quanan, setQuanan] = useState({})
  const [dichvu, setDichvu] = useState([])
  const [khongkhi, setKhongkhi] = useState([])
  const [kehoach, setKehoach] = useState([])
  const [baidoxe, setBaidoxe] = useState([])
  const [tiengnhi, setTiennghi] = useState([])
  const [loaikh, setLoaikh] = useState([])
  const accounts = JSON.parse(localStorage.getItem("accounts"));

  useEffect(() => {
    initData()
  }, [])

  const initData = async () => {
    const res = await getQuanan();
    const fillquan = res.data.find(
      (e) => e.created_user === accounts.id_nguoidung
    );
    setQuanan(fillquan)
    if (fillquan.dichvus) {
      const ids = fillquan.dichvus.map((e) => e.id_dichvu);
      setDichvu(ids);
    }
    if (fillquan.khongkhis) {
      const ids = fillquan.khongkhis.map((e) => e.id_khongkhi);
      setKhongkhi(ids);
    }
    if (fillquan.kehoachs) {
      const ids = fillquan.kehoachs.map((e) => e.id_kehoach);
      setKehoach(ids);
    }
    if (fillquan.baidoxes) {
      const ids = fillquan.baidoxes.map((e) => e.id_baidoxe);
      setBaidoxe(ids);
    }
    if (fillquan.loaikhs) {
      const ids = fillquan.loaikhs.map((e) => e.id_loaikh);
      setLoaikh(ids);
    }
    if (fillquan.tiengnhis) {
      const ids = fillquan.tiengnhis.map((e) => e.id_tiennghi);
      setTiennghi(ids);
    }
  }
  const submit = async (value) => {
    try {
      const res = await addDichvu({
        dich_vu: value?.dich_vu,
        created_user: accounts.id_nguoidung
      });
      const fill = res.data.id_dichvu;
      await editQuananMoTa(quanan.id_quanan, {
        khongkhiIds: khongkhi,
        dichvuIds: [...dichvu, fill],
        kehoachIds: kehoach,
        baidoxeIds: baidoxe,
        loaikhIds: loaikh,
        tiennghiIds: tiengnhi
      });
      enqueueSnackbar('Thêm dịch vụ thành công!', { variant: 'success' });
      navigate("/admin/dich-vu");
    } catch (error) {
      enqueueSnackbar('Có lỗi xảy ra, vui lòng thử lại.', { variant: 'error' });
    }
  };

  return (
    <div>
      <Card variant="outlined" sx={{ p: 0, }}>
        <Box sx={{ padding: "15px 30px", }} display="flex" alignItems="center">
          <Box flexGrow={1}>
            <Typography sx={{ fontSize: "18px", fontWeight: "bold", }}>
              THÊM DỊCH VỤ
            </Typography>
          </Box>
        </Box>
        <Divider />
        <CardContent sx={{ padding: "30px" }}>
          <form>
            <TextField id="dichvu" label="dịch vụ" variant="outlined" fullWidth sx={{ mb: 2 }} {...register('dich_vu', {
              required: {
                value: true,
                message: "Dịch vụ không được bỏ trống"
              }
            })} />
            {formState?.errors?.dich_vu && (
              <small className="text-danger">
                {formState?.errors?.dich_vu?.message}
              </small>
            )}
            <div>
              <Button style={{ width: "100px" }} color="primary" variant="contained" onClick={handleSubmit(submit)}>
                Thêm
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddDichVu;
