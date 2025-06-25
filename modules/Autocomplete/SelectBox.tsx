import React from "react";
import { View, Text ,TouchableOpacity,Alert} from "react-native";
export default function SelectBox({ data, search,onChooseItem }: any) {
  const [boxItem, setBoxItem] = React.useState(data);
  React.useEffect(() => {
    onItemPressSearch();
  }, [search]);

  const onItemPressSearch = () => {
    console.log("search", search);
    if (search.length > 0) {
      let arr: any = [];
      data.forEach((item: any) => {
        if (
          search.trim().toLowerCase() ===
          item.name.substr(0, search.length).toLowerCase()
        ) {
          arr = [...arr, item];
        }
      });
      setBoxItem(arr);
    }
  };
  
  return (
    <View>
      {boxItem.map((item: any) => (
        <TouchableOpacity onPress={() => onChooseItem(item)} 
          key={item.id}
          className="w-full py-2 bg-[#fff] border-[1px] border-[#000] rounded-md px-2 my-2"
        >
          <Text className="w-full text-black text-sm text-left font-bold">
            {item.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
