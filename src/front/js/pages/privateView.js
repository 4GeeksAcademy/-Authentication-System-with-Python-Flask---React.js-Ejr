import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Private from '../component/private';
import { Context } from "../store/appContext";

const PrivateView = () => {
    const { actions } = useContext(Context);

    return (
        <div>
            <Private />
        </div>
    );
};

export default PrivateView;
