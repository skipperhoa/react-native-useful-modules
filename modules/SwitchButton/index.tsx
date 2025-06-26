import React, { useEffect, useRef } from 'react'
import { View, Text, TouchableHighlight, Alert, Animated, TouchableOpacity } from 'react-native'
export default function SwitchButton() {
  const [check,setCheck] = React.useState(true)
  const translateX = useRef(new Animated.Value(0)).current

  // khi check thay đổi, sẽ chạy lại Animated
  useEffect(() => {
      Animated.timing(translateX, {
        toValue: check ? 0 : 1,
        duration: 300,
        useNativeDriver: true
      }).start()  
  }, [check])

  // set button check sưitch , sau đó cập nhật state "check"
  const checkSwitch = (value : boolean) => {
      //check switch
      setCheck(value)
  }
  return (
    <View className='w-full h-full flex flex-col items-center justify-center '>
        <Text className='w-full text-center uppercase text-white text-2xl font-bold'>SwitchButton</Text>

        <View className='w-full pt-10'>
            <View className='w-full flex flex-col items-center'>
                 <View className='w-[100px] h-[50px] overflow-hidden rounded-full relative flex flex-row items-center justify-between'
                 style={[
                    {
                        backgroundColor:check ? '#fff' : '#ccc'
                    }
                 ]}
                 >
                       <TouchableOpacity   className='w-1/2 h-full   absolute left-0' onPress={() => {
                       checkSwitch(true)
                       }}>
                          <Text></Text>
                       </TouchableOpacity>
                        <View className='w-full p-[5px]'>
                            <Animated.View className='w-[40px] h-[40px]  rounded-full relative z-50'
                            style={[
                                {
                                   backgroundColor:check ? '#53c902' : '#000',
                                   transform:[
                                    {
                                        translateX:translateX.interpolate({
                                            inputRange:[0,1],
                                            outputRange:[0,50]
                                        })
                                    }
                                   ]
                                }
                            ]}
                            ></Animated.View>
                        </View>
                       <TouchableOpacity className='w-1/2 h-full  absolute right-0'  onPress={() => {
                        checkSwitch(false)
                       }}>
                           <Text></Text>
                       </TouchableOpacity>
                 </View>
            </View>
        </View>
    </View>
  )
}
