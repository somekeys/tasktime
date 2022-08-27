import React from 'react';
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
} from 'mdb-react-ui-kit';
import { useState } from 'react';


import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
  createAuthUserWithEmailAndPassword,
} from '../../utils/firebase';


const defaultFormFields = {
  email: '',
  password: '',
};

function SignInForm() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
 
  const signupEmail = async (event) => {
    event.preventDefault();

  
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      resetFormFields();
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use');
      } else {
        alert(error);
        console.log('user creation encountered an error', error);
      }
    }
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const signInWithEmail = async (event) => {
    event.preventDefault();
    console.log("sign in with email:",email,password)

    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
    } catch (error) {
      alert(error);

      console.log('user sign in failed', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    
    <MDBContainer  className="p-3 my-5 d-flex flex-column w-50">

      <MDBInput wrapperClass='mb-4' name='email' value={email} label='Email address' id='form1' type='email' onChange={handleChange}/>
      <MDBInput wrapperClass='mb-4' name='password' value={password} label='Password' id='form2' type='password'  onChange={handleChange}/>

    
      <div className=" d-flex ">
      <MDBBtn className="mb-4" onClick={signInWithEmail}>Sign in</MDBBtn>  &nbsp;
        <MDBBtn className="mb-4" onClick={signupEmail}>Register</MDBBtn>
      </div>
        


      <div className="text-center">
        or login/sign up with:&nbsp;&nbsp;&nbsp;

          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='google' size="sm" onClick={signInWithGoogle}/>
          </MDBBtn>


      </div>

    </MDBContainer>
  );
}

export default SignInForm;