import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import formReducer, { FormAction, FormState } from './reducers/formReducer';

export type CombinedState = { form: FormState };
export type AppDispatch = (action: FormAction) => void;
export default function createRootReducer(history: History) {
    return combineReducers({
        router: connectRouter(history),
        form: formReducer,
    });
}
