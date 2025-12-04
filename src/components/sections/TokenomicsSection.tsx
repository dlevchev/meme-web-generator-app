import React from 'react';
import { Template } from '../../types';
import { TokenCard } from './TokenCard';
import { addTokenomicsToken, removeTokenomicsToken, updateTokenomicsToken } from '../helpers/configEditorHelpers';
import styles from '../ConfigEditor.module.css';

interface Props {
  config: Template;
  isExpanded: boolean;
  onToggle: () => void;
  onConfigChange: (config: Template) => void;
}

export const TokenomicsSection: React.FC<Props> = ({
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
        Tokenomics
      </button>
      {isExpanded && (
        <div className={styles.accordionContent}>
          <div className={styles.tokenomicsContainer}>
            {config.tokenomics.tokens.map((token) => (
              <TokenCard
                key={token.id}
                token={token}
                onUpdate={(field, value) =>
                  onConfigChange(updateTokenomicsToken(config, token.id, field, value))
                }
                onRemove={() => onConfigChange(removeTokenomicsToken(config, token.id))}
              />
            ))}
          </div>

          <button
            type="button"
            className={styles.addTokenButton}
            onClick={() => onConfigChange(addTokenomicsToken(config))}
          >
            + Add Token
          </button>
        </div>
      )}
    </div>
  );
};
