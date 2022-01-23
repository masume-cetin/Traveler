import React,{Component} from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';
import Event from './EventFolder/AddEvent.js'
import './map.css'
import { useState, useEffect} from 'react';
import { useSharedEventStates } from './MapEventSharedStates.js';
import { useSharedEventStates1 } from './AddressSharedState';
import Mapper from './map.js'
import useForceUpdate from './forceUpdate.js';


const Map=()=>{
  const forceUpdate = useForceUpdate();
  const{isPopupOpen,setisPopupOpen}=useSharedEventStates()
  const[adres,setadres]=useState()

  const open=()=>{
    setisPopupOpen(true)
    setadres(localStorage.getItem('adress'))
  }


  return (
    <div onClick={open} className='location-content' style={{display:'flex'}}>
    <div onClick={forceUpdate} className='map' >
      {localStorage.getItem('adress').length>0&&<div>{isPopupOpen&&<Event></Event>}</div>}
     <Mapper/>
    </div>
    </div>
  );

}

export default Map;