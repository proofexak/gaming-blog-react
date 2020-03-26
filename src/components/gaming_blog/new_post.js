import React from 'react';
import * as Api from '../shared/api';
import { Editor } from '@tinymce/tinymce-react';
import { Redirect } from 'react-router-dom';

class NewPost extends React.Component {
  constructor(props){
    super(props);

    this.onTextChange = this.onTextChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.getPost = this.getPost.bind(this);
  }

  state = {
    title: '',
    description: '',
    content: '',
    id: undefined,
    show: false,
  }

  componentDidMount() {
    const postId = parseInt(this.props.match.params.id, 10);
    if (postId) { this.getPost(postId); }
  }

  getPost(postId) {
    Api.makeGetRequest({
      url: `/api/posts/${postId}`,
    }).then((response) => {
      this.setState({
        id: response.data.id,
        title: response.data.title,
        description: response.data.description,
        content: response.data.content,
      });
    })
  }

  handleEditorChange = (content, editor) => {
    this.setState({
      content,
    });
  }

  onTextChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSave() {
    const { id } = this.state;
    const params = {
      post: {
        ...this.state,
      }
    }
    delete params['post']['show'];
    if (id) {
      this.updatePost(params);
    } else {
      this.createPost(params);
    }
  }

  updatePost(params) {
    const postId = params['post']['id'];
    delete params['post']['id'];
    Api.makePutRequest({
      url: `/api/posts/${postId}`,
      body: params,
    }).then((response) => {
      this.setState({
        show: true,
      });
    });
  }

  createPost(params) {
    Api.makePostRequest({
      url: '/api/posts',
      body: params,
    }).then((response) => {
      this.setState({
        show: true,
        id: response.data.id,
      });
    })
  }

  render() {
    const { show, id, title, description, content } = this.state;
    if (show) { return (<Redirect to={`/post/${id}`} />); }

    return (
      <div className="new-post">
        <form>
          <div className="form-group half-container">
            <input type="text" className="form-control" placeholder="Title" name='title' value={title} onChange={this.onTextChange} />
          </div>
          <div className="form-group half-container">
            <textarea type="textarea" className="form-control" placeholder="Description" name='description' value={description} onChange={this.onTextChange} />
          </div>
          <div className="form-group">
            <Editor
              value={content}
              init={{
                height: 500,
                menubar: true,
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount'
                ],
                toolbar:
                  'image | undo redo | formatselect | bold italic backcolor | ' +
                  'alignleft aligncenter alignright alignjustify | ' +
                  'bullist numlist outdent indent | removeformat | help',
                image_title: true,
                automatic_uploads: true,
                content_css: '//www.tiny.cloud/css/codepen.min.css',
                file_picker_types: 'image',
                file_picker_callback: function (cb, value, meta) {
                  var input = document.createElement('input');
                  input.setAttribute('type', 'file');
                  input.setAttribute('accept', 'image/*');

                  input.onchange = function () {
                    var file = this.files[0];
                    var reader = new FileReader();
                    reader.onload = function () {
                      var id = 'blobid' + (new Date()).getTime();
                      var base64 = reader.result.split(',')[1];
                      var blobCache = window.tinymce.activeEditor.editorUpload.blobCache;
                      var blobInfo = blobCache.create(id, file, base64);

                      cb(blobInfo.blobUri(), { title: file.name });
                    };
                    reader.readAsDataURL(file);
                  };
                  input.click();
                }
              }}
              onEditorChange={this.handleEditorChange}
            />
          </div>
        </form>
        <button className="btn btn-primary" onClick={this.onSave}>
          Save
        </button>
      </div>
    );
  }
}

export default NewPost;
