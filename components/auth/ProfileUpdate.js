import Link from "next/link";
import { useState, useEffect } from "react";
import Router from "next/router";
import { getCookie, updateUser } from "../../actions/auth";
import { getProfile, update } from "../../actions/user";
import {API} from '../../config'

const ProfileUpdate = () => {
  const [values, setValues] = useState({
    username: '',
    name: '',
    email: '',
    about: '',
    password: '',
    error: false,
    success: false,
    loading: false,
    photo: '',
    userData: ''
});
  const token = getCookie("token");
  const { username, name, email, about, password, error, success, loading, photo, userData } = values;
  const init = () => {
    getProfile(token).then(data => {
        if (data.error) {
            setValues({ ...values, error: data.error });
        } else {
            setValues({
                ...values,
                username: data.username,
                name: data.name,
                email: data.email,
                about: data.about
            });
        }
    });
};

  useEffect(() => {
    init();
  },[]);

  const handleChange = (name) => (e) => {
    // fn returning another function
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    let userFormData = new FormData();
    // here name can be title it can be a photo or anything
    userFormData.set(name, value);

    // setvalue mai formData:formdtaa likhne ki zarrurt nhi hai same hi baat hai ek likho
    setValues({
      ...values,
      [name]: value,
      userData: userFormData,
      error: false,
      success: false,
    });
  };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setValues({ ...values, loading: true });
//     update(token, userData).then((data) => {
//       if (data.error) {
//         setValues({
//           ...values,
//           error: data.error,
//           success: false,
//           loading: false,
//         });
//       } else {
// updateUser(data,()=>{
//     setValues({
//         ...values,
//         username: data.username,
//         name: data.name,
//         email: data.email,
//         about: data.about,
//         success: true,
//         loading: false,
//       });
// })
const handleSubmit = e => {
  e.preventDefault();
  setValues({ ...values, loading: true });
  console.log(userData)
  update(token, userData).then(data => {
    console.log(data)
      if (data.error) {
          console.log('data.error', data.error);
          setValues({ ...values, error: data.error, loading: false });
      } else {
          updateUser(data, () => {
              setValues({
                  ...values,
                  username: data.username,
                  name: data.name,
                  email: data.email,
                  about: data.about,
                  password: '',
                  success: true,
                  loading: false
              });
          });
      }
  });
};

        
//       }
//     });
//   };
  // const profileUpdateForm = () => {
  //   return (
  //     <form onSubmit={handleSubmit}>
  //       <div className="form-group">
  //         <label className="btn btn-outline-info ">
  //           Update Photo
  //           <input
  //             onChange={handleChange("photo")}
  //             type="file"
  //             accept="image/*"
  //             hidden
  //           />
  //         </label>
  //       </div>

  //       <div className="form-group">
  //         <label className="text-muted">Username</label>
  //         <input
  //           onChange={handleChange("username")}
  //           type="text"
  //           className="form-control"
  //           value={username}
  //         ></input>
  //       </div>

  //       <div className="form-group">
  //         <label className="text-muted">Name</label>
  //         <input
  //           onChange={handleChange("name")}
  //           type="text"
  //           className="form-control"
  //           value={name}
  //         ></input>
  //       </div>

  //       <div className="form-group">
  //         <label className="text-muted">Email</label>
  //         <input
  //           onChange={handleChange("email")}
  //           type="text"
  //           className="form-control"
  //           value={email}
  //         ></input>
  //       </div>

  //       <div className="form-group">
  //         <label className="text-muted">About</label>
  //         <textarea
  //           onChange={handleChange("about")}
  //           type="text"
  //           className="form-control"
  //           value={about}
  //         ></textarea>
  //       </div>

  //       <div className="form-group">
  //         <label className="text-muted">Password</label>
  //         <input
  //           onChange={handleChange("password")}
  //           type="password"
  //           className="form-control"
  //           value={password}
  //         ></input>
  //       </div>
  //       <div>
  //         <button type="submit" className="btn btn-outline-primary">
  //           Update
  //         </button>
  //       </div>
  //     </form>
  //   );
  // };
  const profileUpdateForm = () => (
    <div className="container ml-4">
      <form onSubmit={handleSubmit}>
        <div className="form-group text-center">
            <label className="btn btn-outline-info ">
                Profile photo
                <input onChange={handleChange('photo')} type="file" accept="image/*" hidden />
            </label>
        </div>
        <div className="form-group ml-4">
            <label className="text-muted">Username</label>
            <input onChange={handleChange('username')} type="text" value={username} className="form-control" />
        </div>
        <div className="form-group ml-4">
            <label className="text-muted">Name</label>
            <input onChange={handleChange('name')} type="text" value={name} className="form-control" />
        </div>
        <div className="form-group ml-4">
            <label className="text-muted">Email</label>
            <input onChange={handleChange('email')} type="text" value={email} className="form-control" />
        </div>
        <div className="form-group ml-4">
            <label className="text-muted">About</label>
            <textarea onChange={handleChange('about')} type="text" value={about} className="form-control" />
        </div>
        <div className="form-group ml-4">
            <label className="text-muted">Password</label>
            <input onChange={handleChange('password')} type="password" value={password} className="form-control" />
        </div>
        <div>
            {showSuccess()}
            {showError()} 
            {showLoading()}
        </div>
        <div>
            <button type="submit" className="btn btn-outline-info ml-4 mb-5" disabled={!username || !name || !email}>
                Update
            </button>
        </div>
    </form>
    </div>
);
  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );
  const showSuccess = () => (
    <div
      className="alert alert-success"
      style={{ display: success ? "" : "none" }}
    >
      Profile Updated{" "}
    </div>
  );
  const showLoading = () => (
    <div
      className="alert alert-success"
      style={{ display: loading ? "" : "none" }}
    >
      Loading..
    </div>
  );

  return (
    <>
     <section className="pt-4 " style={{backgroundColor:"#fcfcfa"}}  >
     <div className="ml-5 mt-4" style={{marginRight:"5px"}}>
     <div className="container mr-5 "  >
        <div className="row">
          <div className="col-md-8 ml-4" >
            <img
              src={`${API}/user/photo/${username}`}
               className="img img-fluid img-thumbnail mb-3 ml-5"
              // style={{ maxHeight: "220px", maxWidth: "100%" }}
              
                    style={{maxWidth:'100%',maxHeight : '230px' ,border: "2px solid #043a70",marginRight:"8px"}}
              alt="user profile"
            />
          </div>
          <div className="col-md-6">
       
            {profileUpdateForm()}
          </div>
        </div>
      </div>
     </div>
     </section>
    </>
  );
};

export default ProfileUpdate;
