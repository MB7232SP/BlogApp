import { SET_BLOG, SET_USER,SET_ALLUSERS } from "./Actiontype";



export const setblog = (data)=>({
   type:SET_BLOG,
   payload:data
})
export const setuser = (data)=>({
   type:SET_USER,
   payload:data
})
export const setalluser = (data)=>({
   type:SET_ALLUSERS,
   payload:data
})