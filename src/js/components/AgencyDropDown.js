import React from 'react';
import styles from '../../sass/Dropdown.scss';

export default class AgencyDropDown extends React.Component{  
  //Makes the inital api call
  componentWillMount(){
    this.props.callAPI();
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