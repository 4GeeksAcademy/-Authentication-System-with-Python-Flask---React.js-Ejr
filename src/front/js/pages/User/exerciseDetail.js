import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from "../../store/appContext";

import Detail from '../../component/User/detail.jsx';
import ExerciseVideos from '../../component/User/exerciseVideos.jsx';
import SimilarExercises from '../../component/User/similarExercises.jsx';

const ExerciseDetail = () => {
    const { store, actions } = useContext(Context);
    const [exerciseDetail, setExerciseDetail] = useState({});
    const [exerciseVideos, setExerciseVideos] = useState([]);
    const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
    const [equipmentExercises, setEquipmentExercises] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });

        const fetchExercisesData = async () => {
            const exercisesData = JSON.parse(localStorage.getItem('allExercises')) || [];
            const exerciseDetailData = exercisesData.find(exercise => exercise.id === id);

            if (exerciseDetailData) {
                setExerciseDetail(exerciseDetailData);

                const targetMuscleExercisesData = exercisesData.filter(exercise => exercise.target === exerciseDetailData.target);
                setTargetMuscleExercises(targetMuscleExercisesData);

                const equipmentExercisesData = exercisesData.filter(exercise => exercise.equipment === exerciseDetailData.equipment);
                setEquipmentExercises(equipmentExercisesData);

                const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com';
                const exerciseVideosData = await actions.fetchDataExercise(
                    `${youtubeSearchUrl}/search?query=${exerciseDetailData.name} exercise`,
                    store.youtubeOptions
                );
                setExerciseVideos(exerciseVideosData.contents);
            }
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
    );
};

export default ExerciseDetail;
