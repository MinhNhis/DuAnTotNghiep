import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";

import { getTongTien } from "../../../../services/Thanhtoandki";
import { useEffect, useState, useRef } from "react";

const Charts = () => {
  const hasCalledRef = useRef(false);
  const [thongKe, setThongKe] = useState([]);
  const initData = async () => {
    for (let index = 1; index <= 12; index++) {
      const res = await getTongTien(index);
      setThongKe((pre) => [...pre, res.tongTien]);
    }
  };

  useEffect(() => {
    if (hasCalledRef.current) return;
    initData();
    hasCalledRef.current = true;
  }, []);

  return (
    <div style={{ padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
      <h2 style={{ textAlign: "center", fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
        Thống kê doanh thu theo tháng
      </h2>
      <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
        <div style={{ flex: "1", minWidth: "400px", backgroundColor: "#ffffff", padding: "20px", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
          <h3 style={{ textAlign: "center", fontSize: "18px", fontWeight: "600", marginBottom: "10px" }}>
            Biểu đồ cột
          </h3>
          <BarChart
            series={[{ data: thongKe }]}
            height={290}
            xAxis={[
              {
                data: [
                  "T1",
                  "T2",
                  "T3",
                  "T4",
                  "T5",
                  "T6",
                  "T7",
                  "T8",
                  "T9",
                  "T10",
                  "T11",
                  "T12",
                ],
                scaleType: "band",
              },
            ]}
            yAxis={[
              {
                scaleType: "linear",
                min: 0,
                ticks: {
                  stepSize: 100000,
                  formatter: (value) => value.toLocaleString(),
                },
              },
            ]}
            margin={{ top: 10, bottom: 50, left: 60, right: 20 }}
          />
        </div>

        {/* <div style={{ flex: "1", minWidth: "400px", backgroundColor: "#ffffff", padding: "20px", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
          <h3 style={{ textAlign: "center", fontSize: "18px", fontWeight: "600", marginBottom: "10px" }}>
            Biểu đồ đường
          </h3>
          <LineChart
            xAxis={[
              {
                data: [
                  "T1",
                  "T2",
                  "T3",
                  "T4",
                  "T5",
                  "T6",
                  "T7",
                  "T8",
                  "T9",
                  "T10",
                  "T11",
                  "T12",
                ],
                scaleType: "band",
              },
            ]}
            series={[{ data: thongKe, area: true }]}
            height={300}
            yAxis={[
              {
                scaleType: "linear",
                min: 0,
                ticks: {
                  stepSize: 100000,
                },
              },
            ]}
            margin={{ top: 10, bottom: 50, left: 60, right: 20 }}
          />
        </div> */}
      </div>
    </div>


  );
};

export default Charts;
