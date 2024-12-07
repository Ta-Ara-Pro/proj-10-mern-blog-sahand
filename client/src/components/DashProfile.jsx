import { Alert, Button, TextInput } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import {useSelector} from 'react-redux'
import axios from 'axios';

const DashProfile = () => {
    const {currentUser} = useSelector(state => state.user)
    const [imageFile, setImageFile] = useState(null)
    const [imageFileUrl,setImageFileUrl ] = useState(null)

    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  
    const filePickerRef = useRef()


    const uploadImage = async (imageFile) => {
      if (!imageFile) return;

      setImageFileUploadError(null)

      const fileName = `${new Date().getTime()}_${imageFile.name}`;
    
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('public_id', fileName);
    
      try {
        const response = await fetch('api/user/cloudinary', {
          method: 'POST',
          body: formData,
          headers: {
            // No need to specify `Content-Type`; fetch will automatically set it for `FormData`.
          },
        });
    
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
    
        const data = await response.json();
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
    

    useEffect(() => {
      if (imageFile) {
        uploadImage(imageFile)

        console.log('imagefile :',imageFile)

      }
    },[imageFile])

    const handleImageChange = (e) => {
      const file = e.target.files[0]
      if (file) {
        setImageFile(file)
        setImageFileUrl(URL.createObjectURL(file))
      }
      }
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
        <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
        <form className='flex flex-col gap-4'>
          <input type='file'accept='image/*' onChange={handleImageChange} hidden ref={filePickerRef}/>
            <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
            onClick={() => filePickerRef.current.click()}>
                 <img src={imageFileUrl || currentUser.profilePicture} alt='userImage' 
            className='rounded-full w-full h-full object-cover border-8 border-[lightgray]'/>
            </div>
            {imageFileUploadError && <Alert color='failure'> {imageFileUploadError}</Alert>}
            <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username} />
            <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email} />
            <TextInput type='password' id='password' placeholder='password'  />
           <Button type='submit' gradientDuoTone='purpleToBlue' outline>
            Update
           </Button>
        </form>
        <div className='text-red-500 flex justify-between mt-4'>
            <span className='cursor-pointer'>Delete Account</span>
            <span className='cursor-pointer'>Sign Out</span>
        </div>
      
    </div>
  )
}

export default DashProfile
