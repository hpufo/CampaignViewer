import React from 'react';

export default class Top extends React.Component{
  render(){
    return (
      <div id="header">
        <h4 id="appName">Campaign Viewer</h4>
        <div id="bar">
          <div id="nav">
            <div className="back"></div>
            <div className="foward"></div>
            <div className="refresh"></div>
          </div>
          <div id="search">
            <input />
          </div>
          <div className="menu"></div>
        </div>
      </div>
    );
  }
}