"use client";

import React from "react";
import styled from "styled-components";
import { Formik, Form as FormikForm, Field } from "formik";
import * as Yup from "yup";
import Image from "next/image";

const FormContainer = styled.div`
  width: 100%;
  padding-top: 2.5rem;
  padding-bottom: 5rem;
`;

const FormElementsWrapper = styled.div`
  width: 65%;
  margin: 0 auto;
`;

const Section = styled.div`
  margin-bottom: 2.5rem;

  ${FormElementsWrapper} {
    margin-top: 2rem;
  }
`;

const SectionIcon = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;

  img {
    width: 56px;
    height: 56px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #000;
  text-align: center;
  margin-bottom: 1rem;
`;

const SectionDescription = styled.p`
  text-align: center;
  font-size: 1.1rem;
  line-height: 1.1;
  margin-bottom: 3rem;
  margin-left: auto;
  margin-right: auto;
  font-weight: 600;
  color: black;
`;

const InputGroup = styled.div`
  margin-bottom: 1rem;
`;

const Input = styled(Field)`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  font-size: 1rem;
  color: #4a4a4a;
  background: white;

  &::placeholder {
    color: #9ca3af;
  }
`;

const Select = styled(Field)`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  font-size: 1rem;
  background: white;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;
  color: #9ca3af;

  &:has(option:checked:not([value=""])) {
    color: #4a4a4a;
  }

  option:not([value=""]) {
    color: #4a4a4a;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  color: #4a4a4a;
  cursor: pointer;
`;

const Checkbox = styled(Field)`
  width: 1.25rem;
  height: 1.25rem;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
`;

const TextArea = styled(Field)`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  font-size: 1rem;
  color: #4a4a4a;
  min-height: 150px;
  resize: vertical;

  &::placeholder {
    color: #9ca3af;
    font-size: 0.921rem;
    line-height: 1.1;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: #18181b;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: #27272a;
  }
`;

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  country: Yup.string().required("Required"),
  linkedinUrl: Yup.string().url("Invalid URL").required("Required"),
  visaCategory: Yup.string().required("Required"),
  message: Yup.string().required("Required"),
});

const LeadForm = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    linkedinUrl: "",
    visaCategory: "",
    message: "",
  };

  const handleSubmit = async (values: any) => {
    console.log(values);
    // Handle form submission
  };

  return (
    <FormContainer>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <FormikForm>
          <Section>
            <SectionIcon>
              <Image
                src="/information-paper.png"
                alt="Information paper icon"
                width={56}
                height={56}
              />
            </SectionIcon>
            <SectionTitle>Want to understand your visa options?</SectionTitle>
            <SectionDescription>
              Submit the form below and our team of experienced attorneys will
              review your information and send a preliminary assessment of your{" "}
              <br />
              case based on your goals.
            </SectionDescription>
            <FormElementsWrapper>
              <InputGroup>
                <Input name="firstName" placeholder="First Name" />
              </InputGroup>
              <InputGroup>
                <Input name="lastName" placeholder="Last Name" />
              </InputGroup>
              <InputGroup>
                <Input name="email" type="email" placeholder="Email" />
              </InputGroup>
              <InputGroup>
                <Select as="select" name="country">
                  <option value="" disabled selected>
                    Country of Citizenship
                  </option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  {/* Add more countries */}
                </Select>
              </InputGroup>
              <InputGroup>
                <Input
                  name="linkedinUrl"
                  placeholder="LinkedIn / Personal Website URL"
                />
              </InputGroup>
            </FormElementsWrapper>
          </Section>

          <Section>
            <SectionIcon>
              <Image src="/dice.png" alt="Dice icon" width={56} height={56} />
            </SectionIcon>
            <SectionTitle>Visa categories of interest?</SectionTitle>
            <FormElementsWrapper>
              <CheckboxGroup>
                <CheckboxLabel>
                  <Checkbox type="radio" name="visaCategory" value="O-1" />
                  O-1
                </CheckboxLabel>
                <CheckboxLabel>
                  <Checkbox type="radio" name="visaCategory" value="EB-1A" />
                  EB-1A
                </CheckboxLabel>
                <CheckboxLabel>
                  <Checkbox type="radio" name="visaCategory" value="EB-2 NIW" />
                  EB-2 NIW
                </CheckboxLabel>
                <CheckboxLabel>
                  <Checkbox
                    type="radio"
                    name="visaCategory"
                    value="I don't know"
                  />
                  I don't know
                </CheckboxLabel>
              </CheckboxGroup>
            </FormElementsWrapper>
          </Section>

          <Section>
            <SectionIcon>
              <Image src="/heart.png" alt="Heart icon" width={56} height={56} />
            </SectionIcon>
            <SectionTitle>How can we help you?</SectionTitle>
            <FormElementsWrapper>
              <InputGroup>
                <TextArea
                  as="textarea"
                  name="message"
                  placeholder="What is your current status and when does it expire? What is your past immigration history? Are you looking for long-term permanent residency or short-term employment visa or both? Are there any timeline considerations?"
                />
              </InputGroup>
            </FormElementsWrapper>
          </Section>

          <FormElementsWrapper>
            <SubmitButton type="submit">Submit</SubmitButton>
          </FormElementsWrapper>
        </FormikForm>
      </Formik>
    </FormContainer>
  );
};

export default LeadForm;
