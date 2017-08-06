import React from 'react';
import { connect } from 'react-redux';
import Datetime from 'react-datetime';
import moment from 'moment';
import { campaignNameChange,campaignStatusChange,campaignBudgetChange,campaignStartChange,campaignEndChange,campaignCheckboxChange,setErrorMessage,syncCampaignWithAPI } from '../actions/actions';

@connect((store, ownProps) =>{
  return {
    campaign: store.campaigns.campaigns[ownProps.index]
  };
})
export default class CampaignItem extends React.Component{  
  handleCheckBox = (event) => {
    //value will be either ture or false
    let value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    this.props.dispatch(campaignCheckboxChange(value,this.props.index))
  }
  handleNameChange = (event) => {
    this.props.dispatch(campaignNameChange(event.target.value,this.props.index))
  }
  handleStatusChange = (event) => {
    this.props.dispatch(campaignStatusChange(event.target.value,this.props.index))
  }
  handleBudgetChange = (event) => {
    //Formating and validation
    let formatedBugdet = event.target.value
    if(formatedBugdet.includes('$')) formatedBugdet = formatedBugdet.substring(1)  //Splices the $ if it is in the string
    if(formatedBugdet == "") formatedBugdet = 0;                                  //If empty set it to zero
    //Throws an error message if the user attempt to enter a non number
    if(isNaN(formatedBugdet)){
      this.props.dispatch(setErrorMessage("Only input a number for a budget"))
      return;
    }
    this.props.dispatch(campaignBudgetChange(formatedBugdet,this.props.index))    //Dispatches the action after all the validation
  }
  handleStartChange = (date) => {
    //Check to see if the date is invalid
    if(typeof date === "string" && !date.match(/[0-9]{2}\/[0-9]{2}\/[0-9]{2}/)){
      //hack: for some reason datepicker will keep the invalid user input, even if the state contains the old valid data. So I am adding one day
      let preDate = moment(this.props.campaign.start_date,'MM/DD/YY').add(1,'d')    
      this.props.dispatch(setErrorMessage("Not a valid date must be: MM/DD/YY use the datepicker"))   //Send the error message
      this.props.dispatch(campaignStartChange(preDate.format('MM/DD/YY'), this.props.index))          //Set the state to be done day ahead
    }
    else  //If valid
      this.props.dispatch(campaignStartChange(date.format('MM/DD/YY'),this.props.index))  //send the action with the formated data
  }
  handleEndChange = (date) => {
    //Check to see if the date is invalid
    if(typeof date === "string" && !date.match(/[0-9]{2}\/[0-9]{2}\/[0-9]{2}/)){
      //hack: for some reason datepicker will keep the invalid user input, even if the state contains the old valid data. So I am adding one day
      let preDate = moment(this.props.campaign.end_date,'MM/DD/YY').add(1,'d')    
      this.props.dispatch(setErrorMessage("Not a valid date must be: MM/DD/YY use the datepicker"))   //Send the error message
      this.props.dispatch(campaignEndChange(preDate.format('MM/DD/YY'), this.props.index))          //Set the state to be done day ahead
    }
    else
      this.props.dispatch(campaignEndChange(date.format('MM/DD/YY'),this.props.index))
  }
  
  render(){
    //Destructing the campaign object into these vars
    const {checkbox, name, status, budget, start_date, end_date} = this.props.campaign;
    
    return (
      <tr className="campaignItem">
        <td>
          <input type="checkbox" checked={checkbox} onChange={this.handleCheckBox} />
        </td>
        <td>
          <input 
            type="text" 
            className="name" 
            value={name} 
            onChange={this.handleNameChange} 
          />
        </td>
        <td>
          <select className="status" value={status} onChange={this.handleStatusChange} >
            <option value={true}>Active</option>
            <option value={false}>Inactive</option>
          </select>
        </td>
        <td>
          <input type="text" 
            className="budget"
            value={`\$${budget}`} 
            onChange={this.handleBudgetChange} 
          />
        </td>
        <td>
          <Datetime 
            value={start_date}
            onChange={this.handleStartChange}
            className="date"
            dateFormat="MM/DD/YY"
            timeFormat={false}
            closeOnSelect={true}
          />
        </td>
        <td>
          <Datetime 
            value={end_date}
            onChange={this.handleEndChange}
            className="date"
            dateFormat="MM/DD/YY"
            timeFormat={false}
            closeOnSelect={true}
          />
        </td>
      </tr>
    );
  }
}