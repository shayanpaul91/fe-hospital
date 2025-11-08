// File: frontend/src/views/PatientForm.jsx
import React from 'react';

/**
 * Presentational component: receives patient object and handlers
 * Minimal inline styles; keep UI separate from controller logic.
 */

export default function PatientForm({ patient, onChange, onSave, saving, error }) {
  if (!patient) return null;
  return (
    <form onSubmit={onSave} style={{ maxWidth: 640, margin: '0 auto' }}>
      <h2>Patient Details</h2>
      <label>Full name<br/>
        <input name="full_name" value={patient.full_name || ''} onChange={onChange} required />
      </label><br/>
      <label>Age<br/>
        <input name="age" type="number" value={patient.age || ''} onChange={onChange} />
      </label><br/>
      <label>Gender<br/>
        <select name="gender" value={patient.gender || ''} onChange={onChange}>
          <option value="">Select</option><option>Male</option><option>Female</option><option>Other</option>
        </select>
      </label><br/>
      <label>Height (cm)<br/>
        <input name="height_cm" type="number" step="0.01" value={patient.height_cm || ''} onChange={onChange} />
      </label><br/>
      <label>Weight (kg)<br/>
        <input name="weight_kg" type="number" step="0.01" value={patient.weight_kg || ''} onChange={onChange} />
      </label><br/>
      <label>Phone<br/>
        <input name="phone" value={patient.phone || ''} onChange={onChange} />
      </label><br/>
      <label>Address<br/>
        <textarea name="address" value={patient.address || ''} onChange={onChange} />
      </label><br/>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
    </form>
  );
}
