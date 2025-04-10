import React, { useRef } from "react";
import { View, Text, TouchableOpacity,Animated, Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
const {height} = Dimensions.get("window");
export default function ModalScreen() {
  
  const showAnimationModal = useRef(new Animated.Value(0)).current;
  const opacityAnimationModal = useRef(new Animated.Value(0)).current;
  const topAnimationModal = useRef(new Animated.Value(0)).current;
  const show = () => {
        Animated.parallel([
            Animated.timing(showAnimationModal, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnimationModal, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(topAnimationModal, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
        ]).start();
    };

const  close = () => {
    Animated.parallel([
        Animated.timing(showAnimationModal, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
        }),
        Animated.timing(opacityAnimationModal, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
        }),
        Animated.timing(topAnimationModal, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
        }),
       
    ]).start();
};

  return (
    <View className="w-full h-full bg-gray-200 flex items-center justify-center relative">
      {/* Modal */}
        <Animated.View className="w-full h-full bg-gray-900  absolute z-30 px-5 flex flex-col items-center justify-center" 
        
        style={[
            {
                opacity: opacityAnimationModal.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
                }),
            },
            ]}>
            <Animated.View className="w-full h-[120px] p-5 bg-white absolute z-50 rounded-xl" 
            style={[
                {
                    // transform: [
                    // {
                    //     scale: showAnimationModal.interpolate({
                    //          inputRange: [0, 1],
                    //          outputRange: [0,1],
                    //     }),
                    // },
                    // ],

                    transform:[
                        {
                            translateY: topAnimationModal.interpolate({
                                inputRange: [0, 1],
                                outputRange: [height,100],
                            }),
                        }
                    ]
                
                },
                ]}>
            <View className="w-full h-full flex flex-row items-center justify-between">
                <Text className="flex-1 font-bold text-xl pr-2">
                Chào mừng bạn đã đến với chúng tôi!
                </Text>
                <TouchableOpacity 
                onPress={close}
                className="w-[50px] h-[50px] bg-red-500 rounded-md flex items-center justify-center">
                <AntDesign name="delete" size={24} color="white" />
                </TouchableOpacity>
            </View>
            </Animated.View>
        </Animated.View>
    

      {/* click button */}
      <TouchableOpacity onPress={show} className="w-[150px] h-[50px] bg-blue-500 rounded-md flex items-center justify-center">
          <Text>Show Modal</Text>
      </TouchableOpacity>
      <TouchableOpacity 
      onPress={() => {
          // @ts-ignore
         router.back();
      }
      }
      className="w-[150px] h-[50px] bg-green-500 rounded-md flex items-center justify-center mt-5">
          <Text className="text-center text-white font-bold">Back</Text>
      </TouchableOpacity>
    </View>
  );
}
