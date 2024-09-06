import React, { useState } from 'react';
import ProfileProgress from '../ProfileProgress';
import EditCompanyDescription from '../companyview/EditCompanyDescription';
import { EditCompanyMail } from '../companyview/EditCompanyMail';
import { EditCompanyPhone } from '../companyview/EditCompanyPhone';
import ProfileImage from '../ProfileImage';
import { EditCompanyName } from '../companyview/EditCompanyName';


const UserProfile = () => {
    const [progress, setProgress] = useState(0);

    const increaseProgress = (amount) => {
        setProgress(prev => Math.min(prev + amount, 100));
    };

    return (
        <div>
            <div className="row">
                <div className="col-md-4">
                    <ProfileProgress progress={progress} />
                </div>
                <div className="col-md-8">
                    <EditCompanyDescription increaseProgress={increaseProgress} />
                    <EditCompanyName increaseProgress={increaseProgress} />
                    <EditCompanyMail increaseProgress={increaseProgress} />
                    <EditCompanyPhone increaseProgress={increaseProgress} />
                    <ProfileImage increaseProgress={increaseProgress} />
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
