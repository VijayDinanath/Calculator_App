import {GET_RESULT} from './constants';

export function getResultAction (payload){
    return{
        type:GET_RESULT,
        payload:payload
    }
}