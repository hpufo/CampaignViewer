
import React from 'react';
import { connect } from 'react-redux';
import { getAgencies,getAdvertisers } from '../actions/actions';
import styles from '../../sass/Dropdown.scss';

class AgencyDropDown extends React.Component{  
  //Makes the inital api call
  componentWillMount(){
    this.props.dispatch(getAgencies());
  }
  handleSelect = (event) => {
    this.props.dispatch(getAdvertisers(event.target.value));
  }
  renderOptions(){
    return this.props.agencies.map((item, i)=>{
      return <option value={item._id} key={item._id}>{item.name}</option>;
    });
  }
  
  render(){
    return (
      <div className={styles.dropDownRow}>
        <label>Agency</label>
        <select className={styles.select} name="agencies" onChange={this.handleSelect}>
          {this.renderOptions()}
        </select>
      </div>
    );
  }
}
function mapStateToProps(store){
  return {
    agencies: store.agencies.agencies
  };
}
export default connect(mapStateToProps)(AgencyDropDown);