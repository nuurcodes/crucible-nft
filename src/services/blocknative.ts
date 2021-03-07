import stagingOnboard from 'bnc-onboard-staging';
import stagingNotify from 'bnc-notify-staging';
import Notify from 'bnc-notify';
import Onboard from 'bnc-onboard';
import { Subscriptions } from 'bnc-onboard-staging/dist/src/interfaces';

const networkId = 1;
const rpcUrl = process.env.REACT_APP_RCP_URL;
const apiUrl = process.env.REACT_APP_API_URL;
const staging = process.env.REACT_APP_STAGING;
const dappId = process.env.REACT_APP_D_APP_URL;
const infuraKey = process.env.REACT_APP_INFURA_KEY;

export function initOnboard (subscriptions: Subscriptions) {
  const onboard = staging ? stagingOnboard : Onboard;
  return onboard({
    dappId,
    hideBranding: true,
    networkId,
    apiUrl,
    darkMode: true,
    subscriptions,
    walletSelect: {
      wallets: [
        { walletName: 'metamask' },
        {
          walletName: 'trezor',
          appUrl: 'https://alchemist.wtf',
          email: 'contact@alchemist.wtf',
          rpcUrl
        },
        {
          walletName: 'ledger',
          rpcUrl
        },
        { walletName: 'trust', rpcUrl },
        {
          walletName: 'walletConnect',
          infuraKey
        },
        { walletName: 'imToken', rpcUrl }
      ]
    },
    walletCheck: [
      { checkName: 'derivationPath' },
      { checkName: 'connect' },
      { checkName: 'accounts' },
      { checkName: 'network' },
      { checkName: 'balance', minimumBalance: '100000' }
    ]
  });
}

export function initNotify () {
  const notify = staging ? stagingNotify : Notify;
  return notify({
    dappId,
    networkId,
    apiUrl
  });
}
