import React, { useState } from "react";
import TableRow from "./TableRow";

const Table = () => {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(0);
  let arr = [];
  for (let i = 0; i < 10 - tasks.length; i++) {
    arr.push({});
  }
  arr = [...tasks, ...arr];
  console.log(arr);
  const pageCount = 10;
  console.log(...Array(pageCount).keys());
  console.log(page);
  return (
    <div className="container">
      <div className="p-5">
        <div className="d-flex justify-content-between bg-secondary container py-1 fw-bolder mb-5">
          <div className="d-flex align-items-center">
            <div className="pe-5">Billings</div>
            <input type="text" placeholder="Search" />
          </div>
          <div>
            <button
              className="btn btn-success"
              type=""
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Add New Bill
            </button>
          </div>
        </div>
        <div className="pb-3">
          {/* <table class="table table-success table-striped">...</table>
           */}
          <table class="table table-secondary">
            <thead>
              <tr>
                <th scope="col">Billing ID</th>
                <th scope="col">Full Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Paid Amount</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {arr.map((a) => (
                <TableRow></TableRow>
              ))}
            </tbody>
            <div></div>
          </table>
        </div>
        <div>
          {[...Array(pageCount).keys()].map((number) => (
            <button
              onClick={() => {
                setPage(number);
              }}
            >
              {number}
            </button>
          ))}
        </div>
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Modal title
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">...</div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" class="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
