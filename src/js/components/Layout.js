import React from 'react';
import DropDownForm from './DropDownForm';
import CampaignSelection from './CampaignSelection';
import Dialog from './Dialog';
import Top from './Top';

export default class Layout extends React.Component{
  render(){
    return (
      <div id="container">
        <Top />
        <div id="mainContent">
          <div id="left">
            <DropDownForm />
          </div>
          <div id="right">
            <CampaignSelection />
          </div>
        </div>
        <Dialog />
      </div>
    );
  }
}