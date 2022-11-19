import './Homepage.css'
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setblog } from "../Redux/Action";
import { Error } from "./Error";
import { Loding } from "./Loding";
import { Navbaar } from "./Navbaar";
import { NoBlog } from "./NoBlog";
import { FaRegUser } from "react-icons/fa";
import { Link } from 'react-router-dom';

export const Homepage = ()=>{
const[load,setload] = React.useState(false)
const[error,seterror] = React.useState(false);
const dispatch = useDispatch();
const blogdata = useSelector(state=>state.Blogs);
React.useEffect(()=>{
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

    return ()=>{
      setload(false);
      seterror(false);
      dispatch(setblog([]));
    }
},[])

    return (<div>
      <Navbaar />
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
          <Link to={`viewblog/${el._id}`}><button className='blogview'>Read this Blog</button></Link>
        </div>)}
       </div>
      }
      </div>
    </div>
    )
  }