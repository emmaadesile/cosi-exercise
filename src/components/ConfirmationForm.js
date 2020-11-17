import React from 'react';
import { Link } from 'react-router-dom';

const ConfirmationForm = () => (
  <form>
    <div className="confirmed">
      <p>Your check-in is confirmed 👍</p>

      <Link to="/">
        <button className="btn">Go Home</button>
      </Link>
    </div>
  </form>
);

export default ConfirmationForm;
