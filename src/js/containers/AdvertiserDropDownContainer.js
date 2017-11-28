import React from 'react';
import { connect } from 'react-redux';
import { advertiserSelected } from '../actions/advertiserActions';
import AdvertiserDropDown from '../components/AdvertiserDropDown';

class AdvertiserDropDownContainer extends React.Component{  
  render(){
    return <AdvertiserDropDown 
      currentAgency={this.props.currentAgency}
      advertisers={this.props.advertisers}
      handleChange={this.props.handleChange}
    />;
  }
}
function mapDispatchToProps(dispatch){
  return{
    handleChange: (event) => {dispatch(advertiserSelected(event.target.value))}
  }
}
function mapStateToProps(state){
  return {
    currentAgency: state.advertisers.currentAgency,
    advertisers: state.advertisers.advertisers
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(AdvertiserDropDownContainer);