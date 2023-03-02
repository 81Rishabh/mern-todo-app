import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import {setSlug } from '../features/todo/todoSlice'

function GoalForm({setShow}) {
  const dispatch = useDispatch();
  return (
    <section className='form'>
        <div className='form-group'>
          <Button variant="dark" type='submit' onClick={() => {
            setShow(true);
            dispatch(setSlug('create'));
          }}>
            Add Todo
          </Button>
        </div>
    </section>
  )
}

export default GoalForm
