import React from 'react';
import styles from '../ConfigEditor.module.css';

interface Video {
  id: number;
  title: string;
  description: string;
  file: string | null;
}

interface Props {
  video: Video;
  onUpdate: (field: string, value: string) => void;
  onRemove: () => void;
  onFileSelected?: (videoId: number, file: File) => void;
}

export const VideoCard: React.FC<Props> = ({ video, onUpdate, onRemove, onFileSelected }) => {
  return (
    <div className={styles.tokenCard}>
      <div className={styles.tokenCardHeader}>
        <span className={styles.tokenId}>Video #{video.id}</span>
        <button
          type="button"
          className={styles.deleteButton}
          onClick={onRemove}
          title="Delete video"
        >
          🗑
        </button>
      </div>

      <div className={styles.formGroup}>
        <label>Title</label>
        <input
          type="text"
          value={video.title}
          onChange={(e) => onUpdate('title', e.target.value)}
          placeholder="e.g., Intro Video"
        />
      </div>

      <div className={styles.formGroup}>
        <label>Description</label>
        <input
          type="text"
          value={video.description}
          onChange={(e) => onUpdate('description', e.target.value)}
          placeholder="e.g., Project introduction"
        />
      </div>

      <div className={styles.formGroup}>
        <label>Video File</label>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              onFileSelected?.(video.id, file);
            }
          }}
        />
      </div>

      {video.file && (
        <div className={`${styles.hint} ${styles.hintSuccess}`}>
          File: {video.file}
        </div>
      )}
    </div>
  );
};
