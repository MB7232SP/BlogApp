import React from 'react'
import { Link , useNavigate} from 'react-router-dom'
import { Loding } from './Loding'
import './login_signup.css'
import { Navbaar } from './Navbaar'

const userdata = {
    email:"",
    password:""
}
export const Login = ()=>{
    const[load,setload] = React.useState(false)
    const[user,setuser] = React.useState(userdata);
    const navigate = useNavigate();
    const Handlechhange = (e)=>{
         const {name,value} = e.target;
         setuser(pre=>({
           ...pre,
           [name]:value
         }))
    }
    const VerifyDetails = ()=>{
        setload(true)
        fetch('http://localhost:8080/Login',{
            method:"POST",
            body:JSON.stringify(user),
            headers:{"content-type":"application/json"}
        })
        .then((res)=>res.json())
        .then((res)=>{
            if(res.status==="success"){
                localStorage.setItem("Tocken",res.tocken);
                if(res.usertype==="Admin"){
                    navigate('/adduser')
                }else{
                    navigate('/user') 
                }
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
    const HandleLogin = ()=>{
        if(user.email!==""&&user.password!==""){
            VerifyDetails()
        }else{
            alert("fill all details first")
        }
    }
    return(
        <div>
            <Navbaar/> 
         {load ? <Loding/> : <div id="logindiv">
             <h1>LOGIN</h1>
             <div id="inputdiv">
                <label htmlFor="email">Email Id</label>
                <input type="email" name="email" onChange={Handlechhange}  placeholder="Enter Your Email Id"/>
                <label htmlFor="password">Password</label>
                <input type="text" name="password" onChange={Handlechhange} placeholder="Enter Your password"/>
                <button onClick={HandleLogin}>LOGIN NOW</button>
             </div>
             <div style={{width:"100%"}}>
                <p>Don't have an account contact admin or Admin <Link to={'/signup'}><span>Sign up</span></Link></p>
             </div>
          </div>}
        </div>
    )
}