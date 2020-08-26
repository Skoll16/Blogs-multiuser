import Layout from "../../../components/Layout";
import BlogUpdate from "../../../components/crud/BlogUpdate";
import Private from '../../../components/auth/Private'

const Blog = () => {
  return (
    <div style={{backgroundColor:"#0b4885"}}>

    <Layout>
      <Private> 
        <div className="container-fluid" style={{backgroundColor:"#fcfcfa"}}>
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
            <h2 className="ml-3" style={{color:"#043a70", fontWeight:'bolder',fontSize:'40px'}}>Update blog</h2>
            </div>

            <div className="col-md-12">
              <ul className="list-group">
                <BlogUpdate />
              </ul>
            </div>
          
          </div>
        </div>
      </Private>
    </Layout>
    </div>
  );
};
export default Blog;
