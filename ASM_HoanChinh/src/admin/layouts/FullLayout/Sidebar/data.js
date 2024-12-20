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
import StarIcon from '@mui/icons-material/Star';
import HouseIcon from '@mui/icons-material/House';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaymentIcon from '@mui/icons-material/Payment';
import ArticleIcon from '@mui/icons-material/Article';

<StarIcon />

const Menuitems = [
  {
    title: "Trang chủ",
    icon: HomeOutlinedIcon,
    href: "/admin",
  },
  {
    title: "Giới thiệu",
    icon: AboutIcon,
    children: [
      {
        title: "Dịch vụ",
        icon: ServiceIcon,
        href: "/admin/dich-vu",
      },
      {
        title: "Kế Hoạch",
        icon: EventNoteOutlinedIcon,
        href: "admin/ke-hoach",
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
    ],
  },
  {
    title: "Quán Ăn",
    icon: HouseIcon,
    href: "admin/quanan",
    children: [
      {
        title: "Menu",
        icon: MenuIcon,
        href: "admin/menu",
      },
      {
        title: " Tất Cả Danh mục",
        icon: RestaurantMenuOutlinedIcon,
        href: "admin/alldanhmuc",
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
    ]
  },
  {
    title: "Người dùng",
    key: 2,
    icon: AccountCircleIcon,
    href: "admin/nguoi-dung",
  },
  {
    title: "Bài viết",
    key: 2,
    icon: ArticleIcon,
    href:"admin/bai-viet",
  },
  {
    title: "Thanh toán đăng kí",
    key: 2,
    icon: PaymentIcon,
    href: "admin/thanh-toan",
  },
];

export default Menuitems;