import { FETCH_ALL, FETCH_BY_SEARCH, FETCH_POST, CREATE, UPDATE, DELETE, LIKE, START_LOADING ,END_LOADING, COMMENT } from '../constants/actionTypes';
import * as api from '../api'

// Action Creators are the functions that return an action
export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPosts(page);

        // console.log(data);
        
        dispatch({type: FETCH_ALL, payload: data });
        
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message);
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);  // data is written like this because we return an object from backend
        
        dispatch({type: FETCH_BY_SEARCH, payload: data });

        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message);
    }
}

export const getPost = (id) => async(dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data } = await api.fetchPost(id);

        // console.log(data);

        dispatch({ type: FETCH_POST, payload: data });

        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message);
    }
}

export const createPost = (post, navigate) => async(dispatch) => {
    try{
        dispatch({ type: START_LOADING });

        const { data } = await api.createPost(post);

        navigate(`/posts/${data._id}`)

        dispatch({type: CREATE, payload: data});

        dispatch({ type: END_LOADING });
    }catch(error){
        console.log(error);
    }
}

export const updatePost = (id, post) => async(dispatch) => {
    try{
        const { data } = await api.updatePost(id,post);        

        dispatch({type: UPDATE, payload: data});
    }catch(error){
        console.log(error);
    }
}

export const deletePost = (id) => async(dispatch) => {
    try {
        await api.deletePost(id);        

        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async(dispatch) => {
    try {
        const { data } = await api.likePost(id);        

        dispatch({ type: LIKE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const commentPost = (value, id) => async(dispatch) => {
    try {        
        const { data } = await api.comment(value,id);    

        // console.log(data);  // {comments: ['comment']}
        
        dispatch({ type: COMMENT, payload: data });

        return data.comments;
    } catch (error) {
        console.log(error);
    }
}