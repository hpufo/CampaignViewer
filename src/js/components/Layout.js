import React from 'react';
import DropDownForm from './DropDownForm';
import CampaignTable from './CampaignTable';
import Dialog from './Dialog';
import Header from './Header';

export default class Layout extends React.Component{
  render(){
    return (
      <div id="container">
        <Header />
        <div id="mainContent">
          <div id="left">
            <DropDownForm />
          </div>
          <div id="right">
            <CampaignTable />
          </div>
        </div>
        <Dialog />
      </div>
    );
  }
}