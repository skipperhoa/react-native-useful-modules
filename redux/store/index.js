"use client";
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { authReducer } from '@/redux/reducers/authReducer';
import { categoryReducer } from '@/redux/reducers/categoryReducer';
import { postReducer } from '@/redux/reducers/postReducer';
import { exampleReducer } from '@/redux/reducers/exampleReducer';
import {rootSaga} from '@/redux/sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
  //  auth: authReducer,
    category: categoryReducer,
    posts: postReducer,
    example: exampleReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);