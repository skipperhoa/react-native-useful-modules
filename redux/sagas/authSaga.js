'use strict';
import { takeLatest, put, call } from "redux-saga/effects";
import { CONFIG_API } from "@/redux/contains/apiTypes.js";
import { AUTH_TYPES } from "@/redux/contains/authTypes.js";
import { CATEGORY_TYPES } from "@/redux/contains/categoryType.js";
import { loginSuccess, loginFailure } from "@/redux/actions/authActions";
import axios from "axios";
// Tạo axios instance với interceptor
export const api = axios.create({
  baseURL: CONFIG_API.URL_API,
});

// Add token vào header khi có request
/* api.interceptors.request.use((config) => {
  const token = window?.localStorage?.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}); */
function* loginSaga(action) {
  try {
    const response = yield call(
      axios.post,
      CONFIG_API.URL_API + "/auth/login",
      action.payload
    );
    console.log(response)
    const {
      refreshToken,
      accessToken,
    } = response.data;
    // Lưu token
    localStorage.setItem("token", accessToken);

    let user = response.data

    yield put(loginSuccess({ accessToken, user }));

    // Sau khi login thành công, fetch categories
   
   yield put({ type: CATEGORY_TYPES.FETCH_CATEGORIES });

  } catch (error) {
    yield put(loginFailure(error.response?.data?.message || "Login failed"));
  }
}

function* logoutSaga() {
  localStorage.removeItem("token");
}

function* checkAuthSaga() {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const response = yield call(axios.get, CONFIG_API.URL_API+ "/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      yield put(loginSuccess({ token, user: response.data }));
     // Nếu token hợp lệ, fetch categories
      yield put({ type: CATEGORY_TYPES.FETCH_CATEGORIES });
    } catch (error) {
      localStorage.removeItem("token");
      yield put(loginFailure("Session expired"));
    }
  }
}

export function* authSaga() {
  yield takeLatest(AUTH_TYPES.LOGIN_REQUEST, loginSaga);
  yield takeLatest(AUTH_TYPES.LOGOUT, logoutSaga);
  yield takeLatest(AUTH_TYPES.CHECK_AUTH, checkAuthSaga);
}
