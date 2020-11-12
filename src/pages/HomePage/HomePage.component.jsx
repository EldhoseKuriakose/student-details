import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeStudent } from '../../redux/student/student.actions';
import Navbar from '../../components/Navbar/Navbar.component';
import DetailsTable from '../../components/DetailsTable/DetailsTable.component';
import CustomForm from '../../components/CustomForm/CustomForm.component';
import './HomePage.styles.css';

const HomePage = () => {
    const studentData = useSelector((state) => state.student.studentData);
    const removeStud = useDispatch();
    const [listView, setListView] = useState(true);
    const [studentDetails, setStudentDetails] = useState();

    const handleEdit = (e) => {
        studentData.forEach(student => {
            if(student.id === e.target.id) {
                setStudentDetails({student});
            }
        });
        setListView(false);
    }

    const handleDelete = (e) => {
        // let submission = {
        //     id: e.target.id
        // };

        removeStud(removeStudent(e.target.id));
        // axios.post(`http://localhost:3001/delete`, { submission })
        //         .then(res => {
        //             if(res.data.status === 200) {
        //                 console.log('deletion successful');
        //             } else {
        //                 console.log('deletion failed');
        //             }
        //         });
    }

    const handleAdd = () => {
        setStudentDetails();
        setListView(false);
    } 

    return (
        <div className="homepage-container">
            <Navbar />
            <div className="button-container">
                <button className="add-button" onClick={() => handleAdd()}>ADD</button>
                <button className="viewall-button" onClick={() => setListView(true)}>VIEW ALL</button>
            </div>
            {
                listView
                ?   <div className="details-table-wrap">
                        {
                            studentData.length > 0
                            ? <DetailsTable studentdatas={studentData} handleEdit={handleEdit} handleDelete={handleDelete} />
                            : <h1 className="no-data-message">No Student Data Found</h1>
                        }
                    </div>
                :   <CustomForm studentDetails={studentDetails} />
            }
        </div>
    );
}

export default HomePage;