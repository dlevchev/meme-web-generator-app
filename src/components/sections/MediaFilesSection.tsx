import React from 'react';
import { Template } from '../../types';
import { updateMediaFile } from '../helpers/configEditorHelpers';
import styles from '../ConfigEditor.module.css';

interface Props {
  config: Template;
  isExpanded: boolean;
  onToggle: () => void;
  onConfigChange: (config: Template, files?: File[]) => void;
}

export const MediaFilesSection: React.FC<Props> = ({
  config,
  isExpanded,
  onToggle,
  onConfigChange,
}) => {
  return (
    <div className={styles.accordionSection}>
      <button
        className={styles.accordionTitle}
        onClick={onToggle}
      >
        <span className={styles.toggleIcon}>
          {isExpanded ? '▼' : '▶'}
        </span>
        Media Files
      </button>
      {isExpanded && (
        <div className={styles.accordionContent}>
          <div className={styles.hint}>Upload media files for your meme website</div>

          <div className={styles.formGroup}>
            <label>Meme Image (required)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const originalFile = e.target.files?.[0];
                if (originalFile) {
                  const { config: newConfig, file: newFile } = updateMediaFile(config, 'memeImage', originalFile);
                  onConfigChange(newConfig, [newFile]);
                }
              }}
            />
            <div className={styles.hint}>{config.media.memeImage.description}</div>
            {config.media.memeImage.file && (
              <div className={`${styles.hint} ${styles.hintSuccess}`}>
                Selected: {config.media.memeImage.file}
              </div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label>Favicon (required)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                 const originalFile = e.target.files?.[0];
                if (originalFile) {
                  const { config: newConfig, file: newFile } = updateMediaFile(config, 'favicon', originalFile);
                  onConfigChange(newConfig, [newFile]);
                }
              }}
            />
            <div className={styles.hint}>{config.media.favicon.description}</div>
            {config.media.favicon.file && (
              <div className={`${styles.hint} ${styles.hintSuccess}`}>
                Selected: {config.media.favicon.file}
              </div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label>Background Music (optional)</label>
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => {
                 const originalFile = e.target.files?.[0];
                if (originalFile) {
                  const { config: newConfig, file: newFile } = updateMediaFile(config, 'musicFile', originalFile);
                  onConfigChange(newConfig, [newFile]);
                }
              }}
            />
            <div className={styles.hint}>{config.media.musicFile.description}</div>
            {config.media.musicFile.file && (
              <div className={`${styles.hint} ${styles.hintSuccess}`}>
                Selected: {config.media.musicFile.file}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
