import React,{useRef} from 'react'
import { View, Text ,TouchableOpacity, Animated,Dimensions} from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useRouter } from 'expo-router';
const {height,width} = Dimensions.get("window");
export default function AlertScreen() {

  const router = useRouter();

//opacity
const opacityAnimationModal = useRef(new Animated.Value(0)).current;

// translate Y animation
const translateYAnimationModal = useRef(new Animated.Value(0)).current;

// show modal
const show = () => {
    Animated.parallel([
        Animated.timing(opacityAnimationModal, {
            toValue: 1,  // opactiry chay den input = 1
            duration: 800,
            useNativeDriver: true,
        }),
        Animated.timing(translateYAnimationModal, {
            toValue: 1,  // chay den gia tri input = 1
            duration: 800,
            useNativeDriver: true,
        }),
    ]).start();
}

// hide modal
const hide = () => {
    Animated.parallel([
        Animated.timing(opacityAnimationModal, {
            toValue: 0,  // opactiry chay den input = 0
            duration: 800,
            useNativeDriver: true,
        }),
        Animated.timing(translateYAnimationModal, {
            toValue: 0,  // chay den gia tri input = 0
            duration: 800,
            useNativeDriver: true,
        }),
    ]).start();
}


  return (
    <>
        {/* box full content */}
        <View className='w-full h-full bg-white relative flex items-center justify-center'>



            {/* alert modal */}
            <Animated.View className='w-full h-full bg-gray-500 flex items-center justify-center px-5 absolute z-30'
            style={{
                opacity: opacityAnimationModal.interpolate({
                    inputRange:[0,1],  // chay tu 0->1
                    outputRange:[0,1]
                })
            }}
            >
                <Animated.View className='w-full h-auto bg-white rounded-2xl px-5 py-10 absolute z-40'
                    style={{
                        transform:[
                            {
                                translateY: translateYAnimationModal.interpolate({
                                   inputRange:[0,1],  // chay tu 0->1
                                   outputRange:[height,0]
                                })
                            }
                        ]
                    }}
                >
                    {/* logo */}
                    <View className='w-full flex flex-col items-center justify-center'>
                        <AntDesign name="checkcircleo" size={50} color="blue" />
                    </View>
                    {/* content */}
                    <View className='w-full flex flex-col items-center justify-center pt-2'>
                        <Text className='text-3xl pt-5 font-bold'>Complated</Text>
                        <Text className='text-xl pt-3 text-center'>You have successfuly downloaded all the source code files</Text>
                    </View>
                    {/* footer */}
                    <View className='w-full flex flex-row items-center justify-center gap-2 pt-6'>
                        <TouchableOpacity className='w-1/2 px-2' onPress={hide}>
                            <View className='w-full flex flex-row items-center justify-center gap-4 bg-green-500 rounded-md p-2'>
                                <FontAwesome5 name="check-double" size={20} color="white" />
                                <Text className='text-xl text-white font-bold'>Ok, Close</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity className='w-1/2 px-2'>
                            <View className='w-full flex flex-row items-center justify-center gap-4 bg-blue-500 rounded-md p-2'>
                            <FontAwesome6 name="folder-open" size={20} color="white" />
                                <Text className='text-xl text-white font-bold'>Open File</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </Animated.View>



            {/* button show modal */}
            <TouchableOpacity className='w-[150px] p-3 bg-blue-700 rounded-md flex items-center justify-center'
              onPress={show}
            
            >
                 <Text className='text-white font-bold'>Show Alert Modal</Text>
            </TouchableOpacity>
            <TouchableOpacity className='w-[150px] mt-4 p-3 bg-yellow-700 rounded-md flex items-center justify-center' onPress={() => {
                router.push("/(screens)");
            }}>
                 <Text className='text-white font-bold'>Back</Text>
            </TouchableOpacity>
        </View>
    </>
  )
}
