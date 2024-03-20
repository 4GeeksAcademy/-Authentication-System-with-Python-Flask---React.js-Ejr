import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/terms-and-conditions.css';

const TermsAndConditions = () => {
    return (
        <div className="container mt-5 terms-conditions">
            <h1 className="terms-title">Terms and Conditions of Recommend Me a Book</h1>
            <p className="introduction">Welcome to Recommend Me a Book. These Terms and Conditions ("Terms") govern your use of the Recommend Me a Book website, services, and related content (collectively, the "Service"). By accessing or using the Service, you agree to be bound by these Terms, which form a legally binding contract between you and Recommend Me a Book.</p>

            <h2 className="section-title">1. Services Offered:</h2>
            <p className="section-content">Recommend Me a Book provides a platform for discovering books through random recommendations, exploring a library of book information, and engaging with community features such as book reviews, recommendations, ratings, and marketing notifications related to book purchases.</p>

            <h2 className="section-title">2. Eligibility and Account Registration:</h2>
            <p className="section-content">Users of all ages are welcome to explore our site. Content classified as 18+ requires users to be of legal age. Access to additional features requires account registration, wherein you agree to provide accurate and complete information.</p>

            <h2 className="section-title">3. Intellectual Property Rights:</h2>
            <p className="section-content">All book-related content, including author names, titles, and publishers, belongs to their respective copyright holders. User-generated reviews and content are owned by the users who post them. By using the Service, you grant us a non-exclusive, worldwide, royalty-free license to use, display, and distribute such content.</p>

            <h2 className="section-title">4. User Conduct and Content:</h2>
            <p className="section-content">Users are expected to behave respectfully and lawfully. Prohibited conduct includes harassment, posting offensive content, or engaging in illegal activities. Violations may result in warnings, account suspension, or permanent bans, including IP bans.</p>

            <h2 className="section-title">5. Third-Party Transactions:</h2>
            <p className="section-content">Book purchases are conducted through third-party platforms. Recommend Me a Book is not responsible for these transactions or the availability of books on these platforms.</p>

            <h2 className="section-title">6. Third-Party Links:</h2>
            <p className="section-content">Our Service may contain links to third-party websites. We are not responsible for the content or privacy practices of these external sites. Users access these links at their own risk.</p>

            <h2 className="section-title">7. Limitation of Liability:</h2>
            <p className="section-content">Recommend Me a Book does not guarantee the accuracy, availability, or suitability of any content or service and will not be liable for any indirect, incidental, or consequential damages arising from your use of the Service.</p>

            <h2 className="section-title">8. Changes to Terms:</h2>
            <p className="section-content">We reserve the right to modify these Terms at any time. Changes will be communicated via email and posted on our website. Continued use of the Service after changes constitutes acceptance of the new Terms.</p>

            <h2 className="section-title">9. Governing Law and Dispute Resolution:</h2>
            <p className="section-content">These Terms are governed by the laws of the European Union and the United States. Any disputes arising from these Terms will be resolved through arbitration or in the competent courts of these jurisdictions.</p>

            <h2 className="section-title">10. Contact Information:</h2>
            <p className="section-content">For any questions or concerns regarding these Terms, please contact us at support@rmb.com.</p>

            <p className="acknowledgement">By using Recommend Me a Book, you acknowledge that you have read, understood, and agree to be bound by these Terms.</p>
        </div>
    );
};

export default TermsAndConditions;
