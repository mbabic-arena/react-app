import { useEffect, useState } from 'react';
import { insert, update, read, remove } from '../services/apiService';

const Student = ({ match, history }) => {

    const [id] = useState(match.params.id);
    const [student, setStudent] = useState({
        _id: '0',
        firstName: '',
        lastName: '',
        yearOfBirth: 0,
        address: ''
    });
    const [firstNameRequired, setFirstNameRequired] = useState(false);
    const [lastNameRequired, setLastNameRequired] = useState(false);

    useEffect(() => {
        if(id !== '0') {
            read('students', id, data => {
                if (data) setStudent(data);
            })
        }
    }, [id]);

    function changeHandler(e) {
        if(e.target.name && e.target.value === "firstName") {
            setFirstNameRequired(false);
        }
        if(e.target.name && e.target.value === "lastName"){
            setLastNameRequired(false);
        }
        setStudent({
            ...student,
            [e.target.name]: e.target.value
        });
    }

    const back = () => {
        history.push('/students');
    }

    const save = () => {
        if(id === '0') {
            if(!student.firstName && !student.lastName) {
                setFirstNameRequired(true);
                setLastNameRequired(true);
                return;
            }
            if(!student.firstName){
                setFirstNameRequired(true);
                return;
            }
            if(!student.lastName){
                setLastNameRequired(true);
                return;
            }
            student._id = undefined;
            insert('students', student, data => {
                if(data) return history.push('/students');
                console.log('There was error during save data');
            })
        } else {
            if(!student.firstName && !student.lastName) {
                setFirstNameRequired(true);
                setLastNameRequired(true);
                return;
            }
            if(!student.firstName){
                setFirstNameRequired(true);
                return;
            }
            if(!student.lastName){
                setLastNameRequired(true);
                return;
            }
            update('students', id, student, data => {
                if(data) return history.push('/students');
                console.log('There was error during save data');
                })
            }
        }

        const del = () => {
            remove('students', id, data => {
                history.push('/students');
            })
        }

    return (
    <div className='container'>
        <h2>Student</h2>
        <form className='input-form'>
            <div style={{margin:'12px 0'}}>
                <label htmlFor='firstName'>First name: </label>
                <input type='text'
                name='firstName'
                value={student.firstName}
                onChange={changeHandler}
                required />
                {firstNameRequired && <p className="alert">The "First name" field must be filled in!</p>}
            </div>
            <div style={{margin:'12px 0'}}>
                <label htmlFor='lastName'>Last name: </label>
                <input type='text'
                name='lastName'
                value={student.lastName}
                onChange={changeHandler} 
                required />
                {lastNameRequired && <p className="alert">The "Last name" field must be filled in!</p>}
            </div>
            <div style={{margin:'12px 0'}}>
                <label htmlFor='yearOfBirth'>Year Of Birth: </label>
                <input type='text'
                name='yearOfBirth'
                value={student.yearOfBirth}
                onChange={changeHandler} />
            </div>
            <div style={{margin:'12px 0'}}>
                <label htmlFor='address'>Address: </label>
                <input type='text'
                name='address'
                value={student.address}
                onChange={changeHandler} />
            </div>
            <hr />
            {id !== '0' && (
            <div className='left'>
                <button type='button' onClick={del}>DELETE</button>
            </div>
            )}
            <div className='right'>
                <button type='button' onClick={back}>BACK</button>
                &nbsp;&nbsp;
                <button type='button' onClick={save}>SAVE</button>
            </div>
        </form>
    </div>
    );
}

export default Student;