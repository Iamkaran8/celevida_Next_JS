"use client";

import React from 'react';
import { Download, FileText } from 'lucide-react';
import styles from './ExportButtons.module.css';

export default function ExportButtons({ onExportCSV, onExportPDF, isExporting }) {
    return (
        <div className={styles.exportContainer}>
            <button 
                className={styles.exportButton} 
                onClick={onExportCSV}
                disabled={isExporting}
            >
                <FileText size={18} />
                <span>Export Report (CSV)</span>
            </button>
            
            <button 
                className={styles.exportButton} 
                onClick={onExportPDF}
                disabled={isExporting}
            >
                <Download size={18} />
                <span>Export Data (PDF)</span>
            </button>
        </div>
    );
}

