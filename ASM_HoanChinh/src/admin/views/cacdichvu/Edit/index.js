import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSnackbar } from 'notistack';

import {
  Card,
  CardContent,
  Divider,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { editCDV, getCDVById } from "../../../../services/Cacdichvu";

const EditCDV = () => {
  const { control, register, handleSubmit, setValue, formState } = useForm();
  const [CDV, setCDV] = useState(null);
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    try {
      const result = await getCDVById(id);
      setCDV(result.data);
      setValue("cacdichvu", result.data.tuy_chon_dv || "");
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  const submit = async (value) => {
    try {
      await editCDV(id, {
        tuy_chon_dv: value?.cacdichvu,
      });
      enqueueSnackbar('Sửa dịch vụ thành công!', { variant: 'success' });
      navigate("/admin/cac-dich-vu");
    } catch (error) {
      enqueueSnackbar('Có lỗi xảy ra khi sửa dịch vụ!', { variant: 'error' });
      console.error('Lỗi khi sửa dịch vụ:', error);
    }
  };

  return (
    <div>
      <Card variant="outlined" sx={{ p: 0 }}>
        <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
          <Box flexGrow={1}>
            <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
              CẬP NHẬT CÁC DỊCH VỤ
            </Typography>
          </Box>
        </Box>
        <Divider />
        <CardContent sx={{ padding: "30px" }}>
          <form>
            <TextField
              id="cacdichvu"
              variant="outlined"
              fullWidth
              {...register("cacdichvu", {
                required: {
                  value: true,
                  message: "Không được bỏ trống",
                },
              })}
            />
            {formState?.errors?.cacdichvu && (
              <small className="text-danger">
                {formState?.errors?.cacdichvu?.message}
              </small>
            )}
            <div>
              <Button
                color="primary"
                variant="contained"
                className="mt-2"
                onClick={handleSubmit(submit)}
                style={{ width: "100px" }}
              >
                Sửa
              </Button>
              <Link to={"/admin/cac-dich-vu"}>
                <Button
                  color="error"
                  variant="contained"
                  className="mt-2"
                  onClick={handleSubmit(submit)}
                  style={{ width: "100px", marginLeft: "10px" }}
                >
                  Hủy
                </Button></Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditCDV;
