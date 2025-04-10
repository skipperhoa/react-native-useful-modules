import React from 'react'
import { View, Text } from 'react-native'
import ChartModule from '@/modules/chart/ChartModule';
export default function ChartScreen() {
  return (
    <View className='w-full h-full bg-white flex flex-col items-center' style={{ paddingTop: 120 }}>
       
        {/* <ChartModule /> */}
        <ChartModule />
    </View>
  )
}
