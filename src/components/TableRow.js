import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
const TableRow = ({ task, setId, id }) => {
  //   console.log(id);
  let obj;
  const [name, setName] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  let errorMessage;

  const [bool, setBool] = useState(false);
  //   if (bool === true) {
  //     console.log(id);
  //     fetch(`http://localhost:5000/update-billing/${id}}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(obj),
  //     });
  //   }

  const onSubmit = async (data) => {
    obj = {
      name: data.name,
      email: data.email,
      phone: Number(data.phone),
      amount: Number(data.amount),
      id: data.id,
    };
    console.log(obj.id);
    // setId(data.id);
    // setTimeout(setBool(true), 5000);
    // console.log(bool);
    // console.log(id);

    // console.log(obj);
  };
  //   if (id) {
  //     fetch(`http://localhost:5000/update-billing/${id}}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(obj),
  //     });
  //   }
  return (
    <tr style={{ height: "60px" }} className="">
      <td scope="row">{task._id}</td>
      <td>{task.name}</td>
      <td>{task.email}</td>
      <td>{task.phone}</td>
      <td>{task.amount}</td>
      <td>
        <button
          className="btn btn-warning me-3"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal2"
        >
          Edit
        </button>
        <button className="btn btn-danger">Delete</button>
      </td>
      <div
        class="modal fade"
        id="exampleModal2"
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
                Edit
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
                      <span className="label-text">ID: </span>
                    </label>
                    <input
                      {...register("id")}
                      id="id"
                      type="text"
                      placeholder="Id"
                      value={task._id}
                      disabled
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
    </tr>
  );
};

export default TableRow;
