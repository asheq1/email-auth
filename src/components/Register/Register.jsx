import { createUserWithEmailAndPassword } from "firebase/auth";
import { getAuth } from "firebase/auth";
import app from "../../auth/firebase.config";

const Register = () => {
    const handleRegister = e => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password)
        // create user 
        const auth = getAuth(app)
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user)
            })
            .catch(error => {
                console.error(error)
            })

    }

    return (
        <div className="border">
            <div className="mx-auto md:w-1/2">
                <h2 className="text-3xl mb-8">Register page</h2>
                <form onSubmit={handleRegister}>
                    <input className="mb-4 w-3/4 py-2 px-4" 
                        placeholder="Email" type="email" name="email"  />
                    <br />
                    <input className="mb-4 w-3/4 py-2 px-4" 
                        placeholder="Password" type="password" name="password" />
                    <br />
                    <input className="btn btn-secondary mb-4 w-3/4" type="submit" value="Register" />
                </form>
            </div>
        </div>
    );
};

export default Register;