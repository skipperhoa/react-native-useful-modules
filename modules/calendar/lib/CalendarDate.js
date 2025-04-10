import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Button,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  Alert,
  TextInput,
} from "react-native";
import Constants from "expo-constants";
import * as Calendar from "expo-calendar";
const { width, height } = Dimensions.get("window");
const ITEM_WIDTH = (width - 40) / 7;
import Entypo from "@expo/vector-icons/Entypo";
import Fontisto from "@expo/vector-icons/Fontisto";
import { AntDesign } from "@expo/vector-icons";
import Feather from '@expo/vector-icons/Feather';
export default function CalendarDate({ Year, Month }) {
  const [activeYear, setActiveYear] = React.useState(Year);
  const [activeMonth, setActiveMonth] = React.useState(Month);
  const NUM_DAYS = new Date(activeYear, activeMonth, 0).getDate();
  const [dayCurrent, setDayCurrent] = React.useState(new Date().getDate());
  const showAnimationModal = useRef(new Animated.Value(0)).current;
  const opacityAnimationModal = useRef(new Animated.Value(0)).current;
  const topAnimationModal = useRef(new Animated.Value(0)).current;
  const [dayNote,setDayNote] = useState("");
  const [txtNote,setTxtNote] = useState("");

  const [note, setNote] = useState([
    {
      day: "5/4/2025",
      note: "Chúc mừng sinh nhật",
    },
    {
      day: "18/4/2025",
      note: "Tiệc cùng công ty",
    },
    {
      day: "30/4/2025",
      note: "Họp cuối tháng",
    },
    {
      day: "1/5/2025",
      note: "Họp đầu tháng",
    },
  ]);

  const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  /* tính số ngày của tháng trước */
  const NUMBER_DAYS_LAST_MONTH = new Date(
    activeYear,
    activeMonth - 1,
    0
  ).getDate();

  /* xác định ngày đầu tiên của tháng rơi vào thứ mấy */
  const START_DAY = new Date(activeYear, activeMonth - 1, 1).getDay();

  /* lấy Days từ mảng  Days*/
  const DAYS_NAME = DAYS[START_DAY];

  /* tính toán các ngày trước đó */
  const DAY_OF_LAST_MONTH = [];
  for (let i = START_DAY - 1; i >= 0; i--) {
    DAY_OF_LAST_MONTH.push(NUMBER_DAYS_LAST_MONTH - i);
  }

  /* nextMonth */
  const nextMonth = () => {
    if (activeMonth === 12) {
      setActiveMonth(1);
      setActiveYear(activeYear + 1);
    } else {
      setActiveMonth(activeMonth + 1);
    }
  };

  /* prevMonth */
  const prevMonth = () => {
    if (activeMonth === 1) {
      setActiveMonth(12);
      setActiveYear(activeYear - 1);
    } else {
      setActiveMonth(activeMonth - 1);
    }
  };

  const show = (day) => {
    setDayNote(day);
    let index = note.findIndex((item) => item.day === day);
    setTxtNote(index === -1 ? "" : note[index].note);
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

  const close = () => {
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

  /*  save note */
  const saveNote =  async () => {
    setNote((prevNotes) => {
      const updatedNotes = prevNotes.filter((item) => item.day !== dayNote);
      return [...updatedNotes, { day: dayNote, note: txtNote }];
    });
    if(txtNote == "") {
      removeNote();
    }
    setDayNote("");
    setTxtNote("");
    close();
  }

  const removeNote = async () => {
    let _note = note.filter((item) => item.day !== dayNote);
    await setNote(_note);
  }

  return (
    <View
      className="w-full h-screen bg-blue-500 relative"
      style={{ paddingTop: Constants.statusBarHeight + 50 }}
    >
      <View className="w-full px-5 mt-40">
        <Text className="font-bold text-2xl text-center text-black uppercase pb-5">
          calendar
        </Text>
        <View className="w-full bg-white flex flex-row items-center justify-between px-5 rounded-t-md">
          <TouchableOpacity
            onPress={prevMonth}
            className="flex flex-row items-center gap-1"
          >
            <Entypo name="controller-jump-to-start" size={24} color="black" />
            <Text className="text-center font-bold text-black py-4">Prev</Text>
          </TouchableOpacity>
          <Text className="text-center font-bold text-black py-4 text-2xl">
            {activeMonth}/{activeYear}
          </Text>
          <TouchableOpacity
            onPress={nextMonth}
            className="flex flex-row items-center gap-1"
          >
            <Text className="text-center font-bold text-black py-4">Next</Text>
            <Entypo name="controller-next" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View className="w-full bg-white">
          <View className="w-full flex flex-row items-center justify-between">
            {DAYS.map((day, index) => (
              <View
                key={day}
                style={{ width: ITEM_WIDTH }}
                className="bg-gray-300"
              >
                <Text className="text-center py-3">{day}</Text>
              </View>
            ))}
          </View>
          <View className="w-full flex flex-row flex-wrap items-center justify-between">
            {DAY_OF_LAST_MONTH.map((day, index) => (
              <View
                key={index}
                style={{ width: ITEM_WIDTH }}
                className="bg-gray-100/50 border-b-[1px] border-gray-200"
              >
                <Text className="text-center py-3 text-gray-500">{day}</Text>
              </View>
            ))}

            {[...Array(NUM_DAYS).keys()].map((day, index) => {
              let style = {
                width: ITEM_WIDTH,
              };
              let color = {};
              if (
                dayCurrent == day + 1 &&
                Year == activeYear &&
                Month == activeMonth
              ) {
                style = {
                  width: ITEM_WIDTH,
                  backgroundColor: dayCurrent == day + 1 ? "#f4c402" : "white",
                };
                color = {
                  color: dayCurrent == day + 1 ? "white" : "black",
                };
              }

              let day_note = day + 1 + "/" + activeMonth + "/" + activeYear;
              let data_note = note.find((item) => item.day === day_note);

              return (
                <View key={index}>
                  <TouchableOpacity
                    onPress={()=>{
                      show(day_note);
                    }}
                    className="bg-gray-100 border-b-[1px] border-gray-200"
                    style={style}
                  >
                    <Text className="text-center py-3" style={color}>
                      {day + 1}
                    </Text>
                    {data_note && (
                      <TouchableOpacity
                        className="w-3 h-3 bg-[#0f1efc] rounded-full absolute top-1 right-1"
                        onPress={() => {
                          Alert.alert(data_note.note);
                        }}
                      ></TouchableOpacity>
                    )}
                  </TouchableOpacity>
                </View>
              );
            })}
            {[...Array(42 - DAY_OF_LAST_MONTH.length - NUM_DAYS).keys()].map(
              (day, index) => (
                <View
                  key={index * (Month + 1)}
                  style={{ width: ITEM_WIDTH }}
                  className="bg-gray-100 border-b-[1px] border-gray-200"
                >
                  <Text className="text-center py-3 text-gray-500">
                    {day + 1}
                  </Text>
                </View>
              )
            )}
          </View>
        </View>
      </View>

      {/*  Modal note */}
      <Animated.View
        className="w-full h-screen absolute top-0 bg-gray-400 px-10 flex flex-col items-center justify-center"
        style={[
          {
            opacity: opacityAnimationModal.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
          },
        ]}
      >
        <Animated.View
          className="w-full h-[250px] bg-white rounded-md p-5"
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

              transform: [
                {
                  translateY: topAnimationModal.interpolate({
                    inputRange: [0, 1],
                    outputRange: [height, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <View className="w-full flex flex-row items-center justify-between">
            <View className="flex flex-row  items-center  gap-2">
              <Fontisto name="onenote" size={24} color="black" />
              <Text className="text-xl">Ghi chú : {dayNote}</Text>
            </View>
            <View className="">
              <TouchableOpacity
                onPress={close}
                className="w-[30px] h-[30px] bg-red-500 rounded-md flex items-center justify-center"
              >
                <AntDesign name="close" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          <View className="w-full h-full mt-5 flex-1">
            <TextInput
              className="w-full flex-1 border-[1px] border-gray-200 p-5 rounded-md" value={txtNote} onChangeText={(e) => setTxtNote(e)}
              multiline
            ></TextInput>
            <TouchableOpacity className="w-full mt-5" onPress={saveNote}>
               <View className="w-full bg-blue-500 py-3 rounded-md  flex flex-row items-center justify-center gap-2">
                  <Feather name="save" size={20} color="white" />
                  <Text className="font-bold text-white">Lưu</Text>
               </View>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.View>
    </View>
  );
}
