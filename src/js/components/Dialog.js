import React from 'react';
import { connect } from 'react-redux';
import { resetStatus } from '../actions/actions';
import styles from '../../sass/Dialog.scss';

@connect((store) =>{
  return {
    status: store.message.status,
    message: store.message.message
  };
})
export default class Dialog extends React.Component{
  handleClick = () => {
    this.props.dispatch(resetStatus());
  }
  
  render(){
    if(this.props.status){
      return (
        <div className={styles.dialog}>
          <h2>{this.props.status}!</h2>
          <label>{this.props.message}</label>
          <input type="button" className={styles.dialogBtn} value="Ok" onClick={this.handleClick} />
        </div>
      );
    }
    else{
      return (<div className="blank"></div>);
    }
  }
}