import React from 'react';
import DropDownForm from './DropDownForm';
import CampaignTableContainer from '../containers/CampaignTableContainer';
import DialogContainer from '../containers/DialogContainer';
import Header from './Header';
import styles from '../../sass/Layout.scss';

export default class Layout extends React.Component{
  render(){
    return (
      <div className={styles.container}>
        <Header />
        <div className={styles.mainContent}>
          <div className={styles.left}>
            <DropDownForm />
          </div>
          <div className={styles.right}>
            <CampaignTableContainer />
          </div>
        </div>
        <DialogContainer />
      </div>
    );
  }
}