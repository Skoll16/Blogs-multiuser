import Link from "next/link";
import { useState, useEffect } from "react";
import Router from "next/router";
import { getCookie, isAuth } from "../../actions/auth";
import { list, removeBlog } from "../../actions/blog";
import moment from "moment";

const BlogRead = ({username}) => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState("");
  const token = getCookie("token");

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = () => {
    list(username).then((data) => {
        // console.log(data)
      if (data.error) {
        console.log(data.error);
      }
      setBlogs(data);
    });
  };

  const deleteBlog = (slug) => {
    removeBlog(slug, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setMessage(data.message);
        loadBlogs();
      }
    });
  };

  const deleteConfirm = (slug) => {
    let answer = window.confirm("Are you sure you want to delete your blog ?");
    if (answer) {
      deleteBlog(slug);
    }
  };

  const showUpdateButton = (blog) => {
    if (isAuth() && isAuth().role === 0) {
      return (
        <Link href={`/user/crud/${blog.slug}`}>
          <a className="ml-2 btn btn-sm btn-outline-warning"> Update</a>
        </Link>
      );
    }
    else if(isAuth() && isAuth().role===1){
        return(
            <Link href={`/admin/crud/${blog.slug}`}>
          <a className="ml-2 btn btn-sm btn-outline-warning"> Update</a>
          </Link>
        )
    }
  };

  const showAllBlogs = () => {
    //   console.log(blogs)
    return blogs.map((b, i) => (
      <div key={i} className="pb-5">
        <h3 style={{color:"#043a70",fontSize:'30px'}}>{b.title}</h3>
        <p className="mark">
          Written By {b.postedBy.name} | Published on{" "}
          {moment(b.updatedAt).fromNow()}
        </p>
        <button
          className="btn btn-sm btn-danger"
          onClick={() => deleteConfirm(b.slug)}
        >
          Delete
        </button>
        {showUpdateButton(b)}
        <br/>
        <br/>
        <hr style={{color:"#043a70", border:"1px solid #043a70"}}/>
        
      </div>
    ));
  };

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          {message && <div className="alert alert-warning">{message}</div>}
          {showAllBlogs()}
        </div>
      </div>
    </>
  );
};

export default BlogRead;
