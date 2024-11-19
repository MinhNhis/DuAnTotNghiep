import React, { useEffect, useState } from "react";
import WarningIcon from '@mui/icons-material/Warning';
import { useNavigate, useParams } from "react-router-dom";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Box, TextField } from "@mui/material";
import { deleteQuanan, getQuananById } from "../../../../services/Quanan";
import { useSnackbar } from 'notistack';
import { useCookies } from "react-cookie";

const DeleteQuanAn = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [reason, setReason] = useState("");
    const id = params.id_quanan;
    const [quanan, setQuanan] = useState({});
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = useState(true);
    const [cookies] = useCookies(["token", "role"]);
    const [otherReason, setOtherReason] = useState('');

    const [checkedItems, setCheckedItems] = useState({
        invalid: false,
        registerAnother: false,
        noLongerBusiness: false,
        deleteAnyway: false,
        other: false,
    });




    useEffect(() => {
        initData();
    }, []);

    const initData = async () => {
        const res = await getQuananById(id);
        setQuanan(res.data);
    };

    const handleClose = () => {
        setOpen(false);
        navigate('/admin/quanan');
    };

    const reaSon = (reason) => {
        if (reason) {
            let allReason = ''
            reason.forEach(element => {
                allReason = allReason + element + ','
            });
            return allReason
        }
    }

    const submit = async () => {
        try {
            await deleteQuanan(id, {
                reason: reason ? reaSon(reason) : otherReason,
                id_nguoidung: quanan.created_user,
                role: cookies.role,
            });
            enqueueSnackbar('Xóa quán ăn thành công!', { variant: 'success' });
            navigate("/admin/quanan");
        } catch (error) {
            enqueueSnackbar('Có lỗi xảy ra khi xóa quán ăn!', { variant: 'error' });
        }
    };

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;

        setCheckedItems((prev) => ({
            ...prev,
            [name]: checked,
        }));

        if (name !== 'other') {
            setReason((prev) => {
                if (checked) {
                    return [...prev, name];
                } else {
                    return prev.filter(r => r !== name); 
                }
            });
        }
    };


    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px', fontSize: '25px' }}>
                    <WarningIcon sx={{ fontSize: 40, color: 'warning.main', marginRight: 1 }} />
                    Bạn có chắc chắn muốn xóa?
                </Box>
            </DialogTitle>


            <DialogContent>
                <div className="form-check-group" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                    {['Quán không hợp lệ', 'Đăng kí quán khác', 'Không mún kinh doanh nữa', 'Quán vi phạm hợp đồng'].map((title, index) => (
                        <div className="form-check mb-1" style={{ marginRight: '20px' }} key={index}>
                            <input
                                type="checkbox"
                                className="form-check-input"
                                name={title} 
                                value={title}
                                checked={checkedItems[title]} 
                                onChange={handleCheckboxChange}
                            />
                            <label className="form-check-label ms-2">{title}</label>
                        </div>
                    ))}

                    <div className="form-check mb-1" style={{ marginRight: '20px' }}>
                        <input
                            type="checkbox"
                            className="form-check-input"
                            name="other"
                            checked={checkedItems.other}
                            onChange={handleCheckboxChange}
                        />
                        <label className="form-check-label ms-2">Khác</label>
                    </div>
                </div>

                {checkedItems.other && (
                    <DialogContent>
                        <DialogContentText align="center">
                            {cookies.role === 0 && (
                                <TextField
                                    label="Lý do"
                                    variant="outlined"
                                    multiline
                                    rows={1.75}
                                    value={otherReason} // Giá trị nhập cho "Khác"
                                    onChange={(e) => setOtherReason(e.target.value)} // Cập nhật giá trị nhập
                                    sx={{ width: "50%", marginTop: 1 }}
                                />
                            )}
                        </DialogContentText>
                    </DialogContent>
                )}
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
                <Button
                    variant="contained"
                    color="error"
                    onClick={submit}
                    sx={{ width: "100px" }}
                >
                    Xóa
                </Button>
                <Button
                    variant="outlined"
                    onClick={handleClose}
                    sx={{ width: "100px" }}
                >
                    Hủy
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteQuanAn;
