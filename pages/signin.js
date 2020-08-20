import React from 'react'
import SignInComponent from '../components/auth/SigninComponent'
import {withRouter} from 'next/router'
import Layout from "../components/Layout";

const signin=({router})=>{

  const showRedirectMsg=()=>{
    if(router.query.message){
      return <div className="alert alert-danger">{router.query.message}</div>
    }
    else{
      return
    }
  }


    return (
        <div  style={{backgroundColor:"#043a70"}}>
<Layout>
<section style={{backgroundColor:"#fcfcfa"}}>
<h2 className="text-center pt-4 pb-4" style={{color:"#043a70", fontWeight:'bolder',fontSize:'40px'}}>Sign In </h2>
<div className="row">
        <div className="col-md-6 offset-md-3">
          {showRedirectMsg()}
        </div>
      </div>   
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <SignInComponent/>
        </div>
      </div> 
</section>
</Layout>          
        </div>
    )
}

export default withRouter(signin)
