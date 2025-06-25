import { MaterialIcons } from '@expo/vector-icons'
import React , { useRef,useImperativeHandle} from 'react'
import { View, Text, TextInput, Animated ,Alert,Dimensions,TouchableOpacity} from 'react-native'
import SelectBox from './SelectBox'
const DATA = [
    { id: 1, name: 'JavaScript' },
    { id: 2, name: 'Python' },
    { id: 3, name: 'Java' },
    { id: 4, name: 'C++' },
    { id: 5, name: 'C#' },
    { id: 6, name: 'PHP' },
    { id: 7, name: 'TypeScript' },
    { id: 8, name: 'Ruby' },
    { id: 9, name: 'Go' },
    { id: 10, name: 'Swift' },
    { id: 11, name: 'Kotlin' },
    { id: 12, name: 'Rust' },
    { id: 13, name: 'Dart' },
    { id: 14, name: 'Scala' },
    { id: 15, name: 'Perl' },
    { id: 16, name: 'Haskell' },
    { id: 17, name: 'Lua' },
    { id: 18, name: 'Objective-C' },
    { id: 19, name: 'Elixir' },
    { id: 20, name: 'R' },
  ];
const {width,height} = Dimensions.get('window')
export default function AutocompleteModule() {

    /* set animation view autocomplete */
 const autocompleteRef = useRef(new Animated.Value(0)).current;
 const [heightTextInput, setHeightTextInput] = React.useState(0);
 const [txtSearch, setTxtSearch] = React.useState('');
 const [chooseArr, setChooseArr] = React.useState([]);


 const focusTextInput = () => {
     
    Animated.parallel([
        Animated.timing(autocompleteRef, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false
        })
        
    ]).start();

 }
/* close Focus TextInput */
const closeFocusTextInput = () => {
    Animated.timing(autocompleteRef, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false
    }).start();
}

/* onchangtext */
const onChangeTextSubmit = (text:string) => {
    if(text.trim().length <= 0){
        closeFocusTextInput();
    }else{
        focusTextInput();
     setTxtSearch(text);
    }
}

/* chooseItem */
const onChooseItem = (item:any) => {
    const checkItem = chooseArr.find((i:any) => i.id === item.id);
    if(checkItem){
        Alert.alert('Thông báo', 'Ngôn ngữ đã được chọn');
        return;
    }
    if(chooseArr.length >= 5){
        Alert.alert('Thông báo', 'Bạn chỉ được chọn tối đa 5 ngôn ngữ');
        return;
    }
    setChooseArr([...chooseArr, item]);
}

/* delete item */
const deleteItem = (item:any) => {
    const newArr = chooseArr.filter((i:any) => i.id !== item.id);
    setChooseArr(newArr);
}


  return (
    <View className='w-full h-full' style={{paddingTop: 200}}>
        <Text className='w-full font-bold text-2xl text-center text-black'>Autocomplete</Text>

        <View className='w-full p-5'>

            <View className='w-full bg-gray-200 p-5 rounded-md relative'
            onLayout={(event) => {
                const { x, y, width, height } = event.nativeEvent.layout;
                setHeightTextInput(height);
            }}
            >
                 <View>
                 <Text className="w-full font-bold py-5">Danh sách ngôn ngữ:</Text>
                 <TouchableOpacity className='w-8 h-8 rounded-md bg-gray-500 flex flex-col items-center justify-center absolute right-2 top-2'
                 
                 onPress={closeFocusTextInput}>
                    <Text className='w-full text-white text-sm text-center font-bold'>X</Text>
                 </TouchableOpacity>
                 </View>
                 <View>
                    <TextInput placeholder='Chọn ngôn ngữ lập trình' 
                    className='w-full h-[50px] bg-[#fff] border border-[#000] rounded-md px-2'
                    style={{borderWidth: 1, borderColor: '#fff', borderRadius: 10}}
                    placeholderTextColor={'#000'}
                    selectionColor={'#000'}
                    textAlign={'left'}
                    keyboardType='default'
                    maxLength={100}
                    multiline={false}
                    numberOfLines={1}
                    onFocus={focusTextInput}
                    onChangeText={onChangeTextSubmit}
                    />
                    <MaterialIcons name='arrow-drop-down' size={24} color='black' style={{position: 'absolute', right: 10, top: 15}} />
                 </View>

                {
                    chooseArr?.length > 0 && (
                        <View className='w-full p-2 flex flex-row flex-wrap gap-2'>
                            
                            {
                                chooseArr?.map((item:any) => (
                                    <View className='flex flex-row flex-wrap items-center justify-between bg-gray-400 text-white rounded-md px-2 py-1'>
                                         <Text key={item.id} className='text-white text-sm px-2'>{item.name}</Text>
                                         <TouchableOpacity onPress={() => deleteItem(item)}>
                                            <Text className='text-black font-bold text-sm'>X</Text>
                                         </TouchableOpacity>
                                    </View>
                                ))
                            }
                          
                            
                        </View>
                    )
                }
                 


            {/* autocomplete */}
            <Animated.View className='w-full absolute z-50 top-0 bg-gray-200 p-5 mt-2 rounded-md'
             style={[
                {
                    width: width - 40,
                    opacity: autocompleteRef.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1]
                    }),
                    transform:[
                        {
                            translateY: autocompleteRef.interpolate({
                                inputRange: [0, 1],
                                outputRange: [heightTextInput+50, heightTextInput]
                            })
                        }
                    ]
                }
             ]}
            >
                 <View className='w-full'>
                    <SelectBox data={DATA} search={txtSearch} onChooseItem={onChooseItem}/>
                 </View>
            </Animated.View>
            </View>
           

        </View>
    </View>
  )
}
