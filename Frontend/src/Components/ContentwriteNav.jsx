


import { Link, useNavigate } from "react-router-dom"
import { FaRegUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { setuser } from "../Redux/Action";
 export const ContentwriteNav = ()=>{
   let tocken = localStorage.getItem('Tocken')||"";
   const navigate = useNavigate();
   const dispatch = useDispatch();
   if(tocken===""){
      navigate('/')
   }
   React.useEffect(()=>{
      Fetchuser();
   },[])
   const Fetchuser = ()=>{
          fetch('https://my-blog-app-heroku.herokuapp.com/TokenLogin',{
            method:"POST",
            body:JSON.stringify({jwtToken:tocken}),
            headers:{"content-type":"application/json"}
          })
          .then((res)=>res.json())
          .then((res)=>{
            if(res.status==="success"){
              dispatch(setuser(res.data))
            }else{
              navigate('/')
            }
          })
          .catch(()=>{
            alert('somthing went wrong')
          })
   }
  const User = useSelector(state=>state.user)
    return (
           <div id="homenav">
          <Link to={'/admin'}>
            <h3><FaRegUser/> Hello {User.name}</h3>
          </Link>
          <div id="login">
            <Link to={'/user'}><h4>Add New Blog</h4></Link>
            <Link to={'/ContentWriterApprovedBlogs'}><h4>Approved Blogs</h4></Link>
            <Link to={'/ContentwriternotApprovedBlogs'}><h4>Not Approved Blogs</h4></Link>
            <h4 id="logout" onClick={()=>{
              localStorage.setItem('Tocken',"");
              navigate('/')
            }}>Logout</h4>
          </div>
        </div>
    )
}