import { AUTH_TYPES } from "@/redux/contains/authTypes.js";
import { CATEGORY_TYPES } from "@/redux/contains/categoryType.js";
const initialState = {
    categories: [],
    loading: false,
    error: null
  };
  
  export const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
      case CATEGORY_TYPES.FETCH_CATEGORIES:
        return {
          ...state,
          loading: true,
          error: null
        };
      case CATEGORY_TYPES.FETCH_CATEGORIES_SUCCESS:
        return {
          ...state,
          loading: false,
          categories: action.payload,
          error: null
        };
      case CATEGORY_TYPES.FETCH_CATEGORIES_FAILURE:
        return {
          ...state,
          loading: false,
          categories: [],
          error: action.payload
        };
      // Xóa categories khi logout
      case AUTH_TYPES.LOGOUT:
        return initialState;
      default:
        return state;
    }
  };