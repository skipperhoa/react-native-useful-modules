import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'


// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchUser(action) {
  try {
   
    yield put({ type: 'USER_FETCH_SUCCEEDED', user: action })
  } catch (e) {
    yield put({ type: 'USER_FETCH_FAILED', message: e.message })
  }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
export function* exampleSaga() {
  yield takeLatest('USER_FETCH_REQUESTED', fetchUser)
}


