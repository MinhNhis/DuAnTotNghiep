import React, { useEffect, useState } from "react";
import WarningIcon from '@mui/icons-material/Warning';
import { useNavigate, useParams } from "react-router-dom";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Box, TextField } from "@mui/material";
import { deleteQuanan, getQuananById, isDeleteQuanan } from "../../../../services/Quanan";
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
            // await deleteQuanan(id, {
            //     reason: reason ? reaSon(reason) : otherReason,
            //     id_nguoidung: quanan.created_user,
            //     role: cookies.role,
            // });
            await isDeleteQuanan(id, {
                reason: reason ? reaSon(reason) : otherReason,
                id_nguoidung: quanan.created_user,
                role: cookies.role,
                is_delete: 1
            })
            enqueueSnackbar('Xóa quán ăn thành công!', { variant: 'success' });
            navigate("/admin/quanan");
        } catch (error) {
            enqueueSnackbar('Có lỗi xảy ra khi xóa quán ăn!', { variant: 'error' });
        }
    };

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;

        setCheckedItems((prev) => {
            const newCheckedItems = {
                ...prev,
                [name]: checked,
            };

            if (name === 'other' && checked) {
                Object.keys(newCheckedItems).forEach((key) => {
                    if (key !== 'other') {
                        newCheckedItems[key] = false;
                    }
                });
            } else if (checked) {

                newCheckedItems.other = false;
            }

            return newCheckedItems;
        });

        setReason((prev) => {
            if (name === 'other') {
                return checked ? [otherReason] : prev.filter(r => r !== otherReason);
            }

            if (checked) {
                return [...prev, name];
            } else {
                return prev.filter(r => r !== name);
            }
        });

        if (checked && name !== 'other') {
            setOtherReason('');
            setReason((prev) => prev.filter(r => r !== otherReason));
        }
    };

    const handleOtherReasonChange = (e) => {
        const newReason = e.target.value;
        setOtherReason(newReason);


        if (checkedItems.other) {
            setReason([newReason]);
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
            {
                cookies.role === 0 ? <DialogContent>
                    <div className="form-check-group" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                        {['Quán vi phạm điều khoản ', 'Không gia hạn quán ăn'].map((key, index) => (
                            <div className="form-check mb-1" style={{ marginRight: '20px' }} key={index}>
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name={key}
                                    checked={checkedItems[key]}
                                    onChange={handleCheckboxChange}
                                />
                                <label className="form-check-label ms-2">{key}</label>
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
                                        value={otherReason}
                                        onChange={handleOtherReasonChange}
                                        sx={{ width: "100%", marginTop: 1 }}
                                    />
                                )}
                            </DialogContentText>
                        </DialogContent>
                    )}
                </DialogContent>
                    :
                    <DialogContent>
                        <DialogContentText align="center">
                            Hành động này sẽ không thể hoàn tác.
                        </DialogContentText>
                    </DialogContent>
            }
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
