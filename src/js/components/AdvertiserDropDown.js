import React from 'react';
import { connect } from 'react-redux';
import { advertiserSelected } from '../actions/advertiserActions';
import styles from '../../sass/Dropdown.scss';

class AdvertiserDropDown extends React.Component{  
  
  renderOptions(){
    return this.props.advertisers.filter((item) => {                            //filter out the advertisers with the selected agency
    if(item.agency_id === 0)                                                   //Always include the "Choose..." option  
        return true
      else                                                                      //Return item if item contains the currently selected agency
        return item.agency_id === this.props.currentAgency
    }).map((item, i)=>{                                                         //For each item the filter function returned
      return <option value={item._id} key={item._id}>{item.name}</option>;      //Render it's options
    });
  }
  
  render(){
    return (
      <div className={styles.dropDownRow}>
        <label>Advertiser</label>
        <select className={styles.select} name="advertisers" onChange={this.props.handleChange}>
          {this.renderOptions()}
        </select>
      </div>
    );
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
export default connect(mapStateToProps,mapDispatchToProps)(AdvertiserDropDown);