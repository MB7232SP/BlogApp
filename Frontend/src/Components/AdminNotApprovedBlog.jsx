import './Admin.css'
import './Homepage.css'
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setblog } from "../Redux/Action";
import { Error } from "./Error";
import { Loding } from "./Loding";
import { NoBlog } from "./NoBlog";
import { FaRegUser } from "react-icons/fa";
import { AdminNavbaar } from './AdminNav';
import { Link } from 'react-router-dom';

export const AdminNotApprovedBlog = ()=>{
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
         dispatch(setblog(res.data.NotApprovedblogs))
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
const HandleApprove = (id)=>{
  setload(true)
  fetch(`https://my-blog-app-heroku.herokuapp.com/blogs/${id}`,{
          method:"PATCH",
          body:JSON.stringify({
            approved:"yes"
          }),
          headers:{"content-type":"application/json"}
        })
   .then((res)=>res.json())
  .then((res)=>{
    if(res.status==="success"){
      alert('blog successfully Approved')
      FetchBlogs();
    }
    else{
      alert('somthing went wrong')
    }
  })
  .catch((err)=>{
    alert('somthing went wrong')
  })
  .finally(()=>{
    setload(false)
  })
}
const HandleDelete = (id)=>{

}
    return (<div>
      <AdminNavbaar />
      <div id="homedata">
      {
       load ? <Loding/> :
       error ? <Error/> :
       blogdata.length===0 ? <NoBlog/> :
       <div id="mainhomemapidv">
        {blogdata.map((el)=><div  key={el._id} className={'homemapidv'}>
        
         <div>
          <div className='authorname'>
          <FaRegUser className='usericon'/>
                <div>
              <h4>Blog Title :- {el.title}</h4>
          <p>Author Name :- {el.user.name}</p>
          <p>Author Email Id :-{el.user.email}</p>
               </div>
               
          </div>
          
          </div>
          <div className='crudonadmin'>
                   <button><Link to={`/Adminview/${el._id}`}>VIEW</Link></button>
                   <button onClick={()=>{
                    HandleApprove(el._id)
                   }}>APPROVE BLOG</button>
                   <button onClick={()=>{
                    HandleDelete(el._id)
                   }}>DELETE BLOG</button>
                   
               </div>
        </div>)}
       </div>
      }
      </div>
    </div>
    )
  }