'use client';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { API_URL } from '@/utils/api';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const schema = yup
  .object({
    name: yup.string().required().label("Name"),
    email: yup.string().required().email().label("Email"),
    message: yup.string().required().label("Message"),
  })
  .required();


// blogId is optional – when passed, the comment is associated with a specific blog post.
const CommentForm = ({ blogId }: { blogId?: string }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [isFocused3, setIsFocused3] = useState(false);

  const { register, handleSubmit, reset, formState: { errors }, } = useForm<FormData>({ resolver: yupResolver(schema), });
  const onSubmit = async (data: FormData) => {
    try {
      const body: any = { name: data.name, email: data.email, comment: data.message };
      if (blogId) body.blogId = blogId;

      const response = await fetch(`${API_URL}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const resData = await response.json();
      if (response.ok) {
        toast.success(resData.message || "Comment submitted! It will appear after moderation.");
        reset();
        setIsFocused(false);
        setIsFocused2(false);
        setIsFocused3(false);
      } else {
        toast.error(resData.message || "Failed to submit comment.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };



  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleFocus2 = () => {
    setIsFocused2(true);
  };
 const handleFocus3 = () => {
    setIsFocused3(true);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.target.value === '') {
      setIsFocused(false);
    }
  };
  const handleBlur2 = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.target.value === '') {
      setIsFocused2(false);
    }
  };
  const handleBlur3 = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.target.value === '') {
      setIsFocused3(false);
    }
  };


 

  return (
    <>
      <div className="postbox__comment-form">
        <h3 className="postbox__comment-form-title">Leave a Reply</h3>
        <form className="box" onSubmit={handleSubmit(onSubmit)}>
          <div className="row gx-20">
            <div className="col-xxl-6 col-xl-6 col-lg-6">
              <div className="postbox__comment-input mb-35">
                <input type="text" className="inputText" {...register('name')} onFocus={handleFocus} onBlur={handleBlur}  />
                <span className={`floating-label ${isFocused ? 'floating-label-floated' : ''}`}>Your  Name</span> 
                <p className="form_error">{errors.name?.message}</p>
              </div>
            </div>
            <div className="col-xxl-6 col-xl-6 col-lg-6">
              <div className="postbox__comment-input mb-35">
                <input type="text" className="inputText" {...register('email')} onFocus={handleFocus2} onBlur={handleBlur2}   /> 
                <span className={`floating-label ${isFocused2 ? 'floating-label-floated' : ''}`}>Your  Email</span> 
                <p className="form_error">{errors.email?.message}</p>
              </div>
            </div>
            <div className="col-xxl-12">
              <div className="postbox__comment-input mb-20">
                <textarea className="textareaText" {...register('message')} onFocus={handleFocus3} onBlur={handleBlur3} ></textarea> 
                <span className={`floating-label-2 ${isFocused3 ? 'floating-label-floated' : ''}`}>Your  Comment</span> 
                <p className="form_error">{errors.message?.message}</p>
              </div>
            </div>
            <div className="col-xxl-12">
              <div className="postbox__comment-agree">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                  <label className="form-check-label" htmlFor="flexCheckDefault">
                    I agree that my submitted data is being collected and stored.
                  </label>
                </div>
              </div>
            </div>
            <div className="col-xxl-12">
              <div className="postbox__comment-btn">
                <button type="submit" className="tp-btn-white-lg">
                  <span>
                    <i>Post comment</i>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

    </>
  );
};

export default CommentForm;