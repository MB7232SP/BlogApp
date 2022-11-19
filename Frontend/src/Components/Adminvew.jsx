import React from "react";
import { Link, useParams } from "react-router-dom";
import { Error } from "./Error";
import { Loding } from "./Loding";
import { Navbaar } from "./Navbaar"
import { FaRegUser } from "react-icons/fa";
import './ViewBlog.css'
import { AdminNavbaar } from "./AdminNav";
export const Adminview = ()=>{
    const[load,setload] = React.useState(true)
    const[error,seterror] = React.useState(false);
    const[blog,setblog] = React.useState({});
    const {id} = useParams();
     React.useEffect(()=>{
          setload(true)
        fetch(`https://my-blog-app-heroku.herokuapp.com/blog/${id}`)
        .then((res)=>res.json())
        .then((res)=>{
            if(res.status==="success"){
               setblog(res.data);
            }else{
                seterror(true);
            }
        })
        .catch(()=>{
            seterror(true)
        })
        .finally(()=>{
            setload(false)
        })
       return ()=>{
           setblog({});
           setload(false);
           seterror(false)
       }
     },[])
    return(
        <div>
            <AdminNavbaar/>
            <div>
                {load ? <Loding/> : error ? <Error/> : 
                <div id='viewblogdiv'>
                    <h1>Title :- {blog.title}</h1>
                    <div id="viewblogbody">
                         <div className="authorname">
                           <FaRegUser className='usericon'/>
                          <div>
                            <h5>Author Name:- {blog.user.name}</h5>
                            <h5>Author Email:- {blog.user.email}</h5>
                          </div>
                         </div>
                         <p>{blog.body}</p>
                    </div>
                </div>
                }
            </div>
        </div>
    )
}