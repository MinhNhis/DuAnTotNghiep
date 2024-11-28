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
  console.log(thongKe);

  return (
    <div>
      <BarChart
        series={[{ data: thongKe }]}
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
            max: 500000,
            ticks: {
              stepSize: 100000,
            },
          },
        ]}
        margin={{ top: 10, bottom: 30, left: 90, right: 10 }}
      />
      <div style={{ margin: '20px 0' }} />
      <LineChart
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
        series={[{ data: thongKe }]}
        height={300}
        yAxis={[
          {
            scaleType: "linear",
            min: 0,
            max: 500000,
            ticks: {
              stepSize: 500000,
            },
          },
        ]}
        margin={{ top: 10, bottom: 30, left: 90, right: 10 }}
      />
    </div>
  );
};

export default Charts;
