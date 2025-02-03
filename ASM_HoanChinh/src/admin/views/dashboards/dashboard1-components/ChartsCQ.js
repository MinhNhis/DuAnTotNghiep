import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { useEffect, useState, useRef } from "react";
import { getQuanan } from "../../../../services/Quanan";
import { getDatcho } from "../../../../services/Datcho";

const ChartsCQ = () => {
  const accounts = JSON.parse(localStorage.getItem("accounts"));

  const [quanan, setQuanan] = useState({});
  const [datcho, setDatcho] = useState([]);
  const hasCalledRef = useRef(false);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(2024); // Năm được chọn

  const years = [2024, 2025, 2026]; // Danh sách năm có thể chọn

  const initData = async () => {
    const resultDatcho = await getDatcho();
    setDatcho(resultDatcho.data);

    const resultQuan = await getQuanan();
    const quan = resultQuan.data.find(
      (e) =>
        e.created_user === accounts.id_nguoidung ||
        e.updated_user === accounts.id_nguoidung
    );
    setQuanan(quan);
  };

  useEffect(() => {
    if (hasCalledRef.current) return;
    initData();
    hasCalledRef.current = true;
  }, []);

  useEffect(() => {
    if (!quanan) {
      return;
    }
    if (quanan.id_quanan && datcho.length > 0) {
      const dCho = datcho.filter((e) => e.id_quanan === quanan.id_quanan);

      const groupByMonthAndYear = () => {
        const groupedData = {};

        dCho.forEach((item) => {
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

      const result = groupByMonthAndYear();
      setFilteredData(result);
    }
  }, [quanan, datcho]);

  const barChartData = [];
  const labels = [];

  for (let month = 1; month <= 12; month++) {
    const monthYear = `${month}-${selectedYear}`;
    labels.push(`Tháng ${month}/${selectedYear}`);
    const found = filteredData.find((item) => item.monthYear === monthYear);
    barChartData.push(found ? found.soLuong : 0);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px", width: "100%" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "bold", margin: "0 0 20px 0", textAlign: "center", }}>
        Thống kê đơn đặt chỗ
      </h2>
      <div style={{ display: "flex", alignItems: "center", width: "90%", justifyContent: "flex-start" }}>
        <label style={{ fontSize: "16px", marginRight: "10px" }}>Chọn năm:</label>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          style={{
            appearance: "none",
            backgroundColor: "#1E90FF",
            borderRadius: "8px",
            fontSize: "14px",
            padding: "10px 15px",
            color: "#fff",
          }}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
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
            ticks: {
              stepSize: 1,
            },
          },
        ]}
        margin={{ top: 20, bottom: 50, left: 60, right: 20 }}
      />
      <div style={{ marginTop: "20px" }}>
        <p style={{ fontSize: "16px", color: "#555" }}>
          Dữ liệu thể hiện số lượng đơn đặt chỗ của từng tháng trong năm {selectedYear}.
        </p>
      </div>
    </div>
  );
};

export default ChartsCQ;