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
        </Stack>
   </>
  )
}
