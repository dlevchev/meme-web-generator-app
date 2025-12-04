import React from 'react';
import styles from '../ConfigEditor.module.css';

interface Props {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

export const ColorInputGroup: React.FC<Props> = ({ label, value, placeholder, onChange }) => {
  return (
    <div className={styles.formGroup}>
      <label>{label}</label>
      <div className={styles.colorInputGroup}>
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};
