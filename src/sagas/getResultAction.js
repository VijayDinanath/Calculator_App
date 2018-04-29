import {GET_RESULT, GET_RESULT_SUCCESS, GET_RESULT_FAILURE} from '../actions/constants';
import {put, takeLatest} from 'redux-saga/effects'
var mathExpHandler = require('math-expression-evaluator');

function* getResultData(action){
    try{
        let result = mathExpHandler.eval(action.payload.formula);
        let resultData = {result:result, formula:action.payload.formula};
        yield put({type:GET_RESULT_SUCCESS, resultData}); 
    }catch(e){
        yield put({type: GET_RESULT_FAILURE});
    }
}

export function* getResult(){
    yield takeLatest(GET_RESULT, getResultData);
}