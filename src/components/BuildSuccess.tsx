import React, { useState } from 'react';
import { BuildResponse } from '../types';
import { api } from '../services/api';
import styles from './BuildSuccess.module.css';

interface Props {
  response: BuildResponse;
  onNewBuild: () => void;
  onViewGuide?: () => void;
}

export const BuildSuccess: React.FC<Props> = ({ response, onNewBuild, onViewGuide }) => {
  const [isCleaningUp, setIsCleaningUp] = useState(false);
  const [autoDeleteTimeLeft, setAutoDeleteTimeLeft] = useState(10);

  const triggerCleanup = async () => {
    setIsCleaningUp(true);
    try {
      await api.cleanup.build(response.buildId);
    } catch (error) {
      // Cleanup errors are non-critical, silently continue
    } finally {
      setIsCleaningUp(false);
    }
  };

  const handleDownloadAndCleanup = async () => {
    try {
      // Trigger the download
      const link = document.createElement('a');
      link.href = response.downloadUrl || '';
      link.download = `${response.buildId || 'download'}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Start countdown timer for auto-delete
      let timeLeft = 10;
      setAutoDeleteTimeLeft(timeLeft);

      const countdownInterval = setInterval(() => {
        timeLeft -= 1;
        setAutoDeleteTimeLeft(timeLeft);

        if (timeLeft <= 0) {
          clearInterval(countdownInterval);
          triggerCleanup();
        }
      }, 1000);

      // Allow manual cancel by user clicking button again within 10 seconds
      window.addEventListener(
        'click',
        () => {
          clearInterval(countdownInterval);
          setAutoDeleteTimeLeft(0);
        },
        { once: true }
      );
    } catch (error) {
      // Download errors handled silently
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.successBox}>
        <h2>✅ Website Built Successfully!</h2>
        <p>{response.message}</p>
        <p className={styles.buildId}>Build ID: {response.buildId}</p>

        <div className={styles.actions}>
          <button
            onClick={handleDownloadAndCleanup}
            disabled={isCleaningUp}
            className={styles.downloadBtn}
          >
            {isCleaningUp ? 'Cleaning up...' : 'Download Website (ZIP)'}
          </button>
          {onViewGuide && (
            <button onClick={onViewGuide} className={styles.guideBtn}>
              📖 View Setup Guide
            </button>
          )}
          <button onClick={onNewBuild} className={styles.newBtn}>
            Build Another
          </button>
        </div>

        {autoDeleteTimeLeft > 0 && autoDeleteTimeLeft < 10 && (
          <p className={styles.autoDeleteTimer}>
            Auto-deleting ZIP in {autoDeleteTimeLeft}s (click to cancel)
          </p>
        )}
      </div>
    </div>
  );
};
