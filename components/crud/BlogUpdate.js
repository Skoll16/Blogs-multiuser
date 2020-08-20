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
import { singleBlog, updateBlog } from "../../actions/blog";
// quill se edit krenge like font style n all for blog
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "../../node_modules/react-quill/dist/quill.snow.css";
import "../../static/css/style.css";
import { QuillModules, QuillFormats } from "../../helpers/quill";
import {API} from '../../config'

const BlogUpdate = ({ router }) => {
  const [body, setBody] = useState('');

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const [checked, setChecked] = useState([]);
  const [checkedTag, setCheckedTag] = useState([]);

  const [values, setValues] = useState({
    title: "",
    error: "",
    success: "",
    formData: "",
    title: "",
    body: "",
  });

  const { title, error, success, formData } = values;

  const token = getCookie("token");

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initBlog();
    initCategories();
    initTags();

  }, [router]);

  const initBlog = () => {
    if (router.query.slug) {
      singleBlog(router.query.slug).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setValues({ ...values, title: data.title });
          setBody(data.body);
          setCategoriesArray(data.categories)
          setTagsArray(data.tags)
        }
      });
    }
  };

  const setCategoriesArray=(blogCategories)=>{
   let ca=[]
    blogCategories.map((c,i)=>{
         ca.push(c._id)
  })
  setChecked(ca)
  }

  const setTagsArray=(blogTags)=>{
    let ta=[]
    blogTags.map((t,i)=>{
          ta.push(t._id)
   })
   setCheckedTag(ta)
   }

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

  const findOutCategory=(c)=>{
 const result=checked.indexOf(c)
 if(result!== -1){
     return true;
    //  basically check nhi hogi toh true return krke niche checked mai true hojayega
 }
 else{
     return false
 }
  }

  const findOutTag=(t)=>{
    const result=checkedTag.indexOf(t)
    if(result!== -1){
        return true;
       //  basically check nhi hogi toh true return krke niche checked mai true hojayega
    }
    else{
        return false
    }
     }


  const showCategories = () => {
    return (
      categories &&
      categories.map((c, i) => (
        <li key={i} className="list-unstyle">
          <input
            onChange={handleToggle(c._id)}
            // checked={findOutCategory(c._id)}
            checked={findOutCategory(c._id)}
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
            checked={findOutTag(t._id)}
            type="checkbox"
            className="mr-2"
          />
          <label className="form-check-label">{t.name}</label>
        </li>
      ))
    );
  };

  const handleToggle = (c) => () => {
      console.log(c)
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
  console.log(all)
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
    console.log(all)
setCheckedTag(all)
    formData.set("tags", all);
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
    console.log(e)
    setBody(e);
    formData.set('body', e);
  };

  const editBlog = (e) => {
    // console.log(e)
   e.preventDefault()
   updateBlog(formData,token,router.query.slug).then(data=>{
       if(data.error){
         console.log(data.error)
           setValues({...values,error:data.error})
       }else{
        console.log(e)
     
           setValues({...values,title:'',success:`Blog titled ${data.title} is successfully updated`});
           if(isAuth() && isAuth().role===1){
               Router.replace('/admin')
           }
           
           else if(isAuth() && isAuth().role===0){
            Router.replace('/user')   
                }
 
           
        }
   })


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


  const updateBlogForm = () => {
    return (
      <form onSubmit={editBlog}>
        <div className="form-group">
          <label style={{color:"#043a70",fontSize:"30px"}}>Title</label>
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
            Update
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="container-fluid pb-4" >
    
      <div className="row">
      <div className="col-md-12 pb-4" style={{marginBottom:"6px"}}>
      {body && (
            <img src={`${API}/blog/photo/${router.query.slug}`} alt={title} className="img img-fluid featured-image "
                    style={{width:'100%',maxHeight : '500px', objectFit: 'cover',border: "2px solid #043a70"}}/>
            )} 
      </div>

     
        <div className="col-md-8">
          {updateBlogForm()}
          <div className="pt-3">
            {showError()}
            {showSuccess()}
          
          </div>
          
        </div>
        <div className="col-md-4">
        <div>
          <div className="form-group pb-2 pt-4  ">
          <h2 style={{color:"#0b4885"}} >Featured Image</h2>
            <hr />
            <label className="btn btn-outline-info ">
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

export default withRouter(BlogUpdate);
