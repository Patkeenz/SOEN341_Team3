const Signup = () => {
    return (
        <div className="signup">
            <h2>Sign up</h2>
        <form>
            <input type="text" name="email" placeholder="Email" id="email"/>
            <br></br>
            <input type="text" name="username" placeholder="Username" id="user" />
            <br></br>
            <input type="text" name="password" placeholder="Password" id="pass"/>
        </form>
        </div>
    );
}

export default Signup;