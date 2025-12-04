import React from 'react';
import { Template } from '../../types';
import styles from '../ConfigEditor.module.css';

interface Props {
  config: Template;
  isExpanded: boolean;
  onToggle: () => void;
  onConfigChange: (config: Template) => void;
}

export const MemeInfoSection: React.FC<Props> = ({
  config,
  isExpanded,
  onToggle,
  onConfigChange,
}) => {
  const handleChange = (field: string, value: string) => {
    const newConfig = { ...config };
    const parts = field.split('.');
    let obj: any = newConfig;
    for (let i = 0; i < parts.length - 1; i++) {
      obj = obj[parts[i]];
    }
    obj[parts[parts.length - 1]] = value;
    onConfigChange(newConfig);
  };

  return (
    <div className={styles.accordionSection}>
      <button
        className={styles.accordionTitle}
        onClick={onToggle}
      >
        <span className={styles.toggleIcon}>
          {isExpanded ? '▼' : '▶'}
        </span>
        Meme Information
      </button>
      {isExpanded && (
        <div className={styles.accordionContent}>
          <div className={styles.formGroup}>
            <label>Meme Ticker</label>
            <input
              type="text"
              value={config.meme.memeTicker}
              onChange={(e) => handleChange('meme.memeTicker', e.target.value)}
              placeholder="e.g., $MAKSH"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Meme Name</label>
            <input
              type="text"
              value={config.meme.memeName}
              onChange={(e) => handleChange('meme.memeName', e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Meme Description</label>
            <textarea
              value={config.meme.memeDescription}
              onChange={(e) => handleChange('meme.memeDescription', e.target.value)}
              rows={3}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Slogan Title</label>
            <input
              type="text"
              value={config.meme.memeSloganTitle}
              onChange={(e) => handleChange('meme.memeSloganTitle', e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Slogan</label>
            <textarea
              value={config.meme.memeSlogan}
              onChange={(e) => handleChange('meme.memeSlogan', e.target.value)}
              rows={3}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Title</label>
            <input
              type="text"
              value={config.meme.title}
              onChange={(e) => handleChange('meme.title', e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Subtitle</label>
            <input
              type="text"
              value={config.meme.subtitle}
              onChange={(e) => handleChange('meme.subtitle', e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Description</label>
            <textarea
              value={config.meme.description}
              onChange={(e) => handleChange('meme.description', e.target.value)}
              rows={3}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Contract Address</label>
            <input
              type="text"
              value={config.meme.contractAddress}
              onChange={(e) => handleChange('meme.contractAddress', e.target.value)}
              placeholder="0x..."
            />
          </div>
        </div>
      )}
    </div>
  );
};
