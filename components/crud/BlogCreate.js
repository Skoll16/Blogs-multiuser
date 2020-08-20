import Link from "next/link";
import { useState, useEffect } from "react";
import Router from "next/router";
import dynamic from "next/dynamic";
// dynamic is used to render only in client side not on server side
import { withRouter } from "next/router";
// withrouter se we route to pages with passing of component like props in react
import { getCookie, isAuth } from "../../actions/auth";
import { getCategories } from "../../actions/category";
import { getTags } from "../../actions/tag";
import { createBlog } from "../../actions/blog";
// quill se edit krenge like font style n all for blog
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "../../node_modules/react-quill/dist/quill.snow.css";
import '../../static/css/style.css'
import { QuillModules, QuillFormats } from "../../helpers/quill";

const BlogCreate = ({ router }) => {
  const blogFromLS = () => {
    if (typeof window === "undefined") return false;
    else {
      if (localStorage.getItem("blog")) {
        return JSON.parse(localStorage.getItem("blog"));
      } else return false;
    }
  };

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const [checked, setChecked] = useState([]);
  const [checkedTag, setCheckedTag] = useState([]);

  const [body, setBody] = useState(blogFromLS());
  const [values, setValues] = useState({
    error: "",
    sizeError: "",
    success: false,
    formData: "",
    title: "",
    hidePublishButton: false,
  });

  const {
    error,
    sizeError,
    success,
    formData,
    title,
    hidePublishButton,
  } = values;

  const token = getCookie("token");

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    // when component mounts we can use the form data as the it will be available
    initCategories();
    initTags();
  }, [router]);

  const handleToggle = (c) => () => {
    //   console.log(c)
    setValues({ ...values, error: "" });
    // checking for uncheck category if not index would be -1
    const clickedCategory = checked.indexOf(c);
    const all = [...checked];
    if (clickedCategory === -1) {
      all.push(c);
    } else {
      all.splice(clickedCategory, 1);
      // /above we remove the uncheck one
    }
    setChecked(all)

    formData.set("categories", all);
  };

  const handleTagsToggle = (t) => () => {
    setValues({ ...values, error: "" });
    // checking for uncheck category if not index would be -1
    const clickedTag = checkedTag.indexOf(t);
    const all = [...checkedTag];
    if (clickedTag === -1) {
      all.push(t);
    } else {
      all.splice(clickedTag, 1);
      // /above we remove the uncheck one
    }
    setCheckedTag(all)

    formData.set("tags", all);
  };

  const showCategories = () => {
    return (
      categories &&
      categories.map((c, i) => (
        <li key={i} className="list-unstyle">
          <input
            onChange={handleToggle(c._id)}
            type="checkbox"
            className="mr-2"
          />
          <label className="form-check-label">{c.name}</label>
        </li>
      ))
    );
  };

  const showTags = () => {
    return (
      tags &&
      tags.map((t, i) => (
        <li key={i} className="list-unstyle">
          <input
            onChange={handleTagsToggle(t._id)}
            type="checkbox"
            className="mr-2"
          />
          <label className="form-check-label">{t.name}</label>
        </li>
      ))
    );
  };

  const initCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setCategories(data);
      }
    });
  };

  const initTags = () => {
    getTags().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setTags(data);
      }
    });
  };

  const publishBlog = (e) => {
    e.preventDefault();

    createBlog(formData, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          title: "",
          error: "",
          success: `A new Blog titled "${data.title}" is created`,
        });
        setBody("");
        setCategories([]);
        setTags([]);
      }
    });
  };

  const handleChange = (name) => (e) => {
    // fn returning another function
    const value = name === "photo" ? e.target.files[0] : e.target.value;

    // here name can be title it can be a photo or anything
    formData.set(name, value);

    // setvalue mai formData:formdtaa likhne ki zarrurt nhi hai same hi baat hai ek likho
    setValues({ ...values, [name]: value, formData, error: "" });
  };

  const handleBody = (e) => {
    setBody(e);
    formData.set("body", e);
    if (typeof window !== "undefined") {
      localStorage.setItem("blog", JSON.stringify(e));
    }
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );
  const showSuccess = () => (
    <div
      className="alert alert-success"
      style={{ display: success ? "" : "none" }}
    >
      {success}
    </div>
  );

  const createBlogForm = () => {
    return (
      <form onSubmit={publishBlog}>
        <div className="form-group">
          <label style={{color:"#043a70",fontSize:"20px"}}>Title</label>
          <input
            className="form-control"
            value={title}
            onChange={handleChange("title")}
          />
        </div>
        <div className="form-group">
          <ReactQuill
            modules={QuillModules}
            formats={QuillFormats}
            value={body}
            placeholder="Write your imagination..."
            onChange={handleBody}
          />
        </div>
        <div>
          <button type="submit" className="btn btn-outline-info">
            Publish
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="container-fluid">
    <div class="row">
    <div className="col-md-8">
        {createBlogForm()}
        <div className="pt-5">
          {showError()}
          {showSuccess()}
        </div>
      </div>
      <div className="col-md-4">
        <div>
          <div className="form-group pb-2">
            <h2 style={{color:"#0b4885"}} >Featured Image</h2>
            <hr />
            <label className="btn btn-outline-info " >
              Upload Image
              <input
                onChange={handleChange("photo")}
                type="file"
                accept="image/*"
                hidden
              />
            </label><br/>
            <small style={{color:"#0b4885"}} >Maximum size: 1mb</small>

          </div>
        </div>

        <div>
          <h2 style={{color:"#0b4885"}} >Categories</h2>
          <hr />
          <ul style={{ maxHeight: "200px", overflowY: "scroll" }}>
            {showCategories()}
          </ul>
        </div>
        <br/>
        <div className="pt-10 ">
          <h2 style={{color:"#0b4885"}} >Tags</h2>
          <hr />
          <ul style={{ maxHeight: "200px", overflowY: "scroll" }}>
            {showTags()}
          </ul>
        </div>
      </div>
    </div>
      
    </div>
  );
};

export default withRouter(BlogCreate);
