import React,{useEffect, useRef,useState} from 'react'
import { View, Text,Animated,TouchableOpacity, Platform } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
export default function ChartModule() {
  const showAnimationModal = useRef(new Animated.Value(0)).current;
  const showAnimationModal2 = useRef(new Animated.Value(0)).current;
  const refs = Array(7).fill(null).map(() => useRef(new Animated.Value(0)));
  const [resetAnimation, setResetAnimation] = useState(0);
  const colors =[
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
    "#000000"
  ]
const [arrayAnimation, setArrayAnimation] = useState<{ id: number; value: Animated.Value;total: number; color: string }[]>([]);

useEffect(() => {
  const array: { id: number; value: Animated.Value; total: number; color: string }[] = [];
  for (let i = 0; i < 7; i++) {
    array.push({
      id: i,
      value: refs[i].current,
      total:Math.floor(Math.random() * 300),
      color:colors[i],
     
    });
  }
  setArrayAnimation(array);
 
}, [resetAnimation]);


useEffect(() => {
   
}, []);

  const show = () => {
    let paralet = [];
    arrayAnimation.map((item, index) => {
        paralet.push(
            Animated.timing(item.value, {
                toValue: 1,
                duration: index * 200 + 500,
                useNativeDriver: true,
            })
        );
    });
    Animated.parallel(paralet).start();
    setResetAnimation(resetAnimation + 1);
       /*  Animated.parallel([
            Animated.timing(showAnimationModal, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(showAnimationModal2, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
        ]).start(); */
    };
  const close = () => {
    let paralet = [];
    arrayAnimation.map((item, index) => {
        paralet.push(
            Animated.timing(item.value, {
                toValue: 0,
                duration: index * 200 + 500,
                useNativeDriver: true,
            })
        );
    });
    Animated.parallel(paralet).start();

    
    };
 const reset =  async() => {
   
    
       await close();
      setTimeout(() => {
        show();
      }
      , 1000);
    
    }  
  return (
    <View className='w-full'>
        <Text className='w-full font-bold text-2xl text-center'>Chart</Text>
        <View className='w-full px-10 mt-10 h-[350px]'>
            <View className='w-full bg-gray-100 h-[300px] relative '>
                
                {/* col left */}
                <View className='w-[1px] h-full bg-gray-500 absolute left-0'></View>
                {/* row bottom */}
                <View className='w-full h-[1px] absolute bottom-0 bg-gray-500'></View>

                {/* col left phan tram */}
                <View className='w-auto h-full bg-white absolute bottom-[50px] -left-[30px] z-20 flex flex-col justify-end items-end gap-[50px]'>
                    
                   
                    
                    <Text className='font-bold'>200</Text>
                    <Text className='font-bold'>150</Text>
                    <Text className='font-bold'>100</Text>
                    <Text className='font-bold'>50</Text>
                   
                    
                </View>

                {/* chart */}
                <View className='w-full h-full flex flex-row items-center justify-end '>

                    {
                        arrayAnimation.map((item, index) => (
                            <View key={index} className='absolute bottom-0 flex flex-col items-center' style={{
                                left: Platform.OS === 'ios' ? index * 45 : index * 40,
                                width: Platform.OS === 'ios' ? 60 : 50,}}>
                                <View className='overflow-hidden h-full'>
                                    <Animated.View className='bg-gray-500 rounded-t-md '
                                    style={{
                                        width: Platform.OS === 'ios' ? 30 : 30,
                                        height: item.total,
                                        backgroundColor: item.color,
                                        transform: [
                                            {
                                                translateY: item.value.interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [300, 0],
                                                }),
                                            },
                                        ]   
                                    }}
                                    >
                                    </Animated.View>
                                </View>
                                <Text className='w-full text-center text-sm absolute -bottom-8 font-bold text-red-500'>202{index}</Text>
                            </View>
                        ))
                    }   



                    {/* <View className='w-[60px] absolute bottom-0 flex flex-col items-center' style={{left: 0}}>
                         <View className='overflow-hidden h-full'>
                                <Animated.View className='w-[30px] bg-gray-500 rounded-t-md '
                                style={{
                                    height: 100,
                                    
                                    transform: [
                                        {
                                            translateY: showAnimationModal.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [300, 0],
                                            }),
                                        },
                                    ]
                                }}
                                >
                                
                                </Animated.View>
                         </View>
                          <Text className='w-full text-center text-sm absolute -bottom-8'>2019</Text>
                        
                     </View>
                      
                     <View className='w-[60px] absolute bottom-0 flex flex-col items-center' style={{left: 50}}>
                        <View className='overflow-hidden h-full'>

                         <Animated.View className='w-[30px] bg-yellow-500 rounded-t-md' 
                         style={{
                            height: 150,
                            transform: [
                                {
                                    translateY: showAnimationModal2.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [300, 0],
                                    }),
                                },
                            ]
                          }}
                         ></Animated.View>
                        
                        </View>
                        <Text className='w-full text-center text-sm absolute -bottom-8'>2020</Text>
                    
                     </View>
                     <View className='w-[60px] absolute bottom-0 flex flex-col items-center' style={{left: 100}}>
                       <View className='overflow-hidden h-full'>

                        <View className='w-[30px] bg-blue-500 rounded-t-md' style={{height:80}}></View>
                       </View>
                        
                        <Text className='w-full text-center text-sm absolute -bottom-8'>2021</Text>
                     </View>
                     <View className='w-[60px] absolute bottom-0 flex flex-col items-center' style={{left: 150}}>
                     <View className='overflow-hidden h-full'>

                         <View className='w-[30px] bg-red-500 rounded-t-md' style={{height:120}}></View>
                     </View>
                        <Text className='w-full text-center text-sm absolute -bottom-8'>2022</Text>
                     </View>
                     <View className='w-[60px] absolute bottom-0 flex flex-col items-center' style={{left: 200}}>
                     <View className='overflow-hidden h-full'>

                         <View className='w-[30px] bg-green-500 rounded-t-md' style={{height:200}}></View>
                     </View>
                        <Text className='w-full text-center text-sm absolute -bottom-8'>2023</Text>
                     </View>
                     <View className='w-[60px] absolute bottom-0 flex flex-col items-center' style={{left: 250}}>
                     <View className='overflow-hidden h-full'>

                         <View className='w-[30px] bg-orange-500 rounded-t-md' style={{height:100}}></View>
                     </View>
                        <Text className='w-full text-center text-sm absolute -bottom-8'>2024</Text>
                     </View>
                     <View className='w-[60px] absolute bottom-0 flex flex-col items-center' style={{left: 300}}>
                     <View className='overflow-hidden h-full'>

                         <View className='w-[30px] bg-gray-700 rounded-t-md' style={{height:100}}></View>
                     </View>
                        <Text className='w-full text-center text-sm absolute -bottom-8'>2025</Text>
                     </View> */}
                </View>
                
            </View>

           
            
        </View>
    <View className='w-full px-5'>
    <TouchableOpacity className='w-full py-2 rounded-md flex flex-col items-center justify-center mt-10'
    style={{
        backgroundColor: Platform.OS === 'ios' ? '#007AFF' : '#fccd0f',
    }}
    onPress={reset}>
                  <Text className='text-white text-lg'>Reload</Text>
            </TouchableOpacity> 
    </View>
    </View>
  )
}
