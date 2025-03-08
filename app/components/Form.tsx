"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { Formik, Form as FormikForm, Field, FormikProps } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { useRouter } from "next/navigation";

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

const StyledSelect = styled.select`
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

const StyledTextArea = styled.textarea`
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

const FileUploadWrapper = styled.div`
  margin-bottom: 1rem;
`;

const FileUploadLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #9ca3af;
  font-size: 0.875rem;
`;

const FileUploadInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  font-size: 1rem;
  color: #9ca3af;
  background: white;

  &[type="file"] {
    color-scheme: normal;

    &::file-selector-button {
      padding: 0.5rem 1rem;
      margin-right: 1rem;
      border: none;
      border-radius: 4px;
      background: #18181b;
      color: white;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s;

      &:hover {
        background: #27272a;
      }
    }
  }

  &:has(:not(:placeholder-shown)) {
    color: #4a4a4a;
  }
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: #18181b;
  color: white;
  border: none;
  border-radius: 0.8rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  &:disabled {
    background: #71717a;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
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
  message: Yup.string(),
  submit: Yup.string(),
});

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  linkedinUrl: string;
  visaCategory: string;
  message: string;
}

const LeadForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const initialValues: FormValues = {
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    linkedinUrl: "",
    visaCategory: "",
    message: "",
  };

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Here you would make your actual API call
      router.push("/thankyou");
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  return (
    <FormContainer>
      <Formik<FormValues>
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          errors,
          touched,
          isValid,
          dirty,
          values,
          handleSubmit: formikHandleSubmit,
          handleChange,
          setFieldValue,
        }: FormikProps<FormValues>) => {
          return (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                formikHandleSubmit(e);
              }}
            >
              <Section>
                <SectionIcon>
                  <Image
                    src="/information-paper.png"
                    alt="Information paper icon"
                    width={56}
                    height={56}
                  />
                </SectionIcon>
                <SectionTitle>
                  Want to understand your visa options?
                </SectionTitle>
                <SectionDescription>
                  Submit the form below and our team of experienced attorneys
                  will review your information and send a preliminary assessment
                  of your <br />
                  case based on your goals.
                </SectionDescription>
                <FormElementsWrapper>
                  <InputGroup>
                    <Input name="firstName" placeholder="First Name" />
                    {errors.firstName && touched.firstName && (
                      <ErrorMessage>{errors.firstName}</ErrorMessage>
                    )}
                  </InputGroup>
                  <InputGroup>
                    <Input name="lastName" placeholder="Last Name" />
                    {errors.lastName && touched.lastName && (
                      <ErrorMessage>{errors.lastName}</ErrorMessage>
                    )}
                  </InputGroup>
                  <InputGroup>
                    <Input name="email" type="email" placeholder="Email" />
                    {errors.email && touched.email && (
                      <ErrorMessage>{errors.email}</ErrorMessage>
                    )}
                  </InputGroup>
                  <InputGroup>
                    <StyledSelect
                      name="country"
                      value={values.country}
                      onChange={(e) => setFieldValue("country", e.target.value)}
                    >
                      <option value="">Country of Citizenship</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                    </StyledSelect>
                    {errors.country && touched.country && (
                      <ErrorMessage>{errors.country}</ErrorMessage>
                    )}
                  </InputGroup>
                  <InputGroup>
                    <Input
                      type="text"
                      name="linkedinUrl"
                      placeholder="LinkedIn URL"
                    />
                    {errors.linkedinUrl && touched.linkedinUrl && (
                      <ErrorMessage>{errors.linkedinUrl}</ErrorMessage>
                    )}
                  </InputGroup>

                  <FileUploadWrapper>
                    <FileUploadLabel>Resume</FileUploadLabel>
                    <FileUploadInput
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => {
                        // File upload is just for UI, not actually used in form submission
                        console.log(
                          "File selected:",
                          e.target.files?.[0]?.name
                        );
                      }}
                    />
                  </FileUploadWrapper>
                </FormElementsWrapper>
              </Section>

              <Section>
                <SectionIcon>
                  <Image
                    src="/dice.png"
                    alt="Dice icon"
                    width={56}
                    height={56}
                  />
                </SectionIcon>
                <SectionTitle>Visa categories of interest?</SectionTitle>
                <FormElementsWrapper>
                  <CheckboxGroup>
                    <CheckboxLabel>
                      <Checkbox type="radio" name="visaCategory" value="O-1" />
                      O-1
                    </CheckboxLabel>
                    <CheckboxLabel>
                      <Checkbox
                        type="radio"
                        name="visaCategory"
                        value="EB-1A"
                      />
                      EB-1A
                    </CheckboxLabel>
                    <CheckboxLabel>
                      <Checkbox
                        type="radio"
                        name="visaCategory"
                        value="EB-2 NIW"
                      />
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
                  {errors.visaCategory && touched.visaCategory && (
                    <ErrorMessage>{errors.visaCategory}</ErrorMessage>
                  )}
                </FormElementsWrapper>
              </Section>

              <Section>
                <SectionIcon>
                  <Image
                    src="/heart.png"
                    alt="Heart icon"
                    width={56}
                    height={56}
                  />
                </SectionIcon>
                <SectionTitle>How can we help you?</SectionTitle>
                <FormElementsWrapper>
                  <InputGroup>
                    <StyledTextArea
                      name="message"
                      value={values.message}
                      onChange={(e) => setFieldValue("message", e.target.value)}
                      placeholder="What is your current status and when does it expire? What is your past immigration history? Are you looking for long-term permanent residency or short-term employment visa or both? Are there any timeline considerations?"
                    />
                    {errors.message && touched.message && (
                      <ErrorMessage>{errors.message}</ErrorMessage>
                    )}
                  </InputGroup>
                </FormElementsWrapper>
              </Section>

              <FormElementsWrapper>
                {submitError && <ErrorMessage>{submitError}</ErrorMessage>}
                <SubmitButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Image
                        src="/spinner.svg"
                        alt="Loading"
                        width={20}
                        height={20}
                      />
                      Submitting...
                    </>
                  ) : (
                    "Submit"
                  )}
                </SubmitButton>
              </FormElementsWrapper>
            </form>
          );
        }}
      </Formik>
    </FormContainer>
  );
};

export default LeadForm;
