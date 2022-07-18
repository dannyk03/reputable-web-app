import { useAuth0 } from '@auth0/auth0-react';
import {
  ChakraProps,
  Flex,
  VStack,
  Textarea,
  Avatar,
  propNames,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import makeAvatar from '../../helpers/makeAvatar';
import { useApiContext } from '../../providers/ApiContext';
import useWindowDimensions from '../../providers/getWindowSize';

import { PrimaryButton } from '../Button';
import Modal from '../Modal';
import {
  useFieldArray,
  useFormContext,
  Controller,
  FieldPath,
  UseControllerProps,
} from 'react-hook-form';
import dynamic from 'next/dynamic';

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
  name: FieldPath<any>;
  style?: React.CSSProperties;
} & UseControllerProps<any, FieldPath<any>>) => (
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
interface Props extends ChakraProps {
  onSubmit: (data: any) => void;
  type?: string;
  placeholder?: string;
}

export default function CommentForm({ onSubmit, type, ...restProps }: Props) {
  const { register, handleSubmit, reset, control } = useForm<any>();
  const { isAuthenticated } = useAuth0();
  const { user } = useApiContext();

  const { height, width } = useWindowDimensions();
  const isMobile = width < 900;

  if (!isAuthenticated) {
    return <></>;
  }
  return (
    <Flex
      w={type !== 'create' && isMobile ? '90%' : '100%'}
      marginLeft="auto"
      align={'start'}
      marginTop="4"
    >
      {(type === 'create' || !isMobile) && (
        <Avatar
          width={'40px'}
          height={'40px'}
          name="Profile Photo"
          src={user?.picture ?? makeAvatar(user?.name ?? 'User')}
        />
      )}

      <form
        style={{ width: '100%', marginLeft: '5px', marginTop: '20px' }}
        onSubmit={handleSubmit((values) => {
          onSubmit(values);
          reset();
        })}
      >
        <VStack align="start">
          {/* <Textarea
            ml={3}
            required
            {...register('text', {
              minLength: {
                value: 10,
                message: 'Your comment should be at least 20 chars long.',
              },
            })}
            {...restProps}
          /> */}
          <ControlledEditor
            control={control}
            name={`text`}
            rules={{
              required: true,
              minLength: {
                value: 10,
                message: 'Your comment should be at least 10 chars long.',
              },
            }}
          />
          {!user?.app_metadata?.isApproved ? (
            <Modal
              title="Information"
              button={<PrimaryButton fontSize="14px" h={8} text="Submit" />}
            >
              You have to be approved by an administrator to be able to leave a
              comment.
            </Modal>
          ) : (
            <PrimaryButton fontSize="14px" h={8} type="submit" text="Submit" />
          )}
        </VStack>
      </form>
    </Flex>
  );
}
