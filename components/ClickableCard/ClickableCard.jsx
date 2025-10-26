"use client";

import React from 'react';
import styles from './ClickableCard.module.css';
import { Download } from 'lucide-react';

export default function ClickableCard({ children, onExport, title, showDownloadIcon = true }) {
    const handleClick = (e) => {
        if (onExport) {
            e.stopPropagation();
            onExport();
        }
    };

    return (
        <div className={`${styles.clickableCard} ${onExport ? styles.hasExport : ''}`} onClick={handleClick}>
            {showDownloadIcon && onExport && (
                <div className={styles.downloadIcon}>
                    <Download size={16} />
                    <span className={styles.tooltip}>Click to download Excel</span>
                </div>
            )}
            {children}
        </div>
    );
}

