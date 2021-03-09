import {
  Box,
  Container,
  HStack,
  VStack,
  Flex,
  LinkBox,
  LinkOverlay,
  Text
} from '@chakra-ui/layout';
import { ReactElement } from 'react';
import DiscordIcon from '../icons/discord';
import EtherscanIcon from '../icons/etherscan';
import GithubIcon from '../icons/github';
import UniswapIcon from '../icons/uniswap';

const links = [
  { label: 'Github', icon: <GithubIcon />, to: '' },
  { label: 'Etherscan', icon: <EtherscanIcon />, to: '' },
  { label: 'Discord', icon: <DiscordIcon />, to: '' },
  { label: 'Uniswap', icon: <UniswapIcon />, to: '' }
];

function Footer (): ReactElement {
  return (
    <Box
      pt={36}
      pb={16}
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="cover"
    >
      <Container>
        <Flex justifyContent="center">
          <HStack spacing={[4, 8]}>
            {links.map((link) => (
              <VStack key={link.label}>
                <LinkBox>
                  <LinkOverlay
                    href="#"
                    color="brand.500"
                    _hover={{ color: 'brand.200' }}
                  >
                    <Flex flexDir="column" alignItems="center">
                      {link.icon}
                      <Text color="gray.300">{link.label}</Text>
                    </Flex>
                  </LinkOverlay>
                </LinkBox>
              </VStack>
            ))}
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}

export default Footer;
