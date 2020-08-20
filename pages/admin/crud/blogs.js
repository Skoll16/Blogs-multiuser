import Layout from "../../../components/Layout";
import BlogCreate from "../../../components/crud/BlogCreate";
import Admin from '../../../components/auth/Admin'

const Blog = () => {
  // #f7991e
  return (
   <div style={{backgroundColor:"#0b4885"}}>
      <Layout > 
      <Admin> 
        <div className="container-fluid" style={{backgroundColor:"#fcfcfa"}}>
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2 style={{color:"#0b4885"}} >Create a new blog</h2>
            </div>

            <div className="col-md-12">
              <ul className="list-group"> 
                <BlogCreate />
              </ul>
            </div>
          
          </div>
        </div>
      </Admin>
    </Layout>
   </div>
  );
};
export default Blog;
