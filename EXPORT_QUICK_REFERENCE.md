# Quick Reference: Export Updates

## ✅ What Changed

### For ALL Modules (Both Brand Team & Admin):

1. **Total Patients Screened** → Shows **SUM** in summary
2. **Wellness/Nurture** → Correct counts, renamed tabs to "Wellness Patients" / "Nurture Patients"
3. **Total Clinics/HCPs** → Fixed Total Doctor and Total Patient calculations
4. **Patient Segmentation** → Removed "Not Prescribed" column, header matches dashboard
5. **Patient Status Funnel** → Rectified total, removed "Not Prescribed"
6. **Call Coordination** → Added Total Patients row, "Executive" → "VHCs who called"
7. **City Performance** → Fixed % calculation, added "Total HCPs Participated" column
8. **Program Rating** → Fixed % calculation (uses rated patients total)
9. **Feedback** → Patient Name shows "Anonymous" (Brand Team only)

---

## 🎯 Key Formula Changes

### City Percentages
```javascript
// BEFORE
percentage = (city.count / totalPatients) * 100

// AFTER
percentage = (city.count / totalAcrossCities) * 100
```

### Rating Percentages
```javascript
// BEFORE
percentage = (ratingCount / totalPatients) * 100

// AFTER
percentage = (ratingCount / totalRatedPatients) * 100
```

### Counts
```javascript
// BEFORE
count = data.Prescribed  // might be stale

// AFTER
count = data.Feedbacks.filter(p => p.StatusPrespcription === 'Celevida_Onboarded').length
```

---

## 🧪 Quick Test

1. Login as Brand Team
2. Click download on "Wellness Patients" card
3. Open Excel file
4. Verify:
   - ✓ Summary tab shows correct count
   - ✓ Data tab named "Wellness Patients"
   - ✓ No Patient Name, Mobile, Email columns
   - ✓ Has: Patient ID, Age, Gender, City, Doctor, Field Executive, Created Date

5. Click download on "City Wise Performance"
6. Verify:
   - ✓ Has "Percentage" column
   - ✓ Has "Total HCPs Participated" column
   - ✓ Percentages add up correctly

7. Click download on "Feedback"
8. Verify:
   - ✓ Patient Name shows "Anonymous" for all rows

---

## 📊 Export Structure Example

### Wellness Patients Export (Brand Team):

**Sheet 1: Summary**
```
Wellness Patients Report
Generated: 12/7/2025, 10:30 AM

Applied Filters:
Cities: All
Executives: All
Doctors: All

Total Wellness Patients: 245
```

**Sheet 2: Wellness Patients**
```
Sr No | Patient ID | Age | Gender | City | Doctor Name | Field Executive | Created Date
1     | 12345     | 45  | Male   | Delhi| Dr. Smith   | VHC John        | 01/12/2025
2     | 12346     | 38  | Female | Mumbai| Dr. Patel  | VHC Jane        | 02/12/2025
...
```

*Excluded: Patient Name, Mobile, Email, Call Disposition, Rating, Last Modified, State*

---

## 🔄 Changes Applied To:

✅ **Brand Team Exports** (9 functions)
✅ **Admin Exports** (3 functions)
✅ **Brand Team Dashboard** (already configured)
✅ **Export Buttons Component** (already configured)

**Status:** READY FOR TESTING ✅


