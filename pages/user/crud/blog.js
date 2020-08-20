import Layout from "../../../components/Layout";
import BlogCreate from "../../../components/crud/BlogCreate";
import Private from '../../../components/auth/Private'

const CreateBlog = () => {
  return (
    <div style={{backgroundColor:"#0b4885"}}>
    <Layout>
      <Private> 
      <div className="container-fluid" style={{backgroundColor:"#fcfcfa"}}>
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Create a new blog</h2>
            </div>

            <div className="col-md-12">
              <ul className="list-group">
                <BlogCreate />
              </ul>
            </div>
          
          </div>
        </div>
      </Private>
    </Layout>
</div>
    
  );
};
export default CreateBlog;
