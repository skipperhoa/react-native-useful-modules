import { takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';
import { CONFIG_API } from "@/redux/contains/apiTypes.js";
import { AUTH_TYPES } from "@/redux/contains/authTypes.js";
import { CATEGORY_TYPES } from "@/redux/contains/categoryType.js";

function* fetchCategoriesSaga() {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const response = yield call(axios.get, CONFIG_API.URL_API+'/categories', {
                headers: { Authorization: `Bearer ${token}` }
            });
        
            yield put({ type: CATEGORY_TYPES.FETCH_CATEGORIES_SUCCESS, payload: response.data });

        } catch (error) {
           
            yield put({ type: CATEGORY_TYPES.FETCH_CATEGORIES_FAILURE, payload: error.message });
        }
    }
}
function* createCategorySaga(action) {
    try {
      const response = yield call(axios.post, CONFIG_API.URL_API + '/categories', action.payload);
      yield put({ type: CATEGORY_TYPES.CREATE_CATEGORY_SUCCESS, payload: response.data });
    } catch (error) {
      yield put({ type: CATEGORY_TYPES.CREATE_CATEGORY_FAILURE, payload: error.message });
    }
  }
  
  export function* categorySaga() {
    yield takeLatest(CATEGORY_TYPES.FETCH_CATEGORIES, fetchCategoriesSaga);
    yield takeLatest(CATEGORY_TYPES.CREATE_CATEGORY, createCategorySaga);
  }
