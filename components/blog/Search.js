import renderHTML from 'react-render-html'
import Link from 'next/link'
import {useState,useEffect} from 'react'
import {listSearch} from '../../actions/blog'


const Search=()=>{

    const [values,setValues]=useState({
        search:undefined,
        result:[],
        searched:false,
        message:''
    })

const {search,result,searched,message}=values

const searchSubmit=(e)=>{
e.preventDefault();
listSearch({search}).then(data=>{
    setValues({...values,result:data,searched:true,message:`${data.length} blog found`})
})
}

const handleChange=(e)=>{
setValues({...values,search:e.target.value,searched:false,result:[]})
}

const searchedBlogs=(result=[])=>{
    return (
        <div className="container">
        <div className="jumbotron bg-white">
            {message && <p className="pt-4 text-muted font-italic">{message}</p>}
         {result.map((blog,i)=>{
          return(
            
            <div key={i}>
             <Link href={`/blogs/${blog.slug}`}>
                 <a className="text-primary">{blog.title}</a>
             </Link>
             </div>
            
          ) 
         })}        
        
        </div>
        </div>
    )
}

const searchForm=()=>(
    <form onSubmit={searchSubmit}>
     <div className="container">
     <div className="row">
         <div className="col-md-9">
<input type="search" className="form-control" placeholder="Search Blogs" onChange={handleChange}></input>
         </div>
         <div className="col-md-3">
<button className="btn btn-block btn-outline-primary" type="submit"  style={{color: "white"}}>Search</button>
         </div>
     </div>
     </div>
    </form>
)

return (
    <div className="container-fluid">
        <div className="pt-3 pb-5">{searchForm()}
        </div>
      {searched && <div style={{marginTop:'-120px',marginBottom:'-80px'}}>
          {searchedBlogs(result)}
      </div>}
    </div>
)


}
export default Search;