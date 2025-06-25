import React, { useEffect } from "react";
import { View, Text, Image, TouchableHighlight, Animated } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
const DATA = [
  {
    id: 1,
    title: "Quick Money Transfer",
    image: require("@/assets/images/avatar/1.png"),
  },
  {
    id: 2,
    title: "Quick Money Transfer",
    image: require("@/assets/images/avatar/2.png"),
  },
  {
    id: 3,
    title: "Quick Money Transfer",
    image: require("@/assets/images/avatar/3.png"),
  },
  {
    id: 4,
    title: "Quick Money Transfer",
    image: require("@/assets/images/avatar/4.png"),
  },
];

export default function ListItem() {
  const [data, setData] = React.useState(DATA);
  const [itemAnimated, setItemAnimated] = React.useState([]);

  useEffect(() => {
    onSetAnimated();
  }, []);

  useEffect(() => {
    onLoad();
  }, [itemAnimated]);

  /* set animated item */
  const onSetAnimated = () => {
    const _itemAnimated = data.map((item) => {
      return {
        id: item.id,
        scale: new Animated.Value(1 - item.id * 0.18), // scale. 0.6,....
      };
    });
    setItemAnimated(_itemAnimated);
  };
  /* hiện thị danh sách item */
  const renderItem = ({ item }: any) => {
    let _itemAnimated = itemAnimated.find((i) => i.id === item.id)?.scale;
    if (!_itemAnimated) {
      return null;
    }
    return (
      <Animated.View
        className="w-[60px] h-[60px] p-2 bg-gray-200 rounded-xl"
        key={item.id}
        style={[
          {
            transform: [
              {
                scale: _itemAnimated.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }),
              },
            ],
          },
        ]}
      >
        <Image
          source={item.image}
          className="w-[50px] h-[50px] block m-auto rounded-full"
        />
      </Animated.View>
    );
  };

  /*  sự kiện load Animated */
  const onLoad = () => {
    Animated.parallel(
      itemAnimated.map((item) => {
        return Animated.timing(item.scale, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        });
      })
    ).start();
  };

  /* sự kiện reset lại */
  const onReset = () => {
    onSetAnimated();
  };

  return (
    <View className="w-full h-full p-5" style={{ marginTop: 80 }}>
      <View
        className="w-full py-10 px-5 rounded-2xl"
        style={{ backgroundColor: "#2E4053" }}
      >
        <View className="w-full flex flex-row items-center justify-between pb-5">
          <View className="flex-1">
            <Text className="text-xl text-white">Quick Money Transfer</Text>
          </View>
          <TouchableHighlight>
            <View className="w-full flex flex-row items-center gap-2">
              <Text className="text-white">See More</Text>
              <FontAwesome6 name="arrow-right" size={15} color="#fff" />
            </View>
          </TouchableHighlight>
        </View>
        <View className="w-full flex flex-row items-center justify-between">
          <View className="w-[60px] h-[60px] flex flex-col items-center justify-center p-2 bg-gray-200/100 rounded-xl border-[2px] border-green-500 border-dotted">
            <Text className="text-2xl text-green-500">+</Text>
          </View>

          {data.map((item) => renderItem({ item }))}
        </View>
      </View>
      <TouchableHighlight
        onPress={onReset}
        className="w-full flex flex-row items-center justify-center mt-5 bg-green-400 py-3 rounded-xl"
      >
        <Text className="text-white text-xl font-bold">Reset</Text>
      </TouchableHighlight>
    </View>
  );
}
