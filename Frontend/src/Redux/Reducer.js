import { SET_BLOG, SET_USER,SET_ALLUSERS } from "./Actiontype";

const initSate = {
       user:{name:"user"},
       Blogs:[],
       allusers:[]
}



export const reducer = (state = initSate, {type,payload})=>{
      switch(type){
        case SET_BLOG:{
            return {
                ...state,
                Blogs:payload
            }
        }
        case SET_USER:{
            return {
                ...state,
                user:payload
            }
        }
        case SET_ALLUSERS:{
            return {
                ...state,
                allusers:payload
            }
        }
        default:{
            return state
        }
      }
}