import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import theme from './config/theme';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react';
import { WalletProvider } from './context/wallet-context';
import './styles/onboard.css';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <WalletProvider>
        <App />
      </WalletProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
