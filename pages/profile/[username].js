import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import moment from "moment";
import { userPublicProfile } from "../../actions/user";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import ContactForm from '../../components/form/ContactForm'

const UserProfile = ({ user, blogs, query }) => {
  const head = () => {
    return (
      <Head>
        <title>
          {user.username} | {APP_NAME}
        </title>
        <meta name="description" content={`Blogs by ${user.username}`} />
        <link rel="canonical" href={`${DOMAIN}/profile/${query.username}`} />
        <meta property="og:title" content={`${user.username} | ${APP_NAME}`} />
        <meta property="og:description" content={`Blogs by ${user.username}`} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${DOMAIN}/profile/${query.username}`}
        />
        <meta property="og:site_name" content={`${APP_NAME}`} />
        <meta property="og:image" content={`${DOMAIN}/static/image/dark.jpg`} />
        <meta
          property="og:image:secure_url"
          content={`${DOMAIN}/static/image/dark.jpg`}
        />
        <meta property="og:image:type" content="image/jpg" />
        <meta property="fb:app_id" content={`${FB_APP_ID}`} />
      </Head>
    );
  };

  const showUserBlogs = () => {
    return blogs.map((blog, i) => (
      <div key={i} className="mb-4">
        <Link href={`/blogs/${blog.slug}`}>
          <a className="lead">{blog.title}</a>
        </Link>
      </div>
    ));
  };

  return (
    <>
      {head()}
      <div style={{backgroundColor:"#043a70"}}>
      <Layout>
       <section className="pt-5 pb-3" style={{backgroundColor:"#fcfcfa"}}>
       <div className="container" >
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-8">
                    <h5 style={{color:"#043a70", fontWeight:'bolder',fontSize:'30px'}}>{user.name}</h5>
                  <p className="text-muted">
                    Joined {moment(user.createdAt).fromNow()}
                  </p>
                    </div>
                    <div className="col-md-4">
                    <img
              src={`${API}/user/photo/${user.username}`}
              className="img img-fluid img-thumbnail mb-3"
              style={{ maxHeight: "auto", maxWidth: "100%" }}
              alt="user profile"
            />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="container pb-5">
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title  pt-4 pb-4 pl-4 pr-4 text-light" style={{backgroundColor:"#043a80"}}>
                    Recent blogs by {user.name}
                  </h5>
                  <br />
                  {showUserBlogs()}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title   pt-4 pb-4 pl-4 pr-4 text-light" style={{backgroundColor:"#043a80"}}>
                    Message {user.name}
                  </h5>
                  <br />
                  <ContactForm authorEmail={user.email}/> 
                </div>
              </div>
            </div>
          </div>
        </div>
       </section>
      </Layout>
</div>
      
    </>
  );
};

UserProfile.getInitialProps = ({ query }) => {
  // server side mai parameter query hota hai where as in client side it is router
  return userPublicProfile(query.username).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { user: data.user, blogs: data.blogs, query };
    }
  });
};

export default UserProfile;
