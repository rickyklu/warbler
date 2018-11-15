import { SET_CURRENT_USER } from "../actionTypes";

const DEFAULT_STATE = {
    //changed to true when user is logged in
    isAuthenticated: false,
    // all user info when logged in
    // change user back to empty object when logged out
    user: {}
}


export default (state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
            // turn empty object into false or if there are keys, true
             // if length == 0, it converts the object into a boolean
                isAuthenticated: !!Object.keys(action.user).length,
                user: action.user
            }
        default:
            return state;
    }
};
