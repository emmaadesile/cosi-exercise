import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';

const config = {
  fakeJsonApiToken: 'wjicrN7bfOLP5wzJfI-Cnw',
  url: 'https://app.fakejson.com/q',
};

const ReviewForm = () => {
  const {
    state: {
      state: { values },
    },
  } = useLocation();

  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const history = useHistory();

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      await axios({
        method: 'post',
        url: config.url,
        data: {
          token: config.fakeJsonApiToken,
          data: {
            firstName: 'nameFirst',
            lastName: 'nameLast',
            nationality: 'addressCountry',
            email: 'internetEmail',
            phoneNumber: 'phoneMobile',
            country: 'addressCountry',
            city: 'addressCity',
            address: 'addressFullStreet',
            passportNumber: 'stringAlphaNum',
            birthDate: 'dateTime',
            birthPlace: 'addressCity',
            passportIssueDate: 'dateTime',
            passportExpiryDate: 'dateTime',
            passportIssueCity: 'addressCity',
            passportIssueCountry: 'addressCountry',
          },
        },
      }).then((res) => {
        console.log(res.data);
        setIsLoading(false);
        history.push('/confirmation');
      });
    } catch (e) {
      console.log(e);
      if (e) setError(e.message);
      setIsLoading(false);
      alert(e.message);
    }
  };

  return (
    <div className="reviewFormWrapper">
      <div className="reviewFormHeader">
        One more step. Please review your information before proceeding.
      </div>

      <form onSubmit={handleSubmit}>
        <div className="reviewSection">
          <h2>Personal Information</h2>
          <div>
            <h4>Full name</h4>
            <p>
              {values.firstName} {values.lastName}
            </p>
          </div>

          <div>
            <h4>Email</h4>
            <p>{values.email}</p>
          </div>

          <div>
            <h4>Nationality</h4>
            <p>{values.nationality}</p>
          </div>

          <div>
            <h4>Phone number</h4>
            <p>{values.phoneNumber}</p>
          </div>

          {['Belgium', 'France'].includes(values.nationaliy) ? (
            <div>
              <h4>Birth Date</h4>
              <p>{values.birthDate}</p>
            </div>
          ) : null}

          {['France'].includes(values.nationaliy) ? (
            <div>
              <h4>Birth Place</h4>
              <p>{values.place}</p>
            </div>
          ) : null}
        </div>

        <div className="reviewSection">
          <h2>Passport Information</h2>
          <div>
            <h4>Passport Number</h4>
            <p>{values.passportNumber}</p>
          </div>

          {['Greece'].includes(values.nationaliy) ? (
            <React.Fragment>
              <div>
                <h4>Passport Date of Issue</h4>
                <p>{values.passportIssueDate}</p>
              </div>
              <div>
                <h4>Passport country of Issue</h4>
                <p>{values.passportIssueCountry}</p>
              </div>
              <div>
                <h4>Passport city of Issue</h4>
                <p>{values.passportIssueCity}</p>
              </div>
            </React.Fragment>
          ) : null}

          {['Austria', 'Greece'].includes(values.nationaliy) ? (
            <div>
              <h4>Passport Expiry Date</h4>
              <p>{values.passportExpiryDate}</p>
            </div>
          ) : null}
        </div>

        <div className="reviewSection">
          {['Austria', 'Belgium', 'France', 'Greece', 'Spain'].includes(
            values.nationality
          ) && <h2>Residential Information</h2>}

          {['Austria', 'Belgium', 'France'].includes(values.nationality) ? (
            <React.Fragment>
              <div>
                <h4>Country</h4>
                <p>{values.country}</p>
              </div>

              <div>
                <h4>City</h4>
                <p>{values.city}</p>
              </div>
            </React.Fragment>
          ) : null}

          {['Belgium', 'Spain'].includes(values.nationaliy) ? (
            <React.Fragment>
              <div>
                <h4>Adress</h4>
                <p>{values.address}</p>
              </div>
            </React.Fragment>
          ) : null}
        </div>
        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Loading...' : 'Continue'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
