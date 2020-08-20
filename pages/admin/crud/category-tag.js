import Layout from "../../../components/Layout";
import Link from "next/link";
import Admin from "../../../components/auth/Admin";
import Category from "../../../components/crud/Category";
import Tag from "../../../components/crud/Tag";

const CategoryTag = () => {
  return (
    <div style={{backgroundColor:"#0b4885"}}>
    
    <Layout>
      <Admin>
        <section  className="pb-5" style={{backgroundColor:"#fcfcfa"}}>
        <div className="container pb-5">
          <div className="row">
            <div className=" text-center col-md-12 pt-5 pb-5">
              <h2 style={{color:"#043a70", fontWeight:'bolder',fontSize:'30px'}}>Manage Categories and Tags</h2>
            </div>

            <div className="col-md-6">
            <h2 style={{color:"#043a70", fontWeight:'bolder',fontSize:'30px'}}> Categories </h2>

              <ul className="list-group">
                <Category />
              </ul>
            </div>
            <div className="col-md-6">
            <h2 style={{color:"#043a70", fontWeight:'bolder',fontSize:'30px'}}> Tags </h2>

<Tag/>
            </div>
          </div>
        </div>
        </section>
      </Admin>
    </Layout>
    </div>

  );
};
export default CategoryTag;
