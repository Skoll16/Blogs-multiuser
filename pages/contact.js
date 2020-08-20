import Layout from '../components/Layout'
import Link from 'next/link'
import ContactForm from '../components/form/ContactForm'
const Contact=()=>{
    return (
        <div style={{backgroundColor:"#043a70"}}>
         <Layout>
        <div className="container-fluid pt-5 pb-2" style={{backgroundColor:"#fcfcfa"}}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <h2 style={{color:"#0b4885" ,fontWeight:"bolder"}}>Contact Form</h2>
                    <hr/>
                    <ContactForm/>
                </div>
            </div>
        </div>
        
        </Layout>
        </div>
      
    )
}
export default Contact;