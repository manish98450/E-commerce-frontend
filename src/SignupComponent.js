import React from "react";
import axios from "axios";
import url from "./url";
import './style.css';

export default class SignupComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      status: "",
    };
  }

  render() {
    return (
      <div className="container mt-5">
        <form onSubmit={this.signup} className="w-50">
          <h3 className="text-primary">Signup user </h3>
          <div className="form-group my-2 btn btn-outline-info p-3 w-100">
            <label className="label-black">User id</label>
            <input
              type="text"
              placeholder="Enter Userid"
              className="form-control"
              name="userid"
            ></input>
          </div>
          <div className="form-group my-2 btn btn-outline-info p-3 w-100">
            <label className="label-black">User Name</label>
            <input
              type="text"
              placeholder="Enter User Name"
              className="form-control"
              name="uname"
            ></input>
          </div>
          <div className="form-group my-2 btn btn-outline-info p-3 w-100">
            <label className="label-black">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control"
              name="upwd"
            ></input>
          </div>
          <div className="form-group my-2 btn btn-outline-info p-3 w-100">
            <label className="label-black">User email</label>
            <input
              type="email"
              placeholder="Enter User email"
              className="form-control"
              name="email"
            ></input>
          </div>
          <div className="form-group my-2 btn btn-outline-info p-3 w-100">
            <label className="label-black">User Address</label>
            <input
              type="text"
              placeholder="Enter User Address"
              className="form-control"
              name="address"
            ></input>
          </div>
          <div className="form-group my-2 btn btn-outline-info p-3 w-100">
            <label className="label-black">Contact</label>
            <input
              type="text"
              placeholder="Enter Contact"
              className="form-control"
              name="contact"
            ></input>
          </div>
          <div className="form-group my-2 w-25 mx-auto" align="center">
            <input
              type="submit"
              className="btn btn-outline-success"
              value="Signup"
            ></input>
            <h3>{this.state.status}</h3>
          </div>
        </form>
      </div>
    );
  }

  signup = (e) => {
    e.preventDefault();
    let obj = {
      u_id: e.target.userid.value,
      u_name: e.target.uname.value,
      u_pwd: e.target.upwd.value,
      u_email: e.target.email.value,
      u_addr: e.target.address.value,
      u_contact: e.target.contact.value,
    };
    axios.post(url + "/insert_user", obj).then(
      (posRes) => {
        console.log(posRes.data);
        this.setState({
          status: posRes.data.userInsert,
        });
        // Clear the form after successful signup
        e.target.reset();
        alert("Signup successful!");
      },
      (errRes) => {
        console.log(errRes);
      }
    );
  };
}
