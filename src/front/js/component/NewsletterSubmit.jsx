import React from 'react'

const NewsletterSubmit = () => {
    return (
        <div>
            <div className="col-4 offset-1">
                <form>
                    <h5>Subscribe to our newsletter</h5>
                    <p>Monthly digest of whats new and exciting from us.</p>
                    <div className="d-flex w-100 gap-2">
                        <label htmlFor="newsletter1" className="visually-hidden">Email address</label>
                        <input id="newsletter1" type="text" className="form-control" placeholder="Email address" />
                        <button className="btn btn-primary" type="button">Subscribe</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewsletterSubmit