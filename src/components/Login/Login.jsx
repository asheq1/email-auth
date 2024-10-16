import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import app from "../../auth/firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
    const [loginError, setLoginError] = useState('');
    const [success, setSuccess] = useState('');

    const emailRef = useRef(null);
    const auth = getAuth(app)

    const handleLogin = e => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password)

        // reset error
        setLoginError('')
        setSuccess('')

        // add validation
        const auth = getAuth(app)
        signInWithEmailAndPassword(auth, email, password)
        .then(result => {
            console.log(result.user)
            // with email verified
            if(result.user.emailVerified){
                setSuccess('User logged in successfully!')
            } else{
                alert('Please verify your email')
            }
            
        })
        .catch(error => {
            console.error(error.message);
            setLoginError(error.message)
        })
             

    }

    // forgot password 
    const handleResetPassword = () => {
        const email = emailRef.current.value;
        if(!email){
            alert('Provide valid email', emailRef.current.value)
            return;
        } else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
            console.log('Provide a valid email')
            return;
        } 
        
        // send validation email
        sendPasswordResetEmail(auth, email)
        .then(() =>{
            alert('Please check your email')
        })
        .catch(error => {
            console.log(error)
        })

    }


    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <form onSubmit={handleLogin}>
                            <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input 
                                type="email" 
                                placeholder="email"
                                name="email" 
                                className="input input-bordered"
                                ref={emailRef}
                                required />
                            </div>
                            <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" name="password" className="input input-bordered" required />
                            <label className="label">
                                <a onClick={handleResetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                            </div>
                            <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                        {
                            loginError && <p className="text-red-400">{loginError}</p>
                        }
                        {
                            success && <p className="text-green-500">{success}</p>
                        }
                        <p>New to this website? <Link to="/register">Please Register</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;