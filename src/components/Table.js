import React, { useEffect, useState } from "react";
import TableRow from "./TableRow";
import { useForm } from "react-hook-form";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";

const Table = () => {
  const [user] = useAuthState(auth);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(0);
  useEffect(() => {
    fetch("http://localhost:5000/billing-list")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTasks(data);
      });
  }, []);

  let errorMessage;
  let arr = [];
  for (let i = 0; i < 10 - tasks.length; i++) {
    arr.push({});
  }
  arr = [...tasks, ...arr];
  //   console.log(arr);
  let pageCount = 1;

  if (tasks.length > 10) {
    console.log(tasks);
    console.log(tasks.length);
    const count = tasks.length / 10;

    console.log(count);
    if (count % 1 === 0) {
      pageCount = count;
    } else {
      pageCount = count + 1;
    }
  }

  //   pageCount = Math.ceil(tasks.length / 10) > 1 || 1;
  //   console.log(pageCount);

  //   console.log(...Array(pageCount).keys());
  //   console.log(page);
  const onSubmit = async (data) => {
    const obj = {
      useremail: user.email,
      _id: "Generating",
      name: data.name,
      email: data.email,
      phone: Number(data.phone),
      amount: Number(data.amount),
    };
    const bill = {
      useremail: user.email,

      name: data.name,
      email: data.email,
      phone: Number(data.phone),
      amount: Number(data.amount),
    };
    const newTasks = [...tasks, obj];
    setTasks(newTasks);

    fetch("http://localhost:5000/billing-list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bill),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged === true) {
          fetch("http://localhost:5000/billing-list")
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              setTasks(data);
            });
        }
      });

    console.log(obj);
    console.log(newTasks);
  };
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
              {arr.map((task) => (
                <TableRow task={task}></TableRow>
              ))}
            </tbody>
            <div></div>
          </table>
        </div>
        <div>
          {[...Array(parseInt(pageCount)).keys()].map((number) => (
            <button
              onClick={() => {
                setPage(number);
              }}
            >
              {number + 1}
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
              <div class="modal-header ">
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <h5 class="modal-title mx-auto" id="exampleModalLabel">
                  Add Bill
                </h5>
                <div>
                  <form onSubmit={handleSubmit(onSubmit)} className="container">
                    <div className="form-control d-flex justify-content-end mb-3">
                      <label className="pe-3 fw-bold">
                        <span className="label-text">Full Name: </span>
                      </label>
                      <input
                        {...register("name", {
                          required: {
                            value: true,
                            message: "Name is required",
                          },
                        })}
                        id="name"
                        type="text"
                        placeholder="Full Name"
                        className=""
                      />

                      <label className="label">
                        {errors.name?.type === "required" && (
                          <span className="text-danger">
                            {errors.name.message}
                          </span>
                        )}
                      </label>
                    </div>
                    <div className="form-control d-flex justify-content-end mb-3">
                      <label className="pe-3 fw-bold">
                        <span className="label-text">Email: </span>
                      </label>
                      <input
                        {...register("email", {
                          required: {
                            value: true,
                            message: "Email is required",
                          },
                          pattern: {
                            value: /[a-z0-9]+@[a-z]+\.[a-z]{3}/,
                            message: "Provide a Valid Email",
                          },
                        })}
                        id="email"
                        type="email"
                        placeholder="Email"
                        className=""
                      />

                      <label className="label">
                        {errors.email?.type === "required" && (
                          <span className="text-danger">
                            {errors.email.message}
                          </span>
                        )}
                        {errors.email?.type === "pattern" && (
                          <span className="text-danger">
                            {errors.email.message}
                          </span>
                        )}
                      </label>
                    </div>
                    <div className="form-control d-flex justify-content-end mb-3">
                      <label className="pe-3 fw-bold">
                        <span className="label-text">Phone: </span>
                      </label>
                      <input
                        {...register("phone", {
                          required: {
                            value: true,
                            message: "Number is required",
                          },
                          minLength: {
                            value: 11,
                            message: "Must be Six Characters or more ",
                          },
                          pattern: {
                            value: /^[0-9]{11}/,
                            message: "Provide a Valid Number",
                          },
                        })}
                        type="tel"
                        placeholder="Phone"
                        className=" "
                      />

                      <label className="label">
                        {errors.phone?.type === "required" && (
                          <span className="text-danger">
                            {errors.phone.message}
                          </span>
                        )}
                        {errors.phone?.type === "minLength" && (
                          <span className="text-danger">
                            {errors.phone.message}
                          </span>
                        )}
                        {errors.phone?.type === "pattern" && (
                          <span className="text-danger">
                            {errors.phone.message}
                          </span>
                        )}
                      </label>
                    </div>
                    <div className="form-control d-flex justify-content-end mb-3">
                      <label className="pe-3 fw-bold">
                        <span className="label-text">Paid Amount: </span>
                      </label>
                      <input
                        {...register("amount", {
                          required: {
                            value: true,
                            message: "Amount is required",
                          },

                          pattern: {
                            value: /^[0-9]/,
                            message: "Provide a Valid Amount",
                          },
                        })}
                        type="tel"
                        placeholder="Amount"
                        className=" "
                      />

                      <label className="label">
                        {errors.amount?.type === "required" && (
                          <span className="text-danger">
                            {errors.amount.message}
                          </span>
                        )}

                        {errors.amount?.type === "pattern" && (
                          <span className="text-danger">
                            {errors.amount.message}
                          </span>
                        )}
                      </label>
                    </div>
                    {errorMessage}

                    <input
                      className="btn btn-secondary"
                      type="submit"
                      value="Add"
                    />
                  </form>
                </div>
              </div>
              <div class="modal-footer"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
