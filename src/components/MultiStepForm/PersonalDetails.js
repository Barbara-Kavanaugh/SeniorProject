import React from 'react';
import './MultiForm.css';
import styled from 'styled-components';

export const FormLabel= styled.label`
  margin-bottom: 8px;
  font-size: 14px;
  color: #030000;
  margin-right: 125px;
`;

const PersonalDetails = ({ formData, setFormData }) => {
  return (
    <div className="personal-container">
        <FormLabel htmlFor='for'>First Name</FormLabel>
        <input
          type="text"
          value={formData.firstName} onChange={(event) => setFormData({ ...formData, firstName: event.target.value })} />

        <FormLabel htmlFor='for'>Maiden Name</FormLabel> 
        <input
          type="text"
          value={formData.maidenName} onChange={(event) => setFormData({ ...formData, maidenName: event.target.value })} />

        <FormLabel htmlFor='for'>Married Name</FormLabel> 
        <input
          type="text"
          value={formData.marriedName} onChange={(event) => setFormData({ ...formData, marriedName: event.target.value })} />

        <FormLabel htmlFor='for'>Class Year</FormLabel> 
        <input type="text"
          value={formData.classYear} onChange={(event) => setFormData({ ...formData, classYear: event.target.value })} />

        <FormLabel htmlFor='for'>Email</FormLabel> 
        <input type="text"
          value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} />

        <FormLabel htmlFor='for'>Password</FormLabel> 
        <input type="text"
          value={formData.password} onChange={(event) => setFormData({ ...formData, password: event.target.value })} />
      </div>
  );
}

export default PersonalDetails;
