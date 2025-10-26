


"use client";

import { useState, useEffect } from "react";
import React from "react";
import styles from './Filters.module.css';
import { useDispatch, useSelector } from "react-redux";
import { filterapi } from "../../app/utils/apis/filterapi";
import { adminavgtabledata } from "../../app/utils/apis/adminavgtabledata";
import { format } from "date-fns";
import Select, { components } from 'react-select';

export default function Filters({ onFilterChange, filtervalues }) {
    const dispatch = useDispatch();
    const statusOptions = ["Celevida_Onboarded", "Celevida_Nurture"];


    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);


    const [cities, setCities] = useState(filtervalues.cities || []);
    const [executives, setExecutives] = useState(filtervalues.executives || []);
    const [doctors, setDoctors] = useState(filtervalues.doctors || []);
    const [statuses, setStatuses] = useState(filtervalues.statuses || []);
    const [startDate, setStartDate] = useState(
        filtervalues.dateRange ? new Date(filtervalues.dateRange.startDate) : startOfMonth
    );
    const [endDate, setEndDate] = useState(
        filtervalues.dateRange ? new Date(filtervalues.dateRange.endDate) : today
    );

    const { cities: cityOptionsList, executives: executiveOptionsList, doctors: doctorOptionsList } = useSelector((state) => state.superadmin);


    useEffect(() => {
        const formattedRange = {
            startDate: format(startDate, "MMM d yyyy"),
            endDate: format(endDate, "MMM d yyyy"),
        };
        onFilterChange({ cities, executives, doctors, statuses, dateRange: formattedRange });
    }, [cities, executives, doctors, statuses, startDate, endDate]);

    // Custom ValueContainer to show first item + count
    const ValueContainer = ({ children, ...props }) => {
        const { getValue, hasValue } = props;
        const selectedValues = getValue();
        const length = selectedValues.length;

        if (!hasValue) {
            return <components.ValueContainer {...props}>{children}</components.ValueContainer>;
        }

        return (
            <components.ValueContainer {...props}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'nowrap' }}>
                    {/* Show first selected item */}
                    <div style={{
                        backgroundColor: '#4285f4',
                        color: 'white',
                        borderRadius: '12px',
                        padding: '2px 8px',
                        fontSize: '13px',
                        fontWeight: '500',
                        whiteSpace: 'nowrap'
                    }}>
                        {selectedValues[0].label}
                    </div>
                    
                    {/* Show count if more than 1 selected */}
                    {length > 1 && (
                        <div style={{
                            backgroundColor: '#e8f0fe',
                            color: '#1967d2',
                            borderRadius: '12px',
                            padding: '2px 8px',
                            fontSize: '13px',
                            fontWeight: '600',
                            whiteSpace: 'nowrap'
                        }}>
                            +{length - 1} more
                        </div>
                    )}
                    
                    {/* This keeps the input and clear button working */}
                    {React.Children.toArray(children).filter(child => 
                        child && (child.type === components.Input || 
                                 child.type.name === 'Input' ||
                                 (child.props && child.props.className && child.props.className.includes('indicatorContainer')))
                    )}
                </div>
            </components.ValueContainer>
        );
    };

    // Custom styles for react-select
    const customStyles = {
        control: (base, state) => ({
            ...base,
            minHeight: '45px',
            maxHeight: '45px',
            borderColor: state.isFocused ? '#4285f4' : '#d9d9d9',
            boxShadow: state.isFocused ? '0 0 0 1px #4285f4' : 'none',
            '&:hover': {
                borderColor: '#4285f4'
            }
        }),
        valueContainer: (base) => ({
            ...base,
            padding: '2px 8px',
            overflow: 'hidden',
            flexWrap: 'nowrap',
            maxHeight: '41px'
        }),
        multiValue: (base) => ({
            ...base,
            display: 'none' // Hide default multi-values, we use custom ValueContainer
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected ? '#e8f0fe' : state.isFocused ? '#f1f3f4' : 'white',
            color: state.isSelected ? '#1967d2' : '#202124',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            padding: '10px 12px',
            fontWeight: state.isSelected ? '600' : '400',
            position: 'relative',
            ':active': {
                backgroundColor: '#e8f0fe'
            },
            ':before': state.isSelected ? {
                content: '"✓"',
                marginRight: '8px',
                color: '#1967d2',
                fontWeight: 'bold'
            } : {}
        }),
        menu: (base) => ({
            ...base,
            zIndex: 100,
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            marginTop: '4px',
        }),
        menuList: (base) => ({
            ...base,
            padding: '8px',
            maxHeight: '250px'
        }),
        placeholder: (base) => ({
            ...base,
            color: '#9aa0a6',
            fontSize: '14px'
        }),
        input: (base) => ({
            ...base,
            margin: 0,
            padding: 0
        })
    };

    const handleSubmit = () => {
        const filters = {
            cities,
            executives,
            doctors,
            statuses,
            dateRange: {
                startDate: format(startDate, "MMM d yyyy"),
                endDate: format(endDate, "MMM d yyyy"),
            },
        };

        dispatch(filterapi(filters));
        dispatch(adminavgtabledata(filters));
        
    };

    // Convert options to react-select format
    const cityOptions = [
        { value: 'Mumbai', label: 'Mumbai' },
        { value: 'Kolkata', label: 'Kolkata' },
        { value: 'Hyderabad', label: 'Hyderabad' }
    ];

    const executiveSelectOptions = (executiveOptionsList || []).map(ex => ({ value: ex, label: ex }));
    const doctorSelectOptions = (doctorOptionsList || []).map(doc => ({ value: doc, label: doc }));
    const statusSelectOptions = statusOptions.map(s => ({ value: s, label: s }));

    // Convert array values to select values
    const selectedCities = cityOptions.filter(opt => cities.includes(opt.value));
    const selectedExecutives = executiveSelectOptions.filter(opt => executives.includes(opt.value));
    const selectedDoctors = doctorSelectOptions.filter(opt => doctors.includes(opt.value));
    const selectedStatuses = statusSelectOptions.filter(opt => statuses.includes(opt.value));

    return (
        <div className={styles.filters_containers}>
            <div className={styles.innerDropdown}>
                <div style={{ width: '100%', marginBottom: '10px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', fontSize: '14px', color: '#5f6368' }}>Cities</label>
                    <Select
                        isMulti
                        options={cityOptions}
                        value={selectedCities}
                        onChange={(selected) => setCities((selected || []).map(s => s.value))}
                        styles={customStyles}
                        placeholder="Select cities..."
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        components={{ ValueContainer }}
                        isClearable={true}
                    />
                </div>
                <div style={{ width: '100%', marginBottom: '10px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', fontSize: '14px', color: '#5f6368' }}>Executives</label>
                    <Select
                        isMulti
                        options={executiveSelectOptions}
                        value={selectedExecutives}
                        onChange={(selected) => setExecutives((selected || []).map(s => s.value))}
                        styles={customStyles}
                        placeholder="Select executives..."
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        components={{ ValueContainer }}
                        isClearable={true}
                    />
                </div>
                <div style={{ width: '100%', marginBottom: '10px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', fontSize: '14px', color: '#5f6368' }}>Doctors</label>
                    <Select
                        isMulti
                        options={doctorSelectOptions}
                        value={selectedDoctors}
                        onChange={(selected) => setDoctors((selected || []).map(s => s.value))}
                        styles={customStyles}
                        placeholder="Select doctors..."
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        components={{ ValueContainer }}
                        isClearable={true}
                    />
                </div>
                <div style={{ width: '100%', marginBottom: '10px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', fontSize: '14px', color: '#5f6368' }}>Status</label>
                    <Select
                        isMulti
                        options={statusSelectOptions}
                        value={selectedStatuses}
                        onChange={(selected) => setStatuses((selected || []).map(s => s.value))}
                        styles={customStyles}
                        placeholder="Select status..."
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        components={{ ValueContainer }}
                        isClearable={true}
                    />
                </div>
            </div>

            <div className={styles.date_picker_wrapper}>
                <div>
                    <label>Start Date:</label>
                    <input
                        type="date"
                        value={format(startDate, "yyyy-MM-dd")}
                        onChange={(e) => setStartDate(new Date(e.target.value))}
                    />
                </div>
                <div>
                    <label>End Date:</label>
                    <input
                        type="date"
                        value={format(endDate, "yyyy-MM-dd")}
                        onChange={(e) => setEndDate(new Date(e.target.value))}
                    />
                </div>
            </div>

            <div className={styles.btn_cont}>
                <button className={styles.btn} onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
}
