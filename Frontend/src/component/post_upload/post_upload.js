import React, { useState, useEffect } from 'react';
import "./post.css"
import { useNavigate, useParams } from 'react-router-dom';


import { Input, Button } from 'antd';
import Footer from '../footer/footer';
import { url } from '../../config/api';

const { TextArea } = Input;

const PostUpload = ({ }) => {
  const navigate = useNavigate()
  const { postId } = useParams()
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("")

  const handlePost = () => {
    if (postId) {
      url.put(`post/update_post/${postId}/`, {
        title,
        content: value
      }).then(res => {
        navigate("/")
      }).catch(err => {
        alert(err.message)
      })
    }
    else {
      url.post("post/create_post/", {
        title,
        content: value
      }).then(res => {
        navigate("/")
      }).catch(err => {
        alert(err.message)
      })
    }
  }
  useEffect(() => {
    if (postId) {
      url.get(`post/get/${postId}`).then(res => {
        setValue(res.data.content)
        setTitle(res.data.title)
      }).catch(err => {
        alert("Invalid Id");
        navigate("/")
      })
    }
  }, [])


  return (

    <div className='post_main_container'>
      <div className='post_inner_container'>
        <TextArea placeholder="Title" value={title} autoSize onChange={e => {
          setTitle(e.target.value)
        }} />
        <div style={{ margin: '24px 0' }} />

        <TextArea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Content"
          autoSize={{ minRows: 3, maxRows: 5 }}
        />
        <Button type="primary" onClick={handlePost}>
          {!postId ? "Post" : "Update"}
        </Button>
      </div>

      <Footer />
    </div>
  );
};

export default PostUpload;