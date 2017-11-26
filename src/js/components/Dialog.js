import React from 'react';
import styles from '../../sass/Dialog.scss';

export default class Dialog extends React.Component{  
  render(){
    if(this.props.status){
      return (
        <div className={styles.dialog}>
          <h2>{this.props.status}!</h2>
          <label>{this.props.message}</label>
          <input type="button" className={styles.dialogBtn} value="Ok" onClick={this.props.handleClick} />
        </div>
      );
    }
    else{
      return (<div className="blank"></div>);
    }
  }
}