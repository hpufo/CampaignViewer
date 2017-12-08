import axios from 'axios';
import {ACTIONS} from './actions';
import {url,api_token} from '../config';

/* Saves all the campaigns in the object */
export function saveCampaigns(objs){
  return function(dispatch){
    //For each element in objs array, create a promise and store it in the promises array
    let promises = objs.map((obj) => axios.post(`${url}campaigns/${obj._id}/?${api_token}`,obj))
    //Use axios.all() to send several post calls
    axios.all(promises).then((response) => {
      dispatch({type: ACTIONS.STATUS_MESSAGE, payload: {status: "Success", message: "All selected creatives have been successfully updated!"}}) //Dispatch a success message if it all went good
    })
    .catch((error) => {                           //If anything went wrong
      dispatch({type: ACTIONS.STATUS_MESSAGE, payload: {status: "Error", message: "There was an error saving your campaigns"}}) //Dispatch this error message
    })
  }
}
/* Syncs the campaign state with the data from the api */
export function syncCampaignWithAPI(ids){
  return function(dispatch){
    //Array containing all the promises
    let promises = ids.map((id) => axios.get(`${url}campaigns/${id}/?${api_token}`))   //Build the url to get the individual campaign
    
    //Send several get calls
    axios.all(promises).then((responses) => {                                         //On success
      responses.map((response) => dispatch({type: ACTIONS.SYNC_CAMPAIGN_WITH_API, payload: response.data.campaigns[0]}))  //dispatch the individual campaign object
    })
    .catch((error) => {                     //On error
      dispatch({type: ACTIONS.STATUS_MESSAGE, payload: {status: "Error", message: "Something went wrong with the API call :("}})  //Send this error message
    })
  }
}
/* Dispatches the action in the method body */
export function campaignNameChange(name, index){
  return {type: ACTIONS.CAMPAIGN_NAME_CHANGE, payload: name, index: index}
}
/* Dispatches the action in the method body */
export function campaignStatusChange(bool, index){
  return {type: ACTIONS.CAMPAIGN_STATUS_CHANGE, payload: bool, index: index}
}
/* Dispatches the action in the method body */
export function campaignBudgetChange(budget, index){
  return {type: ACTIONS.CAMPAIGN_BUDGET_CHANGE, payload: budget, index: index}
}
/* Dispatches the action in the method body */
export function campaignStartChange(start, index){
  return {type: ACTIONS.CAMPAIGN_START_CHANGE, payload: start, index: index}
}
/* Dispatches the action in the method body */
export function campaignEndChange(end, index){
  return {type: ACTIONS.CAMPAIGN_END_CHANGE, payload: end, index: index}
}
/* Dispatches the action in the method body */
export function campaignCheckboxChange(value, index){
  return {type: ACTIONS.CAMPAIGN_CHECKBOX_CHANGE, payload: value, index: index}
}