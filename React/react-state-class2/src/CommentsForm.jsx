import { useState } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './CommentsForm.css';

export default function CommentsForm({ addNewComment }) {
    const validationSchema = Yup.object({
        username: Yup.string()
            .required('Username is required')
            .min(3, 'Username must be at least 3 characters'),
        remarks: Yup.string()
            .required('Remarks are required')
            .min(5, 'Remarks must be at least 5 characters'),
        rating: Yup.number()
            .required('Rating is required')
            .min(1, 'Rating must be between 1 and 5')
            .max(5, 'Rating must be between 1 and 5')
    });

    const formik = useFormik({
        initialValues: {
            username: '',
            remarks: '',
            rating: 5,
        },
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            addNewComment(values);
            resetForm();
        },
    });

    return (
        <div className="comments-form">
            <h4>Give a Comment</h4>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input 
                        className="form-input"
                        placeholder="username" 
                        type="text" 
                        value={formik.values.username} 
                        onChange={formik.handleChange} 
                        id="username" 
                        name="username"
                    />
                    {formik.errors.username && 
                        <p className="error-message">{formik.errors.username}</p>
                    }
                </div>

                <div className="form-group">
                    <label htmlFor="remarks">Remarks</label>
                    <textarea 
                        className="form-input"
                        value={formik.values.remarks} 
                        placeholder="add few Remarks" 
                        onChange={formik.handleChange} 
                        id="remarks" 
                        name="remarks">Remarks</textarea>
                    {formik.errors.remarks && 
                        <div className="error-message">{formik.errors.remarks}</div>
                    }
                </div>

                <div className="form-group">
                    <label htmlFor="rating">Rating</label>
                    <input 
                        className="rating-input"
                        placeholder="rating" 
                        type="number"  
                        min={1} max={5} 
                        value={formik.values.rating} 
                        onChange={formik.handleChange} 
                        id="rating" 
                        name="rating"/>
                    {formik.errors.rating && 
                        <div className="error-message">{formik.errors.rating}</div>
                    }
                </div>

                <button type="submit" className="submit-button">Add Comment</button>
            </form>
        </div>
    )
}