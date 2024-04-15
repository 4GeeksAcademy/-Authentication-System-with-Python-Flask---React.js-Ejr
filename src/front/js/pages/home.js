import React from "react";
import PrincipalSection from './PrincipalSection';
import CompanySection from './CompanySection';
import HowItWorksSection from './HowItWorksSection';

export const Home = () => {

    return (
        <div className="home-container">
            <PrincipalSection />
            <CompanySection />
            <HowItWorksSection />
        </div>
    );
};
