import React from 'react';
import DropDownForm from './DropDownForm';
import CampaignTable from './CampaignTable';
import Dialog from './Dialog';
import {Header} from './Header';
import styles from '../../sass/Layout.scss';

export const Layout = (props) => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.mainContent}>
        <div className={styles.left}>
          <DropDownForm />
        </div>
        <div className={styles.right}>
          <CampaignTable />
        </div>
      </div>
      <Dialog />
    </div>
  );
}