import React from 'react';
import CompanyProfile from '../component/companyview/CompanyProfile';
import AccordionSection from '../component/companyview/AccordionSection';
import AccordionDescription from '../component/companyview/AccordionDescripcion';
import '../../styles/Companyview.css'
import { EditDescriptionAccordion } from '../component/DescriptionAccordion';
import OfferManager from '../component/OfferManager';

export const Companyview = () => {
    return (

        <div className="container">
            <div className='body'>
                <CompanyProfile />


                <AccordionDescription title="Descripción">
                    <EditDescriptionAccordion />
                </AccordionDescription>

                <AccordionSection title="Ofertas">
                    <div className="d-flex flex-wrap">
                        <OfferManager />

                    </div>
                </AccordionSection>
            </div>
        </div>

    );
};


