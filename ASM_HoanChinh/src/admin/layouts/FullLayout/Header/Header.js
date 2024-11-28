import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useSnackbar } from "notistack";

import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Menu,
  MenuItem,
  Button,
  Avatar,
  Divider,
  ListItemIcon,
} from "@mui/material";

import ImgUser from "../../../../admin/assets/images/user.png";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { BASE_URL } from "../../../../config/ApiConfig";
import { getNguoiDungById } from "../../../../services/Nguoidung";

const Header = (props) => {
  const accounts = JSON.parse(localStorage.getItem("accounts"));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const [nguoidung, setnguoidung] = useState({});
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  useEffect(() => {
    initData()
  }, []);

  const initData = async () => {
    try {
      const resultNguoiDung = await getNguoiDungById(accounts.id_nguoidung);
      setnguoidung(resultNguoiDung.data);
    } catch (error) {
      enqueueSnackbar("Có lỗi xảy ra khi tải thông tin!", { variant: "error" });
    }
  };

  const [anchorEl4, setAnchorEl4] = React.useState(null);

  const handleClick4 = (event) => {
    setAnchorEl4(event.currentTarget);
  };

  const handleClose4 = () => {
    setAnchorEl4(null);
  };

  const [anchorEl5, setAnchorEl5] = React.useState(null);

  const handleClick5 = (event) => {
    setAnchorEl5(event.currentTarget);
  };

  const [cookies, setCookie, removeCookie] = useCookies(["token", "role"]);

  const navigate = useNavigate()
  const logOut = () => {
    const date = new Date();
    localStorage.setItem("accounts", JSON.stringify(null))
    removeCookie("token", null, { path: "/", expires: date });
    removeCookie("role", null, { path: "/", expires: date });
    navigate('/login')
  }
  console.log(nguoidung);

  return (
    <AppBar sx={props.sx} elevation={0} className={props.customClass}>
      <Toolbar style={{ width: "100px", marginLeft: "1050px" }}>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={props.toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              xs: "inline",
            },
          }}
        >
          <MenuOutlinedIcon width="20" height="20" />
        </IconButton>
        <IconButton
          aria-label="menu"
          color="inherit"
          aria-controls="dd-menu"
          aria-haspopup="true"
          onClick={handleClick5}
        >
          <AddToPhotosOutlinedIcon />
        </IconButton>
        <Box flexGrow={1} />

        <IconButton
          aria-label="menu"
          color="inherit"
          aria-controls="notification-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <NotificationsNoneOutlinedIcon width="20" height="20" />
        </IconButton>
        <Box
          sx={{
            width: "1px",
            backgroundColor: "rgba(0,0,0,0.1)",
            height: "25px",
            ml: 1,
          }}
        ></Box>
        <Button
          aria-label="menu"
          color="inherit"
          aria-controls="profile-menu"
          aria-haspopup="true"
          onClick={handleClick4}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Avatar
              src={
                nguoidung?.hinh_anh ? (nguoidung.hinh_anh.startsWith('http') ? nguoidung.hinh_anh : `${BASE_URL}/uploads/${nguoidung.hinh_anh}`) : (ImgUser)
              }
              sx={{
                width: "30px",
                height: "30px",
              }}
            />
          </Box>
        </Button>
        <Menu
          id="profile-menu"
          anchorEl={anchorEl4}
          keepMounted
          open={Boolean(anchorEl4)}
          onClose={handleClose4}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          sx={{
            "& .MuiMenu-paper": {
              width: "170px",
              right: 0,
              top: "70px !important",
            },
          }}
        >
          <Link to={"admin/ho-so"}>
            <MenuItem
              onClick={handleClose4}
              sx={{
                display: cookies.role === 0 ? "none" : "flex",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ width: "25px", height: "25px" }} />
              <Box
                sx={{
                  ml: 2, 
                  fontSize: "16px",
                  color: "#B58B56", 
                }}
              >
                Hồ sơ
              </Box>
            </MenuItem>
          </Link>

          <Divider sx={{ display: cookies.role === 0 ? 'none' : 'block' }} />
          <MenuItem onClick={logOut}>
            <ListItemIcon>
              <LogoutOutlinedIcon fontSize="small" />
            </ListItemIcon>
            Đăng xuát
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
