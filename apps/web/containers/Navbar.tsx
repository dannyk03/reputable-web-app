import {
  Box,
  Divider,
  Flex,
  HStack,
  Spacer,
  Icon,
  useTheme,
  Text,
  Link,
  Input,
  Button,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';

import Logo from '../components/Icons/Logo';
import Image from 'next/image';
import { FiLogIn } from 'react-icons/fi';
import NextLink from 'next/link';
import { useApiContext } from '../providers/ApiContext';
import { useAuth0 } from '@auth0/auth0-react';
import { Show, Hide } from '@chakra-ui/react';
import UserBadge from '../components/UserBadge';
import Modal from '../components/Modal';
import { useUpdateAddress } from '../_api/Users/mutations';

export default function Navbar() {
  const theme = useTheme();
  const [address, setAddress] = React.useState('');
  const [closeUpdateAddressModal, setCloseUpdateAddressModal] =
    React.useState(false);

  const { loginWithRedirect, user } = useAuth0();
  const { user: APIUser } = useApiContext();
  const { updateAddres } = useUpdateAddress(address as string);

  const handleUpdateAddress = () => {
    updateAddres.mutate({ address });
    setCloseUpdateAddressModal(true);
    setTimeout(() => {
      setCloseUpdateAddressModal(false);
    }, 10);
  };
  useEffect(() => {
    setAddress(APIUser?.user_metadata?.address);
  }, [APIUser]);

  return (
    <Flex flexDirection="column">
      <HStack py={[4, 10]} alignContent="center">
        <NextLink href={'/'} passHref>
          <Link>
            <Icon
              _focus={{ textDecoration: 'none' }}
              as={Logo}
              mt={[1, 0]}
              w={['130px', '180px']}
              h={['32px', '44px']}
              fill={theme.colors.primary[800]}
            />
          </Link>
        </NextLink>
        <Spacer />
        {!user ? (
          <>
            <Hide below="md">
              <Box
                py={2}
                px={4}
                border="1px solid"
                borderColor="gray.200"
                borderRadius="24px"
                _hover={{ cursor: 'pointer' }}
                onClick={() =>
                  loginWithRedirect({
                    audience: 'https://api.reputable.health',
                  })
                }
              >
                <Text>Sign in</Text>
              </Box>
            </Hide>
            <Show below="md">
              <Button variant="ghost">
                <Icon
                  as={FiLogIn}
                  w="38px"
                  h="38px"
                  p={2}
                  onClick={() =>
                    loginWithRedirect({
                      audience: 'https://api.reputable.health',
                    })
                  }
                ></Icon>
              </Button>
            </Show>
          </>
        ) : (
          <>
            <HStack>
              <Modal
                title=""
                isClose={closeUpdateAddressModal}
                closeButtonTitle="hidden"
                button={
                  <Button
                    style={{
                      boxShadow: 'none',
                    }}
                    onClick={() => {
                      setCloseUpdateAddressModal(false);
                    }}
                    className="outline-none focus:outline-none"
                    borderRadius={15}
                    padding={0}
                    outline="none"
                    height="100%"
                    width="100%"
                    textAlign="left"
                    border="none"
                  >
                    <HStack
                      py={2}
                      px={4}
                      border="1px solid"
                      borderColor="gray.200"
                      borderRadius="24px"
                    >
                      <Image
                        width={'24px'}
                        height={'24px'}
                        alt="User Tokens"
                        src="/LogoVector.svg"
                      />
                      <Text
                        color="gray.700"
                        lineHeight="24px"
                        fontSize="16px"
                        fontWeight={600}
                      >
                        {APIUser?.user_metadata?.tokens} REPT
                      </Text>
                    </HStack>
                  </Button>
                }
              >
                <HStack>
                  <Image
                    width={'18px'}
                    height={'21px'}
                    alt="User Tokens"
                    src="/LogoVectorBlue.png"
                  />
                  <Text color="primary.800" fontSize={24} fontWeight="600">
                    What is REPT?
                  </Text>
                </HStack>
                <Text fontWeight="600" fontSize={16}>
                  <span style={{ color: '#09005D', fontWeight: '500' }}>
                    REPT
                  </span>{' '}
                  is an ERC-20 token. Ownership of REPT allows the holder to
                  participate in the democratic governance of Reputable. Please
                  <Link
                    color="primary.800"
                    href="https://docs.reputable.health/product-docs/fundamentals/reward-mechanics"
                  >
                    {' '}
                    click here{' '}
                  </Link>
                  to learn all the ways in which you can earn REPT in the
                  application. REPT earned in the app, will be air-dropped in
                  your account on the 1st of each month.
                </Text>

                <Text
                  color="gray.700"
                  fontSize={18}
                  fontWeight="500"
                  marginTop={'8'}
                >
                  {' '}
                  Wallet addres{' '}
                </Text>
                <Text fontWeight="400" fontSize={16}>
                  Please enter your Ethereum Wallet Address. To learn how to
                  create an Ethereum Wallet, please check out the following
                  guide.{' '}
                  <Link
                    color="primary.800"
                    href="https://www.sofi.com/learn/content/setting-up-ethereum-wallet/"
                  >
                    https://www.sofi.com/learn/content/setting-up-ethereum-wallet/
                  </Link>
                </Text>
                <HStack marginTop={4} marginBottom={4}>
                  <Input
                    value={address}
                    bgColor="gray.50"
                    borderColor="gray.200"
                    border="1px solid"
                    borderRadius={4}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                    placeholder="000000"
                    width={'120px'}
                  />
                  <Button
                    colorScheme="primary"
                    className="ms-auto"
                    disabled={
                      address === APIUser?.user_metadata?.address ||
                      address === ''
                    }
                    borderRadius={20}
                    width="80px"
                    style={{ marginLeft: 'auto' }}
                    onClick={() => {
                      handleUpdateAddress();
                    }}
                  >
                    Save
                  </Button>
                </HStack>
              </Modal>

              <UserBadge w="fit-content" />
            </HStack>
          </>
        )}
      </HStack>
      <Divider mb={10} />
    </Flex>
  );
}
