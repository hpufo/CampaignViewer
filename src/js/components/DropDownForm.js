import React from 'react';
import { connect } from 'react-redux';
import { getAdvertiserCampaigns } from '../actions/actions';
import AgencyDropDownContainer from '../containers/AgencyDropDownContainer';
import AdvertiserDropDownContainer from '../containers/AdvertiserDropDownContainer';
import styles from "../../sass/DropdownForm.scss";

class DropDownForm extends React.Component{
  handleSubmit = (event) => {
    event.preventDefault();
    //Make the call to the api to get the advertiser's campaigns
    this.props.dispatch(getAdvertiserCampaigns(this.props.advertiserSelected));
  }
  
  render(){
    return (
      <form className="DropDownForm" onSubmit={this.handleSubmit}>
        <AgencyDropDownContainer />
        <AdvertiserDropDownContainer />
        <input type="submit" value="Get Campaigns" className={styles.btn} />
      </form>
    );
  }
}

function mapStateToProps(store){
  return {
    advertiserSelected: store.advertisers.advertiserSelected
  };
}
export default connect(mapStateToProps)(DropDownForm);