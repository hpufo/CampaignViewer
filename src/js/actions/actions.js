/* This file contains all the actions dispatchers that gets passed to the reducers
*/
import axios from 'axios';

const url = "https://challenge.mediamath.com/api/";
const api_token = "?api_token=8219812fd484a2a680fb3ac399c009483c9566cb";

/* 
* Gets the Agencies from the API
*/
export function getAgencies(){
  return function(dispatch){
    axios.get(`${url}agencies${api_token}`)                                     //Building the url
    .then((response) => {                                                       //When I recieve a response
      dispatch({type: "RECEIVE_AGENCIES", payload: response.data.agencies})     //Dispatech the agencies from the response
      dispatch({type: "CHANGE_AGENCY_MESSAGE", payload: "Choose an agency..."}) //Dispatch an action to update the message
    })
    .catch((error) => {                                                         //On error    
      dispatch({type: "STATUS_MESSAGE", payload: {status: "Error", message: "Something went wrong with the API call :("}})  //Dispatch a general error message
      dispatch({type: "CHANGE_AGENCY_MESSAGE", payload: "Nothing to select"}) //Dispatch an action to update the message
    })
  }
}
/*
* Gets the Advertisers for an agency from the API
*/
export function getAdvertisers(agencyID){
  return function(dispatch){
    axios.get(`${url}advertisers${api_token}&agency_id=${agencyID}`)              //Build the url
    .then((response) => {                                                         //When the response is recieved
      dispatch({type: "CURRENT_AGENCY", payload: agencyID});                      //Dispatch the current agency
      dispatch({type: "RECIEVE_ADVERTISERS",payload: response.data.advertisers})  //And the advertisers from the response
      dispatch({type: "CHANGE_ADVERTISERS_MESSAGE", payload: "Choose an advertiser..."})  
    })
    .catch((error) => {                                                           //Same as above error
      dispatch({type: "STATUS_MESSAGE", payload: {status: "Error", message: "Something went wrong with the API call :("}})
      dispatch({type: "CHANGE_ADVERTISERS_MESSAGE", payload: "Nothing to select"}) //Dispatch an action to update the message
    })
  }
}
/*
* Gets the Campaigns for a advertiser from the API
*/
export function getAdvertiserCampaigns(advertiserID){
  return function(dispatch){
    axios.get(`${url}campaigns${api_token}&advertiser_id=${advertiserID}`)      //Same
    .then((response) => {                                                       //as
      dispatch({type: "RECIEVE_CAMPAIGNS", payload: response.data.campaigns});  //above
    })
    .catch((error) => {
      dispatch({type: "STATUS_MESSAGE", payload: {status: "Error", message: "Something went wrong with the API call :("}})
    })
  }
}
/*
* Saves all the campaigns in the object
*/
export function saveCampaigns(objs){
  return function(dispatch){
    //For each element in objs array, create a promise and store it in the promises array
    let promises = objs.map((obj) => axios.post(`${url}campaigns/${obj._id}/${api_token}`,obj))
    //Use axios.all() to send several post calls
    axios.all(promises).then((response) => {
      dispatch({type: "STATUS_MESSAGE", payload: {status: "Success", message: "All selected creatives have been successfully updated!"}}) //Dispatch a success message if it all went good
    })
    .catch((error) => {                           //If anything went wrong
      dispatch({type: "STATUS_MESSAGE", payload: {status: "Error", message: "There was an error saving your campaigns"}}) //Dispatch this error message
    })
  }
}
/*
* Syncs the campaign state with the data from the api
*/
export function syncCampaignWithAPI(ids){
  return function(dispatch){
    //Array containing all the promises
    let promises = ids.map((id) => axios.get(`${url}campaigns/${id}/${api_token}`))   //Build the url to get the individual campaign
    
    //Send several get calls
    axios.all(promises).then((responses) => {                                         //On success
      responses.map((response) => dispatch({type: "SYNC_CAMPAIGN_WITH_API", payload: response.data.campaigns[0]}))  //dispatch the individual campaign object
    })
    .catch((error) => {                     //On error
      dispatch({type: "STATUS_MESSAGE", payload: {status: "Error", message: "Something went wrong with the API call :("}})  //Send this error message
    })
  }
}
/*
* Resets the message state
*/
export function resetStatus(){
  return {type: "STATUS_MESSAGE", payload: {status: null, message: null}}
}
/*
* Custom message error
*/
export function setErrorMessage(message){
  return {type: "STATUS_MESSAGE", payload: {status: "Error", message: message}}
}
/*
* Dispatches the action in the method body
*/
export function advertiserSelected(advertiserID){
  return {type: "ADVERTISER_SELECTED", payload: advertiserID}
}
/*
* Dispatches the action in the method body
*/
export function campaignNameChange(name, index){
  return {type: "CAMPAIGN_NAME_CHANGE", payload: name, index: index}
}
/*
* Dispatches the action in the method body
*/
export function campaignStatusChange(bool, index){
  return {type: "CAMPAIGN_STATUS_CHANGE", payload: bool, index: index}
}
/*
* Dispatches the action in the method body
*/
export function campaignBudgetChange(budget, index){
  return {type: "CAMPAIGN_BUDGET_CHANGE", payload: budget, index: index}
}
/*
* Dispatches the action in the method body
*/
export function campaignStartChange(start, index){
  return {type: "CAMPAIGN_START_CHANGE", payload: start, index: index}
}
/*
* Dispatches the action in the method body
*/
export function campaignEndChange(end, index){
  return {type: "CAMPAIGN_END_CHANGE", payload: end, index: index}
}
/*
* Dispatches the action in the method body
*/
export function campaignCheckboxChange(value, index){
  return {type: "CAMPAIGN_CHECKBOX_CHANGE", payload: value, index: index}
}