import { Center, HStack, Spinner, Heading } from 'native-base'
import React from 'react'

export default function Loading({ message = 'Loading...'}) {
  return (
    <Center>
      <HStack space={2} alignItems="center">
        <Spinner accessibilityLabel="Loading posts" color="#0e7a9c" />
        <Heading size="md" color="#0e7a9c">{message}</Heading>
      </HStack>
    </Center>
  )
}
