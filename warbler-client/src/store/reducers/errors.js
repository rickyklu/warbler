import { ADD_ERROR, REMOVE_ERROR } from "../actionTypes";

// action for errors
export default ( state = { message: null }, action) => {
    switch(action.type) {
        case ADD_ERROR:
            // return original state plus the action error
            return {...state, message: action.error}
        case REMOVE_ERROR:
            // return new obj state plus the action error
            return {...state, message: null }
        default:
            return state;
    }
}

