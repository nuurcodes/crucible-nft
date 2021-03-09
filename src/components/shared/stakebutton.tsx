import {
    Button,
    Flex,
    Input,
    InputGroup,
    InputRightElement,
  } from '@chakra-ui/react';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import IUniswapV2ERC20 from '../../contracts/IUniswapV2ERC20.json';
import CrucibleFactory from '../../contracts/CrucibleFactory.json';
import Crucible from '../../contracts/Crucible.json';
import Transmuter from '../../contracts/Transmuter.json';
import { formatEther, parseUnits, randomBytes } from 'ethers/lib/utils';
import { signPermission, signPermitEIP2612 } from '../../utils';

interface StakeProps {
  provider: any;
}

const StakeButton = ({provider, ...props}: StakeProps) => {
  const [amount, setAmount] = useState<number>(1); //test amount
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
    handleClick={handleClick}
  >
    Mint NFT
  </Button>
</Flex>
);
};
export default StakeButton;
