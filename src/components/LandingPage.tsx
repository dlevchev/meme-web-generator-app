import React from 'react';
import styles from './LandingPage.module.css';

interface Props {
  onExplore: () => void;
  onViewGuide?: () => void;
}

export const LandingPage: React.FC<Props> = ({ onExplore, onViewGuide }) => {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h2 className={styles.heroTitle}>Create Epic Meme Websites</h2>
          <p className={styles.heroSubtitle}>
            Transform your favorite memes into fully functional websites with just a few clicks
          </p>
          <button className={styles.ctaButton} onClick={onExplore}>
            Get Started ✨
          </button>
          {onViewGuide && (
            <button className={styles.guideButton} onClick={onViewGuide}>
              📖 View Setup Guide
            </button>
          )}
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.visualBox}>
            <div className={styles.memePreview}>
              <div className={styles.previewPlaceholder}>
                <span>🎭</span>
                <p>Your meme here</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.features}>
        <div className={styles.featureCard}>
          <span className={styles.featureIcon}>🚀</span>
          <h3>Lightning Fast</h3>
          <p>Build and deploy your meme website in seconds</p>
        </div>

        <div className={styles.featureCard}>
          <span className={styles.featureIcon}>🎨</span>
          <h3>Fully Customizable</h3>
          <p>Customize colors, fonts, and layout to match your vibe</p>
        </div>

        <div className={styles.featureCard}>
          <span className={styles.featureIcon}>📱</span>
          <h3>Responsive Design</h3>
          <p>Looks perfect on all devices - mobile, tablet, desktop</p>
        </div>

        <div className={styles.featureCard}>
          <span className={styles.featureIcon}>🎵</span>
          <h3>Media Rich</h3>
          <p>Add images, videos, and background music</p>
        </div>
      </div>
    </div>
  );
};
