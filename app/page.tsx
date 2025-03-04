"use client";

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  color: black;
`;

const FormContainer = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-bottom: 15px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-bottom: 15px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-bottom: 15px;
`;

const FileInput = styled.input`
  margin-bottom: 15px;
`;

const Error = styled.div`
  color: red;
  font-size: 0.9em;
  margin-bottom: 10px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;

const LeadForm = () => {
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    linkedInProfile: '',
    visasOfInterest: [],
    resume: null,
    additionalInformation: '',
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    linkedInProfile: Yup.string().url('Invalid LinkedIn profile URL').required('LinkedIn profile is required'),
    visasOfInterest: Yup.array().min(1, 'Please select at least one visa'),
    resume: Yup.mixed().required('Resume is required'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Replace with actual API endpoint
      const response = await fetch('/api/leads', {
        method: 'POST',
        body: JSON.stringify(values),
      });

      if (response.ok) {
        // Display success message
        alert('Lead submitted successfully!');
        resetForm();
      } else {
        // Display error message
        alert('Error submitting lead. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting lead:', error);
      alert('Error submitting lead. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <FormContainer>
        <Title>Submit Your Information</Title>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <div>
                <Label htmlFor="firstName">First Name:</Label>
                <Field type="text" name="firstName" as={Input} />
                <ErrorMessage name="firstName" component={Error} />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name:</Label>
                <Field type="text" name="lastName" as={Input} />
                <ErrorMessage name="lastName" component={Error} />
              </div>
              <div>
                <Label htmlFor="email">Email:</Label>
                <Field type="email" name="email" as={Input} />
                <ErrorMessage name="email" component={Error} />
              </div>
              <div>
                <Label htmlFor="linkedInProfile">LinkedIn Profile:</Label>
                <Field type="text" name="linkedInProfile" as={Input} />
                <ErrorMessage name="linkedInProfile" component={Error} />
              </div>
              <div>
                <Label htmlFor="visasOfInterest">Visas of Interest:</Label>
                <Field as={Select} name="visasOfInterest" multiple={true}>
                  <option value="">Select visas</option>
                  <option value="H1B">H1B</option>
                  <option value="L1">L1</option>
                  {/* Add more visa options as needed */}
                </Field>
                <ErrorMessage name="visasOfInterest" component={Error} />
              </div>
              <div>
                <Label htmlFor="resume">Resume/CV:</Label>
                <Field
                  type="file"
                  name="resume"
                  as={FileInput}
                  onChange={(event) => {
                    setFieldValue('resume', event.currentTarget.files[0]);
                  }}
                />
                <ErrorMessage name="resume" component={Error} />
              </div>
              <div>
                <Label htmlFor="additionalInformation">Additional Information:</Label>
                <Field as={TextArea} name="additionalInformation" />
              </div>
              <Button type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </FormContainer>
    </Container>
  );
};

export default LeadForm;