import React from 'react';
import { Template } from '../../types';
import { ColorInputGroup } from './ColorInputGroup';
import styles from '../ConfigEditor.module.css';

interface Props {
  config: Template;
  isExpanded: boolean;
  onToggle: () => void;
  onConfigChange: (config: Template) => void;
}

export const MainSettingsSection: React.FC<Props> = ({
  config,
  isExpanded,
  onToggle,
  onConfigChange,
}) => {
  const handleChange = (field: string, value: any) => {
    const newConfig = { ...config };
    if (field === 'pageTitle') {
      newConfig.pageTitle = value;
    } else if (field.startsWith('styles.')) {
      const styleKey = field.split('.')[1] as keyof typeof config.styles;
      const newStyles = { ...config.styles };
      newStyles[styleKey] = value;
      newConfig.styles = newStyles;
    }
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
        Main Settings
      </button>
      {isExpanded && (
        <div className={styles.accordionContent}>
          <div className={styles.formGroup}>
            <label>Page Title</label>
            <input
              type="text"
              value={config.pageTitle || ''}
              onChange={(e) => handleChange('pageTitle', e.target.value)}
              placeholder="e.g., $MAKSH - Maksh Slothstapen Meme Coin"
            />
          </div>

          <div className={styles.colorSettingsGrid}>
            <ColorInputGroup
              label="Primary Color"
              value={config.styles?.primaryColor || '#ff6b35'}
              placeholder="#ff6b35"
              onChange={(value) => handleChange('styles.primaryColor', value)}
            />
            <ColorInputGroup
              label="Secondary Color"
              value={config.styles?.secondaryColor || '#1a1a2e'}
              placeholder="#1a1a2e"
              onChange={(value) => handleChange('styles.secondaryColor', value)}
            />
            <ColorInputGroup
              label="Accent Color"
              value={config.styles?.accentColor || '#00d4ff'}
              placeholder="#00d4ff"
              onChange={(value) => handleChange('styles.accentColor', value)}
            />
            <ColorInputGroup
              label="Text Color"
              value={config.styles?.textColor || '#ffffff'}
              placeholder="#ffffff"
              onChange={(value) => handleChange('styles.textColor', value)}
            />
            <ColorInputGroup
              label="Background Color"
              value={config.styles?.backgroundColor || '#0a0e27'}
              placeholder="#0a0e27"
              onChange={(value) => handleChange('styles.backgroundColor', value)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
