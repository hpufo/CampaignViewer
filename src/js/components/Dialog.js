import React from 'react';
import { connect } from 'react-redux';
import { resetStatus } from '../actions/messageActions';
import styles from '../../sass/Dialog.scss';

class Dialog extends React.Component{
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

function mapStateToProps(state){
  return {
    status: state.message.status,
    message: state.message.message
  };
}
export default connect(mapStateToProps)(Dialog);