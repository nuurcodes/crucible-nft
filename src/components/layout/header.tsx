import { Flex, Link as ChakraLink } from '@chakra-ui/react';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

function Header (): ReactElement {
  return (
    <Flex>
      <ChakraLink as={Link} to="/">
        Home
      </ChakraLink>
      <ChakraLink as={Link} to="/stake">
        Stake
      </ChakraLink>
    </Flex>
  );
}

export default Header;
