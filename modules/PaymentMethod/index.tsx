import React, { useEffect, useState ,useRef} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
  TouchableNativeFeedback,
  Button,
  Animated,
  TouchableHighlight,
  PanResponder
} from "react-native";
const WIDTH_SCREEN = Dimensions.get("window").width;
const DATA = [
  {
    id: 1,
    title: "ZaloPay",
    backgroundColor: "#C9E4CA",
    color: "#2ECC71",
    check: true,
     active: true,
   
    // image: require('@/assets/images/payment/zalo.png'),
  },
  {
    id: 2,
    title: "Momo",
    backgroundColor: "#F7D2C4",
    color: "#E74C3C",
    check: false,
 
   
    //image: require('@/assets/images/payment/momo.png'),
  },
  {
    id: 3,
    title: "ViettelPay",
    backgroundColor: "#FFA500",
    color: "#4CAF50",
    check: false,
   
   
    // image: require('@/assets/images/payment/viettel.png'),
  },
  {
    id: 4,
    title: "VNPay",
    backgroundColor: "#800080",
    color: "#FF9800",
    //image: require('@/assets/images/payment/vnpay.png'),
    check: false,
    
  },
];
export default function PaymentMethod() {
  
  const [card,setCard] = React.useState(DATA);
  const [itemRight,setItemRight] = useState([]);
   const [itemLeft,setItemLeft] = useState([]);
   
  const [itemAnimated,setItemAnimated] = useState(
    DATA.map((item) => {
      return {
        id: item.id,
        animatedValue: new Animated.Value(0),
      };
    })
  )
  useEffect(()=>{
    let array_right = card.filter(item=>!item.check);
    let array_left = card.filter(item=>item.check && !item.active);
  
   setItemRight(array_right);
   setItemLeft(array_left)
   
  },[card])


  
  const renderPaymentMethod = (item: any,position : number) => {
    let index = item.id; // Adjust index to start from 0
    let skewX = 0;
    let zIndex = 50;
    let left = 0;
    let style: any = {};
    let width = 300;
    let height = 500;
    if (index > 0) zIndex = 30;
    skewX = index * 5; // Skew the card based on the item id,
    style = {
      zIndex: zIndex - item.id,
      top: position * 20,
      borderRadius: 50,
      height: 400,
      width: width - 50,
      right: -3,
    };

    if (item.check) {
      style.left = -10;
      skewX = -index * 3; // Skew the card based on the item id
    }
   
    if (item.active && item.check) {
      style.zIndex = 50;
      style.width = width;
      style.height = height;
      style.top = 0;
      (style.right = 0), (style.left = 0);
      skewX = 0; // Reset skew for the active item

      
    }
    if (item.active) {
      style.transform = [
              {
                 scale:itemAnimated[position].animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.05], // Scale the card when active
                  }),
              }
      ];

     //console.log(style)
     
    }
    

      
  
          

    

    return (
      //underlayColor={item.backgroundColor}
      <Animated.View  key={item.id}
        className=" h-[500px]  flex flex-row absolute shadow-[0px_0px_10px_1px_rgba(0,0,0,0.7)]"
        
        style={[
          {
            backgroundColor: item.backgroundColor,
            marginTop: 20,

            transform: [
              {
                rotate: skewX + "deg", 
              }, // Skew the card based on the item id
            ], // Adjust the position based on the item id
          },
          style,

        ]}
      > 
        <TouchableHighlight 
        underlayColor={item.backgroundColor} 
       onPress={() => choosePaymentMethod(item.id)} 
        
          
        className="w-full h-full rounded-[50px] flex flex-col items-center justify-center py-5">
          <View className="w-full h-full flex flex-col items-center justify-center">
             <View className="w-full flex-1 flex items-center justify-center">
            <Text className="text-2xl font-bold">{item.title}</Text>
          </View>
          <TouchableOpacity className="w-full px-5">
            <View
              className="w-full rounded-xl"
              style={{
                backgroundColor: item.color,
                padding: 20,
                marginTop: 10,
              }}
            >
              <Text className="text-white text-center font-bold uppercase">
                Choose this method
              </Text>
            </View>
          </TouchableOpacity>
          </View>
        </TouchableHighlight>
      </Animated.View>
    );
  };
  const renderPaymentMethod_right = (item: any,position : number) => {
    let index = item.id; // Adjust index to start from 0
    let skewX = 0;
    let zIndex = 30;
    let left = 0;
    let style: any = {};
    let width = 300;
    let height = 500;
   
    skewX = (position+1) * 5; // Skew the card based on the item id,
    style = {
      zIndex: zIndex - position,
      top: (position+1) * 30,
      borderRadius: 50,
      height: 350,
      width: width - 50,
      right: -(position+1) * 3,

    };
    return (
      //underlayColor={item.backgroundColor}
      <Animated.View  key={item.id}
        className=" h-[500px]  flex flex-row absolute shadow-[0px_0px_10px_1px_rgba(0,0,0,0.7)]"
        style={[
          {
            backgroundColor: item.backgroundColor,
            marginTop: 20,

            transform: [
              {
                rotate: skewX + "deg", 
              }, // Skew the card based on the item id
            ], // Adjust the position based on the item id
          },
          style,
          
            
        ]}
      > 
        <TouchableHighlight underlayColor={item.backgroundColor} onPress={() => choosePaymentMethod(item.id)} className="w-full h-full rounded-[50px] flex flex-col items-center justify-center py-5">
          <View className="w-full h-full flex flex-col items-center justify-center">
             <View className="w-full flex-1 flex items-center justify-center">
            <Text className="text-2xl font-bold">{item.title}</Text>
          </View>
          <TouchableOpacity className="w-full px-5">
            <View
              className="w-full rounded-xl"
              style={{
                backgroundColor: item.color,
                padding: 20,
                marginTop: 10,
              }}
            >
              <Text className="text-white text-center font-bold uppercase">
                Choose this method {position}
              </Text>
            </View>
          </TouchableOpacity>
          </View>
        </TouchableHighlight>
      </Animated.View>
    );
  };
   const renderPaymentMethod_left = (item: any,position : number) => {
    let index = item.id; // Adjust index to start from 0
    let skewX = 0;
    let zIndex = 30;
    let left = 0;
    let style: any = {};
    let width = 300;
    let height = 500;
   
    skewX = -(position+1) * 5; // Skew the card based on the item id,
    style = {
      zIndex: zIndex - position,
      top: (position+1) * 30,
      borderRadius: 50,
      height: 350,
      width: width - 50,
      left: -(position+1) * 3,

    };
    return (
      //underlayColor={item.backgroundColor}
      <Animated.View  key={item.id}
        className=" h-[500px]  flex flex-row absolute shadow-[0px_0px_10px_1px_rgba(0,0,0,0.7)]"
        style={[
          {
            backgroundColor: item.backgroundColor,
            marginTop: 20,

            transform: [
              {
                rotate: skewX + "deg", 
              }, // Skew the card based on the item id
            ], // Adjust the position based on the item id
          },
          style,
          
            
        ]}
      > 
        <TouchableHighlight underlayColor={item.backgroundColor} onPress={() => choosePaymentMethod(item.id)} className="w-full h-full rounded-[50px] flex flex-col items-center justify-center py-5">
          <View className="w-full h-full flex flex-col items-center justify-center">
             <View className="w-full flex-1 flex items-center justify-center">
            <Text className="text-2xl font-bold">{item.title}</Text>
          </View>
          <TouchableOpacity className="w-full px-5">
            <View
              className="w-full rounded-xl"
              style={{
                backgroundColor: item.color,
                padding: 20,
                marginTop: 10,
              }}
            >
              <Text className="text-white text-center font-bold uppercase">
                Choose this method {position}
              </Text>
            </View>
          </TouchableOpacity>
          </View>
        </TouchableHighlight>
      </Animated.View>
    );
  };
  const choosePaymentMethod = (id: number) => {
    const itemCards = card;
    const itemIndex = itemCards.findIndex((item) => item.active);
    const currentItem = itemCards[itemIndex];
    itemCards.map((item)=>{
      if(item.id ===currentItem.id){
        item.active = false;
        item.check = true;
      }
      if(item.id === id){
        item.active = true;
        item.check = true;
      }
    })

    let indexItemAnimated = itemAnimated.findIndex((item) => item.id === id);
    console.log("Animate---->", indexItemAnimated);
    Animated.timing(itemAnimated[indexItemAnimated].animatedValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
  
    setTimeout(() => {
       Animated.timing(itemAnimated[indexItemAnimated].animatedValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
    },500)
    setCard([...itemCards]);
    
    
  }
  return (
    <View className="w-full h-full px-10 flex flex-col items-center">
      <View
        className="w-[300px] h-[600px] flex flex-col items-center justify-center relative "
        style={[
          {
            backgroundColor: "#374151",
            borderRadius: 20,
          },
        ]}
      >
        {
            card.map((item, index) => item.active && renderPaymentMethod(item,index))  
        }
        {
            itemRight.map((item, index) => renderPaymentMethod_right(item,index))  
        }
        {
            itemLeft.map((item, index) => renderPaymentMethod_left(item,index))  
        }
      </View>
    </View>
  );
}
