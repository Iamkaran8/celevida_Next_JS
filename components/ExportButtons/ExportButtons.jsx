"use client";

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Download, FileText } from 'lucide-react';
import styles from './ExportButtons.module.css';

export default function ExportButtons({ onExportCSV, onExportPDF, isExporting }) {
    const { user } = useSelector((state) => state.auth);

    // Safely extract role (same logic as ProtectedRoute)
    const role =
        user?.data?.data?.[0]?.role?.toLowerCase()?.trim() ||
        user?.data?.role?.toLowerCase()?.trim() ||
        user?.role?.toLowerCase()?.trim() ||
        null;

    // Check for Super Admin and Brand Team roles
    const isSuperAdmin = role === "super admin";
    const isBrandTeam = role === "brand team";

    // Show buttons for both Super Admin and Brand Team
    const showExportButtons = isSuperAdmin || isBrandTeam;

    return (
        <div className={styles.exportContainer}>
            {showExportButtons && (
                <button 
                    className={styles.exportButton} 
                    onClick={onExportCSV}
                    disabled={isExporting}
                >
                    <FileText size={18} />
                    <span>Export Report (CSV)</span>
                </button>
            )}
            
            
            {showExportButtons && (
                <button 
                    className={styles.exportButton} 
                    onClick={onExportPDF}
                    disabled={isExporting}
                >
                    <Download size={18} />
                    <span>Export Data (PDF)</span>
                </button>
            )}
        </div>
    );
}

