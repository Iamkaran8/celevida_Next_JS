# Brand Team Export Feature Implementation

## Summary of Changes

### Overview
Added download/export functionality for Brand Team users with specific column exclusions as per requirements.

---

## Files Created

### 1. `/app/utils/brandTeamExports.js`
- **Purpose**: Brand Team-specific export functions with column exclusions
- **Functions**:
  - `exportBrandTotalPatients()` - No exclusions
  - `exportBrandWellnessPatients()` - Excludes: Patient Name, Mobile, Email, Call Disposition, Rating, Last modified, State
  - `exportBrandNurturePatients()` - Excludes: Patient Name, Mobile, Email, Call Disposition, Rating, Last modified, State
  - `exportBrandDoctorsList()` - No exclusions (Total Clinics/HCPs)
  - `exportBrandPatientSegmentation()` - Excludes: Not Prescribed, Prescription Rate
  - `exportBrandGenderData()` - Excludes: Patient Name, Mobile, Call Disposition, Rating
  - `exportBrandAgeGroupData()` - Excludes: Patient Name, Mobile, Why in this group?
  - `exportBrandPatientFunnel()` - No exclusions
  - `exportBrandCallDisposition()` - Excludes: Patient Name, Mobile, Rating, Executive
  - `exportBrandTopCities()` - Excludes: Patient Name, Mobile, Rating
  - `exportBrandFeedback()` - Excludes: Patient Name
  - `exportBrandHealthMetric()` - No exclusions (for all chart data)
  - `exportBrandDoctorSegmentation()` - No exclusions

---

## Files Modified

### 1. `/components/ExportButtons/ExportButtons.jsx`
**Changes:**
- Added `isBrandTeam` role check
- Export buttons now visible for both "super admin" and "brand team" roles
- Combined role check: `const showExportButtons = isSuperAdmin || isBrandTeam;`

### 2. `/app/brandteam/dashboard/page.jsx`
**Changes:**
- Imported `brandTeamExports` module
- Imported `ClickableCard` component
- Added Brand Team-specific export handlers for all components:
  - `handleExportTotalPatients()`
  - `handleExportWellness()`
  - `handleExportNurture()`
  - `handleExportDoctors()`
  - `handleExportPatientSegmentation()`
  - `handleExportGender()`
  - `handleExportAgeGroup()`
  - `handleExportPatientFunnel()`
  - `handleExportCallDisposition()`
  - `handleExportTopCities()`
  - `handleExportFeedback()`
  - `handleExportDoctorSegmentation()`
  - `handleExportHealthMetric()`
- Wrapped all chart components with `<ClickableCard>` for download functionality
- Updated `ChartSection` component to accept `onExportLeft` and `onExportRight` props

---

## Column Exclusions by Module

### ✅ Modules with Download Enabled

| Module | Excluded Columns |
|--------|------------------|
| **Total Patients Screened** | None |
| **Wellness Patients** | Patient Name, Mobile Number, Email, Call Disposition, Rating, Last modified date, State |
| **Nurture Patients** | Patient Name, Mobile Number, Email, Call Disposition, Rating, Last modified date, State |
| **Total Clinics/HCPs participated** | None |
| **Patient Segmentation** | Not Prescribed, Prescription Rate |
| **Gender** | Patient Name, Mobile Number, Call Disposition, Rating |
| **Age** | Patient Name, Mobile Number, Why in this group? |
| **Patient Status Funnel** | None |
| **Celevida Onboarded Call Coordination Trend** | Patient Name, Mobile Number, Rating, Executive |
| **City wise performance** | Patient Name, Mobile Number, Rating |
| **All Charts** | None |
| **Feedback** | Patient Name |
| **Doctor Segmentation** | None |

### ❌ Modules with Download Disabled

| Module | Status |
|--------|--------|
| **Program Rating Distribution** | NO download button (as per requirements) |

---

## How It Works

### For Brand Team Users:
1. **Export Buttons** appear at the top of the dashboard (CSV & PDF)
2. **Individual Export** available via download icon on each chart/card
3. **Column Filtering** automatically applied based on module
4. **Excel Format** (.xlsx) with multiple sheets:
   - Summary sheet with filters applied
   - Detailed data sheets with excluded columns removed
   - Count-based sheets where applicable

### Export Flow:
```
User clicks download icon on card
    ↓
ClickableCard calls onExport handler
    ↓
Handler calls Brand Team export function
    ↓
Function filters columns based on requirements
    ↓
Excel file generated and downloaded
```

---

## Key Features

### 1. **Role-Based Access**
- Super Admin: Full access (all columns)
- Brand Team: Restricted access (specific columns excluded)

### 2. **Multi-Sheet Excel Files**
Each export includes:
- Summary sheet with applied filters
- Detailed data sheets
- Breakdown by categories (gender, age, city, etc.)

### 3. **Filter Support**
All exports respect applied filters:
- Cities
- Executives
- Doctors
- Status
- Date Range

### 4. **Consistent Naming**
Files follow naming convention:
`{module_name}_{timestamp}.xlsx`

---

## Testing Checklist

- [ ] Login as Brand Team user
- [ ] Verify Export buttons visible at top
- [ ] Test Total Patients Screened export (no exclusions)
- [ ] Test Wellness Patients export (verify excluded columns)
- [ ] Test Nurture Patients export (verify excluded columns)
- [ ] Test Gender export (verify excluded columns)
- [ ] Test Age Group export (verify excluded columns)
- [ ] Test Patient Segmentation (verify Not Prescribed is excluded)
- [ ] Test Call Disposition (verify Executive is excluded)
- [ ] Test Top Cities (verify excluded columns)
- [ ] Test Feedback (verify Patient Name excluded)
- [ ] Test all chart exports
- [ ] Verify Program Rating Distribution has NO download button
- [ ] Apply filters and verify they're reflected in exports
- [ ] Verify file naming convention

---

## Example Usage

```javascript
// Brand Team clicking on "Wellness Patients" download icon
handleExportWellness('Wellness Patients')

// Generates file: wellness_patients_2025-12-07.xlsx
// Contains:
//   - Summary sheet (with filters)
//   - Wellness Patients sheet with columns:
//     ✓ Sr No, Patient ID, Age, Gender, City, Doctor Name, Field Executive, Created Date
//     ✗ Patient Name, Mobile, Email, Call Disposition, Rating, Last Modified, State
```

---

## Security Considerations

1. **Role Verification**: Export buttons only shown to authorized roles
2. **Data Privacy**: Sensitive columns (Name, Mobile, Email) excluded for Brand Team
3. **Filter Integrity**: Applied filters preserved in exports
4. **Audit Trail**: Export timestamp included in every file

---

## Future Enhancements

1. Add export logging/tracking
2. Add custom date range for exports
3. Add email delivery option
4. Add scheduled exports
5. Add export templates customization

---

## Support

For issues or questions:
1. Check console logs for errors
2. Verify user role is "brand team" (case-insensitive)
3. Ensure filters are properly applied
4. Check browser console for any Excel generation errors

---

**Implementation Date**: December 7, 2025
**Status**: ✅ Complete
**Tested**: Pending user testing

