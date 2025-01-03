import React from 'react'
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice'
import { useDispatch , useSelector} from 'react-redux'
import OAuth from '../components/OAuth'

const Signin = () => {
  const [formData, setFormData] = useState({});
  // const [errorMessage, setErrorMessage] = useState('');
  // const [loading, setLoading] = useState(false)
  const { loading, error: errorMessage } = useSelector(state => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData( { ...formData, [e.target.id]: e.target.value.trim() })
  }

  const handleSubmit = async (e) => {
    e.preventDefault() //prevents default behavior of onSubmit(which is an event listener) from refreshing the page after submition
    if (!formData.email || !formData.password){
      // return setErrorMessage('Please fill out all fields')
      return dispatch(signInFailure('Please fill out all fields'))
    }
    try {
      // setLoading(true);
      // setErrorMessage(null);
      dispatch(signInStart())

      console.log(formData)
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        // return setErrorMessage(data.message);
        dispatch(signInFailure(data.message))
      }
      // setLoading(false);
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      // setErrorMessage(error.message);
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* left */}
        <div className='flex-1'>
          <Link to='/' className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500
            via-purple-500 to-pink-500 rounded-lg text-white'>Tara's</span>Blog
          </Link>
          <p className='text-sm mt-5'>signup to recieve the latest and amazing articles about music, learnig, health,
            science, technology and a lot more! </p>
        </div>

        {/* right */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            
            <div>
              <Label vlaue='Your email' />
              <TextInput
                type='email'
                placeholder='Email'
                id='email'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label vlaue='Your password' />
              <TextInput
                type='password'
                placeholder='Password'
                id='password'
                onChange={handleChange}
              />
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
              { loading ? 
              (<>
                      <Spinner size='sm' />
                      <span className='pl-3'>Loading...</span>
              </>
        
              ):
              'Sign In'
              }
        
            </Button>
            <OAuth />
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Don't have an account?</span>
            <Link to='/sign-up' className='text-blue-500'>
              Sign Up</Link>
          </div>
          {
            errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )
          }

        </div>
      </div>

    </div>
  )
}

export default Signin
