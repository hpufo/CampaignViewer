import React from 'react';
import { connect } from 'react-redux';
import { resetStatus } from '../actions/actions';
import Dialog from '../components/Dialog';

@connect((store) =>{
  return {
    status: store.message.status,
    message: store.message.message
  };
})
export default class DialogContainer extends React.Component{
  handleClick = () => {
    this.props.dispatch(resetStatus());
  }

  render(){
    return <Dialog 
      status={this.props.status} 
      message={this.props.message} 
      handleClick={this.handleClick} 
    />;
  }
}