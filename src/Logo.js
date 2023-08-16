// src/Logo.js

import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

function Logo() {
  return (
    <Flex alignItems="center">
      <Text fontSize="2xl" mr="2">
        👻
      </Text>
      <Text fontSize="xl" fontWeight="bold">
        Vermont Ghost Log <sup>tm</sup>
      </Text>
    </Flex>
  );
}

export default Logo;