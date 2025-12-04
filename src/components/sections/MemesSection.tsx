import React from 'react';
import { Template } from '../../types';
import { MemeCard } from './MemeCard';
import { addMeme, removeMeme, updateMeme, updateMemeFile } from '../helpers/configEditorHelpers';
import styles from '../ConfigEditor.module.css';

interface Props {
  config: Template;
  isExpanded: boolean;
  onToggle: () => void;
  onConfigChange: (config: Template, files?: File[]) => void;
}

export const MemesSection: React.FC<Props> = ({
  config,
  isExpanded,
  onToggle,
  onConfigChange,
}) => {
  const memes = config.memes?.items || [];

  const handleMemeFileSelected = (memeId: number, file: File) => {
    const result = updateMemeFile(config, memeId, file);
    onConfigChange(result.config, [result.file]);
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
        Memes
      </button>
      {isExpanded && (
        <div className={styles.accordionContent}>
          <div className={styles.hint}>Add meme images with titles and descriptions. Upload actual image files during the build process.</div>

          <div className={styles.formGroup}>
            <label>Memes Section Title</label>
            <input
              type="text"
              value={config.memes?.title || '🖼️ Meme Gallery'}
              onChange={(e) => onConfigChange({
                ...config,
                memes: {
                  ...config.memes,
                  title: e.target.value,
                },
              })}
              placeholder="e.g., Meme Gallery"
            />
          </div>

          <div className={styles.tokenomicsContainer}>
            {memes.map((meme) => (
              <MemeCard
                key={meme.id}
                meme={meme}
                onUpdate={(field, value) =>
                  onConfigChange(updateMeme(config, meme.id, field, value))
                }
                onRemove={() => onConfigChange(removeMeme(config, meme.id))}
                onFileSelected={(memeId, file) => handleMemeFileSelected(memeId, file)}
              />
            ))}
          </div>

          <button
            type="button"
            className={styles.addTokenButton}
            onClick={() => onConfigChange(addMeme(config))}
          >
            + Add Meme
          </button>
        </div>
      )}
    </div>
  );
};
