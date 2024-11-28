import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart"; // Đảm bảo import đúng
import { getTongTien } from "../../../../services/Thanhtoandki";
import { useEffect, useState, useRef } from "react";
import { getQuanan } from "../../../../services/Quanan";
import { getDatcho } from "../../../../services/Datcho";

const ChartsCQ = () => {
  const accounts = JSON.parse(localStorage.getItem("accounts"));

  const [quanan, setQuanan] = useState({});
  const [datcho, setDatcho] = useState([]);
  const hasCalledRef = useRef(false);
  const [thongKe, setThongKe] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const initData = async () => {
    for (let index = 1; index <= 12; index++) {
      const res = await getTongTien(index);
      setThongKe((pre) => [...pre, res.tongTien]);
    }

    const resultDatcho = await getDatcho();
    setDatcho(resultDatcho.data);

    const resultQuan = await getQuanan();
    const quan = resultQuan.data.find((e) => 
      e.created_user === accounts.id_nguoidung || 
      e.updated_user === accounts.id_nguoidung
    );
    setQuanan(quan);
    console.log(quan);
  };

  useEffect(() => {
    if (hasCalledRef.current) return;
    initData();
    hasCalledRef.current = true; // Đảm bảo initData chỉ gọi một lần

  }, []);

  useEffect(() => {
    // Chỉ tính toán filteredData khi quán và datcho đã được lấy
    if (quanan.id_quanan && datcho.length > 0) {
      const dCho = datcho.filter((e) => e.id_quanan === quanan.id_quanan);

      const groupByMonth = () => {
        const groupedData = {};

        dCho.forEach(item => {
          const date = new Date(item.ngay_dat);
          const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`; // định dạng: tháng-năm

          if (!groupedData[monthYear]) {
            groupedData[monthYear] = {
              soLuong: 0,
            };
          }

          groupedData[monthYear].soLuong += 1; // Cộng dồn số lượng đơn đặt chỗ
        });

        return Object.entries(groupedData).map(([key, value]) => ({
          monthYear: key,
          soLuong: value.soLuong,
        }));
      };

      const result = groupByMonth();
      setFilteredData(result);
    }
  }, [quanan, datcho]);


  const barChartData = [];
  for (let i = 1; i <= 12; i++) {
    const monthYear = `${i}-${new Date().getFullYear()}`; // Tháng-Năm hiện tại
    const found = filteredData.find(item => item.monthYear === monthYear);
    barChartData.push(found ? found.soLuong : 0);
  }

  return (
    <div>
      <h2>Số lượng đơn đặt chỗ theo tháng</h2>
      <BarChart
        series={[{ data: barChartData }]}
        height={290}
        xAxis={[
          {
            data: [
              "Tháng 1",
              "Tháng 2",
              "Tháng 3",
              "Tháng 4",
              "Tháng 5",
              "Tháng 6",
              "Tháng 7",
              "Tháng 8",
              "Tháng 9",
              "Tháng 10",
              "Tháng 11",
              "Tháng 12",
            ],
            scaleType: "band",
          },
        ]}
        yAxis={[
          {
            scaleType: "linear",
            min: 0,
            max: 10,
            ticks: {
              stepSize: 1,
            },
          },
        ]}
        margin={{ top: 10, bottom: 30, left: 90, right: 10 }}
      />
      <div style={{ margin: '20px 0' }} />
    </div>
  );
};

export default ChartsCQ;