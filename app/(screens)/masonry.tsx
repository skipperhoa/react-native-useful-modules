import React, { useEffect, useState, useMemo, memo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  FlatList,
} from "react-native";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const MAX_HEIGHT = 280;
//  render ra item cua san pham, lay chieu cau cua no tinh ratio
const Item = memo(({ uri}: any) => {
  const [height, setHeight] = useState<number | null>(null);
  const [width, setWidth] = useState<number | null>(null);

  useMemo(() => {
    Image.getSize(
      uri,
      (srcWidth, srcHeight) => {
        const maxHeight = screenHeight; // or something else
        const maxWidth = screenWidth;
       // console.log("w:" + srcWidth, "h:" + srcHeight);

        const ratio =
          srcWidth > maxWidth || srcHeight > maxHeight
            ? Math.min(maxWidth / srcWidth, maxHeight / srcHeight)
            : 1;
        const newWidth = srcWidth * ratio;
        const newHeight = srcHeight * ratio;
        setHeight(Math.min(newHeight, MAX_HEIGHT));
        setWidth(newWidth);
        
        //console.log(uri,newHeight)
      },
      (error) => {
        console.error("Error getting image size:", error);
        setHeight(200); // fallback height
      }
    );
  }, [uri]);
  return (
    <>
      <View
        onLayout={(e) => {
          // const { width, height } = e.nativeEvent.layout;
          // console.log('Width:', width, 'Height:', height);
          // const data = getWidthHeight(
          //   "https://hoanguyenit.com/upload/images/alert-modal-in-login.png"
          // );
          // data.then((res: any) => {
          //   console.log("Width:", res.width, "Height:", res.height);
          // });
        }}
        style={{
          width: "100%",
          height: height/1.2,
          padding: 5,
          borderRadius: 10,
        }}
      >
        <Image
          source={{ uri }}
          className="w-full h-full object-cover rounded-lg"
          resizeMode="stretch"
        />
      </View>
    </>
  );
});

const IMAGES = [
  "https://salt.tikicdn.com/cache/750x750/ts/product/54/fb/fd/f1de10d1a7bb8e4d12706e30de8f27e0.png.webp",
  "https://hoanguyenit.com/upload/images/5-designing-laravel-database-schema-for-car-sales-system.jpeg",

  "https://salt.tikicdn.com/cache/750x750/ts/product/aa/79/c3/9dfeca61ca51ae8823ffdadac22466cd.jpg.webp",
  "https://salt.tikicdn.com/cache/750x750/ts/product/99/fe/63/290d17021d9c2069600388186170d180.jpg.webp",

  "https://cdn1.fahasa.com/media/catalog/product/b/i/bia-3d-cuon-take-note-tieng-anh-lop-12.jpg",
  "https://hoanguyenit.com/upload/images/21-testing-api-between-react-native-and-laravel-using-redux-saga.png",
  "https://hoanguyenit.com/upload/images/alert-modal-in-login.png",
  "https://media.daily.dev/image/upload/f_auto,q_auto/v1/posts/5b1e728d276592a2230b46743e7da6bb?_a=AQAEuj9",

  "https://hoanguyenit.com/upload/images/5-designing-laravel-database-schema-for-car-sales-system.jpeg",
  "https://media.daily.dev/image/upload/f_auto,q_auto/v1/posts/4316d4063af5621ad5375cf49b04f131?_a=AQAEuj9",
  "https://hoanguyenit.com/upload/images/alert-modal-in-login.png",
  "https://media.daily.dev/image/upload/f_auto,q_auto/v1/posts/f109f9e6dd53a831dea21143687996dd?_a=AQAEuj9",
   "https://media.daily.dev/image/upload/f_auto,q_auto/v1/posts/4316d4063af5621ad5375cf49b04f131?_a=AQAEuj9",
   "https://salt.tikicdn.com/cache/750x750/ts/product/aa/79/c3/9dfeca61ca51ae8823ffdadac22466cd.jpg.webp",
   "https://salt.tikicdn.com/cache/750x750/ts/product/aa/79/c3/9dfeca61ca51ae8823ffdadac22466cd.jpg.webp",
     "https://hoanguyenit.com/upload/images/alert-modal-in-login.png",
     "https://hoanguyenit.com/upload/images/alert-modal-in-login.png",
     // "https://salt.tikicdn.com/cache/750x750/ts/product/aa/79/c3/9dfeca61ca51ae8823ffdadac22466cd.jpg.webp",
      // "https://salt.tikicdn.com/cache/750x750/ts/product/aa/79/c3/9dfeca61ca51ae8823ffdadac22466cd.jpg.webp",
];


export default function MasonryScreen() {
  const [columnberView, setColumnberView] = useState(3); // số cột hiện thị
  const [heigthItems, setHeightItems] = useState<any>([]);
  const [dataImage, setDataImage] = useState<any>([]);
  const [dataTam, setDataTam] = useState<any>([]);
  useEffect(() => {
    renderDataImage(columnberView);
    // console.log("array height item",heigthItems)
  }, []);

  const addHeightItem = (height: any) => {
    setHeightItems([...heigthItems, height]);
  };

  // array  tinh phan trang cho cot hien thi bao nhieu san pham
  const forAddItem = async (
    col: number,
    colLength: number,
    add_image_to_array: any
  ) => {

    // tính cấu hình phân trang cho giao diện
    let start = 0;
  
    if (col > 1) {
      start = (col - 1) * colLength;
    } else {
      start = 0;
    }
    //let data = dataImage[0];
    let array = [];

    let end = start + colLength;

    for (let i = start; i < end; i++) {
      if(IMAGES[i] != undefined) {
         array.push(IMAGES[i]);
      }
    }
    await add_image_to_array.push(array);
    console.warn("array 1:" + col, array);
  };
  const renderDataImage = async (colNumber: number) => {
    let array = [];
    let add_image_to_array: [] = [];
    const colLength = Math.ceil(IMAGES.length / colNumber); // số lượng hiện thị sản phẩm trên một cột


    // theem gia tri vao mang
    if (columnberView > 1) {
      for (let j = 1; j <=colNumber; j++) {
        // console.log(j)
        await forAddItem(j, colLength, add_image_to_array);
      }
     // console.warn("DATA", add_image_to_array);
      // cập nhật lại dữ liệu state 
      await setDataImage(add_image_to_array);
    }
  };

  return (
    <View className="w-full h-full bg-yellow-500">
      <View className="w-full h-full" style={{ paddingTop: 70 }}>
        <Text className="text-3xl font-bold text-center text-black">
          Masonry
        </Text>

        <ScrollView className="w-full h-full mt-5">
          <View className="flex flex-row flex-wrap justify-between">
            {dataImage?.length === columnberView
              ? dataImage.map((item: any, index: number) => (
                  <View
                    style={{ width: screenWidth / columnberView }}
                    key={index}
                  >
                    {item.map((item2: any, index2: number) => (
                      <Item uri={item2}  key={index2}/>
                    ))}
                  </View>
                ))
              : null}
          </View>
        </ScrollView>
      </View>
      {/* Add your masonry layout implementation here */}
    </View>
  );
}
