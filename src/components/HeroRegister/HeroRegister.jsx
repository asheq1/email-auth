import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../auth/firebase.config";


const HeroRegister = () => {
    const handleRegister = e => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password)
        createUserWithEmailAndPassword(auth, email, password)
        
        
    }

    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Register now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                    </div>

                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleRegister} className="card-body">
                            <input className="mb-4 w-full py-2 px-4 border rounded-lg" 
                                placeholder="Email" type="email" name="email" id="email" />
                            <br />
                            <input className="mb-4 w-full py-2 px-4 border rounded-lg"
                                placeholder="Password" type="password" name="password" id="password" />
                            <br />
                            <label className="label">
                                <a href="#" className="label-text link link-hover">Forgot Password!</a>
                            </label>
                            <input className="btn btn-secondary mb-4 w-full" type="submit" value="Register" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroRegister;