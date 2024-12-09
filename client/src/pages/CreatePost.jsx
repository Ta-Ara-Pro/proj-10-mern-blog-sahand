import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import React, { useState } from 'react'

const CreatePost = () => {
  const [formData, setFormData] = useState({})

  // =================================================
  // IMAGE UPLOAD HANDLER
  // =================================================
  const [postImage, setPostImage] = useState(null);
  const [imageUrl, setImageUrl ] = useState(null)
  const [imageUploadError, setImageUploadError] = useState(null)
  const [ imageUploadLoading, setImageUploadLoading] = useState(false)

  const handlefileChange = (e) => {
    const file = e.target.files[0];
    setPostImage(file)
  }
  
  const uploadImage = async() => {
    if (!postImage){
      return setImageUploadError('please choose an image')
    } 
      setImageUploadError(null)
      const fileName = `${new Date().getTime()}_${postImage.name}`
      const banner = new FormData();
      banner.append('file',postImage);
      banner.append('public_id', fileName)
      try {
        setImageUploadLoading(true)
        const res = await fetch('/api/user/cloudinary', {
          method: 'POST',
          body: banner,
          headers: {}
        }) 
        console.log('res:',res)
        if (!res.ok) {
          // console.error('Error uploading image:', res);
          setImageUploadLoading(false)
          throw new Error(` ${res.status} - ${res.statusText}`);
        }
        const data = await res.json();
        setFormData({ ...formData, image: data.url })
        setImageUrl(data.url)
        setImageUploadError('image uploaded successfully')
        setImageUploadLoading(false)
        console.log('Image uploaded successfully:', data);
      } catch (error) {
        setImageUploadError(`Error uploading image: ${error}`)
        setImageUploadLoading(false)
        console.log('error image upload:', error)
      }
  }
  // =================================================
  // =================================================
  const handleInputChange = () => {
    setFormData({...formData, [e.target.id] : e.target.value})
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    
  }
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
        <h1 className='text-center text-3xl my-7 font-semibold'>Create a post</h1>
      <form className='flex flex-col gap-4'>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <TextInput type='text' placeholder='Title' required id='title' className='flex-1'/>
       <Select className='cursor-pointer'>
        <option value='uncategorized'>Select a category</option>
        <option value='javascript'>javascript</option>
        <option value='reactjs'>React.js</option>
        <option value='nextjs'>Next.js</option>
       </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 
        border-teal-500 border-dotted p-3">
            <FileInput type='file' accept='image/*' onChange={(e)=>handlefileChange(e)}/>
            <Button type='button' gradientDuoTone='purpleToPink' size='sm' outline onClick={uploadImage} disabled={imageUploadLoading && true}>
               {imageUploadLoading ? 'uploading...' : 'Upload image'} 
            </Button>
        </div>
        {imageUploadError ? 
        imageUploadError === 'image uploaded successfully' ? 
          <Alert color='success'>{imageUploadError}</Alert> :
          <Alert color='failure'>{imageUploadError}</Alert> : null
        }
        {imageUrl && 
        <img src={imageUrl} alt='upload' className='w-full object-cover' />}

        <ReactQuill theme='snow' placeholder='write something...' className='h-72 mb-12' required/>
<Button type='submit' gradientDuoTone='purpleToPink' className='mb-10'>Publish</Button>
      </form>
    </div>
  )
}

export default CreatePost
