import { Link, useNavigate } from "react-router-dom"
import { FaRegUser } from "react-icons/fa";
import React from "react";

 export const Navbaar = ()=>{
  let tocken = localStorage.getItem('Tocken') || "";
  const navigate = useNavigate();
  React.useEffect(()=>{
       CheckLogin();
  },[])
  const CheckLogin = ()=>{
      if(tocken!==""){
        fetch('http://localhost:8080/TokenLogin',{
            method:"POST",
            body:JSON.stringify({jwtToken:tocken}),
            headers:{"content-type":"application/json"}
          })
          .then((res)=>res.json())
          .then((res)=>{
            if(res.status==="success"){
                if(res.data.usertype==="Admin"){
                  navigate('/adduser')
                }else{
                  navigate('/user')
                }
            }
          })
      }
  }
    return (
        <div id="homenav">
          <Link to={'/'}>
            <h1>My Blog APP</h1>
          </Link>
          <div id="login">
            <Link to={'/signup'}><h4> <FaRegUser  style={{marginRight:'5px'}}/>Admin Login/Sign up</h4></Link>
            <Link to={'/login'}><h4> <FaRegUser style={{marginRight:'5px'}}/>Content Writer Login</h4></Link>
          </div>
       </div>
    )
}