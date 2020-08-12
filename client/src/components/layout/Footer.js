import React, { Fragment } from 'react';

const Footer = (props) => {
  return (
    <Fragment>
      <div class='footer'>
        <div class='footer_box footer_1'>
          <h5>Company</h5>
          <p>Our story</p>
          <p>Our philosophy</p>
          <p>Our company</p>
        </div>
        <div class='footer_box footer_2'>
          <h5>Courses</h5>
          <p>Methodology</p>
          <p>Zero To Developer</p>
          <p>Uplevel</p>
          <p>Mastermind</p>
        </div>
        <div class='footer_box footer_3'>
          <h5>Resources</h5>
          <p>Blog</p>
          <p>Customer Service</p>
        </div>
        <div class='footer_box footer_4'>
          <h5>Extras</h5>
          <p>Free Trial</p>
          <p>Free Webinar</p>
          <p>Free Community</p>
        </div>
      </div>
    </Fragment>
  );
};

export default Footer;
