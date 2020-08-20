import Layout from "../components/Layout";
import Link from "next/link";
import Head from "next/head";
import { withRouter } from "next/router";
import {  isAuth } from "../actions/auth";

import { APP_NAME, DOMAIN, FB_APP_ID } from "../config";
const Index = ({ router }) => {
  const head = () => (
    <Head>
      <title>Mr. Blogger Blogs | {APP_NAME}</title>
      <meta name="description" content="Blogs around the globe" />
      <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
      <meta property="og:title" content={`Latest blogs | ${APP_NAME}`} />
      <meta property="og:description" content="Blogs around the globe" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
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
  const Background="/static/image/background.jpg"
  return (
     
    <>
      {head()}
      <div style={{backgroundImage: `url(${Background})`}}>
      <Layout>
        <div> 
          {" "}
          <h1 className="text-center mt-5" style={{ color: "white" }}>
            Have Some, Then Show Some
          </h1>
          <h2 className="text-center" style={{ color: "white" }}>
            Welcome to our blogging point
            <br />
          </h2>
        </div>{" "}

        
        <div className="text-center pt-5 pb-2">
        {isAuth() && isAuth().role === 0 && (
              
          <a
            className="btn btn-outline-primary"
            style={{ color: "white", fontSize: "30px", fontFamily: "bold" }}
            href="/user/crud/blog"
          >
            Create Blog
          </a>
            )}
            {isAuth() && isAuth().role === 1 && (
              <a
            className="btn btn-outline-primary"
            style={{ color: "white", fontSize: "30px", fontFamily: "bold" }}
            href="/admin/crud/blogs"
          >
            Create Blog
          </a>
            )}
            {!isAuth() && (
              <a
            className="btn btn-outline-primary"
            style={{ color: "white", fontSize: "30px", fontFamily: "bold" }}
            href="/user/crud/blogs"
          >
            Create Blog
          </a>
            )}
          {/* <a
            className="btn btn-outline-primary"
            style={{ color: "white", fontSize: "30px", fontFamily: "bold" }}
            href="/admin/crud/blogs"
          >
            Create Blog
          </a>{" "} */}
        </div>
        <section
          className="mt-5"
          style={{
            opacity: "0.5",
            color: "white",
            height: "400px",
            width: "100%",
          }}
        >
          <div className="container heading text-center"></div>
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-12">
                <div className="card text-center">
                  <div className="card">
                    <div
                      className="card-body text-center"
                      style={{
                        color: "black",
                        fontWeight: "bolder",
                        fontSize: "20px",
                      }}
                    >
                      Wanna read exicting blogs
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-12">
                <div className="card text-center">
                  <div className="card">
                    <div
                      className="card-body text-center"
                      style={{
                        color: "black",
                        fontWeight: "bolder",
                        fontSize: "20px",
                      }}
                    >
                      Search According to category
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-12">
                <div className="card text-center">
                  <div className="card">
                    <div
                      className="card-body text-center"
                      style={{
                        color: "black",
                        fontWeight: "bolder",
                        fontSize: "20px",
                      }}
                    >
                      Create Account
                    </div>
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
export default withRouter(Index);
