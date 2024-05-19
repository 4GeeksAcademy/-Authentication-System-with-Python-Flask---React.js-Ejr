import React from "react";

const ExerciseVideos = ({ exerciseVideos, name }) => {

  return (
    <section >
      <h4 >
        Watch <span style={{ color: '#02b532', textTransform: 'capitalize' }}>{name}</span> exercise videos
      </h4>
      <div>
        {exerciseVideos?.slice(0, 3)?.map((item, index) => (
          <a
            key={index}
            className="exercise-video"
            href={`https://www.youtube.com/watch?v=${item.video.videoId}`}
            target="_blank"
            rel="noreferrer"
          >
            <img style={{ borderTopLeftRadius: '20px' }} src={item.video.thumbnails[0].url} alt={item.video.title} />
            <div>
              <h5 >
                {item.video.title}
              </h5>
              <h6 >
                {item.video.channelName}
              </h6>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};


export default ExerciseVideos;
