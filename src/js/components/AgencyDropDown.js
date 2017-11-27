import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../sass/Dropdown.scss';

export default class AgencyDropDown extends React.Component{  
  //Makes the inital call to get agenices
  componentDidMount(){
    this.props.getAgencies();
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
        <select className={styles.select} name="agencies" onChange={this.props.handleSelect}>
          {this.renderOptions()}
        </select>
      </div>
    );
  }
}

AgencyDropDown.PropTypes = {
  agencies: PropTypes.array.isRequired,
  handleSelect: PropTypes.func.isRequired,
  getAgencies: PropTypes.func.isRequired
}