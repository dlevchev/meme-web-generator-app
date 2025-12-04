import React, { useState, useEffect } from 'react';
import { Template } from '../types';
import { api } from '../services/api';
import { ensureVideosStructure, ensureMemesStructure } from './helpers/configEditorHelpers';
import { MainSettingsSection } from './sections/MainSettingsSection';
import { MemeInfoSection } from './sections/MemeInfoSection';
import { TokenomicsSection } from './sections/TokenomicsSection';
import { VideosSection } from './sections/VideosSection';
import { MemesSection } from './sections/MemesSection';
import { MediaFilesSection } from './sections/MediaFilesSection';
import { NavigationLinksSection } from './sections/NavigationLinksSection';
import { SocialLinksSection } from './sections/SocialLinksSection';
import styles from './ConfigEditor.module.css';

interface Props {
  templateName: string;
  onConfigChange: (config: Template, files?: File[]) => void;
  initialConfig?: Template;
}

interface AccordionState {
  mainSettings: boolean;
  memeInfo: boolean;
  tokenomics: boolean;
  videos: boolean;
  memes: boolean;
  media: boolean;
  navLinks: boolean;
  socialLinks: boolean;
}

export const ConfigEditor: React.FC<Props> = ({ templateName, onConfigChange, initialConfig }) => {
  const [config, setConfig] = useState<Template | null>(initialConfig || null);
  const [loading, setLoading] = useState(!initialConfig);
  const [error, setError] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<AccordionState>({
    mainSettings: true,
    memeInfo: false,
    tokenomics: false,
    videos: false,
    memes: false,
    media: false,
    navLinks: false,
    socialLinks: false,
  });

  useEffect(() => {
    if (initialConfig) {
      setConfig(ensureMemesStructure(ensureVideosStructure(initialConfig)));
      setLoading(false);
      return;
    }

    const loadConfig = async () => {
      try {
        const data = await api.templates.get(templateName);
        setConfig(ensureMemesStructure(ensureVideosStructure(data)));
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadConfig();
  }, [templateName, initialConfig]);

  const handleConfigChange = (newConfig: Template, files?: File[]) => {
    setConfig(newConfig);
    onConfigChange(newConfig, files);
  };

  const toggleSection = (section: keyof AccordionState) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  if (loading) return <div>Loading template configuration...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;
  if (!config) return <div>No configuration available</div>;

  return (
    <div className={styles.container}>
      <h2>Configure Your Meme Website</h2>

      <div className={styles.form}>
        <MainSettingsSection
          config={config}
          isExpanded={expandedSections.mainSettings}
          onToggle={() => toggleSection('mainSettings')}
          onConfigChange={handleConfigChange}
        />

        <MemeInfoSection
          config={config}
          isExpanded={expandedSections.memeInfo}
          onToggle={() => toggleSection('memeInfo')}
          onConfigChange={handleConfigChange}
        />

        <TokenomicsSection
          config={config}
          isExpanded={expandedSections.tokenomics}
          onToggle={() => toggleSection('tokenomics')}
          onConfigChange={handleConfigChange}
        />

        <VideosSection
          config={config}
          isExpanded={expandedSections.videos}
          onToggle={() => toggleSection('videos')}
          onConfigChange={handleConfigChange}
        />

        <MemesSection
          config={config}
          isExpanded={expandedSections.memes}
          onToggle={() => toggleSection('memes')}
          onConfigChange={handleConfigChange}
        />

        <MediaFilesSection
          config={config}
          isExpanded={expandedSections.media}
          onToggle={() => toggleSection('media')}
          onConfigChange={handleConfigChange}
        />

        <NavigationLinksSection
          config={config}
          isExpanded={expandedSections.navLinks}
          onToggle={() => toggleSection('navLinks')}
          onConfigChange={handleConfigChange}
        />

        <SocialLinksSection
          config={config}
          isExpanded={expandedSections.socialLinks}
          onToggle={() => toggleSection('socialLinks')}
          onConfigChange={handleConfigChange}
        />
      </div>
    </div>
  );
};
