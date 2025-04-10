
import "../global.css"
import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';

// test if the store is working
import { loginRequest,loginSuccess } from '@/redux/actions/authActions';
const user = {
  user:{
    name: 'Hoa nguyen coder',
   address: 'Ho Chi Minh',
  },
  token: '123456789'
}
store.dispatch(loginSuccess(user))

export default function RootLayout() { 

  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="(screens)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      
    </Provider>
  );
}
