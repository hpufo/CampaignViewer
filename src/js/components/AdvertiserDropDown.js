import React from 'react';
import { connect } from 'react-redux';
import { advertiserSelected } from '../actions/actions';

@connect((store) =>{
  return {
    currentAgency: store.advertisers.currentAgency,
    advertisers: store.advertisers.advertisers
  };
})
export default class AdvertiserDropDown extends React.Component{  
  
  renderOptions(){
    return this.props.advertisers.filter((item) => {                            //filter out the advertisers with the selected agency
      if(item.agency_id === null)                                                //Always include the "Choose..." option  
        return true
      else                                                                      //Return item if item contains the currently selected agency
        return item.agency_id === this.props.currentAgency
    }).map((item, i)=>{                                                         //For each item the filter function returned
      return <option value={item._id} key={item._id}>{item.name}</option>;      //Render it's options
    });
  }
  
  handleChange = (event) => {
    this.props.dispatch(advertiserSelected(event.target.value));
  }
  
  render(){
    return (
      <div className="dropDownRow">
        <label>Advertiser</label>
        <select name="advertisers" onChange={this.handleChange}>
          {this.renderOptions()}
        </select>
      </div>
    );
  }
}