import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { walletService } from '../services/walletService';
import { api } from '../services/api';
import styles from './PaymentModal.module.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: (txSignature: string) => void;
  amount?: number;
}

interface PriceInfo {
  basePrice: number;
  discountPercent: number;
  finalPrice: number;
  tier: string;
  isFree: boolean;
}

export const PaymentModal: React.FC<Props> = ({ isOpen, onClose, onPaymentSuccess, amount = 0.01 }) => {
  const wallet = useWallet();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoadingPrice, setIsLoadingPrice] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [priceInfo, setPriceInfo] = useState<PriceInfo | null>(null);

  React.useEffect(() => {
    if (isOpen && wallet.connected && wallet.publicKey) {
      getBalance();
      calculatePrice();
    } else if (isOpen) {
      setPriceInfo(null);
    }
  }, [isOpen, wallet.connected, wallet.publicKey]);

  const getBalance = async () => {
    try {
      const bal = await walletService.getBalance(wallet);
      setBalance(bal);
    } catch (err) {
      console.error('Failed to get balance:', err);
    }
  };

  const calculatePrice = async () => {
    if (!wallet.publicKey) return;

    setIsLoadingPrice(true);
    try {
      const response = await fetch('/api/payments/calculate-price', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletAddress: wallet.publicKey.toString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to calculate price');
      }

      const data = await response.json();
      setPriceInfo(data);
    } catch (err) {
      console.error('Failed to calculate price:', err);
      // Set default price if calculation fails
      setPriceInfo({
        basePrice: amount,
        discountPercent: 0,
        finalPrice: amount,
        tier: 'Standard Price',
        isFree: false,
      });
    } finally {
      setIsLoadingPrice(false);
    }
  };

  const handlePayment = async () => {
    if (!wallet.connected) {
      setError('Please connect your wallet first');
      return;
    }

    const requiredAmount = priceInfo?.finalPrice || amount;
    if (balance !== null && balance < requiredAmount) {
      setError(`Insufficient balance. You need ${requiredAmount.toFixed(6)} SOL but have ${balance.toFixed(4)} SOL`);
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const txSignature = await walletService.initiatePayment(wallet);
      onPaymentSuccess(txSignature);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Complete Payment</h2>
          <button className={styles.closeBtn} onClick={onClose}>×</button>
        </div>

        <div className={styles.content}>
          <div className={styles.paymentInfo}>
            {isLoadingPrice ? (
              <div className={styles.infoRow}>
                <span>Loading price info...</span>
              </div>
            ) : (
              <>
                <div className={styles.infoRow}>
                  <span>Your Tier:</span>
                  <span className={styles.tier}>{priceInfo?.tier || 'Standard'}</span>
                </div>

                <div className={styles.infoRow}>
                  <span>Base Price:</span>
                  <span className={styles.basePrice}>{priceInfo?.basePrice.toFixed(6) || amount.toFixed(6)} SOL</span>
                </div>

                {priceInfo?.discountPercent > 0 && (
                  <>
                    <div className={styles.infoRow}>
                      <span>Discount:</span>
                      <span className={styles.discount}>-{priceInfo.discountPercent}%</span>
                    </div>
                    <div className={styles.divider} />
                  </>
                )}

                <div className={styles.infoRow}>
                  <span className={styles.finalLabel}>Final Price:</span>
                  {priceInfo?.isFree ? (
                    <span className={styles.free}>FREE 🎉</span>
                  ) : (
                    <span className={styles.finalAmount}>{priceInfo?.finalPrice.toFixed(6) || amount.toFixed(6)} SOL</span>
                  )}
                </div>

                {balance !== null && (
                  <div className={styles.infoRow}>
                    <span>Your Balance:</span>
                    <span className={(priceInfo?.finalPrice || amount) <= balance ? styles.sufficient : styles.insufficient}>
                      {balance.toFixed(4)} SOL
                    </span>
                  </div>
                )}
              </>
            )}
          </div>

          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}

          {!wallet.connected ? (
            <p className={styles.warning}>Please connect your wallet using the button in the top right corner</p>
          ) : (
            <button
              className={styles.payButton}
              onClick={handlePayment}
              disabled={isProcessing || !wallet.connected || isLoadingPrice}
            >
              {isProcessing ? 'Processing Payment...' : priceInfo?.isFree ? 'Claim Free Access' : `Pay ${(priceInfo?.finalPrice || amount).toFixed(6)} SOL`}
            </button>
          )}
        </div>

        <div className={styles.footer}>
          <p className={styles.disclaimer}>
            ⚠️ Please review the transaction details in your wallet before confirming.
          </p>
        </div>
      </div>
    </div>
  );
};
