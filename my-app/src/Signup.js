import addUser from './server/signup.js';

const Signup = () => {
    return (
        <div className="formBoxSignup">
            <div className="signup">
                <h2 className="page-header">Sign up</h2>
                <form>
                    <div className="inputSpace">
                        <label className="textboxLabel" for="email">Email</label>
                        <br/>
                        <input className="textbox" type="text" name="email" placeholder="Email" id="email"/>
                        <br/>
                    </div>
                    <div className="inputSpace">
                        <label className="textboxLabel" for="user">Username</label>
                        <br/>
                        <input className="textbox" type="text" name="username" placeholder="Username" id="user" />
                        <br/>
                    </div>
                    <div className="inputSpace">
                        <label className="textboxLabel" for="pass">Password</label>
                        <br/>
                        <input className="textbox" type="text" name="password" type="password" placeholder="Password" id="pass"/>
                        <br/>
                    </div>
                    <div className="redGlowBg">
                        <button className="button" type="button" onClick={() =>addUser('admin')}>Sign Up!</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;