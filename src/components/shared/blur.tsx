import { Box, BoxProps } from '@chakra-ui/layout';

function BgBlur (props: BoxProps) {
  return (
    <Box
      top={-200}
      width={800}
      zIndex={-1}
      height={400}
      opacity={0.4}
      position="absolute"
      left="calc(50% - 400px)"
      background="#0041FF"
      borderRadius="100%"
      filter="blur(200px)"
      {...props}
    />
  );
}

export default BgBlur
;
