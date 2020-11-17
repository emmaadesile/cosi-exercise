import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import FormGroup from './FormGroup';
import '../styles/index.css';

const config = {
  fakeJsonApiToken: 'wjicrN7bfOLP5wzJfI-Cnw',
  url: 'https://app.fakejson.com/q',
};

const CheckinForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const history = useHistory();

  return (
    <Formik
      initialValues={{ flightNumber: '', lastName: '' }}
      validationSchema={Yup.object().shape({
        flightNumber: Yup.string().required('Flight number is required'),
        lastName: Yup.string().required('Last name is required'),
      })}
      onSubmit={async (values) => {
        setLoading(true);
        try {
          await axios({
            method: 'post',
            url: config.url,
            data: {
              token: config.fakeJsonApiToken,
              data: {
                flightNumber: 'stringAlphaNum',
                lastName: 'nameLast',
              },
            },
          }).then((res) => {
            setLoading(false);
            history.push('/info', { state: { lastName: values.lastName } });
          });
        } catch (e) {
          if (e) setError(e.message);
          setLoading(false);
          alert(e.message);
        }
      }}
    >
      {({
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        isValid,
      }) => (
        <Form>
          <h3>Welcome to your web check-in</h3>
          <FormGroup
            errors={errors}
            touched={touched}
            type="text"
            handleChange={handleChange}
            handleBlur={handleBlur}
            values={values}
            name="flightNumber"
            label="Flight Number"
          />

          <FormGroup
            errors={errors}
            touched={touched}
            type="text"
            handleChange={handleChange}
            handleBlur={handleBlur}
            values={values}
            name="lastName"
            label="Last Name"
          />

          <button className="btn" type="submit" disabled={!isValid || loading}>
            {loading ? 'Loading...' : 'Search Flight'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default CheckinForm;
