import React from 'react';
import Datetime from 'react-datetime';
import styles from '../../sass/CampaignItem.scss';

export default class CampaignItem extends React.Component{  
  render(){
    //Destructing the campaign object into these vars
    const {checkbox, name, status, budget, start_date, end_date} = this.props.campaign;
    
    return (
      <tr className={styles.campaignItem}>
        <td className={styles.td}>
          <input type="checkbox" checked={checkbox} onChange={this.props.handleCheckBox} />
        </td>
        <td className={styles.td}>
          <input 
            type="text" 
            className={styles.name} 
            value={name} 
            onChange={this.props.handleNameChange} 
          />
        </td>
        <td className={styles.td}>
          <select className={styles.status} value={status} onChange={this.props.handleStatusChange} >
            <option value={true}>Active</option>
            <option value={false}>Inactive</option>
          </select>
        </td>
        <td className={styles.td}>
          <input type="text" 
            className={styles.budget}
            value={`$${budget}`} 
            onChange={this.props.handleBudgetChange} 
          />
        </td>
        <td className={styles.td}>
          <Datetime 
            value={start_date}
            onChange={this.props.handleStartChange}
            className={styles.date}
            dateFormat="MM/DD/YY"
            timeFormat={false}
            closeOnSelect={true}
          />
        </td>
        <td className={styles.td}>
          <Datetime 
            value={end_date}
            onChange={this.props.handleEndChange}
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