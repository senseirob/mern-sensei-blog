import React, { Fragment, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import PropTypes from 'prop-types';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import TryUs from '../layout/TryUs';
import CallToAction from '../layout/CallToAction';
import { connect } from 'react-redux';
import { getPostById } from '../../actions/post';

const Post = ({ getPostById, post: { post, loading }, match }) => {
  useEffect(() => {
    getPostById(match.params.id);
  }, [getPostById, match.params.id]);
  return (
    <Fragment>
      {post === null ? (
        <h1>loading</h1>
      ) : (
        <div className='sticky-container'>
          <Navbar />

          <div className='article-container'>
            <div className='blog-article'>
              <div className='article-headline'>
                <h1>{post.title}</h1>
                <h5>
                  This is the core imporant thing that we're talking about this
                  week.
                </h5>
              </div>
              <div className='blog-video'>
                <iframe
                  title={post.title}
                  src='https://player.vimeo.com/video/425247590'
                  width='100%'
                  height='100%'
                  allow='autoplay; fullscreen'
                  allowfullscreen
                ></iframe>
              </div>
              <div className='article'>
                <h5>summary</h5>
                {ReactHtmlParser(post.post)}
              </div>
            </div>
            <CallToAction />
          </div>
          <TryUs />
          <Footer />
        </div>
      )}
    </Fragment>
  );
};

Post.propTypes = {
  getPostById: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPostById })(Post);
