import {useState} from 'react'
import Layout from '../../../components/Layout'
import {forgotPassword} from '../../../actions/auth'

const ForgotPassword=()=>{

    const [values,setValues]=useState({
        email:'',
        message:'',
        error:'',
        showForm:true
    })

    const {email,message,error,showForm}=values

    const handleChange=name=>e=>{
        setValues({...values,message:'',error:'',[name]:e.target.value})
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        setValues({...values,message:'',error:''})
        forgotPassword({email}).then(data=>{
            if(data.error){
                setValues({...values,error:data.error})
            }
            else{
                setValues({...values,message:data.message,email:'',showForm:false})
            }
        })
    }

    const showError = () => (error ? <div className="alert alert-danger">{error}</div> : '');
    const showMessage = () => (message ? <div className="alert alert-success">{message}</div> : '');

const passwordForgotForm=()=>(
        <form onSubmit={handleSubmit}>
            <div>
              <input  type="email" onChange={handleChange('email')} 
              className="form-control" value={email} placeholder="Enter email" required />
            </div>
            <div className="pt-3 text-center"><button className="btn btn-primary">Send password resent Link</button></div>
        </form>
)

return(
    <>
    <div style={{backgroundColor:"#0b4885"}}>
    <Layout>
    <section className="pt-5 pb-5" style={{backgroundColor:"#fcfcfa"}}>

        <div className="container pt-5 pb-5">
        <h2 style={{color:"#043a70", fontWeight:'bolder',fontSize:'30px'}}>Forgot Password</h2>

            <hr/>
            {showError()}
            {showMessage()}
            { showForm && passwordForgotForm()}
        </div>
        </section>
        <br/>
        
    </Layout>
    </div>
    </>
)
}

export default ForgotPassword