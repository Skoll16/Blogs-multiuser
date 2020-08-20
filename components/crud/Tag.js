import { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { isAuth, getCookie } from "../../actions/auth";
import { create,getTags,removeTag,singleTag } from "../../actions/tag";

const Tag = () => {
  const [values, setValues] = useState({
    name: "",
    error: false,
    success: false,
    tags: [],
    removed: false,
    reload:false
  });

  const { name, error, success, removed, tags,reload} = values;
  const token = getCookie("token");

useEffect(()=>{
    loadTags()
},[reload])

const loadTags=()=>{
    getTags().then(data=>{
        if(data.error){
            console.log(data.error)
        }
        else{
            setValues({...values,tags:data})
        }
    })
}

// loop through tags

const showTags=()=>{
    return tags.map((c,i)=>{
        return <button onDoubleClick={()=>deleteConfirm(c.slug)} title="Double click to delete" key={i} 
        className="btn btn-outline-primary mr-1 ml-1 mt-4">{c.name}</button>
    })
}

// delete tag
const deleteConfirm=(slug)=>{
let answer=window.confirm('Are you sure you want to delete this tag?')
if(answer){
  deleteTag(slug)
}
}

const deleteTag=(slug)=>{

    removeTag(slug,token).then(data=>{
        if(data.error){
            console.log(data.error)
        }
        else{
        setValues({...values,error:false,success:false,reload:!reload,removed:true})
        }
    })
}

  const clickSubmit = (e) => {
    e.preventDefault();
    create({name},token).then(data=>{
        if(data.error){
            setValues({...values,error:data.error,success:false})
        }
        else{
            setValues({...values,error:false,success:true,name:'',removed:false,reload:!reload})
        }
    })
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      name: e.target.value,
      error: false,
      success: false,
      removed: "",
    });       
  };

const showSuccess=()=>{
    if(success){
        return <p className="text-success">Tag is created</p>
    }
}


const showError=()=>{
    if(error){
        return <p className="text-danger">Tag already exist</p>
    }
}
 
const showRemoved=()=>{
    if(removed){
        return <p className="text-danger">Tag is removed</p>
    }
}

const mouseMoveHandler=(e)=>{
setValues({...values,error:false,success:false,removed:''})
}


  const newTagForm = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="pt-4" style={{ color: "#043a70" }}>Name</label>
        <input
          className="form-control"
          type="text"
          onChange={handleChange}
          value={name}
          required
        />
        
      </div>
<div>
<button type="submit" className="btn btn-info">
          Create
        </button>
</div>
    </form>
  );
  return <>
  {showSuccess()} 
  {showError()}
  {showRemoved()}
  <div onMouseMove={mouseMoveHandler}>
  {newTagForm()}
  {showTags()}
  </div>
  </>;
};

export default Tag;
