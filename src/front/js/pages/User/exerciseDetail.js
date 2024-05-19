import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Context } from "../../store/appContext";

import Detail from '../../component/User/detail.jsx'
import ExerciseVideos from '../../component/User/exerciseVideos.jsx'
import SimilarExercises from '../../component/User/similarExercises.jsx'



const ExerciseDetail = ({ }) => {
    const { store, actions } = useContext(Context)
    const [exerciseDetail, setExerciseDetail] = useState({});
    const [exerciseVideos, setExerciseVideos] = useState([]);
    const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
    const [equipmentExercises, setEquipmentExercises] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });

        const fetchExercisesData = async () => {
            const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com';
            const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com';

            const exerciseDetailData = await actions.fetchDataExercise(`${exerciseDbUrl}/exercises/exercise/${id}`, store.exerciseOptions);
            setExerciseDetail(exerciseDetailData);

            const exerciseVideosData = await actions.fetchDataExercise(`${youtubeSearchUrl}/search?query=${exerciseDetailData.name} exercise`, store.youtubeOptions);
            setExerciseVideos(exerciseVideosData.contents);

            const targetMuscleExercisesData = await actions.fetchDataExercise(`${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`, store.exerciseOptions);
            setTargetMuscleExercises(targetMuscleExercisesData);

            const equimentExercisesData = await actions.fetchDataExercise(`${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`, store.exerciseOptions);
            setEquipmentExercises(equimentExercisesData);
        };

        fetchExercisesData();
    }, [id]);

    if (!exerciseDetail) return <div>No Data</div>;

    return (
        <div className='detail-exer-container'>
            <Detail exerciseDetail={exerciseDetail} />
            <ExerciseVideos exerciseVideos={exerciseVideos} name={exerciseDetail.name} />
            <SimilarExercises targetMuscleExercises={targetMuscleExercises} equipmentExercises={equipmentExercises} />
        </div>
    )
}

export default ExerciseDetail