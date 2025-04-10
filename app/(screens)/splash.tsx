import { router } from "expo-router";
import React, { useRef } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Animated,
} from "react-native";
import { opacity } from "react-native-reanimated/lib/typescript/Colors";
export default function Splahscreen() {
  // setup modal
  const scale = useRef(new Animated.Value(0)).current; // cho default  = 0

  // button show modal
  const showAnimationModal = () => {
    Animated.timing(scale, {
      toValue: 1, // giá trị ban đầu  bắt đâu chạy
      duration: 800, // thời gian xử lý ms
      useNativeDriver: true, // cho bằng "true", để xử lý mượt mà hơn
    }).start(); // bắt đầu xử lý chạy nhé
  };

  // button close modal
  const closeAnimationModal = () => {
    Animated.timing(scale, {
      toValue: 0, // giá trị ban đầu  bắt đâu chạy
      duration: 1000, // thời gian xử lý ms
      useNativeDriver: true, // cho bằng "true", để xử lý mượt mà hơn
    }).start(); // bắt đầu xử lý chạy nhé
  };

  return (
    <>
      <SafeAreaView className="w-full h-full bg-gray-500 flex items-center justify-center">
        {/* modal  */}
        {/* 
         // đặt giá trị ban đầu =0, thì nó sẽ output =0 ,nó sẽ ẩn 
         // nếu tới giá trị bằng 1 => nó sẽ hiện
        */}
        <Animated.View
          className="w-full px-5"
          style={[
            {
              transform: [
                {
                  scale: scale.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [0, 0.75, 1],
                  }),
                },
              ],
              opacity: scale.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0.5, 0.75, 1],
              }),
            },
          ]}
        >
          <View className="w-full h-[60px] flex flex-row items-center justify-between px-2 bg-yellow-400 rounded-xl">
            <Text className="text-xl font-bold text-white">
              Chào mừng bạn đã quay trở lại
            </Text>
            <TouchableOpacity
              onPress={closeAnimationModal}
              className="w-[30px] h-[30px] bg-white rounded-full flex items-center justify-center"
            >
              <Text>X</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

       
        <View>
        <TouchableOpacity
          onPress={showAnimationModal}
          className="w-[150px] h-[50px] bg-blue-600 rounded-xl flex items-center justify-center mt-5"
        >
          <Text className="text-white font-bold px-2">Show Modal 01</Text>
        </TouchableOpacity>
         {/* nut sho */}
         <TouchableOpacity
          onPress={() => {
            router.push("/modal");
          }}

          className="w-[150px] h-[50px] bg-yellow-600 rounded-xl flex items-center justify-center mt-5"
        >
          <Text className="text-white font-bold px-2">Show Modal 02</Text>
        </TouchableOpacity>

        {/* nut alwert */}
        <TouchableOpacity
          onPress={() => {
            router.push("/alert");
          }}

          className="w-[150px] h-[50px] bg-green-600 rounded-xl flex items-center justify-center mt-5"
        >
          <Text className="text-white font-bold px-2">Show Alert Modal</Text>
        </TouchableOpacity>
         {/* nut alwert */}
         <TouchableOpacity
          onPress={() => {
            router.push("/product");
          }}

          className="w-[150px] h-[50px] bg-green-600 rounded-xl flex items-center justify-center mt-5"
        >
          <Text className="text-white font-bold px-2">List Products</Text>
        </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}
