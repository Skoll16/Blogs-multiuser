import fetch from "isomorphic-fetch";
import { API } from "../config";


export const emailContactForm = (data) => {
 let emailEndPoint;
 if(data.authorEmail){
   emailEndPoint=`${API}/contact-blog-author`
 }
 else{
   emailEndPoint=`${API}/contact`
 }

  return fetch(`${emailEndPoint}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      'Content-Type':"application/json"
    },
    body: JSON.stringify(data),
    // not a json data therefore simple body:blog
  })
  .then(response => {
    return response.json();
})
.catch(err => console.log(err));
};


export const listBlogWithCategoriesAndTags = (limit,skip) => {
  const data={limit,skip}
  return fetch(`${API}/blogs-categories-tag`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      'Content-Type':"application/json"
    },
    body:JSON.stringify(data)
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};


export const  singleBlog=slug=>{
  return fetch(`${API}/blog/${slug}`,{
    method:'GET'
  }).then(response=>{
    return response.json()
  })
  .catch(err=>console.log(err))
}


export const listRelated = (blog) => {
  // const data={limit,skip}
  return fetch(`${API}/blogs/related`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      'Content-Type':"application/json"
    },
    body:JSON.stringify(blog)
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};


export const  list=(username)=>{

  let listBlogsEndPoint;
  if(username){
    listBlogsEndPoint=`${API}/${username}/blogs`
  }
  else{
    listBlogsEndPoint=`${API}/blog`
  }
 
  return fetch(`${listBlogsEndPoint}`,{
    method:'GET'
  }).then(response=>{
    return response.json()
  })
  .catch(err=>console.log(err))
}

export const removeBlog = (slug, token) => {
  let deleteBlogEndPoint;
  if(isAuth() && isAuth().role===1){
    deleteBlogEndPoint=`${API}/blog/${slug}`
  }
  else if(isAuth() && isAuth().role==0){
    deleteBlogEndPoint=`${API}/user/blog/${slug}`
  }
 


  return fetch(`${deleteBlogEndPoint}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    }
  })
    .then((response) => {
      handleResponse(response)
      return response.json();
    })
    .catch((err) => console.log(err));
};



export const updateBlog = (blog, token, slug) => {

  let updateBlogEndPoint;
  if(isAuth() && isAuth().role===1){
    updateBlogEndPoint=`${API}/blog/${slug}`
  }
  else if(isAuth() && isAuth().role==0){
    updateBlogEndPoint=`${API}/user/blog/${slug}`
  }
 



  return fetch(`${updateBlogEndPoint}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: blog,
    // not a json data therefore simple body:blog
  })
    .then((response) => {
      handleResponse(response)

      return response.json();
    })
    .catch((err) => console.log(err));
};



export const  listSearch=(params)=>{
  console.log('query search',params)
  let query=queryString.stringify(params)
  console.log('query search',query)

  return fetch(`${API}/blogs/search?${query}`,{
    method:'GET'
  }).then(response=>{
    return response.json()
  })
  .catch(err=>console.log(err))
}