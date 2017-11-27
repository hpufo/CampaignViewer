import React from 'react';
import { connect } from 'react-redux';
import { getAgencies,getAdvertisers } from '../actions/actions';
import AgencyDropDown from '../components/AgencyDropDown';

@connect((store) =>{
  return {
    agencies: store.agencies.agencies
  };
})
export default class AgencyDropDownContainer extends React.Component{  
  //Get the agencies from a API
  callAPI = () => {
    this.props.dispatch(getAgencies());
  }
  handleSelect = (event) => {
    this.props.dispatch(getAdvertisers(event.target.value));
  }
  render(){
    return <AgencyDropDown 
      agencies={this.props.agencies}
      handleSelect={this.handleSelect}
      getAgencies={this.callAPI}
    />;
  }
}