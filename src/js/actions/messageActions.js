import {ACTIONS} from './actions';

/* Resets the message state */
export function resetStatus(){
  return {type: ACTIONS.STATUS_MESSAGE, payload: {status: null, message: null}}
}
/* Custom message error */
export function setErrorMessage(message){
  return {type: ACTIONS.STATUS_MESSAGE, payload: {status: "Error", message: message}}
}