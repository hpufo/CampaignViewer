import moment from 'moment';
import {ACTIONS} from '../actions/actions';

const initialState = {
  currentAdvertiser: null,
  campaigns: []
};

/*
* Returns a formatted date
*/
function formatDate(date){
  //Getting the substring because the Z is causing the moment.ISO_8601 parsing to be off my one day
  return moment(date.substring(0,date.length-1),moment.ISO_8601).format('MM/DD/YY');
}
/*
* Modifies the campaign state based on the actions sent to this reducer
*/
export default function campaignsReducer(state = initialState, action){
  switch(action.type){
    //Adds campaigns to the state with data from the api
    case ACTIONS.RECIEVE_CAMPAIGNS:{
      //Get the ids already in the state
      const ids = state.campaigns.map((item) => item._id)
      //filter them out
      const obj = action.payload.filter((item) => {
        return !ids.includes(item._id)
      })
      //Make a few modifications to the campaign obj
      obj.map((campaign) => {
        campaign['checkbox'] = false;
        campaign['start_date'] = formatDate(campaign.start_date);
        campaign['end_date'] = formatDate(campaign.end_date);
        return campaign;
      });
      //Update the state with the filtered obj
      return Object.assign({},state,{
        campaigns: [
          ...state.campaigns,
          ...obj
        ]
      })
    }
    //Sets current advertiser
    case ACTIONS.ADVERTISER_SELECTED:{
      return {...state, currentAdvertiser: action.payload}
    }
    //Changes the campaign name
    case ACTIONS.CAMPAIGN_NAME_CHANGE:{
      return Object.assign({}, state,{
        campaigns: state.campaigns.map((campaign,index) => {
          if(index === action.index){
            return Object.assign({},campaign,{
              name: action.payload
            })
          }
          return campaign
        })
      })
    }
    //Changes the campaign status
    case ACTIONS.CAMPAIGN_STATUS_CHANGE:{
      return Object.assign({}, state,{
        campaigns: state.campaigns.map((campaign,index) => {
          if(index === action.index){
            return Object.assign({},campaign,{
              status: action.payload
            })
          }
          return campaign
        })
      })
    }
    //Changes the campaign budget
    case ACTIONS.CAMPAIGN_BUDGET_CHANGE:{
      return Object.assign({}, state,{
        campaigns: state.campaigns.map((campaign,index) => {
          if(index === action.index){
            return Object.assign({},campaign,{
              budget: action.payload
            })
          }
          return campaign
        })
      })
    }
    //Changes the campaign  start time
    case ACTIONS.CAMPAIGN_START_CHANGE:{
      return Object.assign({}, state,{
        campaigns: state.campaigns.map((campaign,index) => {
          if(index === action.index){
            return Object.assign({},campaign,{
              start_date: action.payload
            })
          }
          return campaign
        })
      })
    }
    //Changes the campaign  end time
    case ACTIONS.CAMPAIGN_END_CHANGE:{
      return Object.assign({}, state,{
        campaigns: state.campaigns.map((campaign,index) => {
          if(index === action.index){
            return Object.assign({},campaign,{
              end_date: action.payload
            })
          }
          return campaign
        })
      })
    }
    //Changes the campaign checkbox value
    case ACTIONS.CAMPAIGN_CHECKBOX_CHANGE:{
      return Object.assign({}, state,{
        campaigns: state.campaigns.map((campaign,index) => {
          if(index === action.index){
            return Object.assign({},campaign,{
              checkbox: action.payload
            })
          }
          return campaign
        })
      })
    }
    //Syncs the state with the data from the api
    case ACTIONS.SYNC_CAMPAIGN_WITH_API:{
      return Object.assign({}, state,{
        campaigns: state.campaigns.map((campaign) => {
          if(campaign._id === action.payload._id){
            //Modifiy the obj to format the date
            let obj = action.payload
            obj.start_date = formatDate(obj.start_date)
            obj.end_date = formatDate(obj.end_date)
            return Object.assign({}, campaign, obj)
          }
          return campaign
        })
      })
    }
    default:
      return state;
  }
}