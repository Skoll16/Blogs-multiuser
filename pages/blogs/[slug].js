import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import { useState, useEffect } from "react";
import moment from "moment";
import RenderHTML from "react-render-html";
import { singleBlog, listRelated } from "../../actions/blog";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import SmallCard from "../../components/blog/SmallCard";

import DisqusThread from '../../components/DisqusThread'

const SingleBlog = ({ blog, query }) => {
  const [related, setRelated] = useState([]);

  const loadRelated = () => {
    listRelated({ blog }).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setRelated(data);
      }
    });
  };

  useEffect(() => {
    loadRelated();
  }, []);
  const head = () => {
    return (
      <Head>
        <title>
          {blog.title} | {APP_NAME}
        </title>
        <meta name="description" content={blog.mdesc} />
        <link rel="canonical" href={`${DOMAIN}/blog/${query.slug}`} />
        <meta property="og:title" content={`${blog.title} | ${APP_NAME}`} />
        <meta property="og:description" content={blog.mdesc} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${DOMAIN}/blog/${query.slug}`} />
        <meta property="og:site_name" content={`${APP_NAME}`} />
        <meta property="og:image" content={`${API}/blog/photo/${blog.slug}`} />
        <meta
          property="og:image:secure_url"
          content={`${API}/blog/photo/${blog.slug}`}
        />
        <meta property="og:image:type" content="image/jpg" />
        <meta property="fb:app_id" content={`${FB_APP_ID}`} />
      </Head>
    );
  };

  const showBlogCategories = (blog) => {
    return blog.categories.map((c, i) => (
      <Link key={i} href={`/categories/${c.slug}`}>
       <a className="  mr-1 ml-1 mt-3" style={{color:"#18aded",fontSize:'25px'}}>{c.name}</a>
       
      </Link>
    ));
  };

  const showBlogTags = (blog) => {
    return blog.tags.map((t, i) => (
      <Link key={i} href={`/tags/${t.slug}`}>
        <a className="  mr-1 ml-1 mt-3" style={{color:"#18aded",fontSize:'25px'}}>{t.name}</a>
      </Link>
    ));
  };

  const showRelatedBlogs = () => {
    console.log(related)
    return related.map((b, i) => (
      <div className="col-md-4 " key={i}>
        <article>
          <SmallCard blog={b} />
        </article>
      </div>
    ));
  };


 const showComments=()=>{
   return (
     <div>
       <DisqusThread  id={blog._id} title={blog.title} path={`/blog/${blog.slug}`} />
     </div>
   )
 }




  return (
    <>
      {head()}
     <div style={{backgroundColor:"#043a70"}}>
     <Layout>
        <main style={{backgroundColor:"#fcfcfa"}}>
          <article>
            <div className="container-fluid">
              <section >
                <div className="container">
                <div className="row pt-4">
                  <img
                  
                    src={`${API}/blog/photo/${blog.slug}`}
                    alt={blog.title}
                    className="img img-fluid featured-image "
                    style={{width:'100%',maxHeight : '500px', objectFit: 'cover',border: "2px solid #043a70"}}
                  />
                </div>
                </div>
              </section>
              <section >
                <div className="container">
                  <h1 className="display-2 pb-3 text-center font-weight-bold pt-3"  style={{color:"#043a70"}}>
                    {blog.title}
                  </h1>
                  <p className="lead mt-3 mark">
                    Written By <Link href={`/profile/${blog.postedBy.username}`}><a>{blog.postedBy.username}
                    </a></Link> | Published{" "}
                    {moment(blog.updatedAt).fromNow()}
                  </p>
                  {/* <div class="row">
        <div class="col-lg-6 col-md-6 col-12 footer-div">
          <div className="text-center" style={{color:"#043a70", fontWeight:'bolder',fontSize:'30px'}}>
           Category<br/>
           {showBlogCategories(blog)}
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12 footer-div">
        <div className="text-center" style={{color:"#043a70", fontWeight:'bolder',fontSize:'30px'}}>
           Tag<br/>
           {showBlogTags(blog)}
          </div>
        </div>
        
      </div> */}
      <section> 
      <div className="container pt-2">
      <div className="row">
      <div class="col-lg-6 col-md-6 col-12 footer-div">

      <div className="text-center font-weight-bold" style={{color:"#043a70", fontWeight:'bolder',fontSize:'30px'}}>
           Categories {' '}:{' '} 
           {showBlogCategories(blog)}          </div></div>
           <div class="col-lg-6 col-md-6 col-12 footer-div">

           <div className="text-center font-weight-bold" style={{color:"#043a70", fontWeight:'bolder',fontSize:'30px'}}>
           Tags {' '}:{' '} 
           {showBlogTags(blog)}      
              </div></div>
       
        </div>
      </div>
       
        <br />
        <br />
      </section>
                  {/* <div className="pb-3">
                    <br />
                    <br />
                  </div> */}
                </div>
              </section>
            </div>

            <div className="container">
              <section>
                <div className="col-md-12 lead pb-2">{RenderHTML(blog.body)}</div>
                <hr style={{color:"#043a70", border:"1px solid #043a70"}}/>
              </section>
            </div>
            

            <div className="conatiner pb-5">
              <h4 className="text-center pt-3 pb-4 h2"> Related Blogs</h4>
               
               <div className="row mx-2">{showRelatedBlogs()}</div>
            </div>

            <div className="container pt-5 pb-5">
              {showComments()}
            </div>
          </article>
        </main>
      </Layout>
     </div>
    </>
  );
};

SingleBlog.getInitialProps = ({ query }) => {
  // server side mai parameter query hota hai where as in client side it is router
  return singleBlog(query.slug).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { blog: data, query };
    }
  });
};

export default SingleBlog;
