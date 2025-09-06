'use client';

import { Users } from 'lucide-react';

export default function PatientsKpiCard({
  title,
  value,
  trend,
  icon: Icon = Users,
  color = '#2563eb',
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '16px 20px',
        borderRadius: '16px',
        background: '#fff',
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
        minWidth: '240px',
      }}
    >
      {/* Title + Icon */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Icon size={22} color={color} />
        <span style={{ fontSize: '14px', color: '#6b7280' }}>{title}</span>
      </div>

      {/* Main Value */}
      <h2 style={{ fontSize: '28px', margin: '8px 0', fontWeight: '700' }}>
        {value}
      </h2>

      {/* Trend Indicator */}
      {trend !== undefined && (
        <span
          style={{
            fontSize: '13px',
            color: trend > 0 ? '#16a34a' : '#dc2626',
            fontWeight: '500',
          }}
        >
          {trend > 0 ? `▲ ${trend}%` : `▼ ${Math.abs(trend)}%`}
        </span>
      )}
    </div>
  );
}
