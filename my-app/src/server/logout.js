import { getAuth, signOut } from 'firebase/auth';
import { useHistory } from 'react-router-dom';

const auth = getAuth();

export function logout() {
    return auth.signOut();
}

//const history = useHistory();

  export async function handleLogout() {
      //history = useHistory();
    try{
        await logout();
        //history.push("/");
    }
    catch{
        alert("Failed to log out");
    }
}