import moment from "moment";
import renderHTML from "react-render-html";
import Link from "next/link";
import { API } from "../../config";

const Card = ({ blog }) => {
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
        <a className=" mr-1 ml-1 mt-3" style={{color:"#18aded",fontSize:'25px'}}>{t.name}</a>
      </Link>
    ));
  }; 

  return (
    <div className="container lead pb-4">
      <header>
        <Link href={`/blogs/${blog.slug}`}>
          <a>
            <h2 className="pt-3 pb-3  font-weight-bold" style={{color:"#043a70"}}>{blog.title}</h2>
          </a>
        </Link>
      </header>
      <section>
        <p className="mark ml-1 pt-2 pb-2"> 
          Written By {' '}
          <Link  href={`/profile/${blog.postedBy.username}`} prefetch={false}>
            <a >{blog.postedBy.username}</a>
          </Link> {' '}
          | Published {moment(blog.updatedAt).fromNow()}
        </p>
      </section>

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

<div className="row">
        <div className="col-md-3">
          <section>
            <img
              className="img img-fluid"
              style={{ maxHeight: "auto", width: "100%",border: "2px solid #043a70"}}
              src={`${API}/blog/photo/${blog.slug}`}
              alt={blog.title}
            ></img>
          </section>
        </div>

        <div className="col-md-9">
          <section>
            <div className="pb-3">
              {renderHTML(blog.excerpt)}
              {/* {blog.excerpt} */}
            </div>
            <Link href={`/blogs/${blog.slug}`}>
              <a className="btn btn-outline-primary pt-2">Read More</a>
            </Link>
            
          </section>
          
        </div>
</div>
     
    </div>
  );
};

export default Card;
