import React from 'react';
import { connect } from 'react-redux';
import CampaignItem from './CampaignItem';
import { saveCampaigns,syncCampaignWithAPI,setErrorMessage } from '../actions/actions';

@connect((store) =>{
  return {
    currentAdvertiser: store.campaigns.currentAdvertiser,
    campaigns: store.campaigns.campaigns
  };
})
export default class CampaignTable extends React.Component{
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
  
  renderListItems(){
    let jsx = [];     //Array for storing the jsx
    for(let [index, value] of this.props.campaigns.entries()){
      if(value.advertiser_id === this.props.currentAdvertiser){
        jsx.push(<CampaignItem index={index} key={index} />)
      }
    }
    return jsx;
  }
  
  render(){
    if(this.props.campaigns.length === 0 || this.props.currentAdvertiser.includes("Choose"))
      return (<div className="blank"></div>);
    
    return (
      <form id="campaignForm" onSubmit={this.handleSubmit}>
        <table>
          <thead>
            <tr id="campaignHead">
              <th></th>
              <th><label className="headName">Campaign Name</label></th>
              <th><label className="headStatus">Status</label></th>
              <th><label className="headBudget">Budget</label></th>
              <th><label className="headStart">Start Date</label></th>
              <th><label className="headEnd">End Date</label></th>
            </tr>
          </thead>
          <tbody>
            {this.renderListItems()}
          </tbody>
        </table>
        <input type="submit" value="Save" className="btn" />
      </form>
    );
  }
}