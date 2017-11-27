import React from 'react';
import PropTypes from 'prop-types';
import CampaignItemContainer from '../containers/CampaignItemContainer';
import styles from '../../sass/CampaignTable.scss';

export default class CampaignTable extends React.Component{
  renderListItems(){
    let jsx = [];     //Array for storing the jsx
    for(let [index, value] of this.props.campaigns.entries()){
      if(value.advertiser_id === this.props.currentAdvertiser){
        jsx.push(<CampaignItemContainer index={index} key={index} />)
      }
    }
    return jsx;
  }
  
  render(){
    if(this.props.campaigns.length === 0 || this.props.currentAdvertiser.includes("Choose"))
      return (<div className="blank"></div>);
    
    return (
      <form className={styles.campaignForm} onSubmit={this.props.handleSubmit}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.campaignHead}>
              <th className={styles.th}></th>
              <th className={styles.th}>
                <label className={styles.headName}>Campaign Name</label>
              </th>
              <th className={styles.th}>
                <label className={styles.headStatus}>Status</label>
              </th>
              <th className={styles.th}>
                <label className={styles.headBudget}>Budget</label>
              </th>
              <th className={styles.th}>
                <label className={styles.headStart}>Start Date</label>
              </th>
              <th className={styles.th}>
                <label className={styles.headEnd}>End Date</label>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.renderListItems()}
          </tbody>
        </table>
        <input type="submit" value="Save" className={styles.btn} />
      </form>
    );
  }
}

CampaignTable.PropTypes = {
  campaigns: PropTypes.array.isRequired,
  currentAdvertiser: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired
}