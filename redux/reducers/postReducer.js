import { POST_TYPES } from '@/redux/contains/postTypes';
const postInitialState = {
    posts: [],
    loading: false,
    error: null
  };
  
  export const postReducer = (state = postInitialState, action) => {
    switch (action.type) {
      case POST_TYPES.FETCH_POSTS:
        return { ...state, loading: true };
      case POST_TYPES.FETCH_POSTS_SUCCESS:
        return { 
          ...state, 
          loading: false, 
          posts: action.payload,
          error: null 
        };
      case POST_TYPES.FETCH_POSTS_FAILURE:
        return { 
          ...state, 
          loading: false, 
          error: action.payload 
        };
      case POST_TYPES.CREATE_POST_SUCCESS:
        return {
          ...state,
          posts: [...state.posts, action.payload]
        };
      default:
        return state;
    }
  };