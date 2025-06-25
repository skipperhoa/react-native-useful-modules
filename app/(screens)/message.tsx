import MessageModule from '@/modules/message/MessageModule'
import React from 'react'
import { View, Text } from 'react-native'
export default function MessageScreen() {
  return (
    <View className='w-full bg-[#66551a] h-full'>
         <MessageModule />
    </View>
  )
}
