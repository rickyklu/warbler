import { LOAD_MESSAGES, REMOVE_MESSAGE} from "../actionTypes";

const message = (state=[], action ) => {
    switch(action.type){
        case LOAD_MESSAGES:
            return [...action.messages];
        case REMOVE_MESSAGE:
            // filter out to not-include the message that
            // contains the message._id of the message we want to delete
            return state.filter(message => message._id !== action.id);
        default:
            return state;
    }
}

export default message;
