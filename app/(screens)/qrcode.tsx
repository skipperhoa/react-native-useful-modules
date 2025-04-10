import React, { useEffect,useRef,useState } from 'react'
import { View, Text, TouchableOpacity, Image ,Alert,Animated} from 'react-native'
import Constants from 'expo-constants';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
const PlaceholderImage = require('@/assets/images/05.jpg');
import axios from 'axios';
export default function QrCodeScreen() {
    const phantram = useRef(new Animated.Value(0)).current;
    const [progress, setProgress] = useState(0);
    const [dataImage, setDataImage] = useState<string | any>(undefined);
    const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
    const trackProgress = async (event :any) => {
      const newProgress = Math.floor((event.loaded/event.total)*100)
      setProgress(newProgress);
    }
    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          allowsEditing: true,
          quality: 1,
        });
    
        if (!result.canceled) {
         
         
         // Defining image URI
       //  setSelectedImage(undefined)
          const imageUri = result.assets[0].uri;
          const filename = imageUri.split('/').pop();
          const type = imageUri.split('.').pop();

         // Alert.alert('You selected: ' + imageUri+"/"+type+"/"+filename);

          // Upload the image using the fetch and FormData APIs
          let formData = new FormData();
          // Assume "photo" is the name of the form field the server expects
          formData.append('image', {
            uri: imageUri,
            name: filename,
            type: type,
          });

          const response = await fetch('http://127.0.0.1:8000/upload/avatar', {
            method: 'POST',
            body: formData,
            headers: {
              'content-type': 'multipart/form-data',
            },
          });
         // console.log("DATA",response)
          const data = await response.json();
          console.log(data); 
          setSelectedImage(result.assets[0].uri);
          setDataImage(result.assets[0]);   

          //axio
     /*      const response  = await axios.post('http://127.0.0.1:8000/upload/avatar', formData, {
            headers: {
              'content-type': 'multipart/form-data',
            },
            onUploadProgress: function (progressEvent) {
              var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
              console.log(percentCompleted);
            }
          })
          setSelectedImage(result.assets[0].uri);
          setDataImage(result.assets[0]);   */ 
          
         /*  const xhr = new XMLHttpRequest();
          
          
          // 4. Giả lập phương thức đăng tệp
          xhr.open("POST", "http://127.0.0.1:8000/upload/avatar", true);
          
          // 5. Lắng nghe sự kiện progress lấy tỉ lệ %
          xhr.upload.addEventListener("progress", function(event) {
            const percent = Math.round((event.loaded / event.total) * 100);
            setProgress(percent);
            console.log(percent)
          });
          console.log("OK")
          // 6. Gửi yêu cầu
          xhr.send(formData); */

      
             /*  const xhr = new XMLHttpRequest();
              xhr.open('POST', 'http://127.0.0.1:8000/upload/avatar');
              xhr.setRequestHeader('Content-Type', 'multipart/form-data');
          
              xhr.upload.onprogress = (event) => {
                if (event.lengthComputable) {
                  let percentCompleted = Math.round((event.loaded * 100) / event.total);
                  console.log(`Upload Progress: ${percentCompleted}%`);
                }
              };
          
              xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                  console.log('Upload successful');
                } else {
                  console.error('Upload failed');
                }
              };
          
              xhr.onerror = () => {
                console.error('Upload error');
              }
              xhr.send(formData); */
           
         
        } else {
            Alert.alert('You did not select any image.');
        }
      };

  const startAnimation = () => {
    Animated.timing(phantram, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start();
  };
    
  
  
    
    
  return (
    <View className='w-full h-full bg-yellow-300' style={{ paddingTop: Constants.statusBarHeight + 70}}>
        <View className='w-full  flex flex-col justify-center items-center px-2 mt-10'>
            <Text className='w-full px-5 font-bold text-center text-2xl'>Upload Image</Text>

            {/* image qrcode */}
            <View>
                <View className='w-[200px] h-[200px] bg-gray-100 rounded-lg mt-5'>
                    <Image source={selectedImage ? { uri: selectedImage } : PlaceholderImage} className='w-full h-full object-cover rounded-lg' />
                
                </View>
            </View>

            {/* text upload */}

            <View className='w-full flex flex-col items-center justify-center mt-5'>
               <Text className='font-bold text-xl'>Thông tin tệp</Text>
                  <View className='w-full mt-5 flex flex-col items-center'>
                    <View className='w-[200px] h-[20px] hidden bg-gray-200 rounded-full relative overflow-hidden'>
                        <Animated.View className='w-full  h-full bg-blue-500 rounded-full absolute top-0 z-50' style={{
                          transform:[
                            {
                              translateX: phantram.interpolate({
                                inputRange:[0,1],
                                outputRange:['-100%','0%']
                              })
                          }]
                        }}>
                            <Text className='text-white font-bold text-center'>{progress}%</Text>
                        </Animated.View>
                    </View>
                  </View>
                {dataImage && (
                    <View className='w-full flex flex-col items-center mt-5'>
                        <Text className='font-bold text-lg'>Tên: {dataImage.fileName}</Text>
                        <Text className='font-bold text-lg'>Kích thước: {dataImage.fileSize} bytes</Text>
                        <Text className='font-bold text-lg'>Loại: {dataImage.type}</Text>
                    </View>
                )}
            </View>

            {/* button upload */}
            <TouchableOpacity onPress={pickImageAsync}>
                <View className='flex flex-row items-center justify-center gap-2 bg-blue-500 px-5 py-2 rounded-lg mt-5'>
                <AntDesign name="cloudupload" size={24} color="white" />
                    <Text className='text-white font-bold text-xl'>Tải hình</Text>
                </View>
            </TouchableOpacity>
            
        </View>
    </View>
  )
}
