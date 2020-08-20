import React from "react";
import Link from "next/link";
import SignUpComponent from "../components/auth/SignupComponent";
import Layout from "../components/Layout";


function signup() {
  return (
    <div style={{backgroundColor:"#043a70"}} >
     <Layout>
     <section style={{backgroundColor:"#fcfcfa"}}>

     <h2 className="text-center pt-4 pb-4" style={{color:"#043a70", fontWeight:'bolder',fontSize:'40px'}}>Sign Up </h2>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <SignUpComponent />
        </div>
      </div>
      </section>
     </Layout>
    </div>
  );
}

export default signup;
