import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { getAuth } from "firebase/auth";
import app from "../../auth/firebase.config";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {
    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = e => {
        e.preventDefault()
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const termsAccepted = e.target.terms.checked;
        console.log(name, email, password, termsAccepted)

         // reset error
         setRegisterError('')
         setSuccess('')

        // validate 
        if(password.length < 6) {
            setRegisterError(' Password should be at least 6 characters')
            return;
        } else if(!/[A-Z]/.test(password)){
            setRegisterError('Password should be at least one upper case')
            return;
        } else if(!termsAccepted){
            setRegisterError('Please Accept our terms & conditions')
            return;
        }
       

        // create user 
        const auth = getAuth(app)
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user)
                setSuccess('User created successfully.')
                
                // update profile 
                updateProfile(result.user, {
                    displayName: name,
                    photoURL: "https://example.com/jane-q-user/profile.jpg"
                })
                .then( () => console.log('Profile updated'))
                .catch()

                // send verification email
                sendEmailVerification(result.user)
                .then(()  => {
                    alert("Please check your email and verified your account")
                })
            })
            .catch(error => {
                console.error(error)
                setRegisterError(error.message)
            })

    }

    return (
        <div className="border">
            <div className="mx-auto md:w-1/2">
                <h2 className="text-3xl mb-8">Register page</h2>
                <form onSubmit={handleRegister}>
                    <input className="mb-4 w-full py-2 px-4 border" 
                            placeholder="Your Name" type="text" name="name" required />
                    <br />
                    <input className="mb-4 w-full py-2 px-4 border" 
                        placeholder="Email" type="email" name="email" required />
                    <br />
                    <div className="mb-4 relative border">
                        <input className="w-full py-2 px-4" 
                            placeholder="Password" 
                            type={showPassword ? "text" : "password" } 
                            name="password"
                            required/>
                        <span className="absolute top-3 right-2" onClick={ () => setShowPassword(!showPassword)}>{
                            showPassword ? <FaEyeSlash /> : <FaEye />
                        }</span>
                    </div>
                    <br />
                    <div>
                        <input type="checkbox" name="terms" id="terms" />
                        <label className="ml-2" htmlFor="terms">Accept our <a href="">terms and conditions</a></label>
                    </div>
                    <br />
                    <input className="btn btn-secondary mb-4 w-full" type="submit" value="Register" />
                </form>
                {
                    registerError && <p className="text-red-400">{registerError}</p>
                }
                {
                    success && <p className="text-green-500">{success}</p>
                }
                    <p>Already have an account? 
                    <Link to="/login">Please Login</Link></p>
            </div>
        </div>
    );
};

export default Register;