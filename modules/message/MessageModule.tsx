import React, {useRef,useEffect} from 'react';
import {Animated, View, StyleSheet, PanResponder,FlatList, Dimensions,Text,TouchableOpacity} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import ItemMessage from './ItemMessage';
const {width,height} = Dimensions.get('window')
const MESSAGES = [
  {id: 1, text: 'Message 1'},
  {id: 2, text: 'Message 2'},
  {id: 3, text: 'Message 3'},
  {id: 4, text: 'Message 4'},
  {id: 5, text: 'Message 5'},
  {id: 6, text: 'Message 6'},
  {id: 7, text: 'Message 7'},
  {id: 8, text: 'Message 8'},
  {id: 9, text: 'Message 9'},
  {id: 10, text: 'Message 10'},
];
const MessageModule = () => {

  return (
    <SafeAreaProvider>
      <SafeAreaView className='w-full h-full bg-[#66551a]'>
        <Text className='w-full text-2xl text-center font-bold my-10' >Drag this box!</Text>
         <FlatList
          data={MESSAGES}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => <ItemMessage item={item} />}
          
          />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};


export default MessageModule;