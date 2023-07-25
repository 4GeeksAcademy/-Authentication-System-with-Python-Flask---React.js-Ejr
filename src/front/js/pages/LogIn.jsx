import React from 'react'

const LogIn = () => {
  return (
           <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5 text-center" id="staticBackdropLabel"><strong>Identify</strong></h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required></input>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label" required>Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1"></input>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="inlineFormCheck"></input>
                    <label className="form-check-label" htmlFor="inlineFormCheck">
                      Remember me
                    </label>
                  </div>
                  
                    <a className="nav-link active" aria-current="page" href="#">Check Account</a>
                  
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Log In</button>
              </div>
            </div>
          </div>
        </div>
  )
}

export default LogIn