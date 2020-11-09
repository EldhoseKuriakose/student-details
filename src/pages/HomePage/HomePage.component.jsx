import React, { useState } from 'react';
import StudentData from './StudentData';
import DetailsTable from '../../components/DetailsTable/DetailsTable.component';
import CustomForm from '../../components/CustomForm/CustomForm.component';
import './HomePage.styles.css';

const HomePage = () => {
    const [listView, setListView] = useState(true); 
    return (
        <div className="homepage-container">
            <div className="button-container">
                <button className="add-button" onClick={() => {setListView(false)}}>ADD</button>
                <button className="viewall-button" onClick={() => setListView(true)}>VIEW ALL</button>
            </div>
            {
                listView
                ?   <div className="details-table-wrap">
                        {
                            StudentData.length > 0
                            ? <DetailsTable studentdatas={StudentData} />
                            : <h1 className="no-data-message">No Student Data Found</h1>
                        }
                    </div>
                :   <CustomForm />
            }
        </div>
    );
}

export default HomePage;