import React, { useEffect, useState } from "react";
import { searchQuanan } from "../../../services/Quanan";
import { Link } from "react-router-dom";


const Search = () => {
  const [timkiem, setTimkiem] = useState("");
  const [dstimkiem, setDstimkiem] = useState([]);

  const handelTimKiemThayDoi = async (event) => {
    setTimkiem(event.target.value);
    const resultSeach = await searchQuanan(event.target.value);
    setDstimkiem(resultSeach.data);
  };

  const handelTimKiem = async () => {};
  const closeModal = () => {
    const modal = document.getElementById('searchModal');
    modal.hide();
  };
  return (
    <div
          className="modal fade"
          id="searchModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-fullscreen">
            <div className="modal-content rounded">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Tìm kiếm
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body d-flex align-items-center">
                <div className="input-group w-75 mx-auto d-flex">
                  <input
                    type="search"
                    className="form-control bg-transparent p-3"
                    placeholder="Nhập từ khóa"
                    value={timkiem}
                    onChange={handelTimKiemThayDoi}
                    aria-describedby="search-icon-1"
                  />
                  <span
                    id="search-icon-1"
                    className="input-group-text p-3"
                    onClick={handelTimKiemThayDoi}
                  >
                    <i className="fa fa-search"></i>
                  </span>
                </div>
              </div>
              <div className="modal-body d-flex flex-wrap">
                {dstimkiem.length > 0 ? (
                  dstimkiem.map((value, index) => (
                    <Link to={`/chi-tiet/${value.id_quanan}`} onClick={closeModal}>
                      <div
                        key={index}
                        className="card m-2"
                        style={{ width: "300px" }}
                      >
                        <img
                          src="https://hoangminhdecor.com/wp-content/uploads/2021/01/thiet-ke-quan-an-dep.jpg"
                          className="card-img-top"
                          alt={value.ten_quan_an}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{value.ten_quan_an}</h5>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="text-center">Trống</div>
                )}
              </div>
            </div>
          </div>
        </div>
  );
};

export default Search;
