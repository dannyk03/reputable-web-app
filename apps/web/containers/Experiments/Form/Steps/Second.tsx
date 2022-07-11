import {
  VStack,
  Text,
  Divider,
  FormControl,
  FormLabel,
  Input,
  HStack,
  InputGroup,
  InputRightAddon,
  InputLeftAddon,
  IconButton,
  Box,
  Icon,
  Image,
} from '@chakra-ui/react';
import { TCreateExperiment, StepProps } from '..';
import {
  useFieldArray,
  useFormContext,
  Controller,
  FieldPath,
  UseControllerProps,
} from 'react-hook-form';
import Card from '../../../../components/Card';
import { AddIcon, ArrowBackIcon, DeleteIcon } from '@chakra-ui/icons';
import MarkerInput from '../components/MarkerInput';
import dynamic from 'next/dynamic';
import { PrimaryButton } from '../../../../components/Button';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
}) as unknown as React.FC<any>;

const ControlledEditor = ({
  name,
  style,
  control,
  ...restProps
}: {
  name: FieldPath<TCreateExperiment>;
  style?: React.CSSProperties;
} & UseControllerProps<TCreateExperiment, FieldPath<TCreateExperiment>>) => (
  <Controller
    control={control}
    name={name}
    render={({
      field: { onChange, onBlur, value, name, ref },
      fieldState: { error },
    }) => (
      <>
        <MDEditor
          preview="edit"
          style={{
            border: error && '1px solid red',
            width: '100%',
            ...style,
          }}
          onBlur={onBlur}
          ref={ref}
          value={value}
          onChange={onChange}
        />
        <p style={{ color: 'red' }}>{error?.message}</p>
      </>
    )}
    {...restProps}
  />
);
export default function SecondStep({
  onSubmit,
  prev,
  buttonText,
}: React.PropsWithChildren<StepProps>) {
  const { register, control, handleSubmit } =
    useFormContext<TCreateExperiment>();

  const {
    fields: markersFields,
    append: markersAppend,
    remove: markersRemove,
    move: markersMove,
  } = useFieldArray({
    name: 'markers',
  });

  const {
    fields: bountyDescFields,
    append: bountyDescAppend,
    remove: bountyDescRemove,
    move: bountyDescMove,
  } = useFieldArray({
    name: 'bounty.description',
  });

  return (
    <form
      onKeyPress={(e) => {
        if (e.key === 'Enter' && e.target.nodeName !== 'TEXTAREA')
          e.preventDefault();
      }}
      onSubmit={handleSubmit((data) => onSubmit(data))}
    >
      <VStack align="start" gap={6} width="100%">
        <HStack
          _hover={{ cursor: 'pointer', textDecoration: 'underline' }}
          onClick={() => prev()}
        >
          <Icon as={ArrowBackIcon} size="sm" />
          <Text fontSize={16}>Back</Text>
        </HStack>
        <Card w="100%">
          <Text
            fontSize="20px"
            fontWeight={600}
            lineHeight="28px"
            color="primary.800"
          >
            Experiment Period
          </Text>
          <Text color="gray.700" fontSize="18px" lineHeight="28px" mt={2}>
            How long should this experiment run for?
          </Text>
          <Divider my={4} />
          <FormControl w="fit-content">
            <FormLabel htmlFor="experimentPeriod">Value</FormLabel>
            <InputGroup size="md">
              <Input
                type="number"
                min={0}
                placeholder="Experiment Period"
                {...register('experimentPeriod', {
                  valueAsNumber: true,
                  required: true,
                })}
              />
              <InputRightAddon>days</InputRightAddon>
            </InputGroup>
          </FormControl>
        </Card>
        <Card w="100%">
          <Text
            fontSize="20px"
            fontWeight={600}
            lineHeight="28px"
            color="primary.800"
          >
            Bounty
          </Text>
          <Text color="gray.700" fontSize="18px" lineHeight="28px" mt={2}>
            Determine a bounty for people to claim when they try your experiment
            and share their results (You also get the bounty for each person who
            shares their results and gets approved!)
          </Text>
          <Divider my={4} />

          <FormControl w="fit-content">
            <FormLabel htmlFor="bounty">Bounty amount</FormLabel>
            <InputGroup size="md">
              <InputLeftAddon>
                <Image
                  width={'16px'}
                  height={'16px'}
                  alt="User Tokens"
                  src="/LogoVector.svg"
                />
              </InputLeftAddon>
              <Input
                type="number"
                min={0}
                placeholder="Bounty amount"
                {...register('bounty.amount', {
                  valueAsNumber: true,
                  required: true,
                })}
              />
            </InputGroup>
          </FormControl>
          <FormLabel htmlFor="bounty" marginTop={5}>
            Bounty guidelines
          </FormLabel>

          {bountyDescFields.map((field, index) => {
            return (
              <HStack align="end" style={{ marginTop: 10 }}>
                <VStack
                  align="start"
                  style={{ width: '100%', marginRight: 20 }}
                >
                  <ControlledEditor
                    control={control}
                    name={`bounty.description.${index}`}
                    rules={{
                      required: true,
                      // minLength: {
                      //   value: 10,
                      //   message: 'This field should be at least 10 chars long.',
                      // },
                    }}
                  />
                </VStack>
                <VStack style={{ marginLeft: 'auto' }}>
                  <Box pb={1}>
                    <IconButton
                      onClick={() => bountyDescRemove(index)}
                      aria-label="Remove Bounty Description"
                      variant="outline"
                      size="sm"
                      colorScheme="red"
                      icon={<DeleteIcon />}
                    />
                  </Box>
                </VStack>
              </HStack>

              // </HStack>
            );
          })}
          <IconButton
            onClick={() => bountyDescAppend('')}
            aria-label="Add Bounty Description"
            variant="none"
            background="gray.100"
            borderRadius={20}
            marginTop={3}
            size="sm"
            colorScheme="primary"
            icon={<AddIcon />}
          />
        </Card>
        <Card w="100%">
          <Text
            fontSize="20px"
            fontWeight={600}
            lineHeight="28px"
            color="primary.800"
          >
            Health Markers to Track
          </Text>
          <Text color="gray.700" fontSize="18px" lineHeight="28px" mt={2}>
            What health markers are you tracking in this experiment?
          </Text>
          <Divider my={4} />
          <Text
            fontSize="16px"
            fontWeight={500}
            lineHeight="28px"
            color="gray.700"
          >
            Add a health marker
          </Text>
          <VStack align={'start'}>
            {markersFields.map((field, index) => {
              return (
                <HStack align="end">
                  <MarkerInput index={index} />
                  <Box pb={1}>
                    <IconButton
                      onClick={() => markersRemove(index)}
                      aria-label="Remove Marker"
                      variant="outline"
                      size="sm"
                      colorScheme="red"
                      icon={<DeleteIcon />}
                    />
                  </Box>
                </HStack>
              );
            })}
            <IconButton
              onClick={() => markersAppend({ name: '', devices: [] })}
              aria-label="Add Health Marker"
              variant="none"
              background="gray.100"
              borderRadius={20}
              size="sm"
              colorScheme="primary"
              icon={<AddIcon />}
            />
          </VStack>
        </Card>
        <PrimaryButton
          pos="absolute"
          top="-20px"
          right="16px"
          size="md"
          text={buttonText}
          type="submit"
        />
      </VStack>
    </form>
  );
}
