import {getAuth} from 'firebase/auth';
import { useAuth } from './server/authContext.js';
import app from '../server/index.js';
import {getDatabase, get, ref} from 'firebase/database';
import { loggedin } from '../server/auth.js';

const auth = getAuth();
const { login } = useAuth();

test("Checks if user is logged in", () => {
    createUserWithEmailAndPassword("mel", "testEmail@test.com", "helloo1!");
    const docRef = ref(db,"User/"+ "mel");
    const docsnap = await get((docRef));
    await login(userRef.current.value, passwordRef.current.value);
    expect(loggedin()).toBe(true);
    auth.currentUser.uid = null;
    docsnap.remove();
});