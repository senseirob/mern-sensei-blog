import React, { Fragment } from 'react';

const CallToAction = (props) => {
  return (
    <Fragment>
      <div class='promotion-container'>
        <div class='promotion-box'>
          <h3>
            Learn to program and get your first sofware job in 12 months.
            months.
          </h3>
          <p>
            If you're looking to learn skills to start your career as a software
            developer - attend my free software workshop by clicking the button
            below.
          </p>
        </div>
        <div class='free-trial'>
          <button>Start free trial</button>
        </div>
      </div>
    </Fragment>
  );
};

export default CallToAction;
