import React,{useRef} from 'react'
import { MaterialIcons } from '@expo/vector-icons';

import { View, Text, Image, ScrollView, TouchableOpacity, Alert ,Animated} from 'react-native';

const SETTINGS = [
  { title: 'Username', icon: 'person' },
  { title: 'Email', icon: 'email' },
  { title: 'Password', icon: 'block' },
  { title: 'Phone', icon: 'phone' },
  { title: 'Address', icon: 'location-on' },
  { title: 'Language', icon: 'language' },
  { title: 'Currency', icon: 'attach-money' },
  { title: 'Notifications', icon: 'notifications' },
  { title: 'Theme', icon: 'palette' },
  { title: 'Security', icon: 'security' },
];
const HEADER_HEIGHT = 120;
const ListItem = ({ title, icon, onPress }: { title: string; icon: string; onPress: () => void }) => (
  <TouchableOpacity onPress={onPress}>
    <View className="w-full flex flex-row items-center justify-between py-5 border-b-[1px] border-gray-100/50">
      <View className="flex flex-row items-center gap-2">
        <MaterialIcons name={icon} size={24} color="black" />
        <Text className="text-xl text-black">{title}</Text>
      </View>
      <MaterialIcons name="navigate-next" size={24} color="black" />
    </View>
  </TouchableOpacity>
);

const Items = () => (
  <ScrollView>
    {SETTINGS.map((item, index) => (
      <ListItem
        key={index}
        title={item.title}
        icon={item.icon}
        onPress={() => Alert.alert(item.title)}
      />
    ))}
  </ScrollView>
);

const ProfileHeader = ({opacityHeader} : any) => (


  <View className="w-full">
    <Animated.View className="w-[120px] h-[120px] mx-auto flex flex-col items-center justify-center bg-yellow-200 p-2 rounded-full"
    style={
      [
        {
          opacity:opacityHeader.interpolate({
            inputRange:[0,HEADER_HEIGHT/2,HEADER_HEIGHT],
            outputRange:[1,0.5,0]
          })
        }
      ]
    }>
      <View 
      className="w-[105px] h-[105px] mx-auto flex flex-col items-center justify-center bg-yellow-300 rounded-full p-2">

        <Image
          source={{ uri: 'https://cv.hoanguyenit.com/dist/images/avatar.jpg' }}
          className="w-full h-full rounded-full"
        />
      </View>
    </Animated.View>
    <Animated.View className="w-full flex flex-col items-center justify-center"
     style={
      [
        {
          opacity:opacityHeader.interpolate({
            inputRange:[0,HEADER_HEIGHT/2,HEADER_HEIGHT],
            outputRange:[1,0.25,1]
          })
        }
      ]
    }>
      <Text className="w-full text-center text-black font-bold pt-5 text-xl uppercase">
        HOA NGUYEN CODER
      </Text>
      <Text className="w-full text-center text-black font-bold pt-3">React Native</Text>
    </Animated.View>
  </View>
);

const FooterActions = () => (
  <View className="w-full p-5 bg-yellow-400 rounded-xl mt-5">
    <ListItem title="Get help" icon="help-outline" onPress={() => Alert.alert('Get help')} />
    <ListItem title="Logout" icon="logout" onPress={() => Alert.alert('Logout')} />
  </View>
);

export default function ParallaxModule() {
  const scrollY = useRef(new Animated.Value(0)).current;
 
  return (
    <View className="w-full h-screen bg-yellow-500 pb-10" style={{ paddingTop: 70 }}>
     <Animated.View
     className='w-full h-full'
     style={[
      {
        transform:[
          {
            translateY:scrollY.interpolate({
              inputRange:[0,HEADER_HEIGHT],
              outputRange:[0,-HEADER_HEIGHT/2]
            })
          }
        ]
      }
     ]}
     >
        <ProfileHeader  opacityHeader = {scrollY}/>
          <View className="w-full flex-1 px-5 mt-8">
            <ScrollView className="w-full" showsVerticalScrollIndicator={false} scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: false }

              
            )}
            >
              <View className="w-full p-5 bg-yellow-400 rounded-xl">
                <Items />
              </View>
              <FooterActions />
            </ScrollView>
          </View>
     </Animated.View>
    </View>
  );
}
