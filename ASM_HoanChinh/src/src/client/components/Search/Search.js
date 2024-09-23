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
    if (event.target.value) {
      const resultSeach = await searchQuanan(event.target.value);
      setDstimkiem(resultSeach.data);
    } else {
      setDstimkiem([]);
    }

  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" sx={{ '& .MuiDialog-paper': { padding: 0, margin: 0, width: "500px" } }}>
      <DialogTitle><h4>Tìm kiếm quán ăn</h4></DialogTitle>
      <DialogContent>
        <div className="w-75 mx-auto d-flex mt-3" style={{ width: "100%" }}>
          <input
            type="search"
            className="form-control p-2"
            placeholder="Tìm kiếm quán ăn..."
            aria-describedby="search-icon-1"
            value={timkiem}
            onChange={handelTimKiemThayDoi}
            style={{
              backgroundColor: 'white',
              height: '50px',
              border: '2px solid #ccc',
              borderRadius: '40px',
              width: '100%',
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
                      <div className="card-body" fullWidth>
                        <h5 className="card-title">{value.ten_quan_an}</h5>
                        <div><strong>Giờ hoạt động:</strong> {value?.gio_hoat_dong}</div>
                        <p style={{
                          width: "100%",
                          fontSize: "15px",
                          whiteSpace: "normal",
                          wordWrap: "break-word"
                        }}>
                          {value?.dia_chi}
                        </p>
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
