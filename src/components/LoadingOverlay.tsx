import React from 'react';
import styles from './LoadingOverlay.module.css';

interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
  message = 'Building your website...',
}) => {
  if (!isLoading) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <div className={styles.spinner} />
        <h2 className={styles.heading}>Building...</h2>
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  );
};
