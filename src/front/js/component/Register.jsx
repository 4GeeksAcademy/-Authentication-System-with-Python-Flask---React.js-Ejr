import React from "react";


const Register = () => {
    return (
        <div class="container">
            <form>
                <h1>REGISTER</h1>
                <div class="input-group">
                    <input
                        required=""
                        type="text"
                        name="text"
                        autocomplete="off"
                        class="input"
                    />
                    <label class="user-label">First Name</label>
                </div>
                <div class="input-group">
                    <input
                        required=""
                        type="text"
                        name="text"
                        autocomplete="off"
                        class="input"
                    />
                    <label class="user-label">Last Name</label>
                </div>
                <div class="input-group">
                    <input
                        required=""
                        type="email"
                        name="text"
                        autocomplete="off"
                        class="input"
                    />
                    <label class="user-label">Email</label>
                </div>
                <div class="input-group">
                    <input
                        required=""
                        type="text"
                        name="text"
                        autocomplete="off"
                        class="input"
                    />
                    <label class="user-label">Username</label>
                </div>
                <div class="input-group">
                    <input
                        required=""
                        type="password"
                        name="text"
                        autocomplete="off"
                        class="input"
                    />
                    <label class="user-label">Password</label>
                </div>
                <div class="input-group">
                    <select name="security-question" class="security-question" required>
                        <option value="" disabled selected></option>
                        <option value="1">What is your mother's maiden name?</option>
                        <option value="2">What is the name of your first pet?</option>
                        <option value="3">
                            What is the name of the city where you were born?
                        </option>
                    </select>
                    <label class="security-label">Security Question 1</label>
                </div>
                <div class="input-group">
                    <input
                        required=""
                        type="password"
                        name="text"
                        autocomplete="off"
                        class="input"
                    />
                    <label class="user-label">Answer 1</label>
                </div>
                <div class="input-group">
                    <select name="security-question" class="security-question" required>
                        <option value="" disabled selected></option>
                        <option value="1">What is your mother's name?</option>
                        <option value="2">What is the name of your first pet?</option>
                        <option value="3">
                            What is the name of the city where you were born?
                        </option>
                    </select>
                    <label class="security-label">Security Question 2</label>
                </div>
                <div class="input-group">
                    <input
                        required=""
                        type="password"
                        name="text"
                        autocomplete="off"
                        class="input"
                    />
                    <label class="user-label">Answer 2</label>
                </div>
                <div class="button">
                    <button type="submit" class="button-Save">Sign up</button>
                </div>
                <p className="link">
                    Have an account?
                    <a href=".src\front\js\views\Login.jsx" class="login-link"
                    >Login Here</a
                    >
                </p>
            </form>
        </div>
    )
};

export default Register;