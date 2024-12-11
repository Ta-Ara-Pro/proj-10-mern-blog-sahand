import { Button, Spinner } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CallToAction from '../components/CallToAction';

const PostPage = () => {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  const [post, setPost] = useState(null);

  console.log(post)
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true)
          setLoading(false);
          console.log(data.message)
          return;
        }
        if (res.ok) {
          setPost(data.posts[0])
          setError(false)
          setLoading(false)
          console.log(data)
        }

      } catch (error) {
        setLoading(false);
        setError(true)
        console.log(error)
      }
    }
    fetchPost()

  }, [postSlug])
  if (loading) return (
    <div className='flex justify-center items-center min-h-screen'>
      <Spinner size='xl' />
    </div>
  )

  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
      <h1 className='text-3xl mt-10 p-3 text-center font-serif
      max-w-2xl mx-auto lg:text-4xl'>
        {post?.title}
      </h1>

      <Link to={`/search?category=${post && post.category}`}
        className='self-center mt-5'>
        <Button color='gray' pill size='xs'>
          {post && post.category}
        </Button>
      </Link>

      <img src={post?.image} alt={post?.title}
        className='mt-10 p-3 max-h-[600px] w-full object-cover max-w-5xl mx-auto' />
      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full text-s max-w-4xl">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span>
          {post && (post.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>

      <div
        className='p-3 max-w-2xl mx-auto w-full post-content'
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      >
      </div>

      <div className="max-w-4xl mx-auto w-full"></div>
<CallToAction />

    </main>
  )
}

export default PostPage