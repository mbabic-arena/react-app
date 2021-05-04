import { useEffect, useState } from 'react';
import { insert, update, read, remove } from '../services/apiService';

const Course = ({ match, history }) => {

    const [id] = useState(match.params.id);
    const [course, setCourse] = useState({
        _id: '0',
        name: '',
        points: 0
    });
    const [nameRequired, setNameRequired] = useState(false);
    const [pointsRequired, setPointsRequired] = useState(false);


    useEffect(() => {
        if(id !== '0') {
            read('courses', id, data => {
                if (data) setCourse(data);
            })
        }
    }, [id]);

    function changeHandler(e) {
        if(e.target.name && e.target.value === "name") {
            setNameRequired(false);
        }
        if(e.target.name && e.target.value === "points"){
            setPointsRequired(false);
        }
        setCourse({
            ...course,
            [e.target.name]: e.target.value
        });
    }

    const back = () => {
        history.push('/courses');
    }

    const save = () => {
        if(id === '0') {
            if(!course.name && !course.points) {
                setNameRequired(true);
                setPointsRequired(true);
                return;
            }
            if(!course.name){
                setNameRequired(true);
                return;
            }
            if(!course.points){
                setPointsRequired(true);
                return;
            }
            course._id = undefined;
            insert('courses', course, data => {
                if(data) return history.push('/courses');
                console.log('There was error during save data');
            })
        } else {
            if(!course.name && !course.points) {
                setNameRequired(true);
                setPointsRequired(true);
                return;
            }
            if(!course.name){
                setNameRequired(true);
                return;
            }
            if(!course.points){
                setPointsRequired(true);
                return;
            }
            update('courses', id, course, data => {
                if(data) return history.push('/courses');
                console.log('There was error during save data');
                })
            }
        }

        const del = () => {
            remove('courses', id, data => {
                history.push('/courses');
            })
        }

    return (
    <div className='container'>
        <h2>Course</h2>
        <form className='input-form'>
            <div style={{margin:'12px 0'}}>
                <label htmlFor='name'>Course name: </label>
                <input type='text'
                name='name'
                value={course.name}
                onChange={changeHandler}
                required />
                {nameRequired && <p className="alert">The "Course name" field must be filled in!</p>}
            </div>
            <div style={{margin:'12px 0'}}>
                <label htmlFor='points'>Course points: </label>
                <input type='text'
                name='points'
                value={course.points}
                onChange={changeHandler}
                required />
                {pointsRequired && <p className="alert">The "Course points" field must be filled in!</p>}
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

export default Course;