import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
} from "react-native";
const { width, height } = Dimensions.get("window");
const WIDTH_ITEMS = width - 40; // 20px padding left and right
const DATA = [
  {
    id: 1,
    title: "Junior Developer",
    description: [
      "Mới bắt đầu sự nghiệp lập trình",
      "Có kiến thức cơ bản về lập trình và các công nghệ liên quan",
      "Cần hướng dẫn và giám sát trong công việc",
      "Thời gian kinh nghiệm: 0-3 năm",
    ],
    image: require("@/assets/images/avatar/1.png"),
    backgroundColor: "#C9E4CA",
  },
  {
    id: 2,
    title: "Mid-level Developer",
    description: [
      "Có kinh nghiệm lập trình và đã hoàn thành nhiều dự án",
      "Có kiến thức sâu về các công nghệ và công cụ liên quan",
      "Có thể làm việc độc lập và giải quyết các vấn đề phức tạp",
      "Thời gian kinh nghiệm: 3-6 năm",
    ],
    image: require("@/assets/images/avatar/2.png"),
    backgroundColor: "#F7D2C4",
  },
  {
    id: 3,
    title: "Senior Developer",
    description: [
      "Có kinh nghiệm lâu năm và đã hoàn thành nhiều dự án lớn",
      "Có kiến thức sâu về các công nghệ và công cụ liên quan",
      "Có thể lãnh đạo và hướng dẫn các developer khác",
      "Thời gian kinh nghiệm: 6-10 năm",
    ],
    image: require("@/assets/images/avatar/3.png"),
    backgroundColor: "#C5CAE9",
  },
  {
    id: 4,
    title: "Lead Developer/Technical Lead",
    description: [
      "Là người lãnh đạo của một nhóm developer",
      "Có trách nhiệm quản lý và phân công công việc cho các developer khác",
      "Có kiến thức sâu về các công nghệ và công cụ liên quan",
      "Thời gian kinh nghiệm: 8-12 năm",
    ],
    image: require("@/assets/images/avatar/4.png"),
    backgroundColor: "#C5CAE9",
  },
  {
    id: 5,
    title: "Architect",
    description: [
      "Là người thiết kế và xây dựng kiến trúc của hệ thống",
      "Có kiến thức sâu về các công nghệ và công cụ liên quan",
      "Có thể lãnh đạo và hướng dẫn các developer khác",
      "Thời gian kinh nghiệm: 10-15 năm",
    ],
    image: require("@/assets/images/avatar/5.png"),
    backgroundColor: "#FF69B4",
  },
  {
    id: 6,
    title: "Technical Expert",
    description: [
      "Là người có kiến thức sâu về một hoặc nhiều công nghệ cụ thể",
      "Có thể tư vấn và hướng dẫn các developer khác",
      "Thời gian kinh nghiệm: 12-20 năm",
    ],
    image: require("@/assets/images/avatar/6.png"),
    backgroundColor: "#34C759",
  },
];
export default function CardModule() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [autoPlay, setAutoPlay] = React.useState(true);
  const [stopAutoPlay, setStopAutoPlay] = React.useState(false);
  const animatedOpacity = React.useRef(new Animated.Value(0)).current;
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);
  const resumeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const onClickNext = (index: number) => {
    setStopAutoPlay(true);
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      setStopAutoPlay(false); // Sau 5 giây sẽ resume auto play
    }, 5000);

    let toValue = index * WIDTH_ITEMS;
    Animated.timing(animatedOpacity, {
      toValue: toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setActiveIndex(index);
  };

  const startAutoPlay = React.useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex((prevIndex) => {
        let nextIndex = prevIndex + 1;
        if (nextIndex === DATA.length) nextIndex = 0;
        Animated.timing(animatedOpacity, {
          toValue: nextIndex * WIDTH_ITEMS,
          duration: 300,
          useNativeDriver: true,
        }).start();
        return nextIndex;
      });
    }, 3000);
  }, [animatedOpacity]);

  React.useEffect(() => {
    if (autoPlay && !stopAutoPlay) {
      startAutoPlay();
    } 
    return () => {
       if (intervalRef.current) clearInterval(intervalRef.current);
       //if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, [autoPlay, stopAutoPlay, startAutoPlay]);

  return (
    <>
      <View
        className="w-full h-full bg-black"
        style={{ paddingTop: 80, paddingHorizontal: 20 }}
      >
        <View className="w-full h-[650px] m-auto">
          <View className="w-full h-full relative flex flex-row overflow-hidden">
            {DATA.map((item, index) => {
              return (
                <Animated.View
                  key={index}
                  className="w-full h-[600px]  rounded-3xl mt-5 p-5"
                  style={{
                    transform: [
                      {
                        translateX: animatedOpacity.interpolate({
                          inputRange: [-width, 0, width],
                          outputRange: [-width, 0, -width],
                        }),
                      },
                    ],

                    backgroundColor: item.backgroundColor,
                  }}
                >
                  <View className="w-full h-full relative">
                    <View className="w-full h-full flex flex-col items-center justify-center">
                      <View className="w-32 h-32 bg-gray-300 p-1 rounded-full overflow-hidden">
                        <Image
                          source={item.image}
                          className="w-full h-full rounded-full"
                        />
                      </View>
                      <View className="w-full mt-5">
                        <Text className="w-full font-bold text-center text-2xl">
                          {item.title}
                        </Text>

                        <View>
                          {item.description.map((desc, descIndex) => (
                            <Text
                              key={descIndex}
                              className="w-full text-sm block pt-2"
                            >
                              {desc}
                            </Text>
                          ))}
                        </View>
                      </View>
                      <View className="w-full absolute bottom-0 left-0 right-0 p-5">
                        <TouchableOpacity className="w-full bg-blue-500 p-5 rounded-lg mt-5">
                          <Text className="text-white font-bold text-center uppercase">
                            Xem chi tiết
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </Animated.View>
              );
            })}
          </View>
          {/* pagination */}
          <View className="w-full h-10 flex flex-row justify-center items-center gap-5">
            {DATA.map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => onClickNext(index)}
                  className={`w-3 h-3 rounded-full ${
                    isActive ? "bg-blue-500" : "bg-gray-400"
                  }`}
                ></TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    </>
  );
}
