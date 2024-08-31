import React, { useContext, useState } from 'react';
import { Context } from "../../store/appContext";
import ProfileImage from '../ProfileImage';
import { ButtonEdit } from './EditCompanyName';
import { EditCompanyDescription } from './EditCompanyDescription';
import { EditCompanyPhone } from './EditCompanyPhone';
import { EditCompanyMail } from './EditCompanyMail';
import ProfileProgress from '../ProfileProgress';
import CountrySelector from '../userview/Dropdown';
import CheckoutForm from "../../component/Checkout";
import Stars from '../stars';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';


const CompanyProfile = () => {
    const stripePromise = loadStripe("pk_test_51PsqIxG3cEcyZuNpill2BXWYLnqGWok6W48xAOpaOlq5BHME5440qc4FGMIzdoADAgiR77Q3VBP3tmrzLuVWmbOy00tZCSphPW");
    const { store } = useContext(Context);
    return (
        <div style={styles.pageContainer}>
            <div className="row" style={styles.row}>
                <div className="col-lg-9" style={styles.flexContainer}>
                    <div className="card mb-0" style={styles.profileCard}>
                        <div className="row no-gutters">
                            <div className="col-md-2" style={styles.profileColumn}>
                                <div style={styles.profileImageContainer}>
                                    <ProfileImage />
                                </div>
                            </div>

                            <div className="col-md-6" style={styles.centerColumn}>
                                <div style={styles.topLeftAligned}>
                                    <div style={styles.buttonEditContainer}>
                                        <ButtonEdit />
                                    </div>
                                    <div style={styles.companyDescriptionContainer}>
                                        <EditCompanyDescription />
                                    </div>
                                </div>
                                <div style={styles.contactContainer}>
                                    <EditCompanyPhone />
                                    <EditCompanyMail />
                                </div>

                            </div>

                            <div className="col-md-4" style={styles.rightColumn}>
                                <div style={styles.rightAlignedContainer}>
                                    <div style={styles.starsContainer}>
                                        <Stars />
                                    </div>
                                    <div style={styles.countrySelectorContainer}>
                                        <CountrySelector />
                                    </div>
                                    <div className="w-100 text-center">
                                        <h5>Suscripción actual:{!store.user?.profile_empleador.premium ? <button type="button" disabled className="p-1 mx-2 btn btn-outline-dark">Free</button> : <button type="button" disabled className="p-1 mx-2 btn btn-outline-success">Premium</button>}</h5>

                                        {!store.user?.profile_empleador.premium && (
                                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                Pasar la Suscripción a Premium
                                            </button>

                                        )}


                                        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog modal-dialog-centered">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Coste anual de la suscripción: 200€</h1>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <div >
                                                            <Elements stripe={stripePromise}>
                                                                {/* Load the checkout form */}
                                                                <CheckoutForm />
                                                            </Elements>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3" style={styles.flexContainer}>
                    <div className="card mb-0" style={styles.progressCard}>
                        <ProfileProgress />
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    pageContainer: {
        width: 'calc(100% - 10px)',
        height: '300px',
        margin: '5px',
        padding: '0',
        boxSizing: 'border-box',
    },
    row: {
        height: '100%',
        margin: '0',
        padding: '0',
        display: 'flex',
    },
    flexContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
    profileColumn: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '0',
        padding: '0',
    },
    profileImageContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    buttonEditContainer: {
        marginLeft: '30px',
    },
    centerColumn: {
        display: 'flex',
        flexDirection: 'column',
        padding: '0',
    },
    topLeftAligned: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginTop: '10px',
        marginBottom: '10px',
    },
    companyDescriptionContainer: {
        marginBottom: '10px',
        marginLeft: '30px',

    },
    contactContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        marginTop: '10px',
    },
    rightColumn: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        padding: '0',
    },
    rightAlignedContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    starsContainer: {
        marginBottom: '20px',
        marginRight: '30px',
    },
    countrySelectorContainer: {
        marginBottom: '20px',
        marginRight: '30px',
    },
    profileCard: {
        backgroundColor: '#bed5e2',
        borderRadius: '10px',
        padding: '20px',
        border: 'none',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        height: '100%',
    },
    progressCard: {
        backgroundColor: '#f3f4f6',
        borderRadius: '10px',
        padding: '20px',
        border: 'none',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        height: '100%',
    },
};

export default CompanyProfile;
