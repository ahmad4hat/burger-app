import React from 'react';
import CssClass from './Spinner.module.css';

const Spinner = () => {
    return (
        <div>
            <div className={CssClass.Loader}>Loading...</div>
        </div>
    );
}

export default Spinner;
