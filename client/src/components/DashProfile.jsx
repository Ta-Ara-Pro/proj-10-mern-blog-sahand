import { Alert, Button, TextInput } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { updateSuccess, updateFailure, updateStart } from '../redux/user/userSlice'
import { useDispatch } from 'react-redux'
import axios from 'axios';

const DashProfile = () => {
  const { currentUser } = useSelector(state => state.user)
  const { error } = useSelector(state => state.user)
  const [imageFile, setImageFile] = useState(null)
  const [imageFileUrl, setImageFileUrl] = useState(null)

  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);

  const [formData, setFormData] = useState({})
  const filePickerRef = useRef()
  const dispatch = useDispatch()



  console.log('imagefile :', imageFile)
// =================================================
// =================================================
  useEffect(() => {
    if (imageFile) {
      uploadImage()
      console.log('imagefile :', imageFile)
    }
  }, [imageFile])

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      // setImageFileUrl(URL.createObjectURL(file))
    }
  }
  const uploadImage = async () => {
    if (!imageFile) return;
    setImageFileUploadError(null)

    const fileName = `${new Date().getTime()}_${imageFile.name}`;

    const image = new FormData();
    image.append('file', imageFile);
    image.append('public_id', fileName);

    try {
      const response = await fetch('api/user/cloudinary', {
        method: 'POST',
        body: image,
        headers: {
          // No need to specify `Content-Type`; fetch will automatically set it for `Image`.
        },
      });

      if (!response.ok) {
        console.error('Error uploading image:', response);
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      setImageFileUrl(data.url)
      setFormData({ ...formData, profilePicture: data.url })
      console.log('Image uploaded successfully:', data);
      // Example: Update the image URL state if needed
      // setImageUrl(data.url);
    } catch (error) {
      console.error('Error uploading image:', error);
      setImageFileUploadError('Could not upload image. check the image format and size')
      setImageFile(null)
      setImageFileUrl(null)
    }
  };

// =================================================
// =================================================
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }
// =================================================
// =================================================
  const [updateUserError, setUpdateUserError] = useState(null);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) { // the way to ckeck the length of a content of an objedt
      setUpdateUserError('No changes made');
      return;
    }
    console.log('formData:', formData)
    try {
      dispatch(updateStart())
      const response = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      console.log(' request data:', JSON.stringify(formData))
      const data = await response.json()
      console.log('updated data:', data)
      if (!data.ok) {
        dispatch(updateFailure(data.message))
        setUpdateUserError(`Failed to update user profile: ${data.message}`)
        console.log('error updating user:', data.message)
        console.log('failed data:', data)
      } else {
        dispatch(updateSuccess(data))
        setUpdateUserSuccess("User's profile updated successfully")
        console.log('updated  successfully')
      }
    } catch (error) {
      dispatch(updateFailure(error.message))
      setUpdateUserError(`Error updating user: ${error.message}`)
    }

  }
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type='file' accept='image/*' onChange={(e) => handleImageChange(e)} hidden ref={filePickerRef} />
        <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
          onClick={() => filePickerRef.current.click()}>
          <img src={imageFileUrl || currentUser.profilePicture} alt='user'
            className='rounded-full w-full h-full object-cover border-8 border-[lightgray]' />
        </div>
        {imageFileUploadError && <Alert color='failure'> {imageFileUploadError}</Alert>}
        <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username} onChange={handleChange} />
        <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email} onChange={handleChange} />
        <TextInput type='password' id='password' placeholder='password' onChange={handleChange} />
        <Button type='submit' gradientDuoTone='purpleToBlue' outline>
          Update
        </Button>
      </form>
      <div className='text-red-500 flex justify-between mt-4'>
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer'>Sign Out</span>
      </div>
      {updateUserSuccess && (
        <Alert color='success' className='mt-5'>{updateUserSuccess}</Alert>
      )}
      {updateUserError && 
       <Alert color='failure' className='mt-5'>{updateUserError}</Alert>
      }

    </div>
  )
}

export default DashProfile
