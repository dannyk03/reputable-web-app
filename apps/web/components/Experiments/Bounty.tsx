import { Box, Image, Divider, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import ExperimentCardContent from './ExperimentCard/components/ExperimentCardContent';

export interface BountyExperimentProps {
  bountyAmount: number;
  bountyDescription: string;
}

export default function BountyExperiment({
  bountyAmount,
  bountyDescription,
}: React.PropsWithChildren<BountyExperimentProps>) {
  return (
    <Box
      bgGradient="linear(to-t, #4F498B, #5C50CB)"
      borderRadius={16}
      padding={6}
      color={'white'}
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

      <ExperimentCardContent content={bountyDescription} color={'white'} />
    </Box>
  );
}
