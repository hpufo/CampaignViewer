import React from 'react';
import { connect } from 'react-redux';
import Datetime from 'react-datetime';
import moment from 'moment';
import { campaignNameChange,campaignStatusChange,campaignBudgetChange,campaignStartChange,campaignEndChange,campaignCheckboxChange } from '../actions/campaignActions';
import { setErrorMessage } from '../actions/messageActions';
import styles from '../../sass/CampaignItem.scss';

class CampaignItem extends React.Component{  
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
    if(formatedBugdet === "") formatedBugdet = 0;                                  //If empty set it to zero
    //Throws an error message if the user attempt to enter a non number
    if(isNaN(formatedBugdet)){
      this.props.dispatch(setErrorMessage("Only input a number for a budget"))
      return;
    }
    this.props.dispatch(campaignBudgetChange(formatedBugdet,this.props.index))    //Dispatches the action after all the validation
  }
  handleStartChange = (date) => {
    this.handleDateChange(date,true);
  }
  handleEndChange = (date) => {
    this.handleDateChange(date,false);
  }

  handleDateChange = (date,startDate) => {
    //Check to see if the date is invalid
    if(typeof date === "string" && !date.match(/^[1-12]{2}\/[1-31]{2}\/[0-9]{2}$/)){
      //hack: for some reason datepicker will keep the invalid user input, even if the state contains the old valid data. So I am adding one day
      let preDate = moment(startDate? this.props.campaign.start_date : this.props.campaign.end_date,'MM/DD/YY').add(1,'d')    
      this.props.dispatch(setErrorMessage("Not a valid date must be: MM/DD/YY use the datepicker"))   //Send the error message
      if(startDate)
        this.props.dispatch(campaignStartChange(preDate.format('MM/DD/YY'), this.props.index))          //Set the state to be done day ahead
      else
        this.props.dispatch(campaignEndChange(preDate.format('MM/DD/YY'), this.props.index))
    }
    else{  //If valid
      if(startDate)
        this.props.dispatch(campaignStartChange(date.format('MM/DD/YY'),this.props.index))  //send the action with the formated data
      else
        this.props.dispatch(campaignEndChange(date.format('MM/DD/YY'),this.props.index))
    }
  }
  
  render(){
    //Destructing the campaign object into these vars
    const {checkbox, name, status, budget, start_date, end_date} = this.props.campaign;
    
    return (
      <tr className={styles.campaignItem}>
        <td className={styles.td}>
          <input type="checkbox" checked={checkbox} onChange={this.handleCheckBox} />
        </td>
        <td className={styles.td}>
          <input 
            type="text" 
            className={styles.name} 
            value={name} 
            onChange={this.handleNameChange} 
          />
        </td>
        <td className={styles.td}>
          <select className={styles.status} value={status} onChange={this.handleStatusChange} >
            <option value={true}>Active</option>
            <option value={false}>Inactive</option>
          </select>
        </td>
        <td className={styles.td}>
          <input type="text" 
            className={styles.budget}
            value={`$${budget}`} 
            onChange={this.handleBudgetChange} 
          />
        </td>
        <td className={styles.td}>
          <Datetime 
            value={start_date}
            onChange={this.handleStartChange}
            className={styles.date}
            dateFormat="MM/DD/YY"
            timeFormat={false}
            closeOnSelect={true}
          />
        </td>
        <td className={styles.td}>
          <Datetime 
            value={end_date}
            onChange={this.handleEndChange}
            className={styles.date}
            dateFormat="MM/DD/YY"
            timeFormat={false}
            closeOnSelect={true}
          />
        </td>
      </tr>
    );
  }
}

function mapStateToProps(state, ownProps){
  return {
    campaign: state.campaigns.campaigns[ownProps.index]
  };
}
export default connect(mapStateToProps)(CampaignItem);