import React from 'react'
import { AdminNavbaar } from './AdminNav';
import './login_signup.css'

const userdata = {
    email:"",
    password:"",
    name:"",
    usertype:"user"
}
export const ContentWriterForm = ()=>{
  const[user,setuser] = React.useState(userdata);

    const Handlechhange = (e)=>{
         const {name,value} = e.target;
         setuser(pre=>({
           ...pre,
           [name]:value
         }))
    }
    const VerifyDetails = ()=>{
        fetch('http://localhost:8080/',{
            method:"POST",
            body:JSON.stringify(user),
            headers:{"content-type":"application/json"}
        })
        .then((res)=>res.json())
        .then((res)=>{
            if(res.status==="success"){
                alert('succsessfully added content writer. Now writer can login with same email and password');
            }else{
                alert(res.response);
            }
        })
        .catch((err)=>{
            alert('somthing went wrong')
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
            <AdminNavbaar/> 
        <div id="logindiv">
             <h1>Add Content Writer</h1>
             <div id="inputdiv">
                <label htmlFor="name">Full Name</label>
                <input type="text" name="name"  placeholder="Enter Full Name" onChange={Handlechhange}/>
                <label htmlFor="email">Email Id</label>
                <input type="email" name="email"  placeholder="Enter Email Id" onChange={Handlechhange}/>
                <label htmlFor="password">Password</label>
                <input type="text" name="password" placeholder="Enter password" onChange={Handlechhange}/>
                <button onClick={HandleSignup}>Add</button>
             </div>
        </div>
        </div>
    )
}