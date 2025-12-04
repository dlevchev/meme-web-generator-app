import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { DownloadGuide } from '../components/DownloadGuide';
import styles from './DownloadPage.module.css';

export const DownloadPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const buildId = searchParams.get('buildId') || 'unknown';
  const downloadUrl = searchParams.get('downloadUrl') || '/api/downloads/unknown';

  return (
    <div className={styles.page}>
      <DownloadGuide buildId={buildId} downloadUrl={downloadUrl} />
    </div>
  );
};
