import { combineReducers } from 'redux';
import agencies from './agenciesReducer';
import advertisers from './advertisersReducer';
import campaigns from './campaignsReducer';
import message from './messageReducer';

export default combineReducers({
  agencies,
  advertisers,
  campaigns,
  message
});