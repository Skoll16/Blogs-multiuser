import {useState,useEffect} from 'react'
import Layout from '../../../../components/Layout'
import {resetPassword} from '../../../../actions/auth'
import {withRouter} from 'next/router'
import Link from 'next/link'
const ResetPassword=({router})=>{
const [values,setValues]=useState({
    name:'',
    newPassword:'',
    error:'',
    message:'',
    showForm:true,
    check:true
})

const {name,newPassword,error,message,showForm,check} =values

const handleSubmit=e=>{
e.preventDefault();
resetPassword({
    newPassword,
    resetPasswordLink:router.query.id
}).then(data=>{
    console.log(data)
    if(data.error){
        setValues({...values,error:data.error,showForm:false,newPassword:''})
    }else{
        setValues({...values,error:false,message:data.message,showForm:true,newPassword:'',check:false})
        
    }

})
}

const showError = () => (error ? <div className="alert alert-danger">{error}</div> : '');
const showMessage = () => (message ? <div className="alert alert-success">{message}</div> : '');

const passwordResetForm=()=>(
    <form onSubmit={handleSubmit}>
        <div>
          <input  type="password" onChange={e=>setValues({...values,newPassword:e.target.value})} 
          className="form-control"  placeholder="New Password" required />
        </div>
        <div className="pt-3 "><button className="btn btn-primary">Change password </button></div>
    </form>
)

return(
    <> 
        <div style={{backgroundColor:"#0b4885"}}>
        <Layout>
        <section className="pt-5 pb-5" style={{backgroundColor:"#fcfcfa"}}>

        <div className="container pt-5 pb-5">
            <h2>Reset Password</h2>
            <hr/>
            {showError()}
            {showMessage()}
            {check && passwordResetForm()}
            <br/>
            <Link href="/auth/password/forgot">
          <a className="btn btn-outline-danger text-center">Reset Password</a>
        </Link>
        </div>
        </section>
        <br/>
    </Layout>
</div>
   
    </>
)
}
export default withRouter(ResetPassword)