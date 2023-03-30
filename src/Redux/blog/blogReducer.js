import { BLOG_ADD_FAILURE, BLOG_ADD_REQUEST, BLOG_ADD_SUCCESS } from "./blogTypes"

const initState = {
    isAdded:false,
    isLoading:false,
    isError:false,
    blog:[]
}

export const blogReducer = (state = initState ,{type,payload}) =>{

    switch(type){

        case BLOG_ADD_REQUEST:{
            return {
                ...state,
                isAdded:false,
                isLoading:true,
                isError:false,
                blog:[]
            }
        }
        case BLOG_ADD_SUCCESS:{
            return {
                ...state,
                isLoading:false,
                isAdded:true,
                isError:false,
                blog:payload
            }
        }

        case BLOG_ADD_FAILURE:{
            return {
                ...state,
                isLoading:false,
                isAdded:false,
                isError:true,
                blog:[]
            }
        }
        default: {
        return state
        }
    }
}