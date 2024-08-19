import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import {
  Card,
  CardContent,
  Divider,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { addCDV } from "../../../../services/Cacdichvu";

const AddCDV = () => {
  const { register, handleSubmit, formState } = useForm();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const submit = async (value) => {
    try {
      console.log(value);
      await addCDV({
        tuy_chon_dv: value?.cacdichvu,
      });
      enqueueSnackbar("Thêm dịch vụ thành công!", { variant: "success" });
      navigate("/admin/cac-dich-vu");
    } catch (error) {
      enqueueSnackbar("Có lỗi xảy ra khi thêm dịch vụ!", { variant: "error" });
      console.error("Lỗi khi thêm dịch vụ:", error);
    }
  };

  return (
    <div>
      <Card variant="outlined" sx={{ p: 0 }}>
        <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
          <Box flexGrow={1}>
            <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
              THÊM DỊCH VỤ
            </Typography>
          </Box>
        </Box>
        <Divider />
        <CardContent sx={{ padding: "30px" }}>
          <form onSubmit={handleSubmit(submit)}>
            <TextField
              id="cacdichvu"
              label="Các dịch vụ"
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
                type="submit"
                style={{ width: "100px" }}
              >
                Thêm
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddCDV;
