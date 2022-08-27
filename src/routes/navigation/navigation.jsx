import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Catfact from '../../components/catfact/catfact';

import { UserContext } from '../../contexts/user.context';

import { signOutUser } from '../../utils/firebase';

import './nav.scss';

const Navigation = () => {
  const { currentUser, setCurrentUser, isAnonymous,setIsAnonymous,username } = useContext(UserContext);

  const signOutHandler = async () => {
    await signOutUser();
    setIsAnonymous(true);
  };

  return (
    <Fragment>
      <div className='navigation'>
        <div className='nav-left-name'>
          {isAnonymous?  'Anonymous Session' : 'Signed in as ' + username }
       
        </div>
  
        <div className='nav-right-links' >
    

          {isAnonymous ? (
            <span className='nav-link' >
             <Link className='nav-link' to='/auth'>
              SIGN IN
            </Link>
            </span>
          ) : (
            <span className='nav-link' onClick={signOutHandler}>
              {' '}
              SIGN OUT{' '}
            </span>
            
          )}
        </div>
      </div>
      <Catfact/>

      <Outlet />

    </Fragment>
  );
};

export default Navigation;