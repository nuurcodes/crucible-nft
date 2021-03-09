import {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode
} from 'react';
import { initNotify, initOnboard } from '../services/blocknative';
import { ethers } from 'ethers';

// TODO: Add typings
type WalletProviderContext = {
  provider: any;
  address: any;
  network: any;
  balance: any;
  wallet: any;
  onboard: any;
  notify: any;
}

type WalletProviderProps = { children: ReactNode };
const WalletStateContext = createContext<WalletProviderContext | undefined>(
  undefined
);

function WalletProvider ({ children }: WalletProviderProps) {
  const [provider, setProvider] = useState<any>(null);
  const [address, setAddress] = useState<any>(null);
  const [network, setNetwork] = useState<any>(null);
  const [balance, setBalance] = useState<any>(null);
  const [wallet, setWallet] = useState<any>({});

  const [onboard, setOnboard] = useState<any>(null);
  const [notify, setNotify] = useState<any>(null);

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

          setProvider(ethersProvider);

          window.localStorage.setItem('selectedWallet', wallet.name);
        } else {
          setProvider(null);
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

  return (
    <WalletStateContext.Provider
      value={{ provider, address, network, balance, wallet, onboard, notify }}
    >
      {children}
    </WalletStateContext.Provider>
  );
}
function useWallet () {
  const context = useContext(WalletStateContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
export { WalletProvider, useWallet };
