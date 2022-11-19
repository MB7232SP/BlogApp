import './Admin.css'
import './Homepage.css'
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setblog } from "../Redux/Action";
import { Error } from "./Error";
import { Loding } from "./Loding";
import { NoBlog } from "./NoBlog";

import { AdminNavbaar } from './AdminNav';

import { AdminBlogList } from './AdminBlogList';

export const AdminApprovedBlog = ()=>{
const[load,setload] = React.useState(false)
const[error,seterror] = React.useState(false);
const dispatch = useDispatch();
const blogdata = useSelector(state=>state.Blogs);
React.useEffect(()=>{
    FetchBlogs();
    return ()=>{
      setload(false);
      seterror(false);
      dispatch(setblog([]));
    }
},[])
const FetchBlogs = ()=>{
    setload(true)
    fetch('https://my-blog-app-heroku.herokuapp.com/Allblogs')
    .then((res)=>res.json())
    .then((res)=>{
      if(res.status==="success"){
         dispatch(setblog(res.data.AprovedBlogs))
      }
      else{
        seterror(true)
      }
    })
    .catch((err)=>{
      seterror(true)
    })
    .finally(()=>{
      setload(false)
    })
}
    return (<div>
      <AdminNavbaar />
      <div id="homedata">
      {
       load ? <Loding/> :
       error ? <Error/> :
       blogdata.length===0 ? <NoBlog/> :
       <div id="mainhomemapidv">
        {blogdata.map((el)=><AdminBlogList FetchBlogs={FetchBlogs} setload={setload}  key={el._id} className={'homemapidv'} el={el}> </AdminBlogList> )}
       </div>
      }
      </div>

    </div>
    )
  }