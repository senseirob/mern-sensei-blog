import axios from 'axios';
import {
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
  GET_POST,
  GET_POSTS,
  POST_ERROR,
} from './types';

// get all of the blog posts

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/posts');

    console.log(res);

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    console.log('getposts ran with error');

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};

// get a specific post by id

export const getPostById = (postId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${postId}`);

    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response, status: err.resonse },
    });
  }
};

// create a new blog post '

export const createPost = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/posts', formData, config);

    dispatch({
      type: CREATE_POST,
      payload: res.data,
    });

    dispatch(getPosts());

    history.push('/dashboard');
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};

// update a blog post

export const updatePost = (formData, history, postId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post(`/api/posts/${postId}`, formData, config);

    dispatch({
      type: UPDATE_POST,
      payload: res.data,
    });

    console.log(res.data);

    // dispatch(getPosts());

    history.push('/dashboard');
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};

// delete a blog post

export const deletePost = (history, postId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.delete(`/api/posts/${postId}`, config);

    dispatch({
      type: DELETE_POST,
      payload: res.data,
    });

    history.push('/dashboard');
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response, status: err.resonse },
    });
  }
};
