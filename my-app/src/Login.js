import './formPages.css';

const Login = () => {
    return (
        <div className="login" className="formBoxLogin">
            <h2 className="page-header">Login</h2>
            <form>
            <div className="inputSpace">
                <label className="textboxLabel" for="username">Username</label>
                <br/>
                <input className="textbox" type="text" name="username" placeholder="Username" />
                </div>
            <br/>
            <div className="inputSpace">
                <label className="textboxLabel" for="password">Password</label>
                <br/>
                <input className="textbox" type="text" name="password" placeholder="Password" />
            </div>
            </form>
            <div className="redGlowBg">
                <button className="button">Login</button>
            </div>
        </div>
    );
}

export default Login;