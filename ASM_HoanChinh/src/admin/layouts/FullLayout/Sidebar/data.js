import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ServiceIcon from '@mui/icons-material/RestaurantMenu'; 
import AboutIcon from '@mui/icons-material/InfoOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import LocalParkingOutlinedIcon from '@mui/icons-material/LocalParkingOutlined';
import AirOutlinedIcon from '@mui/icons-material/AirOutlined';
import EmojiTransportationOutlinedIcon from '@mui/icons-material/EmojiTransportationOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantMenuOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupIcon from '@mui/icons-material/Group';
import StarIcon from '@mui/icons-material/Star';
//import RestaurantIcon from '@mui/icons-material/Restaurant';
import HouseIcon from '@mui/icons-material/House';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// Use the StarIcon in your component
<StarIcon />

const Menuitems = [
  {
    title: "Dashboard",
    icon: HomeOutlinedIcon,
    href: "/admin",
  },
  {
    title: "Dịch vụ",
    icon: ServiceIcon,
    href: "admin/dich-vu",
  },
  {
    title: "Giới thiệu",
    icon: AboutIcon,
    href: "admin/gioi-thieu",
  },
  {
    title: "Đơn đặt chỗ",
    icon: ShoppingCartIcon,
    href: "admin/dat-cho",
  },
  {
    title: "Đánh Giá",
    icon: StarIcon,
    href: "admin/danhgia",
  },
  {
    title: "Quán Ăn",
    icon: HouseIcon,
    href: "admin/quanan",
  },
  {
    title: "Kế Hoạch",
    icon: EventNoteOutlinedIcon,
    href: "admin/ke-hoach",
  },
  {
    title: "Ăn uống",
    icon: RestaurantIcon,
    href: "admin/an-uong",
  },
  {
    title: "Bãi Đỗ Xe",
    icon: LocalParkingOutlinedIcon,
    href: "admin/bai-do-xe",
  },
  {
    title: "Không Khí",
    icon: AirOutlinedIcon,
    href: "admin/khong-khi",
  },
  {
    title: "Tiện Nghi",
    icon: EmojiTransportationOutlinedIcon,
    href: "admin/tien-nghi",
  },
  {
    title: "Các dịch vụ",
    icon: GroupIcon,
    href: "admin/cac-dich-vu",
  },
  {
    title: "Menu",
    icon: MenuIcon,
    href: "admin/menu",
  },

  {
    title: "Danh mục",
    icon: RestaurantMenuOutlinedIcon,
    href: "admin/danhmuc",
  },
  {
    title: "Người dùng",
    icon: AccountCircleIcon,
    href: "admin/nguoi-dung",
  },
  {
    title: "Loại khách hàng",
    icon: GroupIcon,
    href: "admin/loai-khach-hang",
  },
];

export default Menuitems;