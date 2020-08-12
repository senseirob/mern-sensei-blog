import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../../actions/post';
import PropTypes from 'prop-types';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Postcreate = ({ createPost, history }) => {
  const [formData, setFormData] = useState({
    title: '',
    post: '',
    author: '',
    tags: '',
    video: '',
    image: '',
  });

  const { title, post, tags, video, image } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const onChangeCKEditor = (e, editor) => {
    const data = editor.getData();
    setFormData({
      ...formData,
      post: data,
    });
    console.log(formData);
  };

  const onSubmit = (e) => {
    console.log('onsubmit working');
    e.preventDefault();
    createPost(formData, history);
  };

  return (
    <Fragment>
      <div className='blog-container'>
        <div className='additional-container'>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className='blog-section headline-section'>
              <div className='headline-left'>
                <h1>Create a new blog article</h1>
              </div>
              <div className='headline-right'>
                <Link to='/dashboard'>
                  <button>Back</button>
                </Link>
              </div>
            </div>
            <div className='blog-section'>
              <div className='blog-section-headline'>
                <h3>Title</h3>
              </div>
              <div className='blog-section-body'>
                <textarea
                  name='title'
                  value={title}
                  onChange={(e) => onChange(e)}
                ></textarea>
              </div>
            </div>
            <div className='blog-section'>
              <div className='blog-section-headline'>
                <h3>Post</h3>
              </div>
              <div className='blog-section-body'>
                <CKEditor
                  id='blog-body'
                  name='post'
                  value={post}
                  editor={ClassicEditor}
                  onChange={onChangeCKEditor}
                />
              </div>
            </div>

            {/*     -----------------------------        */}

            <div className='blog-section'>
              <div className='blog-section-headline'>
                <h3>Tags</h3>
              </div>
              <div className='blog-section-body'>
                <textarea
                  name='tags'
                  value={tags}
                  onChange={(e) => onChange(e)}
                ></textarea>
              </div>
              {/*     -----------------------------        */}
            </div>
            <div className='blog-section'>
              <div className='blog-section-headline'>
                <h3>Video URL</h3>
              </div>
              <div className='blog-section-body'>
                <textarea
                  name='video'
                  value={video}
                  onChange={(e) => onChange(e)}
                ></textarea>
              </div>
            </div>

            {/*     -----------------------------        */}

            <div className='blog-section'>
              <div className='blog-section-headline'>
                <h3>Image</h3>
              </div>
              <div className='blog-section-body'>
                <textarea
                  name='image'
                  value={image}
                  onChange={(e) => onChange(e)}
                ></textarea>
              </div>
            </div>
            {/*     -----------------------------        */}
            <div className='blog-footer'>
              <div className='edit-left'></div>
              <div className='edit-right'>
                <button>create</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

Postcreate.propTypes = {
  createPost: PropTypes.func.isRequired,
};

export default connect(null, { createPost })(withRouter(Postcreate));
