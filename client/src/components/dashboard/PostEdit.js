import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPostById, deletePost, updatePost } from '../../actions/post';
import { Link, withRouter } from 'react-router-dom';
import CKEditor from '@ckeditor/ckeditor5-react';
// import CKEditor from 'react-ckeditor-component';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const initialState = {
  title: '',
  post: '',
  author: '',
  tags: '',
  video: '',
  image: '',
};

const PostEdit = ({
  getPostById,
  updatePost,
  deletePost,
  post: { post, loading },
  history,
  match,
}) => {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (!post) getPostById(match.params.id);
    if (!loading && post) {
      const postData = { ...initialState };
      for (const key in post) {
        if (key in postData) postData[key] = post[key];
      }
      setFormData(postData);
    }
  }, [loading, getPostById, match.params.id, post]);

  const { title, _post, tags, video, image } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onChangeCKEditor = (e, editor) => {
    const data = editor.getData();
    setFormData({
      ...formData,
      post: data,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updatePost(formData, history, match.params.id);
  };

  const onDeletePost = (e) => {
    console.log('onDeletePost method running');
    deletePost(history, match.params.id);
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
                  value={_post}
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
              <div className='edit-left'>
                <h3>
                  <Link>
                    <p onClick={(e) => onDeletePost(e)}>delete</p>
                  </Link>
                </h3>
              </div>
              <div className='edit-right'>
                <input type='submit' />
              </div>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

PostEdit.propTypes = {
  getPostById: PropTypes.func.isRequired,
  updatePost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, {
  getPostById,
  deletePost,
  updatePost,
})(withRouter(PostEdit));
