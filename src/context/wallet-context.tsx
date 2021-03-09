import {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode
} from 'react';
import { initNotify, initOnboard } from '../services/blocknative';
import { ethers } from 'ethers';
import IUniswapV2ERC20 from '../contracts/IUniswapV2ERC20.json';


// TODO: Add typings
type WalletProviderContext = {
  provider: any;
  address: any;
  network: any;
  balance: any;
  stakingTokenBalance: any;
  lpTokenTokenBalance: any;
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
  const [balance, setBalance] = useState<any>();
  const [stakingTokenBalance, setStakingTokenBalance] = useState<any>();
  const [lpTokenTokenBalance, setLpTokenTokenBalance] = useState<any>();
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

  //Get staking token balance
  useEffect(()=>{
    if(provider && address){
      const stakingToken = new ethers.Contract(
        '0x88acdd2a6425c3faae4bc9650fd7e27e0bebb7ab',
        IUniswapV2ERC20.abi,
        provider.getSigner()
      );
      const lpToken = new ethers.Contract(
        '0xCD6bcca48069f8588780dFA274960F15685aEe0e',
        IUniswapV2ERC20.abi,
        provider.getSigner()
      );
      stakingToken.balanceOf(address).then((res: any)=>{
        setStakingTokenBalance(res);
      });
      lpToken.balanceOf(address).then((res: any)=>{
        setLpTokenTokenBalance(res);
      });
    }

  }, [provider, address]);

  return (
    <WalletStateContext.Provider
      value={{ provider, address, network, balance, wallet, onboard, notify, stakingTokenBalance, lpTokenTokenBalance }}
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
