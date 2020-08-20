import { useState, useEffect } from "react";
import { signin, authenticate, isAuth } from "../../actions/auth";
import Router from "next/router";
import Link from "next/link";
import LoginGoogle from './LoginGoogle'
// import signip from ''
const SignInComponent = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  const { email, password, error, message, showForm, loading } = values;

  useEffect(() => {
    isAuth() && Router.push("/");
  }, []);
  // yaah jo uper khaali hai usmai hum condition daal sakte for use this useEffect
  const handleSubmit = (e) => {
    // e is the event and to prpevent page load we use
    e.preventDefault();
    // console.log("form submit");
    // console.table({name,email,password,error,message,showform});
    setValues({ ...values, loading: true, error: false });
    const user = { email, password };

    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        // save user token to cookie
        // save user info to local storage
        // authenticate user
        authenticate(data, () => {
          if (isAuth() && isAuth().role === 1) {
            Router.push("/admin");
          } else {
            Router.push("/user");
          }
        });
      }
    });
  };

  const showLoading = () =>
    loading ? <div className="alert alert-info">Loading...</div> : "";
  const showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : "";
  const showMessage = () =>
    message ? <div className="alert alert-info">{message}</div> : "";

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
    // console.log(e.target.value);
  };

  const signinForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            onChange={handleChange("email")}
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
          ></input>
        </div>

        <div className="form-group">
          <input
            onChange={handleChange("password")}
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
          ></input>
        </div>

        <div>
          <button className="btn btn-outline-info">Sign In</button>
        </div>
      </form>
    );
  };

  return (
    <>
      {showError()}
      {showLoading()}
      {showMessage()}
      {signinForm()}
      <div className="pt-2">
      <LoginGoogle/>

      </div>

        <div className="pb-5">
        <Link href="/auth/password/forgot">
          <a className="btn btn-outline-danger">Forgot Password</a>
        </Link>
        </div>
        <br/>
        

    </>
  );
};

export default SignInComponent;
