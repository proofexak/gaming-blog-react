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
    this.onImageChange = this.onImageChange.bind(this);
  }

  state = {
    title: '',
    description: '',
    content: '',
    id: undefined,
    show: false,
    title_image: undefined,
    title_image_preview: undefined,
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
        title_image: 'old',
        title_image_preview: response.data.title_image.url,
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
    const { id, title, description, content, title_image } = this.state;
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('content', content);
    if (title_image !== 'old') { formData.append('title_image', title_image); }
    if (id) {
      this.updatePost(id, formData);
    } else {
      this.createPost(formData);
    }
  }

  updatePost(postId, formData) {
    Api.createOrUpdatePost({
      formData,
      id: postId,
    }).then((response) => {
      this.setState({
        show: true,
      });
    })
    .catch((error) => {
      console.log(error.response.data.errors);
    });
  }

  createPost(formData) {
    Api.createOrUpdatePost({
      formData,
      id: null,
    }).then((response) => {
      this.setState({
        show: true,
        id: response.data.id,
      });
    })
    .catch((error) => {
      console.log(error.response.data.errors);
    });
  }

  onImageChange(e) {
    if (e.target.files.length) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      const file = e.target.files[0];
      reader.onload = () => {
        this.setState({
          title_image: file,
          title_image_preview: reader.result,
        });
      }
    };
  }

  render() {
    const { show, id, title, description, content, title_image_preview } = this.state;
    if (show) { return (<Redirect to={`/post/${id}`} />); }

    return (
      <div className="new-post">
        <form>
          <div className="form group main-image files">
            <label>Upload Your image</label>
            <input type="file" className="form-control" onChange={this.onImageChange} />
          </div>
          <div className="title-image-preview">
            <img src={title_image_preview} alt="" />
          </div>
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
                    reader.onload = function(e) {
                      cb(e.target.result, { title: file.name });
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
