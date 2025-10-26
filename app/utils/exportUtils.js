import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Export data as CSV
 */
export const exportToCSV = (data, filters) => {
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `celevida_report_${timestamp}.csv`;

    // Create CSV header with filter information
    let csvContent = "Celevida Health Analytics Report\n";
    csvContent += `Generated: ${new Date().toLocaleString()}\n\n`;
    
    // Add filter information
    csvContent += "Applied Filters:\n";
    csvContent += `Cities: ${filters.cities?.length > 0 ? filters.cities.join(', ') : 'All'}\n`;
    csvContent += `Executives: ${filters.executives?.length > 0 ? filters.executives.join(', ') : 'All'}\n`;
    csvContent += `Doctors: ${filters.doctors?.length > 0 ? filters.doctors.join(', ') : 'All'}\n`;
    csvContent += `Status: ${filters.statuses?.length > 0 ? filters.statuses.join(', ') : 'All'}\n`;
    if (filters.dateRange) {
        csvContent += `Date Range: ${filters.dateRange.startDate} - ${filters.dateRange.endDate}\n`;
    }
    csvContent += "\n\n";

    // Patient Summary Statistics
    csvContent += "PATIENT SUMMARY STATISTICS\n";
    csvContent += "Metric,Count\n";
    csvContent += `Total Patients,${data.onboardedPatients || 0}\n`;
    csvContent += `Prescribed,${data.Prescribed || 0}\n`;
    csvContent += `Nurture Patients,${data.Nurture || 0}\n`;
    csvContent += `Total Doctors Participated,${data.totalDoctorParticipated || 0}\n`;
    csvContent += "\n\n";

    // Health Metrics Progress Data
    if (data.avgTableData && data.avgTableData.length > 0) {
        csvContent += "HEALTH METRICS PROGRESS\n";
        csvContent += "Parameter,Before Program,Month 1,Month 2,Month 3,Overall Average,Percentage Change\n";
        
        data.avgTableData.forEach(metric => {
            csvContent += `${metric.parameter},${metric.beforeProgramAvg || 0},${metric.month1Avg || 0},${metric.month2Avg || 0},${metric.month3Avg || 0},${metric.monthsAvg || 0},${metric.percentageChange || 0}%\n`;
        });
        csvContent += "\n\n";
    }

    // Gender Distribution
    if (data.genderCount) {
        csvContent += "GENDER DISTRIBUTION\n";
        csvContent += "Gender,Count\n";
        csvContent += `Male,${data.genderCount.male || 0}\n`;
        csvContent += `Female,${data.genderCount.female || 0}\n`;
        csvContent += `Other,${data.genderCount.other || 0}\n`;
        csvContent += "\n\n";
    }

    // Age Group Distribution
    if (data.ageGroups) {
        csvContent += "AGE GROUP DISTRIBUTION\n";
        csvContent += "Age Group,Count\n";
        Object.entries(data.ageGroups).forEach(([ageGroup, count]) => {
            csvContent += `${ageGroup},${count}\n`;
        });
        csvContent += "\n\n";
    }

    // Call Disposition
    if (data.Call_Disposition) {
        csvContent += "CALL DISPOSITION\n";
        csvContent += "Status,Count\n";
        Object.entries(data.Call_Disposition).forEach(([status, count]) => {
            csvContent += `${status},${count}\n`;
        });
        csvContent += "\n\n";
    }

    // Rating Distribution
    if (data.ratingCount) {
        csvContent += "PROGRAM RATING DISTRIBUTION\n";
        csvContent += "Rating,Count\n";
        Object.entries(data.ratingCount).forEach(([rating, count]) => {
            csvContent += `${rating},${count}\n`;
        });
        csvContent += "\n\n";
    }

    // City Distribution
    if (data.cities) {
        csvContent += "TOP CITIES\n";
        csvContent += "City,Patient Count\n";
        data.cities.forEach(city => {
            csvContent += `${city.cityname},${city.count}\n`;
        });
        csvContent += "\n\n";
    }

    // Detailed Patient List
    if (data.Feedbacks && data.Feedbacks.length > 0) {
        csvContent += "DETAILED PATIENT DATA\n";
        csvContent += "Patient Name,Patient ID,Status,Phone Number,City,Doctor Name,Gender,Age,Created Date\n";
        
        data.Feedbacks.forEach(patient => {
            csvContent += `"${patient.Last_Name || 'N/A'}",${patient.id || 'N/A'},${patient.StatusPrespcription || 'N/A'},${patient.Mobile || 'N/A'},${patient.City || 'N/A'},${patient.Doctor_Name || 'N/A'},${patient.Genders || 'N/A'},${patient.Age || 'N/A'},${patient.Created_Time ? new Date(patient.Created_Time).toLocaleDateString() : 'N/A'}\n`;
        });
    }

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

/**
 * Export dashboard as PDF
 */
export const exportToPDF = async (filters) => {
    try {
        const timestamp = new Date().toISOString().split('T')[0];
        const filename = `celevida_dashboard_${timestamp}.pdf`;

        // Create a new jsPDF instance
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        
        // Add title
        pdf.setFontSize(20);
        pdf.setTextColor(26, 37, 89);
        pdf.text('Celevida Health Analytics Dashboard', pageWidth / 2, 15, { align: 'center' });
        
        // Add generation date
        pdf.setFontSize(10);
        pdf.setTextColor(100, 100, 100);
        pdf.text(`Generated: ${new Date().toLocaleString()}`, pageWidth / 2, 22, { align: 'center' });
        
        // Add filter information
        pdf.setFontSize(9);
        let yPosition = 30;
        pdf.text('Applied Filters:', 15, yPosition);
        yPosition += 5;
        pdf.text(`Cities: ${filters.cities?.length > 0 ? filters.cities.join(', ') : 'All'}`, 15, yPosition);
        yPosition += 4;
        pdf.text(`Executives: ${filters.executives?.length > 0 ? filters.executives.join(', ') : 'All'}`, 15, yPosition);
        yPosition += 4;
        pdf.text(`Doctors: ${filters.doctors?.length > 0 ? filters.doctors.join(', ') : 'All'}`, 15, yPosition);
        yPosition += 4;
        pdf.text(`Status: ${filters.statuses?.length > 0 ? filters.statuses.join(', ') : 'All'}`, 15, yPosition);
        
        if (filters.dateRange) {
            yPosition += 4;
            pdf.text(`Date Range: ${filters.dateRange.startDate} - ${filters.dateRange.endDate}`, 15, yPosition);
        }
        
        yPosition += 10;

        // Capture all chart sections
        const sections = document.querySelectorAll('[class*="second_section"]');
        const patientContainer = document.querySelector('[class*="patient_container"]');
        
        // Capture patient status cards first
        if (patientContainer) {
            const canvas = await html2canvas(patientContainer, {
                scale: 2,
                logging: false,
                useCORS: true,
                allowTaint: true
            });
            
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = pageWidth - 30;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            
            if (yPosition + imgHeight > pageHeight - 20) {
                pdf.addPage();
                yPosition = 15;
            }
            
            pdf.addImage(imgData, 'PNG', 15, yPosition, imgWidth, imgHeight);
            yPosition += imgHeight + 10;
        }

        // Capture each chart section
        for (let i = 0; i < sections.length; i++) {
            const section = sections[i];
            
            try {
                const canvas = await html2canvas(section, {
                    scale: 2,
                    logging: false,
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: '#ffffff'
                });
                
                const imgData = canvas.toDataURL('image/png');
                const imgWidth = pageWidth - 30;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
                
                // Check if we need a new page
                if (yPosition + imgHeight > pageHeight - 20) {
                    pdf.addPage();
                    yPosition = 15;
                }
                
                pdf.addImage(imgData, 'PNG', 15, yPosition, imgWidth, imgHeight);
                yPosition += imgHeight + 10;
                
                // Add a small delay to avoid overwhelming the browser
                await new Promise(resolve => setTimeout(resolve, 100));
            } catch (error) {
                console.error('Error capturing section:', error);
            }
        }

        // Save the PDF
        pdf.save(filename);
        return true;
    } catch (error) {
        console.error('Error generating PDF:', error);
        throw error;
    }
};

