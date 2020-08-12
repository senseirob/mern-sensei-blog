import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
  return (
    <Fragment>
      <div className='navigation'>
        <div className='navigation-assets'>
          <div className='nav-bar-logo'>
            <h4>
              <a href='#!'>SoftwareSensei.com</a>
            </h4>
          </div>
          <div className='nav-bar-right'>
            <ul>
              <li>
                <a href='#!'>Courses</a>
              </li>
              <li>
                <a href='#!'>Reviews</a>
              </li>
              <li>
                <a href='#!'> Resources</a>
              </li>
              <li>
                <Link to='/login'>
                  <a href='#!'>Login</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Navbar;
