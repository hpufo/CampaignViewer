import React from 'react';
import { connect } from 'react-redux';
import { getAdvertiserCampaigns } from '../actions/actions';
import AgencyDropDown from './AgencyDropDown';
import AdvertiserDropDown from './AdvertiserDropDown';

@connect((store) =>{
  return {
    advertiserSelected: store.advertisers.advertiserSelected
  };
})
export default class DropDownForm extends React.Component{
  handleSubmit = (event) => {
    event.preventDefault();
    //Make the call to the api to get the advertiser's campaigns
    this.props.dispatch(getAdvertiserCampaigns(this.props.advertiserSelected));
  }
  
  render(){
    return (
      <form id="DropDownForm" onSubmit={this.handleSubmit}>
        <AgencyDropDown />
        <AdvertiserDropDown />
        <input type="submit" value="Get Campaigns" className="btn" />
      </form>
    );
  }
}