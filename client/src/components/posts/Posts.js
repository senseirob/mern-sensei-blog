import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Navbar from '../layout/Navbar';
import BlogBanner from '../layout/BlogBanner';
import TryUs from '../layout/TryUs';
import Footer from '../layout/Footer';
import { getPosts } from '../../actions/post';
import { connect } from 'react-redux';
import react_image from '../../images/react.png';

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <Fragment>
      <div class='sticky-container'>
        <Navbar />

        <BlogBanner />

        <div class='blog_section'>
          {posts.map((post) => (
            <div class='blog_post'>
              <Link link to={`/posts/${post._id}`}>
                <div class='blog_post_image'>
                  <img src={react_image} alt='react' />
                </div>
                <div class='blog_post_details'>
                  <div class='blog_post_headline'>BLOG ARTICLE</div>
                  <h5>{post.title}</h5>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <TryUs />
        <Footer />
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
