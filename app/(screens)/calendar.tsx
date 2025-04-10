import React,{useEffect,useRef} from 'react'
import { View, Text,Button,Platform,StyleSheet,Animated,TouchableOpacity,Dimensions } from 'react-native'
import Constants  from 'expo-constants'
import * as Calendar from 'expo-calendar';
const {width,height } = Dimensions.get("window");
const ITEM_WIDTH = (width-40) / 7;
import Entypo from '@expo/vector-icons/Entypo';

// import calendar
import CalendarDate from '@/modules/calendar/lib/CalendarDate';

export default function CalendarScreen() {
    /* get year and month */
    const date = new Date();
    const YEAR = date.getFullYear()
    const MONTH = date.getMonth()+1;
   
  return (
   <>
    
    <CalendarDate Year={YEAR} Month={MONTH} />
   </>
  )
}
