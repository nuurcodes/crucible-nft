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
import BgBlur from './components/shared/blur';
import Divider from './svg/divider.svg';
import Emoji from './components/shared/emoji';
import Footer from './components/layout/footer';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { initNotify, initOnboard } from './services/blocknative';
import IUniswapV2ERC20 from './contracts/IUniswapV2ERC20.json';
import CrucibleFactory from './contracts/CrucibleFactory.json';
import Crucible from './contracts/Crucible.json';
import Transmuter from './contracts/Transmuter.json';
import { formatEther, parseUnits, randomBytes } from 'ethers/lib/utils';
import { signPermission, signPermitEIP2612 } from './utils';

interface StakeProps {
  provider: any;
}

const StakeButton = ({provider, ...props}: StakeProps) => {
  const [amount, setAmount] = useState<number>(1); //test amount
  console.log("PRovider", provider);
  const signer = provider && provider.getSigner();

  const handleChange = (event: any) => setAmount(event.target.value);


  const aludel = new ethers.Contract(
    '0xf0D415189949d913264A454F57f4279ad66cB24d',
    IUniswapV2ERC20.abi,
    signer
  );
  const stakingToken = new ethers.Contract(
    '0x88acdd2a6425c3faae4bc9650fd7e27e0bebb7ab',
    IUniswapV2ERC20.abi,
    signer
  );

  const crucibleFactory = new ethers.Contract(
    '0x54e0395CFB4f39beF66DBCd5bD93Cca4E9273D56',
    CrucibleFactory.abi,
    signer
  );

  const transmuter = new ethers.Contract(
    '0xB772ce9f14FC7C7db0D4525aDb9349FBD7ce456a',
    Transmuter.abi,
    signer
  );
  console.log('Contract instance', aludel, stakingToken, crucibleFactory, transmuter);

  const handleClick= async()=>{
    const salt = randomBytes(32);
    const deadline =
      (await provider.getBlock('latest')).timestamp + 60 * 60 * 24;
    const crucible = new ethers.Contract(
      await transmuter.predictDeterministicAddress(
        await crucibleFactory.getTemplate(),
        salt,
        crucibleFactory.address,
      ),
      Crucible.abi,
      signer
    );
    const permit = await signPermitEIP2612(
      signer,
      stakingToken,
      transmuter.address,
      amount,
      deadline,
    );

    console.log('Sign Lock');

    const permission = await signPermission(
      'Lock',
      crucible,
      signer,
      aludel.address,
      stakingToken.address,
      amount,
      0,
    );

    const tx = await transmuter.mintCruciblePermitAndStake(
      aludel.address,
      crucibleFactory.address,
      signer.address,
      salt,
      permit,
      permission,
    );

  };

  return (                
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
      handleChange={handleChange}
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
    Mint NFT
  </Button>
</Flex>
);
};

function App () {
  // TODO Updating types
  const [address, setAddress] = useState<any>(null);
  const [network, setNetwork] = useState<any>(null);
  const [balance, setBalance] = useState<any>(null);
  const [wallet, setWallet] = useState<any>({});
  const [provider, setProvider] = useState<any>();

  const [onboard, setOnboard] = useState<any>(null);
  const [notify, setNotify] = useState<any>(null);

  // TODO: Make this a react hook
  useEffect(() => {
    const onboard = initOnboard({
      address: setAddress,
      network: setNetwork,
      balance: setBalance,
      wallet: (wallet: any) => {
        if (wallet.provider) {
          setWallet(wallet);
          const ethersProvider = new ethers.providers.Web3Provider(
            wallet.provider
          );
          ethersProvider && setProvider(ethersProvider);
          window.localStorage.setItem('selectedWallet', wallet.name);
        } else {
          setWallet({});
        }
      }
    });

    setOnboard(onboard);
    setNotify(initNotify());
  }, []);

  useEffect(() => {
    const previouslySelectedWallet = window.localStorage.getItem(
      'selectedWallet'
    );

    if (previouslySelectedWallet && onboard) {
      onboard.walletSelect(previouslySelectedWallet);
    }
  }, [onboard]);

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
                <StakeButton provider={provider}/>
              </VStack>
            </GridItem>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </Flex>
  );
}

export default App;
