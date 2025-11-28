
import * as XLSX from 'xlsx';

/**
 * Export Total Doctors Participated Data
 */
export const exportDoctorsList = (data, filters, title) => {
    const timestamp = new Date().toISOString().split('T')[0];
    const baseFilename = title
        ? title.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')
        : 'doctors_list';
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

    // Summary sheet
    const summaryData = [
        [title || 'Total Doctors Participated Report'],
        ['Generated:', new Date().toLocaleString()],
        [],
        ['Applied Filters:'],
        ['Cities:', filters.cities?.length > 0 ? filters.cities.join(', ') : 'All'],
        ['Executives:', filters.executives?.length > 0 ? filters.executives.join(', ') : 'All'],
        ['Doctors:', filters.doctors?.length > 0 ? filters.doctors.join(', ') : 'All'],
        ['Status:', filters.statuses?.length > 0 ? filters.statuses.join(', ') : 'All'],
        ['Date Range:', filters.dateRange ? `${filters.dateRange.startDate} - ${filters.dateRange.endDate} ` : 'All'],
        [],
        ['Total Doctors:', data.totalDoctorParticipated || doctorDetails.length],
        ['Total Patients:', data.onboardedPatients || 0],
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
 * Export Total Patients Data with full patient details
 */
export const exportPatientsList = (data, filters, title) => {
    const timestamp = new Date().toISOString().split('T')[0];
    const baseFilename = title
        ? title.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')
        : 'total_patients_detailed';
    const filename = `${baseFilename}_${timestamp}.xlsx`;

    const wb = XLSX.utils.book_new();

    // Summary
    const summaryData = [
        [title || 'Total Patients Detailed Report'],
        ['Generated:', new Date().toLocaleString()],
        [],
        ['Applied Filters:'],
        ['Cities:', filters.cities?.length > 0 ? filters.cities.join(', ') : 'All'],
        ['Executives:', filters.executives?.length > 0 ? filters.executives.join(', ') : 'All'],
        ['Doctors:', filters.doctors?.length > 0 ? filters.doctors.join(', ') : 'All'],
        ['Status:', filters.statuses?.length > 0 ? filters.statuses.join(', ') : 'All'],
        [],
        ['Total Patients:', data.onboardedPatients || 0],
        ['Prescribed:', data.Prescribed || 0],
        ['Nurture:', data.Nurture || 0],
        []
    ];

    const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, wsSummary, 'Summary');

    // ALL Patients - detailed list with ALL information
    if (data.Feedbacks && data.Feedbacks.length > 0) {
        const allPatientsList = data.Feedbacks.map((p, index) => ({
            'Sr No': index + 1,
            'Patient ID': p.id || 'N/A',
            'Patient Name': p.Last_Name || 'N/A',
            'Age': p.Age || 'N/A',
            'Gender': p.Genders || 'N/A',
            'Status': p.StatusPrespcription || 'N/A',
            'City': p.City || 'N/A',
            'State': p.State || 'N/A',
            'Doctor Name': p.Doctor_Name || 'N/A',
            'Field Executive': p.Field_Executive || 'N/A',
            'Mobile': p.Mobile || 'N/A',
            'Email': p.Email || 'N/A',
            'Call Disposition': p.Call_Disposition || 'N/A',
            'Rating': p.Rating || 'N/A',
            'Created Date': p.Created_Time ? new Date(p.Created_Time).toLocaleString() : 'N/A',
            'Last Modified': p.Modified_Time ? new Date(p.Modified_Time).toLocaleString() : 'N/A'
        }));

        const wsAllPatients = XLSX.utils.json_to_sheet(allPatientsList);
        XLSX.utils.book_append_sheet(wb, wsAllPatients, 'All Patients Details');

        // Prescribed Patients - separate sheet
        const prescribedPatients = data.Feedbacks
            .filter(p => p.StatusPrespcription === 'Celevida_Onboarded')
            .map((p, index) => ({
                'Sr No': index + 1,
                'Patient Name': p.Last_Name || 'N/A',
                'Age': p.Age || 'N/A',
                'Gender': p.Genders || 'N/A',
                'City': p.City || 'N/A',
                'Doctor': p.Doctor_Name || 'N/A',
                'Mobile': p.Mobile || 'N/A',
                'Rating': p.Rating || 'N/A',
                'Created Date': p.Created_Time ? new Date(p.Created_Time).toLocaleDateString() : 'N/A'
            }));

        if (prescribedPatients.length > 0) {
            const wsPrescribed = XLSX.utils.json_to_sheet(prescribedPatients);
            XLSX.utils.book_append_sheet(wb, wsPrescribed, `Prescribed(${prescribedPatients.length})`);
        }

        // Nurture Patients - separate sheet
        const nurturePatients = data.Feedbacks
            .filter(p => p.StatusPrespcription === 'Celevida_Nurture')
            .map((p, index) => ({
                'Sr No': index + 1,
                'Patient Name': p.Last_Name || 'N/A',
                'Age': p.Age || 'N/A',
                'Gender': p.Genders || 'N/A',
                'City': p.City || 'N/A',
                'Doctor': p.Doctor_Name || 'N/A',
                'Mobile': p.Mobile || 'N/A',
                'Rating': p.Rating || 'N/A',
                'Created Date': p.Created_Time ? new Date(p.Created_Time).toLocaleDateString() : 'N/A'
            }));

        if (nurturePatients.length > 0) {
            const wsNurture = XLSX.utils.json_to_sheet(nurturePatients);
            XLSX.utils.book_append_sheet(wb, wsNurture, `Nurture(${nurturePatients.length})`);
        }

        // Not Prescribed Patients - separate sheet
        const notPrescribedPatients = data.Feedbacks
            .filter(p => p.StatusPrespcription !== 'Celevida_Onboarded' && p.StatusPrespcription !== 'Celevida_Nurture')
            .map((p, index) => ({
                'Sr No': index + 1,
                'Patient Name': p.Last_Name || 'N/A',
                'Age': p.Age || 'N/A',
                'Gender': p.Genders || 'N/A',
                'City': p.City || 'N/A',
                'Doctor': p.Doctor_Name || 'N/A',
                'Mobile': p.Mobile || 'N/A',
                'Status': p.StatusPrespcription || 'N/A',
                'Created Date': p.Created_Time ? new Date(p.Created_Time).toLocaleDateString() : 'N/A'
            }));

        if (notPrescribedPatients.length > 0) {
            const wsNotPrescribed = XLSX.utils.json_to_sheet(notPrescribedPatients);
            XLSX.utils.book_append_sheet(wb, wsNotPrescribed, `Not Prescribed(${notPrescribedPatients.length})`);
        }
    }

    XLSX.writeFile(wb, filename);
};

/**
 * Export Gender Distribution with detailed patient lists by gender
 */
export const exportGenderData = (data, filters, title) => {
    const timestamp = new Date().toISOString().split('T')[0];
    const baseFilename = title
        ? title.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')
        : 'gender_distribution_detailed';
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
        ['Male', data.genderCount?.male || 0, `${((data.genderCount?.male || 0) / totalPatients * 100).toFixed(2)}% `],
        ['Female', data.genderCount?.female || 0, `${((data.genderCount?.female || 0) / totalPatients * 100).toFixed(2)}% `],
        ['Other', data.genderCount?.other || 0, `${((data.genderCount?.other || 0) / totalPatients * 100).toFixed(2)}% `],
        [],
        ['Total', totalPatients, '100%']
    ];

    const ws = XLSX.utils.aoa_to_sheet(genderData);
    XLSX.utils.book_append_sheet(wb, ws, 'Summary');

    // Detailed patient list for EACH gender
    if (data.Feedbacks && data.Feedbacks.length > 0) {
        const genders = ['male', 'female', 'other'];

        genders.forEach(gender => {
            const genderPatients = data.Feedbacks
                .filter(p => (p.Genders || '').toLowerCase() === gender)
                .map((p, index) => ({
                    'Sr No': index + 1,
                    'Patient Name': p.Last_Name || 'N/A',
                    'Gender': p.Genders || 'N/A',
                    'Age': p.Age || 'N/A',
                    'City': p.City || 'N/A',
                    'Status': p.StatusPrespcription || 'N/A',
                    'Doctor': p.Doctor_Name || 'N/A',
                    'Field Executive': p.Field_Executive || 'N/A',
                    'Mobile': p.Mobile || 'N/A',
                    'Rating': p.Rating || 'N/A',
                    'Call Disposition': p.Call_Disposition || 'N/A',
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
 * Export Age Group Distribution with detailed patient lists
 */
export const exportAgeGroupData = (data, filters, title) => {
    const timestamp = new Date().toISOString().split('T')[0];
    const baseFilename = title
        ? title.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')
        : 'age_group_detailed';
    const filename = `${baseFilename}_${timestamp}.xlsx`;

    const wb = XLSX.utils.book_new();

    // Summary with age distribution
    const summaryData = [
        [title || 'Age Group Distribution Report'],
        ['Generated:', new Date().toLocaleString()],
        [],
        ['Total Patients:', data.onboardedPatients || 0],
        [],
        ['Age Group', 'Patient Count', 'Percentage']
    ];

    Object.entries(data.ageGroups || {}).forEach(([ageGroup, count]) => {
        summaryData.push([ageGroup, count, `${(count / data.onboardedPatients * 100).toFixed(2)}% `]);
    });

    const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, wsSummary, 'Summary');

    // Create detailed sheet for EACH age group with patient names
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
                    'Patient Name': p.Last_Name || 'N/A',
                    'Exact Age': p.Age || 'N/A',
                    'Age Group': groupName,
                    'Why in this group?': `Age ${p.Age} falls in range ${range.min} -${range.max === 999 ? '∞' : range.max} `,
                    'Gender': p.Genders || 'N/A',
                    'City': p.City || 'N/A',
                    'Status': p.StatusPrespcription || 'N/A',
                    'Doctor': p.Doctor_Name || 'N/A',
                    'Mobile': p.Mobile || 'N/A',
                    'Created Date': p.Created_Time ? new Date(p.Created_Time).toLocaleDateString() : 'N/A'
                }))
                .sort((a, b) => parseInt(a['Exact Age']) - parseInt(b['Exact Age'])); // Sort by age

            if (patientsInGroup.length > 0) {
                const ws = XLSX.utils.json_to_sheet(patientsInGroup);
                XLSX.utils.book_append_sheet(wb, ws, `${groupName} (${patientsInGroup.length})`);
            }
        });
    }

    XLSX.writeFile(wb, filename);
};

/**
 * Export Patient Segmentation
 */
export const exportPatientSegmentation = (data, filters, title) => {
    const timestamp = new Date().toISOString().split('T')[0];
    const baseFilename = title
        ? title.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')
        : 'patient_segmentation';
    const filename = `${baseFilename}_${timestamp}.xlsx`;

    const wb = XLSX.utils.book_new();

    // Segmentation data
    const segmentationData = [
        [title || 'Patient Segmentation Report'],
        ['Generated:', new Date().toLocaleString()],
        [],
        ['Segment', 'Count', 'Percentage'],
        ['Prescribed', data.Prescribed || 0, `${((data.Prescribed || 0) / data.onboardedPatients * 100).toFixed(2)}% `],
        ['Nurture', data.Nurture || 0, `${((data.Nurture || 0) / data.onboardedPatients * 100).toFixed(2)}% `],
        ['Not Prescribed', (data.onboardedPatients - data.Prescribed - data.Nurture) || 0, `${(((data.onboardedPatients - data.Prescribed - data.Nurture) || 0) / data.onboardedPatients * 100).toFixed(2)}% `],
        [],
        ['Total', data.onboardedPatients || 0, '100%']
    ];

    const ws = XLSX.utils.aoa_to_sheet(segmentationData);
    XLSX.utils.book_append_sheet(wb, ws, 'Segmentation');

    XLSX.writeFile(wb, filename);
};

/**
 * Export Health Metrics Chart Data
 */
export const exportHealthMetricData = (metricName, chartData, data, title) => {
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
        ['Percentage Change', `${metricInfo?.percentageChange || 0}% `],
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
 * Export Call Completion/Disposition Data with patient lists
 */
export const exportCallDispositionData = (data, filters, title) => {
    const timestamp = new Date().toISOString().split('T')[0];
    const baseFilename = title
        ? title.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')
        : 'call_disposition_detailed';
    const filename = `${baseFilename}_${timestamp}.xlsx`;

    const wb = XLSX.utils.book_new();

    // Summary
    const dispositionData = [
        [title || 'Call Disposition Report'],
        ['Generated:', new Date().toLocaleString()],
        [],
        ['Total Patients:', data.onboardedPatients || 0],
        [],
        ['Call Status', 'Count', 'Percentage']
    ];

    Object.entries(data.Call_Disposition || {}).forEach(([status, count]) => {
        dispositionData.push([status, count, `${(count / data.onboardedPatients * 100).toFixed(2)}% `]);
    });

    const wsSummary = XLSX.utils.aoa_to_sheet(dispositionData);
    XLSX.utils.book_append_sheet(wb, wsSummary, 'Summary');

    // Create sheet for EACH call disposition status
    if (data.Feedbacks && data.Feedbacks.length > 0) {
        Object.keys(data.Call_Disposition || {}).forEach(status => {
            const statusPatients = data.Feedbacks
                .filter(p => p.Call_Disposition === status)
                .map((p, index) => ({
                    'Sr No': index + 1,
                    'Patient Name': p.Last_Name || 'N/A',
                    'Call Status': status,
                    'Why this status?': `Patient's call disposition is "${status}"`,
                    'Age': p.Age || 'N/A',
                    'Gender': p.Genders || 'N/A',
                    'City': p.City || 'N/A',
                    'Status': p.StatusPrespcription || 'N/A',
                    'Doctor': p.Doctor_Name || 'N/A',
                    'Executive': p.Field_Executive || 'N/A',
                    'Mobile': p.Mobile || 'N/A',
                    'Rating': p.Rating || 'N/A',
                    'Created Date': p.Created_Time ? new Date(p.Created_Time).toLocaleDateString() : 'N/A'
                }));

            if (statusPatients.length > 0) {
                const ws = XLSX.utils.json_to_sheet(statusPatients);
                XLSX.utils.book_append_sheet(wb, ws, `${status.substring(0, 25)} (${statusPatients.length})`);
            }
        });
    }

    XLSX.writeFile(wb, filename);
};

/**
 * Export Rating Distribution with patient lists by rating
 */
export const exportRatingData = (data, filters, title) => {
    const timestamp = new Date().toISOString().split('T')[0];
    const baseFilename = title
        ? title.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')
        : 'rating_distribution_detailed';
    const filename = `${baseFilename}_${timestamp}.xlsx`;

    const wb = XLSX.utils.book_new();

    // Summary
    const ratingData = [
        [title || 'Program Rating Distribution Report'],
        ['Generated:', new Date().toLocaleString()],
        [],
        ['Total Patients:', data.onboardedPatients || 0],
        [],
        ['Rating', 'Count', 'Percentage']
    ];

    Object.entries(data.ratingCount || {}).forEach(([rating, count]) => {
        ratingData.push([rating, count, `${(count / data.onboardedPatients * 100).toFixed(2)}%`]);
    });

    const wsSummary = XLSX.utils.aoa_to_sheet(ratingData);
    XLSX.utils.book_append_sheet(wb, wsSummary, 'Summary');

    // Create sheet for EACH rating with patient details
    if (data.Feedbacks && data.Feedbacks.length > 0) {
        Object.keys(data.ratingCount || {}).forEach(rating => {
            const ratingPatients = data.Feedbacks
                .filter(p => (p.Rating || 'Unrated').toString() === rating)
                .map((p, index) => ({
                    'Sr No': index + 1,
                    'Patient Name': p.Last_Name || 'N/A',
                    'Rating Given': rating,
                    'Age': p.Age || 'N/A',
                    'Gender': p.Genders || 'N/A',
                    'City': p.City || 'N/A',
                    'Status': p.StatusPrespcription || 'N/A',
                    'Doctor': p.Doctor_Name || 'N/A',
                    'Executive': p.Field_Executive || 'N/A',
                    'Mobile': p.Mobile || 'N/A',
                    'Call Disposition': p.Call_Disposition || 'N/A',
                    'Created Date': p.Created_Time ? new Date(p.Created_Time).toLocaleDateString() : 'N/A'
                }));

            if (ratingPatients.length > 0) {
                const ws = XLSX.utils.json_to_sheet(ratingPatients);
                XLSX.utils.book_append_sheet(wb, ws, `Rating ${rating} (${ratingPatients.length})`);
            }
        });
    }

    XLSX.writeFile(wb, filename);
};

/**
 * Export Top Cities Data with detailed patient lists per city
 */
export const exportTopCitiesData = (data, filters, title) => {
    const timestamp = new Date().toISOString().split('T')[0];
    const baseFilename = title
        ? title.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')
        : 'top_cities_detailed';
    const filename = `${baseFilename}_${timestamp}.xlsx`;

    const wb = XLSX.utils.book_new();

    // Summary
    const citiesData = [
        [title || 'Top Cities Report'],
        ['Generated:', new Date().toLocaleString()],
        [],
        ['Total Patients:', data.onboardedPatients || 0],
        [],
        ['City', 'Patient Count', 'Percentage']
    ];

    (data.cities || []).forEach(city => {
        citiesData.push([
            city.cityname,
            city.count,
            `${(city.count / data.onboardedPatients * 100).toFixed(2)}%`
        ]);
    });

    const wsSummary = XLSX.utils.aoa_to_sheet(citiesData);
    XLSX.utils.book_append_sheet(wb, wsSummary, 'Summary');

    // Create sheet for EACH city with all patients from that city
    if (data.Feedbacks && data.Feedbacks.length > 0) {
        // Group patients by city
        const citiesMap = {};
        data.Feedbacks.forEach(p => {
            const city = p.City || 'Unknown';
            if (!citiesMap[city]) {
                citiesMap[city] = [];
            }
            citiesMap[city].push(p);
        });

        // Sort cities by patient count (descending)
        const sortedCities = Object.entries(citiesMap)
            .sort((a, b) => b[1].length - a[1].length);

        sortedCities.forEach(([cityName, patients]) => {
            const cityPatients = patients.map((p, index) => ({
                'Sr No': index + 1,
                'Patient Name': p.Last_Name || 'N/A',
                'City': cityName,
                'Age': p.Age || 'N/A',
                'Gender': p.Genders || 'N/A',
                'Status': p.StatusPrespcription || 'N/A',
                'Doctor': p.Doctor_Name || 'N/A',
                'Executive': p.Field_Executive || 'N/A',
                'Mobile': p.Mobile || 'N/A',
                'Rating': p.Rating || 'N/A',
                'Created Date': p.Created_Time ? new Date(p.Created_Time).toLocaleDateString() : 'N/A'
            }));

            const ws = XLSX.utils.json_to_sheet(cityPatients);
            // Limit sheet name to 31 characters (Excel limit)
            const sheetName = `${cityName.substring(0, 25)} (${patients.length})`;
            XLSX.utils.book_append_sheet(wb, ws, sheetName);
        });
    }

    XLSX.writeFile(wb, filename);
};

/**
 * Export Doctor Segmentation
 */
export const exportDoctorSegmentation = (data, filters, title) => {
    const timestamp = new Date().toISOString().split('T')[0];
    const baseFilename = title
        ? title.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')
        : 'doctor_segmentation';
    const filename = `${baseFilename}_${timestamp}.xlsx`;

    const wb = XLSX.utils.book_new();

    // Get doctor statistics
    const doctorStats = {};

    if (data.Feedbacks && data.Feedbacks.length > 0) {
        data.Feedbacks.forEach(patient => {
            const doctorName = patient.Doctor_Name || 'Unknown';
            if (!doctorStats[doctorName]) {
                doctorStats[doctorName] = {
                    total: 0,
                    prescribed: 0,
                    nurture: 0,
                    notPrescribed: 0
                };
            }
            doctorStats[doctorName].total++;

            if (patient.StatusPrespcription === 'Celevida_Onboarded') {
                doctorStats[doctorName].prescribed++;
            } else if (patient.StatusPrespcription === 'Celevida_Nurture') {
                doctorStats[doctorName].nurture++;
            } else {
                doctorStats[doctorName].notPrescribed++;
            }
        });
    }

    const doctorList = Object.entries(doctorStats).map(([doctor, stats]) => ({
        'Doctor Name': doctor,
        'Total Patients': stats.total,
        'Prescribed': stats.prescribed,
        'Nurture': stats.nurture,
        'Not Prescribed': stats.notPrescribed,
        'Prescription Rate': `${(stats.prescribed / stats.total * 100).toFixed(2)}%`
    }));

    const ws = XLSX.utils.json_to_sheet(doctorList);
    XLSX.utils.book_append_sheet(wb, ws, 'Doctor Segmentation');

    XLSX.writeFile(wb, filename);
};

