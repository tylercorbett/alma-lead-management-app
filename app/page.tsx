"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import Image from "next/image";

import almaLogo from "../public/alma-logo.png";
import appleSlices from "../public/apple-slices.png";

const Container = styled.div`
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8f8f8;
  color: black;
`;

const Header = styled.div`
  background-color: #d9dea5;
  width: 100%;
  padding-left: 0;
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const Logo = styled.div`
  margin-bottom: 2.5rem;
  width: 4.5rem;
  margin-left: 2px;
`;

const BackgroundContainer = styled.div`
`;

const LogoTitleContainer = styled.div`
  justify-self: center;
`;

const Title = styled.h2`
  font-size: 4.5rem;
  margin-bottom: 20px;
  font-weight: 700;
  text-align: left;
  line-height: 4.5rem;
`;

const FormContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 600px;
`;

const SectionTitle = styled.h3`
  font-size: 1.2em;
  margin-bottom: 15px;
  color: #333;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 0.9em;
  color: #555;
`;

const Input = styled(Field)`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 15px;
  box-sizing: border-box;
`;

const Select = styled(Field)`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 15px;
  box-sizing: border-box;
`;

const TextArea = styled(Field)`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 20px;
  box-sizing: border-box;
  resize: vertical;
`;

const RadioLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 0.9em;
  color: #555;
`;

const RadioInput = styled(Field)`
  margin-right: 8px;
`;

const Error = styled.div`
  color: red;
  font-size: 0.8em;
  margin-top: -10px;
  margin-bottom: 10px;
`;

const SubmitButton = styled.button`
  background-color: #333;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  font-size: 1em;
`;

const LeadForm = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    linkedInProfile: "",
    visaCategory: "",
    helpMessage: "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    country: Yup.string().required("Country is required"),
    linkedInProfile: Yup.string()
      .url("Invalid URL")
      .required("LinkedIn Profile is required"),
    visaCategory: Yup.string().required("Please select a visa category"),
    helpMessage: Yup.string().required("Please provide a message"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        alert("Form submitted successfully!");
        resetForm();
      } else {
        alert("Failed to submit form.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <Header>
        <BackgroundContainer>
          <Image src={appleSlices} alt="apple slices" width={270} />{" "}
        </BackgroundContainer>
        <LogoTitleContainer>
          <Logo>
            <Image src={almaLogo} alt="almā Logo" width={100} height={30} />{" "}
          </Logo>

          <Title>
            Get An Assessment
            <br />
            Of Your Immigration Case
          </Title>
        </LogoTitleContainer>
      </Header>
      <FormContainer>
        <SectionTitle>Want to understand your visa options?</SectionTitle>
        <p>
          Submit the form below and our team of experienced attorneys will
          review your information and send a preliminary assessment of your case
          based on your goals.
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input type="text" name="firstName" />
              <ErrorMessage name="firstName" component={Error} />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input type="text" name="lastName" />
              <ErrorMessage name="lastName" component={Error} />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input type="email" name="email" />
              <ErrorMessage name="email" component={Error} />
            </div>
            <div>
              <Label htmlFor="country">Country of Citizenship</Label>
              <Select as="select" name="country">
                <option value="">Select Country</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                {/* Add more countries as needed */}
              </Select>
              <ErrorMessage name="country" component={Error} />
            </div>
            <div>
              <Label htmlFor="linkedInProfile">LinkedIn Profile URL</Label>
              <Input type="text" name="linkedInProfile" />
              <ErrorMessage name="linkedInProfile" component={Error} />
            </div>

            <SectionTitle>Visa categories of interest?</SectionTitle>
            <div>
              <RadioLabel>
                <RadioInput type="radio" name="visaCategory" value="EB-2 NIW" />
                EB-2 NIW
              </RadioLabel>
              <RadioLabel>
                <RadioInput type="radio" name="visaCategory" value="O-1" />
                O-1
              </RadioLabel>
              <RadioLabel>
                <RadioInput
                  type="radio"
                  name="visaCategory"
                  value="I don't know"
                />
                I don't know
              </RadioLabel>
              <ErrorMessage name="visaCategory" component={Error} />
            </div>

            <SectionTitle>How can we help you?</SectionTitle>
            <div>
              <TextArea
                as="textarea"
                name="helpMessage"
                rows="4"
                placeholder="What is your current immigration status? What is your history of visas and prior immigration attempts? How can you demonstrate that you are in the top percentage of your field? Do you have any research experience or publications? Is your work in an area of substantial merit and national importance?"
              ></TextArea>
              <ErrorMessage name="helpMessage" component={Error} />
            </div>

            <SubmitButton type="submit">Submit</SubmitButton>
          </Form>
        </Formik>
      </FormContainer>
    </Container>
  );
};

export default LeadForm;
