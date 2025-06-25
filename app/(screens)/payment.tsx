import PaymentMethod from '@/modules/PaymentMethod'
import PaymentMethodV2 from '@/modules/PaymentMethod/indexV2'
import React from 'react'
import { View, Text ,ScrollView} from 'react-native'
export default function Payment() {
  return (
    <View className='w-full h-full bg-gray-700' style={{ paddingTop: 80 }}>
        <Text className='w-full text-2xl text-center font-bold text-white uppercase'>Card Payment</Text>
       <View className='w-full h-full'>
           {/* <PaymentMethod /> */}
           <PaymentMethodV2 />
       </View>
    </View>
  )
}
