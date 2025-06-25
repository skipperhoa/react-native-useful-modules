import React,{useRef} from 'react'
import {Animated, View, StyleSheet, PanResponder, Dimensions,Text,TouchableOpacity} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
const {width,height} = Dimensions.get('window')
export default function ItemMessage({item}) {
  const pan = useRef(new Animated.Value(0)).current;
  const [x,setX] = React.useState(0)
  const panResponder = useRef(
    PanResponder.create({
        onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
         if(gestureState.dx < 0){
            pan.setValue(gestureState.dx)
         }
      },
      onPanResponderRelease: (_,gestureState) => {
            if(gestureState.dx < -50){
                Animated.timing(pan, {
                    toValue: -100,
                    duration: 300,
                    useNativeDriver: true,
                }).start();
            }else{
                Animated.timing(pan, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }).start();
            }
      },
    }),
  ).current;
  const removeAlert = () => {
          Animated.timing(pan, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true,
          }).start();
      }
  return (
    <View className='w-full py-1'>
         <Animated.View
          style={{
         
            transform: [
                {
                    /* translateX: pan.interpolate({
                        inputRange: [-100,-50,0, 100], 
                        outputRange: [-100,0,0, 0], // Đầu ra tương ứng với đầu vào})
                        
                        extrapolate: 'clamp' // Giới hạn đầu ra trong khoảng -50 đến 50
                    }) */
                   translateX: pan

                }
        ]
        }}
         >
          <View className='w-full h-[70px] bg-[#0abedf] justify-center px-5'  {...panResponder.panHandlers}>
              <Text className='w-full text-black text-sm text-left font-bold'>Animated and React Native ScrollViews</Text>
          </View>
          <Animated.View className='w-[100px] h-[70px] bg-red-500 absolute right-0 top-0 items-center justify-center'
          style={[
            {
                opacity: pan.interpolate({
                  inputRange:[-100,0,100],
                  outputRange:[1,0.5,0]
                }),
                transform:[
                    {
                        translateX:pan.interpolate({
                            inputRange:[-100,0,100],
                            outputRange:[100,120, 140], // Đầu ra tương ứng với đầu vào})
                            extrapolate:'clamp' // Giới hạn đầu ra trong khoảng -50 đến 50
                        })
                    }
                ]
            }
          ]}>
               <TouchableOpacity className='w-full flex flex-row items-center justify-center gap-2' onPress={removeAlert}>
                  <FontAwesome name="remove" size={24} color="white" />
                  <Text className=' text-white text-sm text-center font-bold'>Remove</Text>
               </TouchableOpacity>
          </Animated.View>
        
        </Animated.View>
    </View>
  )
}
