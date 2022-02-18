import { getAuth, signOut } from 'firebase/auth';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../App'

const auth = getAuth();

export function logout() {
    return auth.signOut();
}



export async function HandleLogout() {
    const { state, dispatch } = useContext(UserContext);
    const history = useHistory();
    try{
        await logout();
        dispatch({type:"USER", payload:false})
        history.push("/");
    }
    catch{
        alert("Failed to log out");
    }
}