import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/privacy-notice.css';

const PrivacyNotice = () => {
  return (
    <div className="container mt-5 privacy-notice">
      <h1 className="notice-title">Recommend Me a Book Privacy Notice</h1>
      
      <p className="contact-info">Contact: For inquiries, comments, or requests related to privacy, please contact us via support@rmb.com or call +52558745xxxx.</p>
      
      <h2 className="section-title">1. Information Collected:</h2>
      <p className="section-content">We collect personal data such as your name, email, phone number, date of birth, and country of origin. Additionally, through cookies, we gather information about your browsing habits and preferences on our website.</p>
      
      <h2 className="section-title">2. Use of Information:</h2>
      <p className="section-content">We use the collected information to:
      <ul>
        <li>Provide you with personalized book recommendations based on your interests and reading habits.</li>
        <li>Send marketing communications, provided you have given your explicit consent.</li>
        <li>Enhance the functionality and security of our website by analyzing user interactions with our platform.</li>
      </ul>
      </p>
      
      <h2 className="section-title">3. Legal Basis for Processing:</h2>
      <p className="section-content">The processing of your data is based on:
      <ul>
        <li>Your explicit consent, given by using our website and accepting our Cookie Policy and this Privacy Notice.</li>
        <li>The need to execute a contract with you, should you make purchases or subscribe to specific services.</li>
      </ul>
      </p>
      
      <h2 className="section-title">4. Data Protection Agreement:</h2>
      <p className="section-content">We establish an agreement with you detailing our responsibilities and your rights concerning the collection, use, and protection of your personal data. This agreement strictly complies with the data protection laws of the United States and the European Union, ensuring the security and privacy of your information.</p>
      
      <h2 className="section-title">5. Sharing Information:</h2>
      <p className="section-content">Your personal information will not be shared with third parties, except in cases where it is necessary to comply with legal obligations or for the provision of contracted services, always under strict security measures.</p>
      
      <h2 className="section-title">6. International Transfers:</h2>
      <p className="section-content">We may transfer data to countries with internationally recognized data protection standards, ensuring that your rights and the security of your data are respected in accordance with applicable laws.</p>
      
      <h2 className="section-title">7. Your Rights:</h2>
      <p className="section-content">You have the right to access, rectify, or delete your data, limit its processing, object to it, and request the portability of your data. These rights can be exercised by sending an email to our contact address.</p>
      
      <h2 className="section-title">8. Security Measures:</h2>
      <p className="section-content">We implement the most advanced technical and organizational security measures to protect your personal data against unauthorized access, alteration, and illegal destruction.</p>
      
      <h2 className="section-title">9. Data Retention:</h2>
      <p className="section-content">We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected, respecting the maximum allowed by law.</p>
      
      <h2 className="section-title">10. Automated Decision-Making and Profiling:</h2>
      <p className="section-content">We use your data for profiling and automated decision-making, aiming to personalize book recommendations. We will inform and seek your explicit consent when such processes significantly affect your rights.</p>
      
      <h2 className="section-title">11. Privacy Notice Updates:</h2>
      <p className="section-content">We reserve the right to modify this privacy notice. Any changes will be communicated through our website or via email, ensuring you are always informed about how we protect your personal information.</p>
  
    </div>
  );
};

export default PrivacyNotice;
