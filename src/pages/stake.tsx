import {
  Button,
  Heading,
  Container,
  Text,
  Flex,
  Box,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  Link
} from '@chakra-ui/react';
import BgBlur from '../components/shared/blur';
import Divider from '../svg/divider.svg';
import Emoji from '../components/shared/emoji';
import Footer from '../components/layout/footer';
import { useWallet } from '../context/wallet-context';

function Stake () {
  const {
    provider,
    address,
    network,
    balance,
    wallet,
    onboard,
    notify
  } = useWallet();

  // Loading animation would be nice
  if (!onboard || !notify) {
    return null;
  }

  return (
    <Flex direction="column" minH="100vh">
      <BgBlur />
      <div>Address: {address}</div>
      <div>Network: {network}</div>
      <div>Balance: {balance ? balance / 1000000000000000000 + ' ETH' : ''}</div>
      <Box role="main" flexGrow={1}>
        <Container maxW="5xl">
          <Heading as="h1" size="3xl" textAlign="center" my={28}>
            Alchemist
          </Heading>
          <Grid templateColumns="repeat(12, 1fr)" gap={4}>
            <GridItem colSpan={[12, null, 4]}>
              <Heading as="h2" size="lg">
                Preparation
              </Heading>
              <Text py={4}>
                <Emoji label="alembic" symbol="⚗️" />{' '}
                <Link color="brand.500" href="#">
                  alchemist
                </Link>{' '}
                (4%) + Ξ ethereum (96%) mix into a{' '}
                <Link color="brand.500" href="#">
                  liquidity potion
                </Link>
              </Text>
              <Button
                size="lg"
                mb={8}
                variant="gradient"
                isFullWidth
                onClick={
                  wallet && provider
                    ? () => onboard.walletReset()
                    : () => onboard.walletSelect()
                }
              >
                {wallet && provider ? 'Disconnect wallet' : 'Connect wallet'}
              </Button>

              {wallet.provider && (
                <Button onClick={onboard.walletCheck}>Wallet check</Button>
              )}

              <Heading as="h2" size="lg">
                Deposit
              </Heading>
              <Text py={4}>
                Deposit <Emoji label="alembic" symbol="⚗️" /> alchemist and Ξ
                ethereum into{' '}
                <Link color="brand.500" href="#">
                  this
                </Link>{' '}
                24:1 liquidity potion
              </Text>
            </GridItem>
            <GridItem colSpan={[12, null, 1]}>
              <Box
                bgImage={`url(${Divider})`}
                height="100%"
                bgPosition="center"
                bgRepeat="no-repeat"
                bgSize="contain"
              />
            </GridItem>
            <GridItem colSpan={[12, null, 7]}>
              <VStack spacing={8}>
                <Flex width="100%">
                  <InputGroup size="lg">
                    <Input
                      fontSize="2xl"
                      pr="6rem"
                      placeholder="0.00000000001"
                      type="number"
                      height={16}
                      borderRadius="2xl"
                      borderTopRightRadius={0}
                      borderBottomRightRadius={0}
                    />
                    <InputRightElement width="6rem" h="100%">
                      <Button
                        h="1.75rem"
                        size="sm"
                        variant="outline"
                        colorScheme="brand"
                      >
                        Max
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <Button
                    size="lg"
                    height={16}
                    variant="gradient"
                    borderTopLeftRadius={0}
                    borderBottomLeftRadius={0}
                  >
                    Allow
                  </Button>
                </Flex>
                <Flex width="100%">
                  <InputGroup size="lg">
                    <Input
                      fontSize="2xl"
                      pr="6rem"
                      placeholder="0.00000000001"
                      height={16}
                      type="number"
                      borderRadius="2xl"
                      borderTopRightRadius={0}
                      borderBottomRightRadius={0}
                    />
                    <InputRightElement width="6rem" h="100%">
                      <Button
                        h="1.75rem"
                        size="sm"
                        variant="outline"
                        colorScheme="brand"
                      >
                        Max
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <Button
                    size="lg"
                    height={16}
                    variant="gradient"
                    borderTopLeftRadius={0}
                    borderBottomLeftRadius={0}
                  >
                    Allow
                  </Button>
                </Flex>
                <Button size="lg" height={16} variant="gradient" isFullWidth>
                  Submit
                </Button>
              </VStack>
            </GridItem>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </Flex>
  );
}

export default Stake;
