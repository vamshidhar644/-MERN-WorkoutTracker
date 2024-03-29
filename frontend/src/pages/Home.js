import React, { useEffect } from 'react'
import WorkoutDetails from '../Components/WorkoutDetails'
import WorkoutForm from '../Components/WorkoutForm'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'

const Home = () => {
    const { workouts, dispatch } = useWorkoutsContext()

    const { user } = useAuthContext()

    useEffect(() => {
        const fetchWorkout = async () => {
            const response = await fetch('/api/workouts', {
                headers: {
                    'Authorization' : `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if(response.ok){
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }
        
        if(user){
            fetchWorkout()
        }
    }, [dispatch])
    
  return (
    <div className='home'>
        <div className='workouts'>
            {
                workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout}/>
                ))
            }
        </div>
        <WorkoutForm/>
    </div>
  )
}

export default Home