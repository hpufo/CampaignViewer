import axios from 'axios';
import {url,api_token,ACTIONS} from './actions';

/* Gets the Agencies from the API */ 
export function getAgencies(){
  return function(dispatch){
    axios.get(`${url}agencies${api_token}`)                                     //Building the url
    .then((response) => {                                                       //When I recieve a response
      dispatch({type: ACTIONS.RECEIVE_AGENCIES, payload: response.data.agencies})     //Dispatech the agencies from the response
      dispatch({type: ACTIONS.CHANGE_AGENCY_MESSAGE, payload: "Choose an agency..."}) //Dispatch an action to update the message
    })
    .catch((error) => {                                                         //On error    
      dispatch({type: ACTIONS.STATUS_MESSAGE, payload: {status: "Error", message: "Something went wrong with the API call :("}})  //Dispatch a general error message
      dispatch({type: ACTIONS.CHANGE_AGENCY_MESSAGE, payload: "Nothing to select"}) //Dispatch an action to update the message
    })
  }
}