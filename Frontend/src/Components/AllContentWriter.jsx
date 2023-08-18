import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setalluser } from "../Redux/Action";
import { AdminNavbaar } from "./AdminNav"
import { Contentwriterlist } from "./Contentwriterlist";
import { Error } from "./Error";
import { Loding } from "./Loding";



export const Allcontentwriter = ()=>{
    const[load,setload] = React.useState(false)
   const[error,seterror] = React.useState(false);
   const users = useSelector(state=>state.allusers);
   const dishpatch = useDispatch();
    React.useEffect(()=>{
        FectAllUsers();
    },[]);
    const FectAllUsers = ()=>{
        setload(true)
          fetch('http://localhost:8080/allusers')
          .then((res)=>res.json())
          .then((res)=>{
            if(res.status==="success"){
                 dishpatch(setalluser(res.data))
            }else{
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
    return (
        <div>
            <AdminNavbaar/>
            <div>
                {load ? <Loding/> : error ? <Error/> :
                <div id="allusers">
                  {users.map(el=><Contentwriterlist FectAllUsers = {FectAllUsers} setload={setload} el={el} key={el._id}></Contentwriterlist>)}
                </div>
                }
            </div>
        </div>
    )
}