import Layout from "../../components/Layout";
import Link from "next/link";
import Admin from "../../components/auth/Admin";
const AdminIndex = () => {
  return (
    
    <div style={{backgroundColor:"#043a70"}}>
      <Layout>
      <Admin>
      <section style={{backgroundColor:"#fcfcfa"}}>
        
      <div className="container " >
          <div className="row">
            <div className="col-md-12 pt-5 pb-5 mt-3">
            
              <h2 className="text-center" style={{color:"#043a70", fontWeight:'bolder',fontSize:'30px' ,textDecoration:"none"}}
              >Admin Dashboard</h2>
            </div>
   
<div className="pb-5 text-center" style={{marginLeft:"auto",marginRight:"auto",}}>
              <ul className="list-group mb-4" >
                <li className="list-group-item">
                  <Link href="/admin/crud/category-tag">
                    <a style={{color:"#0b4885", fontWeight:'bolder',fontSize:'25px',textDecoration:"none"}}>Create Category and Tags</a>
                  </Link>

                </li>
                <br/>

                <li className="list-group-item">
                  
                  <a href="/admin/crud/blogs" style={{color:"#0b4885", fontWeight:'bolder',fontSize:'25px' ,textDecoration:"none"}}>Create Blog</a>

                  
                </li>
                <br/>
                <li className="list-group-item">
                  <Link href="/admin/crud/blog">
                    <a style={{color:"#0b4885", fontWeight:'bolder',fontSize:'25px' ,textDecoration:"none"}}>Update/Delete Blog</a>
                  </Link>
                </li>
                <br/>
                <li className="list-group-item">
                  <Link href="/user/update">
                    <a style={{color:"#0b4885", fontWeight:'bolder',fontSize:'25px' ,textDecoration:"none"}}>Update Profile</a>
                  </Link>
                </li>
                <br/>
              </ul>
            </div>
</div>
            
          </div>
      </section>

      </Admin>
    </Layout>
    </div>
  );
};
export default AdminIndex;
