import Button from './components/base/button';

function App () {
  return (
    <div className="container" style={{ marginTop: 32 }}>
      <h1 className="text-center" style={{ marginBottom: 24 }}>Alchemist</h1>
      <Button size="lg" variant="outline">Outlined</Button>
      <Button size="lg" style={{ marginLeft: 12 }}>Primary</Button>
      <Button size="lg" isLoading style={{ marginLeft: 12 }}>Loading</Button>
    </div>
  );
}

export default App;
