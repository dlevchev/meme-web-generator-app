import React from 'react';
import styles from '../ConfigEditor.module.css';

interface Meme {
  id: number;
  title: string;
  description: string;
  file: string | null;
}

interface Props {
  meme: Meme;
  onUpdate: (field: string, value: string) => void;
  onRemove: () => void;
  onFileSelected?: (memeId: number, file: File) => void;
}

export const MemeCard: React.FC<Props> = ({ meme, onUpdate, onRemove, onFileSelected }) => {
  return (
    <div className={styles.tokenCard}>
      <div className={styles.tokenCardHeader}>
        <span className={styles.tokenId}>Meme #{meme.id}</span>
        <button
          type="button"
          className={styles.deleteButton}
          onClick={onRemove}
          title="Delete meme"
        >
          🗑
        </button>
      </div>

      <div className={styles.formGroup}>
        <label>Title</label>
        <input
          type="text"
          value={meme.title}
          onChange={(e) => onUpdate('title', e.target.value)}
          placeholder="e.g., Funny Meme"
        />
      </div>

      <div className={styles.formGroup}>
        <label>Description</label>
        <input
          type="text"
          value={meme.description}
          onChange={(e) => onUpdate('description', e.target.value)}
          placeholder="e.g., A hilarious meme about..."
        />
      </div>

      <div className={styles.formGroup}>
        <label>Meme Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              onFileSelected?.(meme.id, file);
            }
          }}
        />
      </div>

      {meme.file && (
        <div className={`${styles.hint} ${styles.hintSuccess}`}>
          File: {meme.file}
        </div>
      )}
    </div>
  );
};
