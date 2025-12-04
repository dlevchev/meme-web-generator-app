import React from 'react';
import { Template, NavLink } from '../../types';
import { addNavLink, removeNavLink, updateNavLink } from '../helpers/configEditorHelpers';
import styles from '../ConfigEditor.module.css';

interface Props {
  config: Template;
  isExpanded: boolean;
  onToggle: () => void;
  onConfigChange: (config: Template) => void;
}

export const NavigationLinksSection: React.FC<Props> = ({
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
        Navigation Links
      </button>
      {isExpanded && (
        <div className={styles.accordionContent}>
          {config.header.navLinks.map((link: NavLink, index: number) => (
            <div key={index} className={styles.linkCard}>
              <div className={styles.linkCardHeader}>
                <span>Link #{index + 1}</span>
                <button
                  type="button"
                  className={styles.deleteButton}
                  onClick={() => onConfigChange(removeNavLink(config, index))}
                  title="Delete link"
                >
                  🗑
                </button>
              </div>

              <div className={styles.formGroup}>
                <label>Label</label>
                <input
                  type="text"
                  value={link.label}
                  onChange={(e) =>
                    onConfigChange(updateNavLink(config, index, 'label', e.target.value))
                  }
                  placeholder="e.g., Home"
                />
              </div>

              <div className={styles.formGroup}>
                <label>URL</label>
                <input
                  type="text"
                  value={link.href}
                  onChange={(e) =>
                    onConfigChange(updateNavLink(config, index, 'href', e.target.value))
                  }
                  placeholder="e.g., #home"
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            className={styles.addTokenButton}
            onClick={() => onConfigChange(addNavLink(config))}
          >
            + Add Navigation Link
          </button>
        </div>
      )}
    </div>
  );
};
