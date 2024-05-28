import React, {useContext, useEffect, useState} from "react"
import Constants from "../app/constants"
import SessionLogin from "../component/sessionLogin.jsx"


/* import { Context } from "../store/appContext"; */
import { useLocation, useNavigate } from "react-router-dom";

const SessionManagerView = ({ mode }) => {

	/* const { store, actions } = useContext(Context);
					const [email, setEmail] = useState("");
					const [password, setPassword] = useState("");
					const navigate = useNavigate(); */
					
	const [isSignUp, setIsSignUp] = useState(mode);
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
        setIsSignUp(mode);
    }, [location]);



					if(mode <= 1) {
						return (
							<SessionLogin mode = {mode} />
						)
					}

	return (
		<div className="w-full flex-auto text-center items-center">

			{ mode === Constants.SESSION_MODE_RECOVER && (

				<div className="bg-dark w-full h-full flex items-center justify-center overflow-hidden">
					<div className="w-[960px] h-[593px] bg-w flex  justify-end items-center rounded-[5rem] relative">
						<div className="absolute justify-between text-black h-4/5 w-[36rem] m-5 flex items-center">
							
							<form class="max-w-sm mx-auto">
								<p className="text-primary-n text-xl f-body mb-10">You are about to reset your password</p>
								<div class="mb-5">
									<label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
									<input type="email" 
										id="email" 
										class="focus:outline-none shadow-sm bg-primary-l border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-accent-n block w-full p-2.5 placeholder:text-gray-500" 
										placeholder="Your Email" 
										required />
								</div>
								<div class="mb-5">
									<label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
									<input type="password"
										id="password" 
										class="focus:outline-none shadow-sm bg-primary-l border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-accent-n block w-full p-2.5 placeholder:text-gray-500" 
										placeholder="New Password" 
										required 
									 />
								</div>
								<div class="mb-5">
									<label for="repeat-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
									<input type="password" 
										id="repeat-password" 
										class=" focus:outline-none shadow-sm bg-primary-l border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-accent-n block w-full p-2.5 placeholder:text-gray-500"
										placeholder="Repeat New Password" 
										required 
									/>
								</div>
								<button type="submit" class="mt-5 text-white f-body bg-primary-n hover:bg-transparent hover:text-dark border-primary-n border-2 hover:border-dark focus:ring-4 font-medium rounded-3xl text-sm px-5 py-2.5 text-center transition-all ease-in-out duration-500">
									Reset password
								</button>
								</form>
							
						</div>

						<div className="absolute w-[800px] h-[800px] rounded-full bg-dark right-[60%] flex items-center"> 
							<p className="left-[44%] relative text-4xl f-body text-primary-l">Forgot your password</p>
						</div> 
					</div>
				</div>
			)}

			

			

			 {/* { mode === Constants.SESSION_MODE_LOGIN || Constants.SESSION_MODE_SIGNUP && (
						<div className="session-login-container">
						<div className={`container ${isSignUp ? 'active' : ''}`} id="container">
							<div className={`form-container ${isSignUp ? 'sign-up' : 'sign-in'}`}>
								<form>
									<h1 className="text-b">{isSignUp ? 'Sign In' : 'Create an Account'}</h1>
									<div className="social-icons">
										<a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
										<a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
										<a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
										<a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
									</div>
									{isSignUp == 1 && (
										<>
											<div><input className="text-black"
											 type="email" placeholder="Email" /></div>
											<div><input className="text-black"
											 type="password" placeholder="Password" /></div>
											<div><button className="text-black">Login</button></div>
											<div><a href="/recover">Forget Your Password?</a></div>
										</>
									)}
									{isSignUp == 0 && (
										<>
											<div><input className="text-black"
											 type="text" placeholder="Name" /></div>
											<div><input className="text-black"
											 type="email" placeholder="Email" /></div>
											<div><input className="text-black"
											 type="password" placeholder="Password" /></div>
											<div><button>Sign Up</button></div>
										</>
									)}
								</form>
							</div>
							<div className="toggle-container">
								<div className="toggle">
									<div className={`toggle-panel toggle-left ${isSignUp ? 'hidden' : ''}`}>
										<h1>Hello, Friend!</h1>
										<p>Create an account to access all site features</p>
										<button onClick={() => { navigate("/signup"); toggleForm(); }}>Sign up</button>
									</div>
									<div className={`toggle-panel toggle-right ${isSignUp ? '' : 'hidden'}`}>
										<h1>Welcome Back!</h1>
										<p>Enter your credentials to access all site features</p>
										<button onClick={() => { navigate("/login"); toggleForm(); }}>Login</button>
									</div>
								</div>
							</div>
						</div>
					</div>
			)}  */}
		</div>
	)
}

export default SessionManagerView