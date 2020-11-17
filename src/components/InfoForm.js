import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import FormGroup from './FormGroup';
import countries from '../data/countries.json';
import '../styles/index.css';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  nationality: Yup.string().required('Nationality is required'),
  email: Yup.string().email().required('Email is required'),
  phoneNumber: Yup.string().required('Phone number is required'),
  passportNumber: Yup.string().required('Passport number is required'),
  country: Yup.string()
    .when('nationality', {
      is: 'Austria',
      then: Yup.string().required('Country is required'),
    })
    .when('nationality', {
      is: 'Belgium',
      then: Yup.string().required('Country is required'),
    })
    .when('nationality', {
      is: 'France',
      then: Yup.string().required('Country is required'),
    }),
  city: Yup.string()
    .when('nationality', {
      is: 'Austria',
      then: Yup.string().required('City is required'),
    })
    .when('nationality', {
      is: 'Belgium',
      then: Yup.string().required('City is required'),
    })
    .when('nationality', {
      is: 'France',
      then: Yup.string().required('City is required'),
    }),
  passportIssueDate: Yup.date().when('nationality', {
    is: 'Greece',
    then: Yup.date().required('Passport issue date is required'),
  }),
  passportIssueCountry: Yup.string().when('nationality', {
    is: 'Greece',
    then: Yup.string().required('Passport country of issue is required'),
  }),
  passportIssueCity: Yup.string().when('nationality', {
    is: 'Greece',
    then: Yup.string().required('Passport city of issue is required'),
  }),
  passportExpiryDate: Yup.date()
    .when('nationality', {
      is: 'Greece',
      then: Yup.date().required('Passport expiry date is required'),
    })
    .when('nationality', {
      is: 'Austria',
      then: Yup.date().required('Passport expiry date is required'),
    }),
  address: Yup.string()
    .when('nationality', {
      is: 'Belgium',
      then: Yup.string().required('Address is required'),
    })
    .when('nationality', {
      is: 'Spain',
      then: Yup.string().required('Address is required'),
    }),
  birthDate: Yup.date()
    .when('nationality', {
      is: 'Belgium',
      then: Yup.date().required('Birth date is required'),
    })
    .when('nationality', {
      is: 'France',
      then: Yup.date().required('Birth date is required'),
    }),
  birthPlace: Yup.string().when('nationality', {
    is: 'France',
    then: Yup.string().required('Birth place is requied'),
  }),
  checked: Yup.boolean().required('Please accept terms and conditions'),
});

const InfoForm = () => {
  const {
    state: {
      state: { lastName },
    },
  } = useLocation();

  const [editingForm, setEditingForm] = useState(false);
  const history = useHistory();

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        nationality: '',
        email: '',
        country: '',
        city: '',
        address: '',
        phoneNumber: '',
        passportNumber: '',
        birthDate: '',
        birthPlace: '',
        checked: false,
        passportIssueCity: '',
        passportIssueCountry: '',
        passportIssueDate: '',
        passportExpiryDate: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        history.push('/review', { state: { values } });
      }}
    >
      {({
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          <header>
            <h2>Hi {lastName},</h2>
            <p>Fill the form to complete your check-in</p>
          </header>

          <div className="form-section">
            <p>Personal Information</p>
          </div>
          <FormGroup
            errors={errors}
            touched={touched}
            type="text"
            handleChange={handleChange}
            handleBlur={handleBlur}
            values={values}
            label="First Name"
            name="firstName"
          />

          <FormGroup
            errors={errors}
            touched={touched}
            type="text"
            handleChange={handleChange}
            handleBlur={handleBlur}
            values={values}
            label="Last Name"
            name="lastName"
          />

          <div className="form-group">
            <label htmlFor="nationality">Nationality</label>
            <Field
              as="select"
              id="nationality"
              name="nationality"
              onBlur={handleBlur}
              onChange={handleChange}
              className={
                errors.nationality && touched.nationality
                  ? 'border_red'
                  : 'text-input'
              }
              multiple={false}
            >
              <option value="Not selected"></option>
              {countries.map((country, index) => (
                <option key={index} value={country.name}>
                  {country.name}
                </option>
              ))}
            </Field>{' '}
            {errors.nationality && touched.nationality && (
              <div className="input-feedback">{errors.nationality}</div>
            )}
          </div>

          <FormGroup
            errors={errors}
            touched={touched}
            type="text"
            handleChange={handleChange}
            handleBlur={handleBlur}
            values={values}
            label="Email"
            name="email"
          />

          <FormGroup
            errors={errors}
            touched={touched}
            type="text"
            handleChange={handleChange}
            handleBlur={handleBlur}
            values={values}
            label="Phone Number"
            name="phoneNumber"
          />

          {['Belgium', 'France'].includes(values.nationality) ? (
            <FormGroup
              errors={errors}
              touched={touched}
              type="date"
              handleChange={handleChange}
              handleBlur={handleBlur}
              values={values}
              label="Birth Date"
              name="birthDate"
            />
          ) : null}

          {values.nationality === 'France' && (
            <>
              <FormGroup
                errors={errors}
                touched={touched}
                type="text"
                handleChange={handleChange}
                handleBlur={handleBlur}
                values={values}
                label="Birth place"
                name="birthPlace"
              />
            </>
          )}

          <div className="form-section">
            <p>Passport Information</p>
          </div>

          <FormGroup
            errors={errors}
            touched={touched}
            type="text"
            handleChange={handleChange}
            handleBlur={handleBlur}
            values={values}
            label="Passport Number"
            name="passportNumber"
          />

          {values.nationality === 'Greece' && (
            <React.Fragment>
              <FormGroup
                errors={errors}
                touched={touched}
                type="date"
                handleChange={handleChange}
                handleBlur={handleBlur}
                values={values}
                label="Passport Issue Date"
                name="passportIssueDate"
              />

              <FormGroup
                errors={errors}
                touched={touched}
                type="text"
                handleChange={handleChange}
                handleBlur={handleBlur}
                values={values}
                label="Passport Country of Issue"
                name="passportIssueCountry"
              />

              <FormGroup
                errors={errors}
                touched={touched}
                type="text"
                handleChange={handleChange}
                handleBlur={handleBlur}
                values={values}
                label="Passport City of Issue"
                name="passportIssueCity"
              />
            </React.Fragment>
          )}

          {['Austria', 'Greece'].includes(values.nationality) ? (
            <FormGroup
              errors={errors}
              touched={touched}
              type="date"
              handleChange={handleChange}
              handleBlur={handleBlur}
              values={values}
              label="Passport Expiry Date"
              name="passportExpiryDate"
            />
          ) : null}

          {['Austria', 'Belgium', 'France', 'Spain'].includes(
            values.nationality
          ) ? (
            <div className="form-section">
              <p>Residential Information</p>
            </div>
          ) : null}

          {['Austria', 'Belgium', 'France'].includes(values.nationality) ? (
            <React.Fragment>
              <FormGroup
                errors={errors}
                touched={touched}
                type="text"
                handleChange={handleChange}
                handleBlur={handleBlur}
                values={values}
                label="Country"
                name="country"
              />

              <FormGroup
                errors={errors}
                touched={touched}
                type="text"
                handleChange={handleChange}
                handleBlur={handleBlur}
                values={values}
                label="City"
                name="city"
              />
            </React.Fragment>
          ) : null}

          {['Belgium', 'Spain'].includes(values.nationality) ? (
            <FormGroup
              errors={errors}
              touched={touched}
              type="text"
              handleChange={handleChange}
              handleBlur={handleBlur}
              values={values}
              label="Address"
              name="address"
            />
          ) : null}

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <input
              type="checkbox"
              name="checked"
              value={values.checked}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <label className="tandCLabel">Accept Terms & Conditions</label>
          </div>

          {!values.checked && touched.checked && (
            <div className="input-feedback">
              Please accept terms and conditions
            </div>
          )}

          <div className="btn-group">
            {editingForm && (
              <button
                className="btn btn-edit"
                onClick={() =>
                  setEditingForm((previoustate) => !previoustate.editingForm)
                }
              >
                Edit
              </button>
            )}
            <button className="btn" type="submit">
              Next
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default InfoForm;
