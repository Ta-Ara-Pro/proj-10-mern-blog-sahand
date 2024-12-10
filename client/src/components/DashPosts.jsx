import { Table, TableBody, TableCell, TableHead, TableRow } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const DashPosts = () => {
  const { currentUser } = useSelector(state => state.user)
  const [userPosts, setUserPosts] = useState([])
  console.log('user posts:', userPosts)
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`)
        const data = await res.json()
        console.log(data)
        if (res.ok) {
          setUserPosts(data.posts)
        }
      } catch (error) {

      }
    };
    if (currentUser.isAdmin) { fetchPosts() }
  }, [currentUser._id])
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3
    scrollbar scrollbar-track-slate-100 scrollbar-thumb-300
    dark:scrollbar-track-slate-700 dark:scrollbar-thumb-500'>
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <TableHead>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Post image</Table.HeadCell>
              <Table.HeadCell>Post title</Table.HeadCell>
              <Table.HeadCell>Category </Table.HeadCell>
              <Table.HeadCell>Delete </Table.HeadCell>
              <Table.HeadCell><span>Edit</span> </Table.HeadCell>
            </TableHead>
            {userPosts.map((post) => (
              <Table.Body className='divide-y'>
                <TableRow className='dark:border-gray-700 dark:bg-gray-800'>
                  <TableCell>{new Date(post.updatedAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Link to={`/post/${post.slug}`}>
                      <img src={post.image} alt={post.title} className='w-20 h-10 object-cover bg-gray-500' /></Link>
                  </TableCell>
                  <TableCell>
                    <Link to={`/post/${post.slug}`} className='font-medium text-gray-900 dark:text-white'>
                    {post.title}
                    </Link>
                  </TableCell>
                  <TableCell>{post.category}</TableCell>
                  <TableCell><span className='font-medium text-red-500 hover:underline cursor-pointer'>Delete</span></TableCell>
                  <TableCell><span>
                    <Link to={`/update-post/${post._id}`} className='text-teal-500 hover:underline'>Edit</Link>
                    </span></TableCell>

                </TableRow>
              </Table.Body>
            ))}
          </Table>
        </>
      ) : (
        <p>no posts!</p>
      )}
    </div>
  )
}

export default DashPosts
