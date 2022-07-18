import { Box, Image, Divider, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import dynamic from 'next/dynamic';
import { useMediaQuery } from '@chakra-ui/react';

import ExperimentCardContent from './ExperimentCard/components/ExperimentCardContent';
const MDPreview = dynamic(() => import('@uiw/react-markdown-preview'), {
  ssr: false,
}) as unknown as React.FC<any>;

export interface BountyExperimentProps {
  bountyAmount: number;
  bountyDescription: string[];
}

export default function BountyExperiment({
  bountyAmount,
  bountyDescription,
}: React.PropsWithChildren<BountyExperimentProps>) {
  const [isMobile] = useMediaQuery('(max-width: 30em');

  return (
    <Box
      bgGradient="linear(to-t, #4F498B, #5C50CB)"
      borderRadius={16}
      padding={6}
      color={'white'}
      width={'100%'}
      className="bountView"
    >
      <Box display="flex">
        <Image
          width={'40px'}
          height={'45px'}
          alt="User Tokens"
          src="/logoVectorWhite.png"
          color="white"
        />
        <Box marginLeft={2} marginBottom={2}>
          <Text fontSize={24} fontWeight={'600'}>
            {bountyAmount} REPT
          </Text>
          <Text fontSize={18} fontWeight={'400'}>
            Bounty
          </Text>
        </Box>
      </Box>
      <Divider />
      {bountyDescription &&
        Array.isArray(bountyDescription) &&
        bountyDescription.map((desc, index) => (
          <Box maxW={'400'} mt="3" textOverflow="ellipsis" overflow="hidden">
            <MDPreview
              style={{
                fontSize: isMobile && '14px',
                whiteSpace: 'break-spaces',
              }}
              source={desc}
            />
          </Box>
        ))}
    </Box>
  );
}
