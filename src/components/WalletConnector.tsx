import React, { useMemo } from 'react';
import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
import './WalletConnector.css';
import styles from './WalletConnector.module.css';

const SOLANA_NETWORK = WalletAdapterNetwork.Devnet;
const RPC_ENDPOINT = 'https://api.devnet.solana.com';

interface Props {
  children: React.ReactNode;
}

const WalletConnectorInner: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new TorusWalletAdapter(),
    ],
    []
  );

  return (
    <WalletProvider wallets={wallets} autoConnect>
      <WalletModalProvider>
        {children}
      </WalletModalProvider>
    </WalletProvider>
  );
};

export const WalletConnector: React.FC<Props> = ({ children }) => {
  return (
    <ConnectionProvider endpoint={RPC_ENDPOINT}>
      <WalletConnectorInner>
        {children}
      </WalletConnectorInner>
    </ConnectionProvider>
  );
};

export const WalletButton: React.FC = () => {
  return (
    <WalletMultiButton className={styles.walletButton} />
  );
};
