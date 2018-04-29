import {GET_RESULT, GET_RESULT_SUCCESS, GET_RESULT_FAILURE} from '../actions/constants';

const initialState = {
    resultData:{},
    error: false
}

export default function getResultData (state = initialState, action){
    switch(action.type){
        case GET_RESULT:
            return {
                ...state,
                resultData:{},
                error:false
            }
        
        case GET_RESULT_SUCCESS:
            return{
                ...state,
                resultData:action.resultData,
                error:false
            }

        case GET_RESULT_FAILURE:
            return{
                ...state,
                resultData:{},
                error:true
            }

        default:
            return state;
    }
}