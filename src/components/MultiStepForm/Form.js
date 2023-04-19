import React, { useState }from 'react';
import PersonalDetails from './PersonalDetails';
import Location from './Location';
import Education from './Education';
import Career from './Career';
import ContactInfo from './ContactInfo';
import PhotoUpload from './PhotoUpload';
import Footer from '../Footer/Footer';
import './MultiForm.css';
import api from '../../api';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaPaw } from 'react-icons/fa';
var validator = require('validator');

// should make required UI for the user to know + better alerts for a field being empty

export const Icon= styled(Link)`
  margin-left: 28px;
  margin-top: 28px;
  text-decoration: none;
  color: #d12626;
  font-weight: 800;
  font-size: 34px;
  text-shadow: 1.5px 1.5px 2.5px #030000;
`;

const Form = () => {
  const [page, setPage]= useState(0);
  const [formData, setFormData]= useState({
      email: "", 
      password: "", 
      firstName: "", 
      maidenName: "", 
      marriedName: "",
      classYear: "", 
      currentCity: "", 
      currentState: "", 
      universityName: "",
      degree: "",
      areaStudy: "",
      gradYear: "",
      position: "",
      companyName: "",
      industry: "",
      email2: "",
      phone: "",
      profileFinal: ""
  });

  const FormTitles= ["Personal Details", "Profile Picture", "Location", "Education", "Career", "Contact Information"];
  
  const handleIncludeUser = async () => {
    //alert("inside")
    const { email, password, firstName, maidenName, marriedName,
      classYear, currentCity, currentState, universityName, degree,
        areaStudy, gradYear, position, companyName, industry, email2, phone, profileFinal } = formData

    const payload = { email, password, firstName, maidenName, marriedName,
      classYear, currentCity, currentState, universityName, degree,
        areaStudy, gradYear, position, companyName, industry, email2, phone, profileFinal }

    await api.insertPending(payload).then(res => {
      window.alert('Registration info sent to admin for verification')
      window.location.href = '/login';
    })
} 

  const ButtonChoice = () =>{
    if (page===5){
      return (<button 
        
        onClick={
          handleIncludeUser
      }
    >
      Submit <FaPaw />
      
    </button>);
    }
    else{
      return (<button 
      onClick={() => {
        if(page=== 0){
          
            pageOneMissing(formData)
          }
        else{                      
          setPage((currentPage) => currentPage+1)
      }
    }}
    >
      Next
    </button>);
    }
  }

  const PageDisplay= () => {
    if (page=== 0) 
      return <PersonalDetails formData={formData} setFormData={setFormData}/>;
    else if (page=== 1)
      return <PhotoUpload formData={formData} setFormData={setFormData}/>;
    else if (page=== 2)
      return <Location formData={formData} setFormData={setFormData}/>;
    else if (page=== 3)
      return <Education formData={formData} setFormData={setFormData}/>;
    else if (page=== 4)
      return <Career formData={formData} setFormData={setFormData}/>;
    else 
      return <ContactInfo formData={formData} setFormData={setFormData}/>;
  }

  const pageOneMissing= (formData) => {
    
    if (!validator.isEmail(formData.email)) {
      return alert("Invalid Email");
    }

     if(!formData.firstName || !formData.maidenName || !formData.classYear || !formData.email || !formData.password){
      return alert("Missing fields")
     }
     return setPage((currentPage) => currentPage+1)

  }


  return (
    <>
    <Icon to='/'>MARYVALE</Icon>
    <div className="form">
        <div className="progressbar">
          <div style={{ 
            width: page=== 0 ? "10%" : 
            page=== 1 ? "20%" :
            page=== 2 ? "40%" :
             page=== 3 ? "60%" :
             page=== 4? "80%" : 
             "100%"}}></div>
        </div>
        <div className="form-container">
            <div className="header">
              <h1>{FormTitles[page]}</h1>
            </div>
            <div className="body">{PageDisplay()}</div>
            <div className="footer">
                <button
                    disabled={page=== 0}
                    onClick={() => {
                      setPage((currentPage) => currentPage-1)
                    }}
                >Previous</button>
                <ButtonChoice/>
                
            </div>
        </div>     
    </div>
    <Footer />
    </>
  );
}

export default Form;
