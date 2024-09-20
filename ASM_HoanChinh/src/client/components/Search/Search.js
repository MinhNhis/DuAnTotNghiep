import React, { useState } from "react";
import { Dialog, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { searchQuanan } from "../../../services/Quanan";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../../config/ApiConfig";

const Search = ({ open, onClose }) => {
  const [timkiem, setTimkiem] = useState("");
  const [dstimkiem, setDstimkiem] = useState([]);

  const handelTimKiemThayDoi = async (event) => {
    setTimkiem(event.target.value);
    const resultSeach = await searchQuanan(event.target.value);
    setDstimkiem(resultSeach.data);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Tìm kiếm quán ăn</DialogTitle>
      <DialogContent>
        <div className="w-75 mx-auto d-flex mt-3" style={{width: "500px"}}>
          <TextField
            type="search"
            label="Nhập từ khóa"
            fullWidth
            variant="outlined"
            value={timkiem}
            onChange={handelTimKiemThayDoi}
            sx={{
              marginBottom: '20px',
            }}
          />
        </div>
        <div className="modal-body d-flex flex-wrap justify-content-center">
          <DialogContentText>
            {dstimkiem.length > 0 ? (
              <>
                {dstimkiem.map((value, index) => (
                  <Link to={`/chi-tiet/${value.id_quanan}`} onClick={onClose} key={index}>
                    <div className="card mb-3" fullWidth>
                      <img
                        src={`${BASE_URL}/uploads/${value?.hinh_anh}`}
                        className="card-img-top"
                        alt={value.ten_quan_an}
                        style={{ width: "100%", height: "200px" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{value.ten_quan_an}</h5>
                        <span>Giờ hoạt động: {value?.gio_hoat_dong}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </>
            ) : (
              <div className="text-center">Trống</div>
            )}
          </DialogContentText>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Search;
