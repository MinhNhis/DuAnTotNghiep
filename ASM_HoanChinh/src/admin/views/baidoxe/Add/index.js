import React, {useState, useEffect} from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack'; 
import { Card, CardContent, Divider, Box, Typography, TextField, Button } from "@mui/material";
import { addbaidoxe } from "../../../../services/Baidoxe";
import { editQuananMoTa, getQuanan } from "../../../../services/Quanan";


const AddBaiDoXe = () => {
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
      const newBaidoxe = {
        bai_do_xe: value.bai_do_xe, 
        created_user: accounts.id_nguoidung
      };
     const res = await addbaidoxe(newBaidoxe);

      const fill = res.data.id_baidoxe;
      await editQuananMoTa(quanan.id_quanan, {
        khongkhiIds: khongkhi,
        dichvuIds: dichvu,
        kehoachIds: kehoach,
        baidoxeIds: [...baidoxe, fill],
        loaikhIds: loaikh,
        tiennghiIds: tiengnhi
      });
      enqueueSnackbar('Thêm bãi đỗ xe thành công!', { variant: 'success' });
      navigate("/admin/bai-do-xe"); 
    } catch (error) {
      enqueueSnackbar('Có lỗi xảy ra khi thêm bãi đỗ xe!', { variant: 'error' });
      console.error("Lỗi khi thêm Bãi Đỗ Xe:", error);
    }
  };

  return (
    <div>
      <Card variant="outlined" sx={{ p: 0 }}>
        <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
          <Box flexGrow={1}>
            <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
              THÊM DANH SÁCH BÃI ĐỖ XE
            </Typography>
          </Box>
        </Box>
        <Divider />
        <CardContent sx={{ padding: "30px" }}>
          <form onSubmit={handleSubmit(submit)}>
            <TextField
              id="bai_do_xe"
              label="Bãi Đỗ Xe"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              {...register("bai_do_xe", {
                required: {
                  value: true,
                  message: "Bãi đỗ xe không được bỏ trống",
                },
              })}
            />
            {formState?.errors?.bai_do_xe && (
              <small className="text-danger">
                {formState?.errors?.bai_do_xe?.message}
              </small>
            )}
            <div>
              <Button color="primary" variant="contained" type="submit" style={{width: "100px"}}>
                Thêm
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddBaiDoXe;
