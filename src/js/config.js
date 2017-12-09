/*
 * This file is to decide if you want to use MediaMath's mock API, or my API.
 * I only implented enough of their api to get this app functional. 
 * So when I no longer have access to MediaMath's mock API I can use mine instead.
 */

//Switch to false to use my API instead.
const useMediaMathAPI = true;

const MediaMathURL = "http://challenge.mediamath.com/api/";
const MyURL = "http://peaceful-basin-59779.herokuapp.com/api/";

export const url = useMediaMathAPI ? MediaMathURL : MyURL;
export const api_token =  useMediaMathAPI ? "&api_token=8219812fd484a2a680fb3ac399c009483c9566cb" : "";