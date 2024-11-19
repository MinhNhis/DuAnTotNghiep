import React from "react";
import { TextField, Button, Typography, Box, Grid } from '@mui/material';
import { useForm } from "react-hook-form";

const LienHe = () => {

    const { register, handleSubmit, formState } = useForm();
    const submit = () =>{

    }
    
    return (
        <div className="container">
       
            <div className="container-fluid bg-light py-6 my-6 mt-0 pb-4">
                <div className="container text-center animated">
                    <h1 className="display-1 mb-4">Liên Hệ</h1>
                    <ol className="breadcrumb justify-content-center mb-0 animated">
                        <li className="breadcrumb-item"><a href="/">Trang Chủ</a></li>
                        <li className="breadcrumb-item text-dark" aria-current="page"><a href="/kham-pha">Khám Phá</a></li>
                        <li className="breadcrumb-item text-dark" aria-current="page">Liên Hệ</li>
                    </ol>
                </div>


            </div>

            <div className="d-flex justify-content-center">
                <div className="col-md-6">
                    <Box
                        component="form"
                        noValidate
                        autoComplete="off"
                        sx={{
                            backgroundColor: 'white', 
                            padding: '30px', 
                            borderRadius: '8px',
                            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)', 
                        }}
                    >
                        <h1 className="text-center">Liên hệ</h1>
                        <Grid container spacing={1} direction="column">
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="name"
                                    label="Tên của bạn"
                                    variant="outlined"
                                    required
                                    defaultValue=""
                                    sx={{ mb: 3 }}
                                    {...register("ten_kh", {
                                        required: {
                                            value: true,
                                            message: "Tên của bạn không được để trống"
                                        }
                                    })}
                                />
                                {formState?.errors?.ten_kh && (
                                    <small className="text-danger">
                                        {formState?.errors?.ten_kh?.message}
                                    </small>
                                )}
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    type="number"
                                    fullWidth
                                    id="phone"
                                    label="Số điện thoại"
                                    variant="outlined"
                                    required
                                    sx={{ mb: 3 }}
                                    {...register("sdt", {
                                        required: {
                                            value: true,
                                            message: "Số điện thoai không được bỏ trống"
                                        },
                                        maxLength: {
                                            value: 10,
                                            message: "Sô điện thoại phải 10 số"
                                        },
                                        minLength: {
                                            value: 10,
                                            message: "Sô điện thoại phải 10 số"
                                        }
                                    })}
                                />
                                {formState?.errors?.sdt && (
                                    <small className="text-danger">
                                        {formState?.errors?.sdt?.message}
                                    </small>
                                )}
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="guests"
                                    label="Email"
                                    type="email"
                                    variant="outlined"
                                    defaultValue=""
                                    required
                                    sx={{ mb: 3 }}
                                    {...register("email", {
                                        required: {
                                            value: true,
                                            message: "Email không được bỏ trống"
                                        },
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,4}$/,
                                            message: "Email không đúng định dạng"
                                        }
                                    })}
                                />
                                {formState?.errors?.email && (
                                    <small className="text-danger">
                                        {formState?.errors?.email?.message}
                                    </small>
                                )}
                            </Grid>

                            <Grid item xs={12}>
                                <textarea
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        fontSize: '16px',
                                        border: '1px solid #ccc',
                                        borderRadius: '4px',
                                        resize: 'vertical'
                                    }}
                                    id="Noidung"
                                    name="Noidung"
                                    placeholder="Nội dung"
                                    required
                                    {...register("Noidung", {
                                        required: {
                                            value: true,
                                            message: "Nội dung không được bỏ trống"
                                        }
                                    })}
                                />
                                {formState?.errors?.Noidung && (
                                    <small className="text-danger">
                                        {formState?.errors?.Noidung?.message}
                                    </small>
                                )}
                            </Grid>

                            <Grid item xs={12}>
                                <Box display="flex" alignItems="center" className="mb-3">
                                    <Button
                                        sx={{
                                            width: '100px',
                                            backgroundColor: '#d4a762',
                                            color: 'white',
                                            marginTop: '10px', 
                                            '&:hover': {
                                                backgroundColor: '#c69c4f',
                                            },
                                        }}
                                        onClick={handleSubmit(submit)}
                                        className="mt-2" 
                                    >
                                        Gửi
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </div>
            </div>
        </div>
    );
};

export default LienHe;
