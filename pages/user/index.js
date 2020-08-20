import Layout from "../../components/Layout";
import Link from "next/link";
import Private from "../../components/auth/Private";
const UserIndex = () => {
  return (
    <div style={{backgroundColor:"#043a70"}}>
    <Layout>
      <Private>
       <section style={{backgroundColor:"#fcfcfa"}}>
       <div className="pb-5 text-center" style={{marginLeft:"auto",marginRight:"auto",}}>

       <div className="container">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
            <h2 className="text-center" style={{color:"#043a70", fontWeight:'bolder',fontSize:'30px' ,
            textDecoration:"none"}}>
              User Dashboard</h2>
            </div>

            <div className="pb-5 text-center" style={{marginLeft:"auto",marginRight:"auto",}}>
              <ul className="list-group">
                <li className="list-group-item">
                  <a href="/user/crud/blog" style={{color:"#0b4885", fontWeight:'bolder',fontSize:'25px',textDecoration:"none"}}>Create Blog</a>
                </li>
                <br/>
                <li className="list-group-item">
                  <Link href="/user/crud/blogs">
                  <a style={{color:"#0b4885", fontWeight:'bolder',fontSize:'25px',textDecoration:"none"}}>Update/Delete Blog</a>
                  </Link>
                </li>
                <br/>
                <li className="list-group-item">
                  <a href="/user/update" style={{color:"#0b4885", fontWeight:'bolder',fontSize:'25px',textDecoration:"none"}}>Update Profile</a>
                </li>
              </ul>
            </div>
          </div>
          </div>
        </div>
       </section>
      </Private>
    </Layout>

</div>
      );
};
export default UserIndex;
