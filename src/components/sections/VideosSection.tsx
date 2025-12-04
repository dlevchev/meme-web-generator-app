import React from 'react';
import { Template } from '../../types';
import { VideoCard } from './VideoCard';
import { addVideo, removeVideo, updateVideo, updateVideoFile } from '../helpers/configEditorHelpers';
import styles from '../ConfigEditor.module.css';

interface Props {
  config: Template;
  isExpanded: boolean;
  onToggle: () => void;
  onConfigChange: (config: Template, files?: File[]) => void;
}

export const VideosSection: React.FC<Props> = ({
  config,
  isExpanded,
  onToggle,
  onConfigChange,
}) => {
  const videos = config.videos?.items || [];

  const handleVideoFileSelected = (videoId: number, file: File) => {
    const result = updateVideoFile(config, videoId, file);
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
        Videos
      </button>
      {isExpanded && (
        <div className={styles.accordionContent}>
          <div className={styles.hint}>Add videos with titles and descriptions. Upload actual video files during the build process.</div>

          <div className={styles.formGroup}>
            <label>Videos Section Title</label>
            <input
              type="text"
              value={config.videosTitle || ''}
              onChange={(e) => onConfigChange({
                ...config,
                videosTitle: e.target.value
              })}
              placeholder="e.g., Our Videos"
            />
          </div>

          <div className={styles.tokenomicsContainer}>
            {videos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onUpdate={(field, value) =>
                  onConfigChange(updateVideo(config, video.id, field, value))
                }
                onRemove={() => onConfigChange(removeVideo(config, video.id))}
                onFileSelected={(videoId, file) => handleVideoFileSelected(videoId, file)}
              />
            ))}
          </div>

          <button
            type="button"
            className={styles.addTokenButton}
            onClick={() => onConfigChange(addVideo(config))}
          >
            + Add Video
          </button>
        </div>
      )}
    </div>
  );
};
