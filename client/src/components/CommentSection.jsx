import { Alert, Button, Textarea, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Comment from './Comment'

const CommentSection = ({ postId }) => {
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])
    const { currentUser } = useSelector(state => state.user)
    const [commentError, setCommentError] = useState('')



    // =================================================
    // FETCH POST COMMENTS 
    // =================================================
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await fetch(`/api/comment/getPostComments/${postId}`);
                const data = await res.json()
                if (res.ok) {
                    setComments(data)
                }
                if (!res.ok) {
                    console.log(data.message)
                }
            } catch (error) {
                console.log(error.message)
            }


        }
        fetchComments();
    }, [postId])
    // =================================================
    // SUBMIT FUNCTION
    // =================================================
    const handleSumbit = async (e) => {
        e.preventDefault();
        if (comment.length > 200) {
            return
        }
        setCommentError('')
        try {
            const res = await fetch('/api/comment/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: comment,
                    postId,
                    userId: currentUser._id,
                }),
            });
            const data = await res.json();
            console.log('data', data)
            if (res.ok) {
                setComment('');
                setCommentError('')
                setComments([data, ...comments])
                console.log('data:', data)
            }
            if (!res.ok) {
                setCommentError(data.message)
            }

        } catch (error) {
            setCommentError(error.message)
        }

    }
    return (
        <div className='max-w-2xl mx-auto w-full p-3'>
            {currentUser ?
                (
                    <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
                        <p>Signed in as:</p>
                        <img
                            className='h-6 w-6 object-cover rounded-full'
                            src={currentUser.profilePicture} alt={currentUser.username} />
                        <Link to={'/dashboard?tab=profile'} className='text-cyan-600 hover:underline'>@{currentUser.username}</Link>
                    </div>

                ) : (
                    <div className="text-sm text-teal-500 my-5 flex gap-1">
                        You must be signed in to comment.
                        <Link to={'/sign-in'} className='text-cyan-600 hover:underline'>
                            Login</Link>
                    </div>
                )
            }

            {currentUser &&
                <form onSubmit={handleSumbit} className='border border-teal-500 p-3 rounded-md' >
                    <Textarea
                        placeholder='Add a comment'
                        rows='3'
                        maxLength='200'
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                    />
                    <div className='flex justify-between items-center mt-5'>
                        <p>
                            {200 - comment.length} char remaining
                        </p>
                        <Button outline gradientDuoTone='purpleToPink' type='submit'>Submit</Button>
                    </div>
                    {commentError &&
                        <Alert color='failure' className='mt-5'>{commentError}</Alert>
                    }

                </form>
            }
            {comments.length == 0 ? (
                <p className='text-sm my-5'>No comments yet!</p>
            ) : (
                <>
                    <div className='text-sm my-5 flex items-center gap-1'>
                        <p>Comments</p>
                        <div className='border border-gray-400 py-1 px-2 rounded-sm'>
                            <p>{comments.length}</p>
                        </div>
                    </div>
                    {comments.map((comment) => (<Comment key={comment._id} comment={comment} />))}
                </>

            )}

        </div>
    )
}

export default CommentSection
