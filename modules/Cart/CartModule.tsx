import { FontAwesome } from '@expo/vector-icons'
import React from 'react'
import { View, Text,Image ,Easing,TouchableOpacity,ScrollView, Dimensions,Animated} from 'react-native'
const { width, height } = Dimensions.get('window')
export default function CartModule() {
/* set cartdata */
const [cartData,setCartData] = React.useState([]);

/* set animation */
const modalAnimatedValue = React.useRef(new Animated.Value(0)).current;
const opacityAnimatedValue = React.useRef(new Animated.Value(0)).current;
const ringAnimatedValue = React.useRef(new Animated.Value(0)).current;

/* set position x and y */
const [x,setX] = React.useState(0);
const [y,setY] = React.useState(0);

/* event add to cart */
const add_cart =(id : any,x : number, y : number)=>{
    console.log("first",x,y);
    setY(y);
    setX(x);
    ringAnimatedValue.setValue(0);
    Animated.parallel([
        Animated.timing(opacityAnimatedValue, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false
        }),
        Animated.timing(modalAnimatedValue, {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear, // or Easing.ease, or any other easing function
            useNativeDriver: false
        })
    ]).start();

    setTimeout(() => {
        setX(0);
        setY(0);
        setCartData([...cartData,id])
        ring_animated_cart();
        modalAnimatedValue.setValue(0);
        opacityAnimatedValue.setValue(0);
    },1000);


  
}

/* event animation cart */
const ring_animated_cart = ()=>{
    Animated.timing(ringAnimatedValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false
    }).start();
}

 /* set data product */
 const [products,setProducts] = React.useState([
    {
        id:1,
        name:'Vinfast VF3',
        price:100,
        image:require('@/assets/images/mau-xe-vinfast-Vf3-5.png'),
    },
    {
        id:2,
        name:'Vinfast VF3',
        price:100,
        image:require('@/assets/images/mau-xe-vinfast-Vf3-6.png'),
    },
    {
        id:3,
        name:'Vinfast VF3',
        price:100,
        image:require('@/assets/images/mau-xe-vinfast-Vf3-7.png'),
    },
    {
        id:4,
        name:'Vinfast VF3',
        price:100,
        image:require('@/assets/images/mau-xe-vinfast-Vf3-8.png'),
    },
    {
        id:5,
        name:'Vinfast VF3',
        price:100,
        image:require('@/assets/images/mau-xe-vinfast-Vf3-5.png'),
    },
    {
        id:6,
        name:'Vinfast VF3',
        price:100,
        image:require('@/assets/images/mau-xe-vinfast-Vf3-6.png'),
    },
    {
        id:7,
        name:'Vinfast VF3',
        price:100,
        image:require('@/assets/images/mau-xe-vinfast-Vf3-7.png'),
    },
    {
        id:8,
        name:'Vinfast VF3',
        price:100,
        image:require('@/assets/images/mau-xe-vinfast-Vf3-8.png'),
    }

 ]);
  return (
    <View className='w-full h-full bg-yellow-600 relative'>
       <View className='w-full h-full' style={{paddingTop: 70}}>
          {/* header */}
          <View className='w-full h-20 bg-orange-300 flex-row items-center justify-between px-4'>
              <Text className='font-bold text-xl flex-1'>Products</Text>
              <View className='relative'>
                    <View>
                            <View className='w-6 h-6 bg-red-500 rounded-full items-center justify-center absolute -top-2 -right-2 z-50'>
                                <Text className='font-bold text-white '>{cartData.length}</Text>
                            </View>
                            <Animated.View 
                            style={
                                {
                                    transform: [
                                        {
                                            translateY:ringAnimatedValue.interpolate({
                                                inputRange:[0,0.25,0.5,0.75,1],
                                                outputRange:[0,-10,0,10,0]
                                            })
                                        }
                                    ]
                                }
                            }>
                                <FontAwesome name="cart-arrow-down" size={30} color="black" />
                            </Animated.View>
                    </View>
              </View>
          </View>

          {/* body */}
          <View className='w-full h-full flex-1 p-2'>
            <ScrollView> 
             <View className='w-full flex flex-row flex-wrap'>
                {
                    products.map((item,index)=>{
                        return (
                            <View key={index} className='w-1/2 p-2'
                                onLayout={(e) => {
                                   const {x,y,width,height} = e.nativeEvent.layout;
                                  // s console.log(width)
                                }
                            }
                            >
                                <View className='w-full bg-gray-100 rounded-md'>
                                    <Image source={item.image} className='w-full h-40'  resizeMode='contain'/>
                                    <TouchableOpacity className='w-full py-4 bg-orange-400 rounded-md'
                                    onPress={(e)=>{
                                        add_cart(item.id,e.nativeEvent.pageX,e.nativeEvent.pageY);
                                    }}
                                    >
                                            <Text className='w-full text-center text-white font-bold'>Add to cart</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        
                        )
                    })
                }
                   
             </View>
            </ScrollView>
          </View>
       </View>
       {/* numbder cart animation */}
       <Animated.View className='w-full absolute top-5 left-5'
       style={{
         opacity: opacityAnimatedValue.interpolate({
            inputRange: [0,0.25,0.5,0.75,1],
            outputRange: [0,0.25,0.5,0.75,1]
         }),
         transform:[
            {
                translateX: modalAnimatedValue.interpolate({
                    inputRange: [0,0.25,0.5,0.75,1],
                    outputRange: [x,90,85,80,width-70]
                })
            },
            {
                translateY: modalAnimatedValue.interpolate({
                  inputRange: [0,1],
                  outputRange: [y, 75] // Bay lên rồi rơi xuống
                })
              },
              
         ]
       }}
       >
          <View className='w-10 h-10 bg-green-500 rounded-full flex flex-col items-center justify-center'>
              <Text className='text-white font-bold text-xl'>+1</Text>
          </View>
       </Animated.View>
    </View>
  ) 
}
