import React from 'react';
import { TokenomicsToken } from '../../types';
import styles from '../ConfigEditor.module.css';

interface Props {
  token: TokenomicsToken;
  onUpdate: (field: string, value: string) => void;
  onRemove: () => void;
}

export const TokenCard: React.FC<Props> = ({ token, onUpdate, onRemove }) => {
  return (
    <div className={styles.tokenCard}>
      <div className={styles.tokenCardHeader}>
        <span className={styles.tokenId}>Token #{token.id}</span>
        <button
          type="button"
          className={styles.deleteButton}
          onClick={onRemove}
          title="Delete token"
        >
          🗑
        </button>
      </div>

      <div className={styles.formGroup}>
        <label>Icon</label>
        <input
          type="text"
          value={token.icon}
          onChange={(e) => onUpdate('icon', e.target.value)}
          placeholder="e.g., 📊"
          maxLength={2}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Label</label>
        <input
          type="text"
          value={token.label}
          onChange={(e) => onUpdate('label', e.target.value)}
          placeholder="e.g., Total Supply"
        />
      </div>

      <div className={styles.formGroup}>
        <label>Value</label>
        <input
          type="text"
          value={token.value}
          onChange={(e) => onUpdate('value', e.target.value)}
          placeholder="e.g., 1B"
        />
      </div>

      <div className={styles.formGroup}>
        <label>Description</label>
        <input
          type="text"
          value={token.description}
          onChange={(e) => onUpdate('description', e.target.value)}
          placeholder="e.g., 1,000,000,000 $MAKSH"
        />
      </div>
    </div>
  );
};
