import { AUTH_TYPES } from "@/redux/contains/authTypes";
let token = null;
// if (typeof window !== 'undefined') {
//    token = localStorage.getItem("token") ? localStorage.getItem("token") : null;
// }
const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  token: token,
  products: [],
  daysofcode: [],

  head: {
    title: "NTH CODE",
    keyword:
      "Lập Trình Website và Phát triển Website, Laravel, Angular, Vue.js, Node.js, Reat-Native, ASP.NET",
    description:
      "Chuyên trang chia sẻ các kiến thức liên quan đến Lập Trình Website và Phát triển Website",
    link: "https://dev.hoanguyenit.com",
    image: "",
  },
};

export const exampleReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_TYPES.LOGIN_REQUEST:
        
      return {
        ...state,
        loading: true,
        error: null,
      };
    case AUTH_TYPES.LOGIN_SUCCESS:
        console.log('action', action)
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };
    case AUTH_TYPES.LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };
    case AUTH_TYPES.UPDATE_META:
      return {
        ...state,
        head: action.payload,
      };
    case AUTH_TYPES.LOGOUT:
      return {
        ...initialState,
        token: null,
      };
    default:
      return state;
  }
};
