import * as XLSX from 'xlsx';

/**
 * Brand Team Export Functions with Column Exclusions
 * 
 * Exclusions based on requirements:
 * - Wellness Patients: Exclude Patient Name, Mobile Number, Email, Call Disposition, Rating, Last modified date, Tab 3(Prescribed), State
 * - Nurture Patients: Exclude Patient Name, Mobile Number, Email, Call Disposition, Rating, Last modified date, Tab 3(Nurture), State
 * - Gender: Exclude Patient Name, Mobile Number, Call Disposition, Rating
 * - Age: Exclude Patient Name, Mobile Number, Why in this group?
 * - Patient Segmentation: Exclude Not Prescribed, Prescription Rate
 * - Celevida Onboarded Call Coordination Trend: Exclude Patient Name, Mobile Number, Rating, Executive
 * - City wise performance: Exclude Patient Name, Mobile Number, Rating
 * - Feedback: Exclude Patient Name
 */

/**
 * Export Total Patients Screened (Brand Team) - Shows SUM
 */
export const exportBrandTotalPatients = (data, filters, title) => {
    const timestamp = new Date().toISOString().split('T')[0];
    const baseFilename = title
        ? title.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')
        : 'total_patients_screened';
    const filename = `${baseFilename}_${timestamp}.xlsx`;

    const wb = XLSX.utils.book_new();

    // Calculate SUM of all patients
    const totalSum = data.Feedbacks?.length || 0;

    // Summary - Show SUM instead of count
    const summaryData = [
        [title || 'Total Patients Screened Report'],
        ['Generated:', new Date().toLocaleString()],
        [],
        ['Applied Filters:'],
        ['Cities:', filters.cities?.length > 0 ? filters.cities.join(', ') : 'All'],
        ['Executives:', filters.executives?.length > 0 ? filters.executives.join(', ') : 'All'],
        ['Doctors:', filters.doctors?.length > 0 ? filters.doctors.join(', ') : 'All'],
        ['Status:', filters.statuses?.length > 0 ? filters.statuses.join(', ') : 'All'],
        ['Date Range:', filters.dateRange ? `${filters.dateRange.startDate} - ${filters.dateRange.endDate}` : 'All'],
        [],
        ['Total Patients Screened:', totalSum],
        []
    ];

    const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, wsSummary, 'Summary');

    // Patients list (all columns visible for this section)
    if (data.Feedbacks && data.Feedbacks.length > 0) {
        const patientsList = data.Feedbacks.map((p, index) => ({
            'Sr No': index + 1,
            'Patient ID': p.id || 'N/A',
            'Age': p.Age || 'N/A',
            'Gender': p.Genders || 'N/A',
            'Status': p.StatusPrespcription || 'N/A',
            'City': p.City || 'N/A',
            'Doctor Name': p.Doctor_Name || 'N/A',
            'Field Executive': p.Field_Executive || 'N/A',
            'Created Date': p.Created_Time ? new Date(p.Created_Time).toLocaleString() : 'N/A'
        }));

        const wsPatients = XLSX.utils.json_to_sheet(patientsList);
        XLSX.utils.book_append_sheet(wb, wsPatients, 'Patients List');
    }

    XLSX.writeFile(wb, filename);
};

/**
 * Export Wellness Patients (Brand Team)
 * Exclude: Patient Name, Mobile Number, Email, Call Disposition, Rating, Last modified date, State
 */
export const exportBrandWellnessPatients = (data, filters, title) => {
    const timestamp = new Date().toISOString().split('T')[0];
    const baseFilename = title
        ? title.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')
        : 'wellness_patients';
    const filename = `${baseFilename}_${timestamp}.xlsx`;

    const wb = XLSX.utils.book_new();

    // Calculate correct count
    const wellnessCount = data.Feedbacks?.filter(p => p.StatusPrespcription === 'Celevida_Onboarded').length || 0;

    // Summary - Corrected count
    const summaryData = [
        [title || 'Wellness Patients Report'],
        ['Generated:', new Date().toLocaleString()],
        [],
        ['Applied Filters:'],
        ['Cities:', filters.cities?.length > 0 ? filters.cities.join(', ') : 'All'],
        ['Executives:', filters.executives?.length > 0 ? filters.executives.join(', ') : 'All'],
        ['Doctors:', filters.doctors?.length > 0 ? filters.doctors.join(', ') : 'All'],
        [],
        ['Total Wellness Patients:', wellnessCount],
        []
    ];

    const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, wsSummary, 'Summary');

    // Wellness Patients - EXCLUDED columns: Patient Name, Mobile, Email, Call Disposition, Rating, Last modified, State
    // Tab renamed to "Wellness Patients"
    if (data.Feedbacks && data.Feedbacks.length > 0) {
        const wellnessPatients = data.Feedbacks
            .filter(p => p.StatusPrespcription === 'Celevida_Onboarded')
            .map((p, index) => ({
                'Sr No': index + 1,
                'Patient ID': p.id || 'N/A',
                // 'Patient Name': EXCLUDED
                'Age': p.Age || 'N/A',
                'Gender': p.Genders || 'N/A',
                'City': p.City || 'N/A',
                // 'State': EXCLUDED
                'Doctor Name': p.Doctor_Name || 'N/A',
                'Field Executive': p.Field_Executive || 'N/A',
                // 'Mobile': EXCLUDED
                // 'Email': EXCLUDED
                // 'Call Disposition': EXCLUDED
                // 'Rating': EXCLUDED
                'Created Date': p.Created_Time ? new Date(p.Created_Time).toLocaleDateString() : 'N/A'
                // 'Last Modified': EXCLUDED
            }));

        if (wellnessPatients.length > 0) {
            const wsWellness = XLSX.utils.json_to_sheet(wellnessPatients);
            XLSX.utils.book_append_sheet(wb, wsWellness, 'Wellness Patients');
        }
    }

    XLSX.writeFile(wb, filename);
};

/**
 * Export Nurture Patients (Brand Team)
 * Exclude: Patient Name, Mobile Number, Email, Call Disposition, Rating, Last modified date, State
 */
export const exportBrandNurturePatients = (data, filters, title) => {
    const timestamp = new Date().toISOString().split('T')[0];
    const baseFilename = title
        ? title.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')
        : 'nurture_patients';
    const filename = `${baseFilename}_${timestamp}.xlsx`;

    const wb = XLSX.utils.book_new();

    // Calculate correct count
    const nurtureCount = data.Feedbacks?.filter(p => p.StatusPrespcription === 'Celevida_Nurture').length || 0;

    // Summary - Corrected count
    const summaryData = [
        [title || 'Nurture Patients Report'],
        ['Generated:', new Date().toLocaleString()],
        [],
        ['Applied Filters:'],
        ['Cities:', filters.cities?.length > 0 ? filters.cities.join(', ') : 'All'],
        ['Executives:', filters.executives?.length > 0 ? filters.executives.join(', ') : 'All'],
        ['Doctors:', filters.doctors?.length > 0 ? filters.doctors.join(', ') : 'All'],
        [],
        ['Total Nurture Patients:', nurtureCount],
        []
    ];

    const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, wsSummary, 'Summary');

    // Nurture Patients - EXCLUDED columns: Patient Name, Mobile, Email, Call Disposition, Rating, Last modified, State
    // Tab renamed to "Nurture Patients"
    if (data.Feedbacks && data.Feedbacks.length > 0) {
        const nurturePatients = data.Feedbacks
            .filter(p => p.StatusPrespcription === 'Celevida_Nurture')
            .map((p, index) => ({
                'Sr No': index + 1,
                'Patient ID': p.id || 'N/A',
                // 'Patient Name': EXCLUDED
                'Age': p.Age || 'N/A',
                'Gender': p.Genders || 'N/A',
                'City': p.City || 'N/A',
                // 'State': EXCLUDED
                'Doctor Name': p.Doctor_Name || 'N/A',
                'Field Executive': p.Field_Executive || 'N/A',
                // 'Mobile': EXCLUDED
                // 'Email': EXCLUDED
                // 'Call Disposition': EXCLUDED
                // 'Rating': EXCLUDED
                'Created Date': p.Created_Time ? new Date(p.Created_Time).toLocaleDateString() : 'N/A'
                // 'Last Modified': EXCLUDED
            }));

        if (nurturePatients.length > 0) {
            const wsNurture = XLSX.utils.json_to_sheet(nurturePatients);
            XLSX.utils.book_append_sheet(wb, wsNurture, 'Nurture Patients');
        }
    }

    XLSX.writeFile(wb, filename);
};

/**
 * Export Total Clinics/HCPs participated (Brand Team) - Rectified counts
 */
export const exportBrandDoctorsList = (data, filters, title) => {
    const timestamp = new Date().toISOString().split('T')[0];
    const baseFilename = title
        ? title.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')
        : 'total_clinics_hcps';
    const filename = `${baseFilename}_${timestamp}.xlsx`;

    // Get unique doctors from the data
    const doctorsSet = new Set();
    const doctorDetails = [];

    if (data.Feedbacks && data.Feedbacks.length > 0) {
        data.Feedbacks.forEach(patient => {
            if (patient.Doctor_Name && !doctorsSet.has(patient.Doctor_Name)) {
                doctorsSet.add(patient.Doctor_Name);
                doctorDetails.push({
                    'Doctor Name': patient.Doctor_Name,
                    'City': patient.City || 'N/A',
                    'Patients Enrolled': data.Feedbacks.filter(p => p.Doctor_Name === patient.Doctor_Name).length
                });
            }
        });
    }

    // Sort by patients enrolled (descending)
    doctorDetails.sort((a, b) => b['Patients Enrolled'] - a['Patients Enrolled']);

    // Create workbook
    const wb = XLSX.utils.book_new();

    // Rectified counts
    const totalDoctorsCount = doctorDetails.length;
    const totalPatientsCount = data.Feedbacks?.length || 0;

    // Summary sheet - Rectified Total Doctor and Total Patient
    const summaryData = [
        [title || 'Total Clinics/HCPs Participated Report'],
        ['Generated:', new Date().toLocaleString()],
        [],
        ['Applied Filters:'],
        ['Cities:', filters.cities?.length > 0 ? filters.cities.join(', ') : 'All'],
        ['Executives:', filters.executives?.length > 0 ? filters.executives.join(', ') : 'All'],
        ['Doctors:', filters.doctors?.length > 0 ? filters.doctors.join(', ') : 'All'],
        [],
        ['Total Doctors:', totalDoctorsCount],
        ['Total Patients:', totalPatientsCount],
        []
    ];

    const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, wsSummary, 'Summary');

    // Doctors list sheet
    const wsDoctors = XLSX.utils.json_to_sheet(doctorDetails);
    XLSX.utils.book_append_sheet(wb, wsDoctors, 'Doctors List');

    // Download
    XLSX.writeFile(wb, filename);
};

/**
 * Export Patient Segmentation (Brand Team)
 * Dashboard Header and Download header matching
 * Column E "Not Prescribed" removed
 */
export const exportBrandPatientSegmentation = (data, filters, title) => {
    const timestamp = new Date().toISOString().split('T')[0];
    const baseFilename = title
        ? title.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')
        : 'patient_status_funnel';
    const filename = `${baseFilename}_${timestamp}.xlsx`;

    const wb = XLSX.utils.book_new();

    // Calculate correct totals
    const totalPatients = data.Feedbacks?.length || 0;
    const wellnessCount = data.Feedbacks?.filter(p => p.StatusPrespcription === 'Celevida_Onboarded').length || 0;
    const nurtureCount = data.Feedbacks?.filter(p => p.StatusPrespcription === 'Celevida_Nurture').length || 0;
    const notUpdatedCount = totalPatients - (wellnessCount + nurtureCount);

    // Segmentation data - added "Not Updated"
    const segmentationData = [
        ['Patient Status Funnel'],
        ['Generated:', new Date().toLocaleString()],
        [],
        ['Segment', 'Count', 'Percentage'],
        ['Wellness Patients', wellnessCount, `${totalPatients > 0 ? ((wellnessCount / totalPatients) * 100).toFixed(2) : 0}%`],
        ['Nurture Patients', nurtureCount, `${totalPatients > 0 ? ((nurtureCount / totalPatients) * 100).toFixed(2) : 0}%`],
        ['Not Updated', notUpdatedCount, `${totalPatients > 0 ? ((notUpdatedCount / totalPatients) * 100).toFixed(2) : 0}%`],
        [],
        ['Total', totalPatients, '100%']
    ];

    const ws = XLSX.utils.aoa_to_sheet(segmentationData);
    XLSX.utils.book_append_sheet(wb, ws, 'Patient Status Funnel');

    XLSX.writeFile(wb, filename);
};

/**
 * Export Gender Distribution (Brand Team)
 * Exclude: Patient Name, Mobile Number, Call Disposition, Rating
 */
export const exportBrandGenderData = (data, filters, title) => {
    const timestamp = new Date().toISOString().split('T')[0];
    const baseFilename = title
        ? title.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')
        : 'gender_distribution';
    const filename = `${baseFilename}_${timestamp}.xlsx`;

    const wb = XLSX.utils.book_new();

    // Calculate actual total from gender counts
    const totalPatients = (data.genderCount?.male || 0) + (data.genderCount?.female || 0) + (data.genderCount?.other || 0);

    // Summary
    const genderData = [
        [title || 'Gender Distribution Report'],
        ['Generated:', new Date().toLocaleString()],
        [],
        ['Total Patients:', totalPatients],
        [],
        ['Gender', 'Count', 'Percentage'],
        ['Male', data.genderCount?.male || 0, `${((data.genderCount?.male || 0) / totalPatients * 100).toFixed(2)}%`],
        ['Female', data.genderCount?.female || 0, `${((data.genderCount?.female || 0) / totalPatients * 100).toFixed(2)}%`],
        ['Other', data.genderCount?.other || 0, `${((data.genderCount?.other || 0) / totalPatients * 100).toFixed(2)}%`],
        [],
        ['Total', totalPatients, '100%']
    ];

    const ws = XLSX.utils.aoa_to_sheet(genderData);
    XLSX.utils.book_append_sheet(wb, ws, 'Summary');

    // Detailed patient list for EACH gender - EXCLUDED: Patient Name, Mobile, Call Disposition, Rating
    if (data.Feedbacks && data.Feedbacks.length > 0) {
        const genders = ['male', 'female', 'other'];

        genders.forEach(gender => {
            const genderPatients = data.Feedbacks
                .filter(p => (p.Genders || '').toLowerCase() === gender)
                .map((p, index) => ({
                    'Sr No': index + 1,
                    // 'Patient Name': EXCLUDED
                    'Gender': p.Genders || 'N/A',
                    'Age': p.Age || 'N/A',
                    'City': p.City || 'N/A',
                    'Status': p.StatusPrespcription || 'N/A',
                    'Doctor': p.Doctor_Name || 'N/A',
                    'Field Executive': p.Field_Executive || 'N/A',
                    // 'Mobile': EXCLUDED
                    // 'Rating': EXCLUDED
                    // 'Call Disposition': EXCLUDED
                    'Created Date': p.Created_Time ? new Date(p.Created_Time).toLocaleDateString() : 'N/A'
                }));

            if (genderPatients.length > 0) {
                const wsGender = XLSX.utils.json_to_sheet(genderPatients);
                const sheetName = gender.charAt(0).toUpperCase() + gender.slice(1);
                XLSX.utils.book_append_sheet(wb, wsGender, `${sheetName} (${genderPatients.length})`);
            }
        });
    }

    XLSX.writeFile(wb, filename);
};

/**
 * Export Age Group Distribution (Brand Team)
 * Exclude: Patient Name, Mobile Number, Why in this group?
 */
export const exportBrandAgeGroupData = (data, filters, title) => {
    const timestamp = new Date().toISOString().split('T')[0];
    const baseFilename = title
        ? title.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')
        : 'age_group_distribution';
    const filename = `${baseFilename}_${timestamp}.xlsx`;

    const wb = XLSX.utils.book_new();

    // Summary with age distribution
    const summaryData = [
        [title || 'Age Group Distribution Report'],
        ['Generated:', new Date().toLocaleString()],
        [],
        ['Total Patients:', data.totalPatients || 0],
        [],
        ['Age Group', 'Patient Count', 'Percentage']
    ];

    Object.entries(data.ageGroups || {}).forEach(([ageGroup, count]) => {
        summaryData.push([ageGroup, count, `${(count / data.totalPatients * 100).toFixed(2)}%`]);
    });

    const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, wsSummary, 'Summary');

    // Create detailed sheet for EACH age group - EXCLUDED: Patient Name, Mobile, Why in this group?
    if (data.Feedbacks && data.Feedbacks.length > 0) {
        const ageGroups = {
            '0-18': { min: 0, max: 18 },
            '19-25': { min: 19, max: 25 },
            '26-35': { min: 26, max: 35 },
            '36-45': { min: 36, max: 45 },
            '46-60': { min: 46, max: 60 },
            '60+': { min: 61, max: 999 }
        };

        Object.entries(ageGroups).forEach(([groupName, range]) => {
            const patientsInGroup = data.Feedbacks
                .filter(p => {
                    const age = parseInt(p.Age);
                    return !isNaN(age) && age >= range.min && age <= range.max;
                })
                .map((p, index) => ({
                    'Sr No': index + 1,
                    // 'Patient Name': EXCLUDED
                    'Exact Age': p.Age || 'N/A',
                    'Age Group': groupName,
                    // 'Why in this group?': EXCLUDED
                    'Gender': p.Genders || 'N/A',
                    'City': p.City || 'N/A',
                    'State': p.State || 'N/A',
                    'Status': p.StatusPrespcription || 'N/A',
                    'Doctor': p.Doctor_Name || 'N/A',
                    // 'Mobile': EXCLUDED
                    'Created Date': p.Created_Time ? new Date(p.Created_Time).toLocaleDateString() : 'N/A'
                }))
                .sort((a, b) => parseInt(a['Exact Age']) - parseInt(b['Exact Age']));

            if (patientsInGroup.length > 0) {
                const ws = XLSX.utils.json_to_sheet(patientsInGroup);
                XLSX.utils.book_append_sheet(wb, ws, `${groupName} (${patientsInGroup.length})`);
            }
        });
    }

    XLSX.writeFile(wb, filename);
};

/**
 * Export Patient Status Funnel (Brand Team)
 * Rectified Total, Remove Not Prescribed
 */
export const exportBrandPatientFunnel = (data, filters, title) => {
    const timestamp = new Date().toISOString().split('T')[0];
    const baseFilename = title
        ? title.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')
        : 'patient_status_funnel';
    const filename = `${baseFilename}_${timestamp}.xlsx`;

    const wb = XLSX.utils.book_new();

    // Calculate correct totals
    const totalPatients = data.Feedbacks?.length || 0;
    const wellnessCount = data.Feedbacks?.filter(p => p.StatusPrespcription === 'Celevida_Onboarded').length || 0;
    const nurtureCount = data.Feedbacks?.filter(p => p.StatusPrespcription === 'Celevida_Nurture').length || 0;
    const notUpdatedCount = totalPatients - (wellnessCount + nurtureCount);

    // Funnel data - Rectified total, added "Not Updated"
    const funnelData = [
        [title || 'Patient Status Funnel Report'],
        ['Generated:', new Date().toLocaleString()],
        [],
        ['Stage', 'Count'],
        ['Total Patients Screened', totalPatients],
        ['Wellness Patients', wellnessCount],
        ['Nurture Patients', nurtureCount],
        ['Not Updated', notUpdatedCount],
    ];

    const ws = XLSX.utils.aoa_to_sheet(funnelData);
    XLSX.utils.book_append_sheet(wb, ws, 'Funnel Data');

    XLSX.writeFile(wb, filename);
};

/**
 * Export Call Coordination Trend (Brand Team)
 * Rectified Total Patients, Executive replaced by VHCs who called
 * Exclude: Patient Name, Mobile Number, Rating, Executive
 */
export const exportBrandCallDisposition = (data, filters, title) => {
    const timestamp = new Date().toISOString().split('T')[0];
    const baseFilename = title
        ? title.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')
        : 'call_coordination_trend';
    const filename = `${baseFilename}_${timestamp}.xlsx`;

    const wb = XLSX.utils.book_new();

    // Calculate rectified total patients
    const totalPatients = data.Feedbacks?.length || 0;

    // Summary - Rectified Total Patients
    const summaryData = [
        [title || 'Call Coordination Trend Report'],
        ['Generated:', new Date().toLocaleString()],
        [],
        ['Total Patients:', totalPatients],
        [],
        ['Call Status', 'Count', 'Percentage'],
    ];

    const totalCalls = Object.values(data.Call_Disposition || {}).reduce((sum, count) => sum + count, 0);
    Object.entries(data.Call_Disposition || {}).forEach(([status, count]) => {
        const percentage = totalCalls > 0 ? ((count / totalCalls) * 100).toFixed(2) : 0;
        summaryData.push([status, count, `${percentage}%`]);
    });

    const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, wsSummary, 'Summary');

    // Patient list by disposition - EXCLUDED: Patient Name, Mobile, Rating, Executive
    // "VHCs who called" replaces "Executive"
    if (data.Feedbacks && data.Feedbacks.length > 0) {
        Object.entries(data.Call_Disposition || {}).forEach(([status, count]) => {
            const patientsList = data.Feedbacks
                .filter(p => p.Call_Disposition === status)
                .map((p, index) => ({
                    'Sr No': index + 1,
                    // 'Patient Name': EXCLUDED
                    'Call Status': p.Call_Disposition || 'N/A',
                    'Patient Status': p.StatusPrespcription || 'N/A',
                    'City': p.City || 'N/A',
                    'Doctor': p.Doctor_Name || 'N/A',
                    'VHCs who called': p.Owner.name || 'N/A', // Replaced "Executive" with "VHCs who called"
                    // 'Mobile': EXCLUDED
                    // 'Rating': EXCLUDED
                    'Call Date': p.Created_Time ? new Date(p.Created_Time).toLocaleDateString() : 'N/A'
                }));

            if (patientsList.length > 0) {
                const ws = XLSX.utils.json_to_sheet(patientsList);
                XLSX.utils.book_append_sheet(wb, ws, `${status} (${count})`);
            }
        });
    }

    XLSX.writeFile(wb, filename);
};

/**
 * Export Top Cities (Brand Team)
 * Rectified % in Summary, "Total Patients" renamed to "Total HCPs Participated"
 * Exclude: Patient Name, Mobile Number, Rating
 */
export const exportBrandTopCities = (data, filters, title) => {
    const timestamp = new Date().toISOString().split('T')[0];
    const baseFilename = title
        ? title.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')
        : 'city_wise_performance';
    const filename = `${baseFilename}_${timestamp}.xlsx`;

    const wb = XLSX.utils.book_new();

    // Calculate total for percentage
    const totalPatientsAcrossCities = (data.cities || []).reduce((sum, city) => sum + (city.count || 0), 0);

    // Summary - Rectified %, renamed "Total Patients" to "Total HCPs Participated"
    const summaryData = [
        [title || 'City Wise Performance Report'],
        ['Generated:', new Date().toLocaleString()],
        [],
        ['City', 'Patient Count', 'Percentage', 'Total HCPs Participated'],
    ];

    (data.cities || []).forEach(city => {
        const percentage = totalPatientsAcrossCities > 0 ? ((city.count / totalPatientsAcrossCities) * 100).toFixed(2) : 0;
        summaryData.push([city.cityname, city.count, `${percentage}%`, city.totalClinics || 0]);
    });

    const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, wsSummary, 'Summary');

    // Patient list by city - EXCLUDED: Patient Name, Mobile, Rating
    if (data.Feedbacks && data.Feedbacks.length > 0) {
        (data.cities || []).forEach(city => {
            const cityPatients = data.Feedbacks
                .filter(p => p.City === city.cityname)
                .map((p, index) => ({
                    'Sr No': index + 1,
                    // 'Patient Name': EXCLUDED
                    'City': p.City || 'N/A',
                    'Status': p.StatusPrespcription || 'N/A',
                    'Doctor': p.Doctor_Name || 'N/A',
                    'Field Executive': p.Field_Executive || 'N/A',
                    // 'Mobile': EXCLUDED
                    // 'Rating': EXCLUDED
                    'Created Date': p.Created_Time ? new Date(p.Created_Time).toLocaleDateString() : 'N/A'
                }));

            if (cityPatients.length > 0) {
                const ws = XLSX.utils.json_to_sheet(cityPatients);
                const sheetName = city.cityname.substring(0, 30); // Excel sheet name limit
                XLSX.utils.book_append_sheet(wb, ws, `${sheetName} (${city.count})`);
            }
        });
    }

    XLSX.writeFile(wb, filename);
};

/**
 * Export Feedback (Brand Team)
 * Patient Name can be anonymous
 */
export const exportBrandFeedback = (data, filters, title) => {
    const timestamp = new Date().toISOString().split('T')[0];
    const baseFilename = title
        ? title.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')
        : 'feedback';
    const filename = `${baseFilename}_${timestamp}.xlsx`;

    const wb = XLSX.utils.book_new();

    // Summary
    const summaryData = [
        [title || 'Feedback Report'],
        ['Generated:', new Date().toLocaleString()],
        [],
        ['Total Feedback Entries:', data.Feedbacks?.length || 0],
        []
    ];

    const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, wsSummary, 'Summary');

    // Feedback list - Patient Name shown as "Anonymous"
    if (data.Feedbacks && data.Feedbacks.length > 0) {
        const feedbackList = data.Feedbacks.map((p, index) => ({
            'Sr No': index + 1,
            'Patient Name': 'Anonymous', // Shown as Anonymous
            'Rating': p.Rating || 'N/A',
            'Feedback': p.Feedback || 'N/A',
            'Status': p.StatusPrespcription || 'N/A',
            'City': p.City || 'N/A',
            'Doctor': p.Doctor_Name || 'N/A',
            'Field Executive': p.Field_Executive || 'N/A',
            'Date': p.Created_Time ? new Date(p.Created_Time).toLocaleDateString() : 'N/A'
        }));

        const wsFeedback = XLSX.utils.json_to_sheet(feedbackList);
        XLSX.utils.book_append_sheet(wb, wsFeedback, 'Feedback List');
    }

    XLSX.writeFile(wb, filename);
};

/**
 * Export All Charts Data (Brand Team) - No exclusions
 */
export const exportBrandHealthMetric = (metricName, chartData, data, title) => {
    const timestamp = new Date().toISOString().split('T')[0];
    const baseFilename = title
        ? title.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')
        : metricName.toLowerCase().replace(/\s+/g, '_');
    const filename = `${baseFilename}_${timestamp}.xlsx`;

    const wb = XLSX.utils.book_new();

    // Find the metric in avgTableData
    const metricInfo = data.avgTableData?.find(m =>
        m.parameter.toLowerCase().includes(metricName.toLowerCase()) ||
        metricName.toLowerCase().includes(m.parameter.toLowerCase())
    );

    // Summary
    const summaryData = [
        [title || `${metricName} Progress Report`],
        ['Generated:', new Date().toLocaleString()],
        [],
        ['Metric', 'Value'],
        ['Before Program Average', metricInfo?.beforeProgramAvg || 0],
        ['Month 1 Average', metricInfo?.month1Avg || 0],
        ['Month 2 Average', metricInfo?.month2Avg || 0],
        ['Month 3 Average', metricInfo?.month3Avg || 0],
        ['Overall Average', metricInfo?.monthsAvg || 0],
        ['Percentage Change', `${metricInfo?.percentageChange || 0}%`],
        []
    ];

    const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, wsSummary, 'Summary');

    // Chart data
    if (chartData && chartData.data) {
        const wsChart = XLSX.utils.json_to_sheet(chartData.data);
        XLSX.utils.book_append_sheet(wb, wsChart, 'Chart Data');
    }

    XLSX.writeFile(wb, filename);
};

/**
 * Export Doctor Segmentation (Brand Team) - No exclusions
 */
export const exportBrandDoctorSegmentation = (data, filters, title) => {
    const timestamp = new Date().toISOString().split('T')[0];
    const baseFilename = title
        ? title.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')
        : 'patient_segmentation';
    const filename = `${baseFilename}_${timestamp}.xlsx`;

    const wb = XLSX.utils.book_new();

    // Get unique doctors and their patient counts
    const doctorStats = {};
    if (data.Feedbacks && data.Feedbacks.length > 0) {
        data.Feedbacks.forEach(patient => {
            const doctorName = patient.Doctor_Name || 'Unknown';
            if (!doctorStats[doctorName]) {
                doctorStats[doctorName] = {
                    total: 0,
                    prescribed: 0,
                    nurture: 0,
                    other: 0
                };
            }
            doctorStats[doctorName].total++;
            if (patient.StatusPrespcription === 'Celevida_Onboarded') {
                doctorStats[doctorName].prescribed++;
            } else if (patient.StatusPrespcription === 'Celevida_Nurture') {
                doctorStats[doctorName].nurture++;
            } else {
                doctorStats[doctorName].other++;
            }
        });
    }

    // Summary
    const summaryData = [
        [title || 'Patient Segmentation Report'],
        ['Generated:', new Date().toLocaleString()],
        [],
        ['Doctor Name', 'Total Patients', 'Wellness', 'Nurture', 'Others', 'Prescription Rate']
    ];

    Object.entries(doctorStats).forEach(([doctor, stats]) => {
        const prescriptionRate = stats.total > 0 ? ((stats.prescribed / stats.total) * 100).toFixed(2) : 0;
        summaryData.push([
            doctor,
            stats.total,
            stats.prescribed,
            stats.nurture,
            stats.other,
            `${prescriptionRate}%`
        ]);
    });

    const ws = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, ws, 'Doctor Segmentation');

    XLSX.writeFile(wb, filename);
};

/**
 * Export Brand Team Data to CSV (without Patient Name and Phone Number)
 */
export const exportBrandToCSV = (data, filters) => {
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `celevida_brand_report_${timestamp}.csv`;

    // Create CSV header with filter information
    let csvContent = "Celevida Health Analytics Report (Brand Team)\n";
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
    const totalPatients = data.Feedbacks?.length || 0;
    const wellnessCount = data.Feedbacks?.filter(p => p.StatusPrespcription === 'Celevida_Onboarded').length || 0;
    const nurtureCount = data.Feedbacks?.filter(p => p.StatusPrespcription === 'Celevida_Nurture').length || 0;
    const notUpdatedCount = totalPatients - (wellnessCount + nurtureCount);

    csvContent += `Total Patients,${totalPatients}\n`;
    csvContent += `Wellness Patients,${wellnessCount}\n`;
    csvContent += `Nurture Patients,${nurtureCount}\n`;
    csvContent += `Not Updated,${notUpdatedCount}\n`;
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

    // Detailed Patient List - EXCLUDED: Patient Name, Phone Number
    if (data.Feedbacks && data.Feedbacks.length > 0) {
        csvContent += "DETAILED PATIENT DATA\n";
        csvContent += "Patient ID,Status,City,Doctor Name,Gender,Age,Field Executive,Created Date\n";

        data.Feedbacks.forEach(patient => {
            csvContent += `${patient.id || 'N/A'},${patient.StatusPrespcription || 'N/A'},${patient.City || 'N/A'},${patient.Doctor_Name || 'N/A'},${patient.Genders || 'N/A'},${patient.Age || 'N/A'},${patient.Field_Executive || 'N/A'},${patient.Created_Time ? new Date(patient.Created_Time).toLocaleDateString() : 'N/A'}\n`;
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

