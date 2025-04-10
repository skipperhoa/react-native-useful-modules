
import { all } from 'redux-saga/effects';
import { authSaga } from '@/redux/sagas/authSaga';
import { categorySaga } from '@/redux/sagas/categorySaga';
import { postSaga } from '@/redux/sagas/postSaga';
import { exampleSaga } from '@/redux/sagas/exampleSaga';

export function* rootSaga() {
  yield all([
  //  authSaga(),
    categorySaga(),
    postSaga(),
    exampleSaga()
  ]);
}
