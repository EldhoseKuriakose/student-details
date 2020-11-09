import React from 'react';
import StudentData from './StudentData';
import DetailsTable from '../../components/DetailsTable/DetailsTable.component';
import './HomePage.styles.css';

const HomePage = () => (
    <div className="homepage-container">
        <div className="button-container">
            <button className="add-button">ADD</button>
            <button className="viewall-button">VIEW ALL</button>
        </div>
        <div className="details-table-wrap">
            {
                StudentData.length > 0
                ? <DetailsTable studentdatas={StudentData} />
                : <h1 className="no-data-message">No Student Data Found</h1>
            }
        </div>
    </div>
);

export default HomePage;