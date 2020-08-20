import Layout from "../../../components/Layout";
import BlogRead from "../../../components/crud/BlogRead";
import Private from '../../../components/auth/Private'
import {isAuth} from '../../../actions/auth'
const Blogs = () => {

const username=isAuth() && isAuth().username

  return (
    <div style={{backgroundColor:"#0b4885"}}>

    <Layout>
      <Private> 
      <section  style={{backgroundColor:"#fcfcfa"}}>

        <div className="container">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
            <h2 style={{color:"#043a70", fontWeight:'bolder',fontSize:'30px'}}>Manage Blogs</h2>
            </div>

            <div className="col-md-12">
              <ul className="list-group">
                <BlogRead username={username}/>
              </ul>
            </div>
          
          </div>
        </div>
        </section>
        <br/>
        <br/>
      </Private>
    </Layout>
    </div>
  );
};
export default Blogs;
