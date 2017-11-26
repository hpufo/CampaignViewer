import React from 'react';
import { connect } from 'react-redux';
import CampaignTable from '../components/CampaignTable';
import { saveCampaigns,syncCampaignWithAPI,setErrorMessage } from '../actions/actions';

@connect((store) =>{
  return {
    currentAdvertiser: store.campaigns.currentAdvertiser,
    campaigns: store.campaigns.campaigns
  };
})
export default class CampaignTableContainer extends React.Component{
  handleSubmit = (event) => {
    event.preventDefault();
    //Filter out the objs from the state to only get objs that are checked
    let checked = this.props.campaigns.filter((campaign) => campaign.checkbox)
    //If the user didn't check anything
    if(checked.length < 1) {
      this.props.dispatch(setErrorMessage("You don't have anything checked"));    //Send them this error message
      return;                                                                     //exit the function
    }
    this.props.dispatch(saveCampaigns(checked));                                  //Dispatches the action to save the changes
    
    //Gets rid of the changes in the unchecked rows by syncing the their state with the api
    let uncheckedIDs = this.props.campaigns.filter((campaign) => !campaign.checkbox).map((campaign) => campaign._id);
    this.props.dispatch(syncCampaignWithAPI(uncheckedIDs));
  }
  
  render(){
    if(this.props.campaigns.length === 0 || this.props.currentAdvertiser.includes("Choose"))
      return (<div className="blank"></div>);
    
    return <CampaignTable 
      campaigns={this.props.campaigns}
      currentAdvertiser={this.props.currentAdvertiser}
      handleSubmit={this.handleSubmit}
    />
  }
}