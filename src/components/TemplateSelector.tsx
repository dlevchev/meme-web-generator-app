import React, { useEffect, useState } from 'react';
import { TemplateInfo } from '../types';
import { api } from '../services/api';
import styles from './TemplateSelector.module.css';

interface Props {
  onSelect: (templateId: string) => void;
  selectedTemplate: string | null;
}

export const TemplateSelector: React.FC<Props> = ({ onSelect, selectedTemplate }) => {
  const [templates, setTemplates] = useState<TemplateInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTemplates = async () => {
      try {
        const data = await api.templates.list();
        setTemplates(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadTemplates();
  }, []);

  if (loading) return <div>Loading templates...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.container}>
      <h2>Select a Template</h2>

      <div className={styles.grid}>
        {templates.map((template) => (
          <div
            key={template.id}
            className={`${styles.card} ${
              selectedTemplate === template.id ? styles.selected : ''
            } ${!template.valid ? styles.disabled : ''}`}
          >
            <div className={styles.cardPreview}>
              {template.previewUrl ? (
                <div className={styles.previewPlaceholder}>
                  <span>🌐</span>
                  <p>Click to preview</p>
                </div>
              ) : (
                <div className={styles.placeholderImage}>
                  <span>🎭</span>
                </div>
              )}
            </div>

            <div className={styles.cardContent}>
              <h3>{template.name}</h3>
              <p className={styles.description}>{template.description}</p>

              <div className={styles.buttonGroup}>
                {template.previewUrl && (
                  <button
                    className={styles.previewBtn}
                    onClick={() => window.open(template.previewUrl, '_blank')}
                  >
                    Preview
                  </button>
                )}
                <button
                  className={`${styles.selectBtn} ${!template.valid ? styles.disabled : ''}`}
                  onClick={() => template.valid && onSelect(template.id)}
                  disabled={!template.valid}
                >
                  {!template.valid ? 'Invalid' : 'Select'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
