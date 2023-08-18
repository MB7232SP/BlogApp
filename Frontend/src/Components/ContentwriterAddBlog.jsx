import React from 'react'
import { ContentwriteNav } from './ContentwriteNav';
import './login_signup.css'
import './ContentWriter.css'
import { useSelector } from 'react-redux';
import { Loding } from './Loding';
const blogdata = {
    body:"",
    title:"",
    approved:"no"
}
export const ContentWriterAddBlog = ()=>{
    const[load,setload] = React.useState(false)
    const[Blog,setBlog] = React.useState(blogdata);
  const User = useSelector(state=>state.user)
    const Handlechhange = (e)=>{
         const {name,value} = e.target;
         setBlog(pre=>({
           ...pre,
           [name]:value
         }))
    }
    const Saveblog = ()=>{
        setload(true)
        fetch(`http://localhost:8080/blogs/${User._id}`,{
            method:"POST",
            body:JSON.stringify(Blog),
            headers:{"content-type":"application/json"}
        })
        .then((res)=>res.json())
        .then((res)=>{
            if(res.status==="success"){
                alert('succsessfully added blog. Now waiting for approval from Admin');
                setBlog(blogdata)
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
    
    const {title,body} = Blog;   
    const HandleAddblog = ()=>{
        if(title!==""&&body!==""){
            Saveblog()
        }else{
            alert("fill all details first")
        }
    } 
    return(
        <div>
            <ContentwriteNav/> 
        {load ? <Loding/> :
        <div id="logindiv">
        <h1>ADD NEW BLOG</h1>
        <div id="inputdiv">
           <label htmlFor="name">Title</label>
           <input type="text" name="title"  placeholder="Enter Blog Title" value={title} onChange={Handlechhange}/>
           <label htmlFor="body">Body</label>
           <textarea name="body" id="blogbody" cols="40" rows="20" onChange={Handlechhange} value={body}></textarea>
           <button onClick={HandleAddblog}>Add</button>
        </div>
   </div>
        }
        </div>
    )
}