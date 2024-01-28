import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';

const SignOutButton = () => {
    const [cookies, _, removeCookie] = useCookies(['user']);
    const router = useRouter();
  
    const handleSignOut = () => {
      // Remove the user cookie
      removeCookie('user', { path: '/' });
  
      // Redirect to the login page
      router.push('/login');
    };
  
    return (
      <button onClick={handleSignOut}>
        Sign Out
      </button>
    );
  };
  
  export default SignOutButton;