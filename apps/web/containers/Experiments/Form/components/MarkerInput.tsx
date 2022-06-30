import React from 'react';
import {
  ChakraProps,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Text,
  InputGroup,
  Tag,
  TagCloseButton,
  TagLabel,
  Flex,
  VStack,
} from '@chakra-ui/react';
import { useFormContext, useWatch } from 'react-hook-form';
import { TCreateExperiment } from '..';
import { removeIndex } from '@chakra-ui/utils';

interface MarkerInputProps extends ChakraProps {
  name: string;
}

const MarkerInput = ({ index, ...restProps }) => {
  const { register, setValue, trigger, control } =
    useFormContext<TCreateExperiment>();
  const devices = useWatch({
    control,
    name: `markers.${index}.devices`,
  });
  const [deviceText, setDeviceText] = React.useState('');
  return (
    <HStack justify={'start'} align={'end'} w="100%">
      <FormControl w="fit-content" minW="fit-content">
        <FormLabel htmlFor={`markers.${index}`}>Value</FormLabel>
        <InputGroup size="md">
          <Input
            {...register(`markers.${index}.name`)}
            placeholder="Enter health marker"
          />
        </InputGroup>
      </FormControl>
      <VStack align="start">
        <Text fontWeight="medium" fontSize="medium">
          Devices (Optional)
        </Text>
        <Flex
          align="bottom"
          flexWrap="wrap"
          border="1px solid"
          borderColor="gray.200"
          borderRadius={6}
          p={2}
          pt={0}
          w="100%"
          minW="400px"
        >
          {devices.map((device, idx) => (
            <Tag
              key={idx}
              size="md"
              mt={2}
              mx={1}
              borderRadius="full"
              variant="subtle"
              colorScheme="primary"
            >
              <TagLabel>{device}</TagLabel>
              <TagCloseButton
                onClick={() =>
                  setValue(
                    `markers.${index}.devices`,
                    removeIndex(devices, idx),
                  )
                }
              />
            </Tag>
          ))}
          <input
            style={{ outline: 'none', flexGrow: 1, marginTop: '8px' }}
            placeholder="Use enter to create device tags"
            value={deviceText}
            onChange={(e) => setDeviceText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && deviceText !== '') {
                setValue(`markers.${index}.devices`, [...devices, deviceText]);
                setDeviceText('');
              }
              e.stopPropagation();
            }}
          />
        </Flex>
      </VStack>
    </HStack>
  );
};

MarkerInput.displayName = 'MarkerInput';

export default MarkerInput;
