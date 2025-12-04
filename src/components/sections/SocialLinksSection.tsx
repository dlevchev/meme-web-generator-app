import React from 'react';
import { Template } from '../../types';
import { addSocialLink, removeSocialLink, updateSocialLink, updateSocialLinkFile } from '../helpers/configEditorHelpers';
import { getDefaultSocialIcon, getDefaultSocialIconUrl, isDefaultSocialLink } from '../../constants/socialIcons';
import styles from '../ConfigEditor.module.css';

interface Props {
  config: Template;
  isExpanded: boolean;
  onToggle: () => void;
  onConfigChange: (config: Template, files?: File[]) => void;
}

export const SocialLinksSection: React.FC<Props> = ({
  config,
  isExpanded,
  onToggle,
  onConfigChange,
}) => {
  const handleIconFileChange = (index: number, file: File | null) => {
    if (file) {
      const { config: updatedConfig, file: prefixedFile } = updateSocialLinkFile(config, index, file);
      onConfigChange(updatedConfig, [prefixedFile]);
    }
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
        Social Links
      </button>
      {isExpanded && (
        <div className={styles.accordionContent}>
          <div className={styles.infoBox}>
            <p>Default social links (X, Telegram, Discord) have built-in icons that cannot be modified. For custom social links, you can upload a custom icon or use text.</p>
          </div>

          {config.footer.socialLinks.map((link: any, index: number) => {
            const isDefault = isDefaultSocialLink(link.name);
            const defaultIconUrl = getDefaultSocialIconUrl(link.name);

            return (
              <div key={index} className={styles.linkCard}>
                <div className={styles.linkCardHeader}>
                  <span>
                    {link.name}
                    {isDefault && <span className={styles.defaultBadge}>Built-in</span>}
                  </span>
                  <button
                    type="button"
                    className={styles.deleteButton}
                    onClick={() => onConfigChange(removeSocialLink(config, index))}
                    title="Delete link"
                  >
                    🗑
                  </button>
                </div>

                <div className={styles.formGroup}>
                  <label>Name</label>
                  <input
                    type="text"
                    value={link.name}
                    onChange={(e) =>
                      onConfigChange(updateSocialLink(config, index, 'name', e.target.value))
                    }
                    placeholder="e.g., Twitter, Discord"
                    disabled={isDefault}
                    title={isDefault ? 'Built-in social links cannot be renamed' : ''}
                  />
                </div>

                {isDefault ? (
                  <div className={styles.formGroup}>
                    <label>Icon</label>
                    <div className={styles.defaultIconDisplay}>
                      {defaultIconUrl && (
                        <img
                          src={defaultIconUrl}
                          alt={link.name}
                          className={styles.defaultIconImage}
                          title={`${link.name} default icon`}
                        />
                      )}
                      <span className={styles.iconText}>{link.name} (default icon)</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className={styles.formGroup}>
                      <label>Icon (Text or Emoji)</label>
                      <input
                        type="text"
                        value={link.icon || ''}
                        onChange={(e) =>
                          onConfigChange(updateSocialLink(config, index, 'icon', e.target.value))
                        }
                        placeholder="e.g., 🔗 or custom text"
                        maxLength={2}
                      />
                      <small>Enter a single emoji or character to use as icon</small>
                    </div>

                    <div className={styles.formGroup}>
                      <label>Custom Icon (SVG/PNG/JPG)</label>
                      <input
                        type="file"
                        accept="image/svg+xml,image/png,image/jpeg"
                        onChange={(e) => handleIconFileChange(index, e.target.files?.[0] || null)}
                      />
                      {link.iconFile && <small>File: {link.iconFile}</small>}
                      <small>Optional: Upload a custom icon file. If both icon and file are provided, file takes priority.</small>
                    </div>
                  </>
                )}

                <div className={styles.formGroup}>
                  <label>URL</label>
                  <input
                    type="text"
                    value={link.url}
                    onChange={(e) =>
                      onConfigChange(updateSocialLink(config, index, 'url', e.target.value))
                    }
                    placeholder="e.g., https://twitter.com/..."
                  />
                </div>
              </div>
            );
          })}

          <button
            type="button"
            className={styles.addTokenButton}
            onClick={() => onConfigChange(addSocialLink(config))}
          >
            + Add Custom Social Link
          </button>
        </div>
      )}
    </div>
  );
};
