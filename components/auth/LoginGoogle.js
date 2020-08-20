import Link from "next/link";
import { useState, useEffect } from "react";
import Router from "next/router";
import { authenticate, loginWithGoogle,isAuth} from "../../actions/auth";
import { getProfile, update } from "../../actions/user";
import {GOOGLE_CLIENT_ID} from '../../config'
import {GoogleLogin} from 'react-google-login'

const LoginGoogle=()=>{

const responseGoogle=(response)=>{
    // console.log(response)
const tokenId=response.tokenId
const user={ tokenId }
loginWithGoogle(user).then(data=>{
    if(data.err){
        console.log(data.err)
    } 
    else{
        authenticate(data, () => {
            if (isAuth() && isAuth().role === 1) {
              Router.push("/admin");
            } else {
              Router.push("/user");
            }
          });
        

    }
})
}


return(
    <div className="pb-3">
        <GoogleLogin
    clientId={`${GOOGLE_CLIENT_ID}`}
    buttonText="Login With Google"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    theme="light"
  />
    </div>
)
}
export default LoginGoogle