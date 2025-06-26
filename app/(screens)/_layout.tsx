import { Stack } from 'expo-router'
import React from 'react'

export default function _layout() {
  return (
   <>
        <Stack>
             <Stack.Screen name="index" options={{ headerShown: false }} />
             <Stack.Screen name="splash" options={{ headerShown: false }} />
             <Stack.Screen name="qrcode" options={{ headerShown: false }} />
             <Stack.Screen name="modal" options={{ headerShown: false }} />
             <Stack.Screen name="alert" options={{ headerShown: false }} />
             <Stack.Screen name="product" options={{ headerShown: false }} />
             <Stack.Screen name="calendar" options={{ headerShown: false }} />
             <Stack.Screen name="chart" options={{ headerShown: false }} />
             <Stack.Screen name="cart" options={{ headerShown: false }} />
             <Stack.Screen name="profile" options={{ headerShown: false }} />
             <Stack.Screen name="message" options={{ headerShown: false }} />
             <Stack.Screen name="select" options={{ headerShown: false }} />
              <Stack.Screen name="masonry" options={{ headerShown: false }} />
               <Stack.Screen name="card" options={{ headerShown: false }} />
               <Stack.Screen name="payment" options={{ headerShown: false }} />
                 <Stack.Screen name="category" options={{ headerShown: false }} />
                 <Stack.Screen name="switch" options={{ headerShown: false }} />
        </Stack>
   </>
  )
}
