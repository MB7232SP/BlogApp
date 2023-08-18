import './Admin.css'
import './Homepage.css'
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setblog } from "../Redux/Action";
import { Error } from "./Error";
import { Loding } from "./Loding";
import { NoBlog } from "./NoBlog";
import { AdminBlogList } from './AdminBlogList';
import { ContentwriteNav } from './ContentwriteNav';

export const ContentWriterApprovedBlog = ()=>{
const[load,setload] = React.useState(false)
const[error,seterror] = React.useState(false);
const dispatch = useDispatch();
const blogdata = useSelector(state=>state.Blogs);
let Userid = ""
let tocken = localStorage.getItem('Tocken')
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
    fetch('http://localhost:8080/TokenLogin',{
            method:"POST",
            body:JSON.stringify({jwtToken:tocken}),
            headers:{"content-type":"application/json"}
          })
          .then((res)=>res.json())
          .then((res)=>{
            if(res.status==="success"){
                Userid = res.data._id
            }
          })
          .then(()=>{
            fetch(`http://localhost:8080/blogs/${Userid}`)
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
          })
          .finally(()=>{
            setload(false)
          })
}
    return (<div>
      <ContentwriteNav />
      <div id="homedata">
      {
       load ? <Loding/> :
       error ? <Error/> :
       blogdata.length===0 ? <NoBlog/> :
       <div id="mainhomemapidv">
        {blogdata.map((el)=><AdminBlogList edit={true} FetchBlogs={FetchBlogs} setload={setload}  key={el._id} className={'homemapidv'} el={el}> </AdminBlogList> )}
       </div>
      }
      </div>

    </div>
    )
  }