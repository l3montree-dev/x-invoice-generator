export interface FormState {
  // use persistent storage to get initial data - if this equals undefined.
  initialFormData?: object;
}

export type FormAction =
  | {
      type: 'SET_INITIAL_DATA';
      payload: { initialFormData: object };
    }
  | { type: 'RESET_INITIAL_DATA' };
export default function formReducer(state: FormState = {}, action: FormAction) {
  switch (action.type) {
    case 'SET_INITIAL_DATA':
      return {
        ...state,
        initialFormData: action.payload.initialFormData,
      };
    case 'RESET_INITIAL_DATA':
      return { ...state, initialFormData: undefined };
    default:
      return state;
  }
}
