import { takeLatest, put, call } from 'redux-saga/effects';
import { POST_TYPES } from '@/redux/contains/postTypes';
import { CONFIG_API } from "@/redux/contains/apiTypes.js";
import axios from 'axios';

// Tạo axios instance với interceptor
export const api = axios.create({
    baseURL: CONFIG_API.URL_API,
  });
  
  // Add token vào header khi có request
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
function* fetchPostsSaga() {
  try {
    const response = yield call(axios.get, CONFIG_API.URL_API + '/posts');
    yield put({ type: POST_TYPES.FETCH_POSTS_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: POST_TYPES.FETCH_POSTS_FAILURE, payload: error.message });
  }
}

function* createPostSaga(action) {
  try {
    const response = yield call(axios.post, CONFIG_API.URL_API + '/posts', action.payload);
    yield put({ type: POST_TYPES.CREATE_POST_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: POST_TYPES.CREATE_POST_FAILURE, payload: error.message });
  }
}

export function* postSaga() {
  yield takeLatest(POST_TYPES.FETCH_POSTS, fetchPostsSaga);
  yield takeLatest(POST_TYPES.CREATE_POST, createPostSaga);
}