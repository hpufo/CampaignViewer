import React from 'react';
import styles from '../../sass/Header.scss';

export default class Header extends React.Component{
  render(){
    return (
      <div className={styles.header}>
        <h4 className={styles.appName}>Campaign Viewer</h4>
        <div className={styles.bar}>
          <div className={styles.nav}>
            <div className={styles.back}></div>
            <div className={styles.foward}></div>
            <div className={styles.refresh}></div>
          </div>
          <div className={styles.search}>
            <input />
          </div>
          <div className={styles.menu}></div>
        </div>
      </div>
    );
  }
}