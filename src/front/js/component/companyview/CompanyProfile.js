import React, { useEffect, useState } from 'react';
import ProfileImage from '../ProfileImage';
import { ButtonEdit } from './EditCompanyName';
import { EditCompanyDescription } from './EditCompanyDescription';
import { EditCompanyPhone } from './EditCompanyPhone';
import { EditCompanyMail } from './EditCompanyMail';
import ProfileProgress from '../ProfileProgress';
import CountrySelector from '../userview/Dropdown';
import Stars from '../stars';

const CompanyProfile = () => {
   
    const [companyData, setCompanyData] = useState({
        name: '',
        description: '',
        phone: '',
        email: '',
        country: '',
    });

    const apiUrl = "https://studious-garbanzo-g4xv5w4wq96whpg79-3001.app.github.dev";

    
    useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                const response = await fetch(`${apiUrl}/company/profile`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setCompanyData({
                        name: data.name,
                        description: data.description,
                        phone: data.phone,
                        email: data.email,
                        country: data.country,
                    });
                } else {
                    console.error('Error al obtener los datos de la compañía');
                }
            } catch (error) {
                console.error('Error en la solicitud:', error);
            }
        };

        fetchCompanyData();
    }, []);

    
    const handleFieldChange = (field, value) => {
        setCompanyData({
            ...companyData,
            [field]: value,
        });
    };

    
    const handleSaveProfile = async () => {
        try {
            const response = await fetch(`${apiUrl}/company/profile`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(companyData)
            });

            if (response.ok) {
                console.log('Perfil actualizado exitosamente');
            } else {
                console.error('Error al actualizar el perfil');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

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
                                        <ButtonEdit
                                            name={companyData.name}
                                            onSave={(value) => handleFieldChange('name', value)}
                                        />
                                    </div>
                                    <div style={styles.companyDescriptionContainer}>
                                        <EditCompanyDescription
                                            description={companyData.description}
                                            onSave={(value) => handleFieldChange('description', value)}
                                        />
                                    </div>
                                </div>
                                <div style={styles.contactContainer}>
                                    <EditCompanyPhone
                                        phone={companyData.phone}
                                        onSave={(value) => handleFieldChange('phone', value)}
                                    />
                                    <EditCompanyMail
                                        email={companyData.email}
                                        onSave={(value) => handleFieldChange('email', value)}
                                    />
                                </div>
                            </div>

                            <div className="col-md-4" style={styles.rightColumn}>
                                <div style={styles.rightAlignedContainer}>
                                    <div style={styles.starsContainer}>
                                        <Stars />
                                    </div>
                                    <div style={styles.countrySelectorContainer}>
                                        <CountrySelector
                                            country={companyData.country}
                                            onSave={(value) => handleFieldChange('country', value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-primary mt-3" onClick={handleSaveProfile}>
                        Guardar Cambios
                    </button>
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
