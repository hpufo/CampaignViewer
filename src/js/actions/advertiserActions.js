import axios from 'axios';
import {url,api_token,ACTIONS} from './actions';

/* Gets the Advertisers for an agency from the API */
export function getAdvertisers(agencyID){
  return function(dispatch){
    axios.get(`${url}advertisers${api_token}&agency_id=${agencyID}`)              //Build the url
    .then((response) => {                                                         //When the response is recieved
      dispatch({type: ACTIONS.CURRENT_AGENCY, payload: agencyID});                      //Dispatch the current agency
      dispatch({type: ACTIONS.RECIEVE_ADVERTISERS, payload: response.data.advertisers})  //And the advertisers from the response
      dispatch({type: ACTIONS.CHANGE_ADVERTISERS_MESSAGE, payload: "Choose an advertiser..."})  
    })
    .catch((error) => {                                                           //Same as above error
      dispatch({type: ACTIONS.STATUS_MESSAGE, payload: {status: "Error", message: "Something went wrong with the API call :("}})
      dispatch({type: ACTIONS.CHANGE_ADVERTISERS_MESSAGE, payload: "Nothing to select"}) //Dispatch an action to update the message
    })
  }
}
/* Gets the Campaigns for a advertiser from the API */
export function getAdvertiserCampaigns(advertiserID){
  return function(dispatch){
    axios.get(`${url}campaigns${api_token}&advertiser_id=${advertiserID}`)      //Same
    .then((response) => {                                                       //as
      dispatch({type: ACTIONS.RECIEVE_CAMPAIGNS, payload: response.data.campaigns});  //above
    })
    .catch((error) => {
      dispatch({type: ACTIONS.STATUS_MESSAGE, payload: {status: "Error", message: "Something went wrong with the API call :("}})
    })
  }
}
/* Dispatches the action in the method body */
export function advertiserSelected(advertiserID){
  return {type: ACTIONS.ADVERTISER_SELECTED, payload: advertiserID}
}