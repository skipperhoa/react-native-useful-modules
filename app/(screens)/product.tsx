import React from "react";
import { View, Text, Image } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import Constants from 'expo-constants';
import { useSelector } from "react-redux";
export default function ProductScreen() {
  const {user} = useSelector(state => state.example)
  console.log("user123",user)
  return (
    <View className="w-full h-full bg-blue-300 " style={{ paddingTop: Constants.statusBarHeight + 50}}>
      <Text>ProductScreen</Text>
      <View className="w-full px-5">
        <View className="w-full mx-auto flex flex-row items-center justify-center gap-3 py-5">
          <View className="w-1/2 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
           <View className="w-full">
           <View className="w-full">
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
                }}
                className="w-full h-52 object-cover rounded-t-xl"
              />
            </View>
            <View className="px-4 py-3 w-full">
              <Text className="text-gray-400 mr-3 uppercase text-xs">
                Brand
              </Text>
              <Text className="text-lg font-bold text-black truncate block capitalize">
                Product Name
              </Text>
              <View className="flex items-center">
               
                <View className="w-full flex flex-row item-center justify-between py-2">
                <Text className="text-lg font-semibold text-black cursor-auto">
                  $149
                </Text>
                  <View>
                    <AntDesign name="shoppingcart" size={24} color="black" />
                  </View>
                </View>
              </View>
            </View>
           </View>
          </View>
          <View className="w-1/2 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
           <View className="w-full">
           <View className="w-full">
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
                }}
                className="w-full h-52 object-cover rounded-t-xl"
              />
            </View>
            <View className="px-4 py-3 w-full">
              <Text className="text-gray-400 mr-3 uppercase text-xs">
                Brand
              </Text>
              <Text className="text-lg font-bold text-black truncate block capitalize">
                Product Name
              </Text>
              <View className="flex items-center">
               
                <View className="w-full flex flex-row item-center justify-between py-2">
                <Text className="text-lg font-semibold text-black cursor-auto">
                  $149
                </Text>
                  <View>
                    <AntDesign name="shoppingcart" size={24} color="black" />
                  </View>
                </View>
              </View>
            </View>
           </View>
          </View>
        </View>
      </View>
    </View>
  );
}
