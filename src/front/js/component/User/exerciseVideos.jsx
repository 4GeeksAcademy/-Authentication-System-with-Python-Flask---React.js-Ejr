import React from "react";
import "../../../styles/User-styles/exerciseVideos.css";

const ExerciseVideos = ({ exerciseVideos, name }) => {
  return (
    <section className="videos-section">
      <h4 className="videos-heading">
        Watch <span className="videos-exercise-name">{name}</span> exercise videos
      </h4>
      <div className="videos-container">
        {exerciseVideos?.slice(0, 3)?.map((item, index) => (
          <a
            key={index}
            className="exercise-video"
            href={`https://www.youtube.com/watch?v=${item.video.videoId}`}
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="video-thumbnail"
              src={item.video.thumbnails[0].url}
              alt={item.video.title}
            />
            <div className="video-info">
              <h5 className="video-title">
                {item.video.title}
              </h5>
              <h6 className="video-channel">
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
