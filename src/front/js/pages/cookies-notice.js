import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/cookies-notice.css';

const CookiesNotice = () => {
    return (
        <div className="container mt-5 cookies-notice">
            <h1 className="notice-title">"Recommend Me a Book" Cookie Notice</h1>

            <p className="notice-content">At "Recommend Me a Book", we value your privacy and commit to being transparent about our use of cookies and similar technologies on our site. Cookies help us provide you with a more personalized and efficient experience. By using our site, you consent to our use of cookies in accordance with US privacy laws and the EU General Data Protection Regulation (GDPR).</p>

            <h2 className="section-title">How We Use Cookies</h2>
            <p className="section-content">We use cookies to:</p>
            <ul>
                <li>Remember your preferences and settings, enhancing your browsing experience.</li>
                <li>Analyze how you interact with our site, enabling us to improve and tailor our content to your needs.</li>
                <li>Offer you personalized book recommendations, based on your interests and browsing history.</li>
            </ul>

            <h2 className="section-title">Your Privacy, Our Priority</h2>
            <p className="section-content">We respect your right to privacy. You have the option to accept, reject, or customize your cookie consent at any time. However, please be aware that blocking certain cookies may impact your experience on our site.</p>

            <p className="additional-info">We adhere to the California Consumer Privacy Act (CCPA) and the EU General Data Protection Regulation (GDPR), granting you the right to access, correct, or delete any personal information we have collected about you.</p>

            <p className="additional-info">For more details on how we manage your data, including how we use cookies and your rights under US and EU laws, please see our Privacy Policy.</p>

            <p className="questions">Questions?</p>
            <p className="contact-info">If you have questions about our use of cookies or how we protect your privacy, feel free to contact us.</p>

            <p className="closing-remark">We appreciate your trust in "Recommend Me a Book". Together, let's create a safe and enriching space for all book lovers.</p>
        </div>
    );
};

export default CookiesNotice;
