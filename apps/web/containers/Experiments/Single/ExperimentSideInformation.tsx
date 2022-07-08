import { useAuth0 } from '@auth0/auth0-react';
import {
  Flex,
  VStack,
  HStack,
  Icon,
  Text,
  Box,
  ChakraProps,
} from '@chakra-ui/react';
import { PopulatedExperiment } from '@reputable/types';
import PrimaryButton from '../../../components/Button/Primary';
import AboutExperiment from '../../../components/Experiments/About';
import BountyExperiment from '../../../components/Experiments/Bounty';
import ContributionsModal from '../../../components/Experiments/ContributionsModal';
import ExperimentMarkerInfo from '../../../components/Experiments/ExperimentMarkerInfo';
import ReputableLogo from '../../../components/Icons/ReputableLogo';
import Modal from '../../../components/Modal';
import TipModal from '../../../components/TipModal';
import calculateContributions from '../../../helpers/calculateContributions';
import { useApiContext } from '../../../providers/ApiContext';

interface Props extends ChakraProps {
  data: Pick<
    PopulatedExperiment,
    'tips' | '_id' | 'experimentPeriod' | 'markers' | 'bounty'
  >;
}

export default function ExperimentSideInformation({
  data,
  ...restProps
}: Props) {
  const { isAuthenticated } = useAuth0();
  const { user } = useApiContext();
  const { totalTokens } = calculateContributions(data.tips);
  return (
    <Flex direction="column" gap={6} {...restProps}>
      <VStack gap={4}>
        {!user?.app_metadata?.isApproved ? (
          <Modal
            title="Information"
            button={
              <PrimaryButton
                w="100%"
                disabled={!isAuthenticated}
                text={
                  isAuthenticated
                    ? 'Tip REPT'
                    : 'Sign in to tip this experiment'
                }
                leftIcon={
                  <Icon
                    as={ReputableLogo}
                    color="white"
                    width="16px"
                    height="16px"
                  />
                }
              />
            }
          >
            You have to be approved by an administrator to be able to tip an
            experiment.
          </Modal>
        ) : (
          <TipModal experimentId={data._id}>
            <PrimaryButton
              w="100%"
              disabled={!isAuthenticated}
              text={
                isAuthenticated ? 'Tip REPT' : 'Sign in to tip this experiment'
              }
              leftIcon={
                <Icon
                  as={ReputableLogo}
                  color="white"
                  width="16px"
                  height="16px"
                />
              }
            />
          </TipModal>
        )}
        <HStack align="center">
          <Icon as={ReputableLogo} width="18px" height="18px" />
          <Text size="18px" fontWeight={600} lineHeight="28px">
            {Math.round(parseFloat(totalTokens))} REPT received
          </Text>
          <ContributionsModal tips={data.tips || []}>
            <Text
              color="primary.700"
              lineHeight="28px"
              fontWeight={600}
              size="18px"
              cursor="pointer"
            >
              See contributions
            </Text>
          </ContributionsModal>
        </HStack>
      </VStack>
      <Box>
        <BountyExperiment
          bountyAmount={data.bounty.amount}
          bountyDescription={data.bounty.description}
        />
      </Box>
      <Box>
        <AboutExperiment
          experimentId={data._id}
          experimentPeriod={data.experimentPeriod ?? 28}
        />
      </Box>
      <Box>
        <ExperimentMarkerInfo markers={data.markers} />
      </Box>
    </Flex>
  );
}
