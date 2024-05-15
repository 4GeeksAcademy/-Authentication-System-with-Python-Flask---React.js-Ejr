import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Context } from "../../store/appContext";

import Detail from '../../component/User/detail.jsx'
import ExerciseVideos from '../../component/User/exerciseVideos.jsx'
import SimilarExercises from '../../component/User/similarExercises.jsx'



const ExerciceDetail = ({ }) => {
    const { store, actions } = useContext(Context)
    const [exerciseDetail, setExerciseDetail] = useState({})
    const { id } = useParams()

    useEffect(() => {
        const fetchExerciseData = async () => {
            const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com';
            const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com';

            const exerciseDetailData = await actions.fetchData(`${exerciseDbUrl}/exercises/exercise/${id}`, store.exerciseOptions);
            setExerciseDetail(exerciseDetailData);
        }

        fetchExerciseData();
    }, [id])


    return (
        <div className='detail-exer-container'>
            <Detail exerciseDetail={exerciseDetail} />
            <ExerciseVideos />
            <SimilarExercises />
        </div>
    )
}

export default ExerciceDetail