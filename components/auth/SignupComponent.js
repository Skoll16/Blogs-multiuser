import { useState,useEffect} from 'react';
import {signup,isAuth,preSignup} from '../../actions/auth';
import Router from 'next/router'
// import signup from ''
const SignUpComponent = () => {

    const [values,setValues]=useState({
        name:'',
        email:'',
        password:'',
        error:'',
        loading:false,
        message:'',
        showForm:true
    })

    const {name,email,password,error,message,showForm,loading} =values
    useEffect(()=>{
      isAuth() && Router.push('/');
      },[])
  const handleSubmit = (e) => {
    // e is the event and to prpevent page load we use
    e.preventDefault();
    // console.log("form submit");
  // console.table({name,email,password,error,message,showform});
  setValues({...values,loading:true,error:false})
  const user= {name,email,password}

  preSignup(user).
  then(data=>{
    if(data.error){
      setValues({...values,error:data.error,loading:false})
    }else{
      setValues({...values,
        name:'',
        email:'',
        password:'',
        error:'',
        loading:false,
        message:data.message,
        showForm:false})

    }
  })

};

const showLoading=()=>(loading?<div className="alert alert-info">Loading...</div>:'');
const showError=()=>(error?<div className="alert alert-danger">{error}</div>:'');
const showMessage=()=>(message?<div className="alert alert-info">{message}</div>:'');

  const handleChange =name=> (e) =>{
      setValues({...values,error:false,[name]:e.target.value});
    // console.log(e.target.value); 
  };




  const signupForm = () => {
    return (
      <form onSubmit={handleSubmit} className="pb-5">
        <div className="form-group">
          <input
            onChange={handleChange('name')}
            type="text"
            className="form-control"
            placeholder="Name "
            value={name}
          ></input>
        </div>

        <div className="form-group">
          <input
            onChange={handleChange('email')}
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
          ></input>
        </div>

        
        <div className="form-group">
          <input
            onChange={handleChange('password')}
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
          ></input>
        </div>

<div className="pb-5">
    <button className="btn btn-outline-info" >Sign Up</button>
</div>
      </form>
    );
  };

  return <>
  {showError()}
  {showLoading()}
  {showMessage()}
  { showForm && signupForm()}
  <br/>
  </>;
};

export default SignUpComponent;
