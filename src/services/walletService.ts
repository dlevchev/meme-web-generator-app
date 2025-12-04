import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { WalletContextState } from '@solana/wallet-adapter-react';

const SOLANA_NETWORK = 'https://api.devnet.solana.com';
const RECIPIENT_WALLET = 'YOUR_RECIPIENT_WALLET_ADDRESS'; // Replace with your wallet
const PAYMENT_AMOUNT_SOL = 0.01; // Price in SOL

export interface PaymentInfo {
  amount: number;
  recipient: string;
  description: string;
}

export class WalletService {
  private connection: Connection;

  constructor() {
    this.connection = new Connection(SOLANA_NETWORK, 'confirmed');
  }

  /**
   * Check if wallet is connected
   */
  isConnected(wallet: WalletContextState | null): boolean {
    return !!(wallet?.connected && wallet?.publicKey);
  }

  /**
   * Get wallet address
   */
  getWalletAddress(wallet: WalletContextState | null): string | null {
    return wallet?.publicKey?.toString() || null;
  }

  /**
   * Get wallet balance in SOL
   */
  async getBalance(wallet: WalletContextState | null): Promise<number> {
    if (!wallet?.publicKey) return 0;
    try {
      const balance = await this.connection.getBalance(wallet.publicKey);
      return balance / LAMPORTS_PER_SOL;
    } catch (error) {
      console.error('Failed to get balance:', error);
      return 0;
    }
  }

  /**
   * Initiate payment transaction
   */
  async initiatePayment(wallet: WalletContextState | null): Promise<string> {
    if (!wallet?.publicKey || !wallet?.signTransaction) {
      throw new Error('Wallet not connected');
    }

    try {
      const recipientPublicKey = new PublicKey(RECIPIENT_WALLET);
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: recipientPublicKey,
          lamports: PAYMENT_AMOUNT_SOL * LAMPORTS_PER_SOL,
        })
      );

      // Get the latest blockhash
      const { blockhash } = await this.connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = wallet.publicKey;

      // Sign transaction
      const signedTransaction = await wallet.signTransaction(transaction);

      // Send transaction
      const txSignature = await this.connection.sendRawTransaction(
        signedTransaction.serialize(),
        { skipPreflight: false }
      );

      // Wait for confirmation
      await this.connection.confirmTransaction(txSignature, 'confirmed');

      return txSignature;
    } catch (error) {
      throw new Error(`Payment failed: ${(error as Error).message}`);
    }
  }

  /**
   * Verify transaction on blockchain
   */
  async verifyTransaction(txSignature: string): Promise<boolean> {
    try {
      const transaction = await this.connection.getTransaction(txSignature);
      return transaction !== null && transaction.meta?.err === null;
    } catch (error) {
      console.error('Failed to verify transaction:', error);
      return false;
    }
  }

  /**
   * Get transaction details
   */
  async getTransactionDetails(txSignature: string) {
    try {
      return await this.connection.getTransaction(txSignature);
    } catch (error) {
      console.error('Failed to get transaction details:', error);
      return null;
    }
  }
}

export const walletService = new WalletService();
