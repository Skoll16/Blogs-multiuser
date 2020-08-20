import Layout from "../../components/Layout";
import Link from "next/link";
import Private from "../../components/auth/Private";
import ProfileUpdate from '../../components/auth/ProfileUpdate'
const UserProfileUpdate = () => {
  return (
    <div style={{backgroundColor:"#043a70"}}>
     <Layout>    
      <Private>
      <ProfileUpdate/>        
         
      </Private>
    </Layout>
</div>
   
  );
};
export default UserProfileUpdate;
