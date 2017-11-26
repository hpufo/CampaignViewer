import React from 'react';
import { connect } from 'react-redux';
import { advertiserSelected } from '../actions/actions';
import AdvertiserDropDown from '../components/AdvertiserDropDown';

@connect((store) =>{
  return {
    currentAgency: store.advertisers.currentAgency,
    advertisers: store.advertisers.advertisers
  };
})
export default class AdvertiserDropDownContainer extends React.Component{  
  handleChange = (event) => {
    this.props.dispatch(advertiserSelected(event.target.value));
  }
  
  render(){
    return <AdvertiserDropDown 
      advertisers={this.props.advertisers}
      currentAgency={this.props.currentAgency}
      handleChange={this.handleChange}
    />;
  }
}