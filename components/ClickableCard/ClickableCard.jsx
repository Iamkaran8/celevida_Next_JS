"use client";

import React from 'react';
import styles from './ClickableCard.module.css';
import { Download } from 'lucide-react';

export default function ClickableCard({ children, onExport, title, showDownloadIcon = true }) {
    const handleDownloadClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (onExport) {
            onExport();
        }
    };

    return (
        <div className={`${styles.clickableCard} ${onExport ? styles.hasExport : ''}`}>
            {showDownloadIcon && onExport && (
                <button
                    className={styles.downloadIcon}
                    onClick={handleDownloadClick}
                    aria-label="Download Excel"
                    type="button"
                >
                    <Download size={16} />
                    <span className={styles.tooltip}>Click to download Excel</span>
                </button>
            )}
            {children}
        </div>
    );
}

