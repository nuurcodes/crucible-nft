import { Button, Heading } from '@chakra-ui/react';

function App () {
  return (
    <div className="container" style={{ marginTop: 32 }}>
      <Heading className="text-center" style={{ marginBottom: 24 }}>Alchemist</Heading>
      <Button size="lg" variant="outline">Outlined</Button>
      <Button size="lg" style={{ marginLeft: 12 }}>Primary</Button>
      <Button size="lg" isLoading style={{ marginLeft: 12 }}>Loading</Button>
    </div>
  );
}

export default App;
