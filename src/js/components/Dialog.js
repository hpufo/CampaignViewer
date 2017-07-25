import React from 'react';
import { connect } from 'react-redux';
import { resetStatus } from '../actions/actions';

@connect((store) =>{
  return {
    status: store.message.status,
    message: store.message.message
  };
})
export default class Dialog extends React.Component{
  handleClick(){
    this.props.dispatch(resetStatus());
  }
  
  render(){
    if(this.props.status){
      return (
        <div id="dialog">
          <h2>{this.props.status}!</h2>
          <label>{this.props.message}</label>
          <input type="button" id="dialogBtn" value="Ok" onClick={this.handleClick.bind(this)} />
        </div>
      );
    }
    else{
      return (<div className="blank"></div>);
    }
  }
}