import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import { useState, useEffect } from "react";
import { withRouter } from "next/router";
import { listBlogWithCategoriesAndTags } from "../../actions/blog";
import Card from "../../components/blog/Card";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";

const Blogs = ({
  blogs,
  categories,
  tags,
  totalBlogs,
  blogLimit,
  blogSkip,
  router,
}) => {
  //har page mai ek head hota hai jo title n other contain krta hai agr uska kbhi html kholo toh isiliye yaah bhi ek bnayenge
  // use liye hum head component use kr rhe hai from next

  const head = () => {
    return (
      <Head>
        <title>Mr.Blooger Blogs | {APP_NAME}</title>
        <meta
          name="description"
          content="Mr. Blogger blogs are the best blog for you tu read"
        />
        <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
        <meta property="og:title" content={`Latest Blogs | ${APP_NAME}`} />
        <meta
          property="og:description"
          content="Mr. Blogger blogs are the best blog for you tu read"
        />
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
  };
  // uper head mai hum og mtlb opengraph use krenge jo social sites mai page add krte time img bhi show krwa dega

  const [limit, setLimit] = useState(blogLimit);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(totalBlogs);
  const [loadedBlogs, setLoadedBlogs] = useState([]);

  const loadMoreBlogs = () => {
    let toSkip = skip + limit;
    listBlogWithCategoriesAndTags(limit, toSkip).then((data) => {
      if (data.err) {
        console.log(data.error);
      } else {
        setLoadedBlogs([...loadedBlogs, ...data.blogs]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const LoadMOreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMoreBlogs} className="btn btn-outline-primary ">
          
          Load more
        </button>
      )
    );
  };

  const showAllBlogs = () => {
    return blogs.map((blog, i) => {
      // yaah agr {} use na krte aur () use krte toh return nhi krna padhta article ko
      return (
        <article key={i}>
          <Card blog={blog} />
          <div className="mx-5"><hr style={{color:"#043a70", border:"1px solid #043a70"}}/></div>
        </article>
      );
    });
  };

  const showAllCategories = () => {
    return categories.map((b, i) => (
      <Link key={i} href={`/categories/${b.slug}`}>
        <a className="btn btn-outline-info mr-1 ml-1 mt-3" style={{color:"#043a70",fontSize:'20px'}}>{b.name}</a>
        
      </Link>
    )); 
  };

  const showAllTags = () => {
    return tags.map((t, i) => (
      <Link key={i} href={`/tags/${t.slug}`}>
        <a className="btn btn-outline-info mr-1 ml-1 mt-3" style={{color:"#043a70",fontSize:'20px'}}>{t.name}</a>
      </Link>
    ));
  };
  
  const showLoadedBlogs = () => {
    return loadedBlogs.map((blog, i) => (
      <article key={i}>
        <Card blog={blog} />
        <hr />
      </article>
    ));
  };


  return (
    <>
      <div style={{backgroundColor:"#043a70"}}>
      {head()}
      <Layout>
        <main>
            
            <section className="pt-3 pb-5" style={{backgroundColor:"#fcfcfa"}}>
            <div class="container" >
      <div class="row">
        <div class="col-lg-6 col-md-6 col-12 footer-div">
          <div className="text-center" style={{color:"#043a70", fontWeight:'bolder',fontSize:'30px'}}>
           Categories<br/>
           {showAllCategories()}
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12 footer-div">
        <div className="text-center" style={{color:"#043a70", fontWeight:'bolder',fontSize:'30px'}}>
           Tags<br/>
           {showAllTags()}
          </div>
        </div>
        
      </div>
   
            </div>
            <br/>
            <div className="mx-5"><hr style={{color:"#043a70", border:"1px solid #043a70"}}/></div>
          <div className="container-fluid">{showAllBlogs()}</div>
          <div className="container-fluid"   style={{backgroundColor :"#fcfcf"}}>{showLoadedBlogs()}</div>
          <div className="pt-5 pb-5 text-center"> {LoadMOreButton()}</div>
            </section>
            

        </main>
      </Layout>

      </div>    </>
  );
};

// getintialprops hels to load the page from the server for the first time also it can only be use in pages and in components

Blogs.getInitialProps = () => {
  let skip = 0;
  let limit = 2;

  return listBlogWithCategoriesAndTags(limit, skip).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {
        blogs: data.blogs,
        categories: data.categories,
        tags: data.tags,
        totalBlogs: data.size,
        blogLimit: limit,
        blogSkip: skip,
        // ab yeh jo blog hai yeh ek property ban gya hai and can be used in this page as props
      };
    }
  });
};

export default withRouter(Blogs);
