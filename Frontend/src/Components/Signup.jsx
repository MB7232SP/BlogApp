import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Loding } from './Loding'
import './login_signup.css'
import { Navbaar } from './Navbaar'

const userdata = {
    email:"",
    password:"",
    name:"",
    usertype:"Admin"
}
export const Signup = ()=>{
    const[load,setload] = React.useState(false)
  const[user,setuser] = React.useState(userdata);
  const navigate = useNavigate()
    const Handlechhange = (e)=>{
         const {name,value} = e.target;
         setuser(pre=>({
           ...pre,
           [name]:value
         }))
    }
    const VerifyDetails = ()=>{
        setload(true)
        fetch('http://localhost:8080/SignUp',{
            method:"POST",
            body:JSON.stringify(user),
            headers:{"content-type":"application/json"}
        })
        .then((res)=>res.json())
        .then((res)=>{
            if(res.status==="success"){
                localStorage.setItem("Tocken",res.token);
                navigate('/adduser')
            }else{
                alert(res.response);
            }
        })
        .catch((err)=>{
            alert('somthing went wrong')
        })
        .finally(()=>{
            setload(false)
        })
    }
    const HandleSignup = ()=>{
        if(user.email!==""&&user.password!==""){
            VerifyDetails()
        }else{
            alert("fill all details first")
        }
    }    
    return(
        <div>
            <Navbaar /> 
        {load ? <Loding/> :<div id="logindiv">
             <h1>SIGN UP</h1>
             <div id="inputdiv">
                <label htmlFor="name">Full Name</label>
                <input type="text" name="name"  placeholder="Enter Your Full Name" onChange={Handlechhange}/>
                <label htmlFor="email">Email Id</label>
                <input type="email" name="email"  placeholder="Enter Your Email Id" onChange={Handlechhange}/>
                <label htmlFor="password">Password</label>
                <input type="text" name="password" placeholder="Enter Your password" onChange={Handlechhange}/>
                <button onClick={HandleSignup}>SIGN UP</button>
             </div>
             <div style={{width:"100%"}}>
                <p>Already have an account <Link to={'/login'}><span>Login</span></Link></p>
             </div>
        </div>}
        </div>
    )
}