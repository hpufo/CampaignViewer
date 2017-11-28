
import React from 'react';
import { connect } from 'react-redux';
import { getAgencies } from '../actions/agencyActions';
import { getAdvertisers } from '../actions/advertiserActions';
import AgencyDropDown from '../components/AgencyDropDown';

class AgencyDropDownContainer extends React.Component{  
  render(){
    return <AgencyDropDown 
      agencies={this.props.agencies}
      handleSelect={this.props.handleSelect}
      loadAgencies={this.props.loadAgencies}
    />;
  }
}
function mapDispatchToProps(dispatch){
  return{
    loadAgencies: () => {dispatch(getAgencies())},
    handleSelect: (event) => {dispatch(getAdvertisers(event.target.value))}
  }
}
function mapStateToProps(state){
  return {
    agencies: state.agencies.agencies
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(AgencyDropDownContainer);