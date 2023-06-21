import React, { useEffect, useMemo, useRef, useState } from "react";
import loadingGifUrl from "../../img/loading-gif.gif";
import "../../styles/videocall.css";
import {
    MeetingProvider,
    useMeeting,
    useParticipant,
} from "@videosdk.live/react-sdk";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";

function MeetingView() {
    const [joined, setJoined] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isMicOn, setIsMicOn] = useState(true);
    const [isWebcamOn, setIsWebcamOn] = useState(true);
    const navigate = useNavigate();
    const {
        join,
        participants,
        toggleWebcam,
        toggleMic,
        toggleScreenShare,
        leave,
    } = useMeeting({
        onMeetingJoined: () => {
            setJoined("JOINED");
        },
    });

    const joinMeeting = () => {
        setJoined("JOINING");
        join();
    };

    const handleToggleWebcam = () => {
        toggleWebcam();
        setIsWebcamOn((prevIsWebcamOn) => !prevIsWebcamOn);
    };

    const handleToggleMic = () => {
        toggleMic();
        toggleMicState();
    };

    const toggleMicState = () => {
        setIsMicOn((prevState) => !prevState);
    };

    const handleToggleScreenShare = () => {
        toggleScreenShare();
    };

    const handleLeaveMeeting = () => {
        setShowModal(true);
    };

    const handleConfirmLeave = () => {
        setShowModal(false);
        leave();
        navigate("/home");
    };

    const handleCancelLeave = () => {
        setShowModal(false);
    };


    const participantIds = Array.from(participants.keys());

    const renderParticipants = () => {
        const rows = [];
        const maxColumns = 3;
        const participantCount = participantIds.length;

        const remainingEmptyViews = maxColumns - (participantCount % maxColumns);
        const totalColumns = participantCount + remainingEmptyViews;

        let row = [];

        participantIds.forEach((participantId, index) => {
            row.push(
                <ParticipantView participantId={participantId} key={participantId} />
            );

            const isRowFilled = row.length === maxColumns || index === participantCount - 1;

            if (isRowFilled) {
                rows.push(
                    <div className="row" key={rows.length}>
                        {row}
                    </div>
                );
                row = [];
            }
        });

        for (let i = 0; i < remainingEmptyViews; i++) {
            row.push(<div className="col-md-4 mb-3 p-3" key={`empty-${i}`}></div>);
        }

        if (row.length > 0) {
            rows.push(
                <div className="row" key={rows.length}>
                    {row}
                </div>
            );
        }

        return rows;
    };

    return (
        <div className="container">
            {joined && joined === "JOINED" ? (
                <div className="participants">{renderParticipants()}</div>
            ) : joined && joined === "JOINING" ? (
                <div className="joining-container">
                    <img src={loadingGifUrl} alt="Joining the meeting" className="joining-image" />
                </div>
            ) : (
                <div>
                    <button
                        id="joinButton"
                        onClick={joinMeeting}
                        className="btn btn-primary my-5"
                    >
                        Unirse a la conferencia
                    </button>
                    <button
                        id="joinButton"
                        onClick={() => navigate("/home")}
                        className="btn btn-secondary"
                        style={{ marginTop: "150px" }}
                    >
                        Volver atrás
                    </button></div>
            )}
            {joined && joined === "JOINED" && (

                <div className="footer" style={{ background: "transparent" }}>
                    <div className="toggle-buttons" style={{ background: "transparent" }} >
                        <button onClick={handleToggleWebcam} className="blue-button">
                            {isWebcamOn ? (
                                <i className="fa-solid fa-video video" style={{ background: "transparent" }}></i>
                            ) : (
                                <i className="fa-solid fa-video-slash" style={{ background: "transparent" }}></i>
                            )}
                        </button>
                        <button onClick={handleToggleMic} className="blue-button">
                            {isMicOn ? (
                                <i className="fa-solid fa-microphone microphone" style={{ background: "transparent" }}></i>
                            ) : (
                                <i className="fa-solid fa-microphone-slash" style={{ background: "transparent" }}></i>
                            )}
                        </button>
                        <button onClick={handleToggleScreenShare} className="blue-button">
                            <i className="fa-solid fa-desktop screenshare" style={{ background: "transparent" }}></i>
                        </button>
                        <button onClick={handleLeaveMeeting} className="red-button">
                            <i className="fa-solid fa-phone-slash hangup" style={{ background: "transparent" }}></i>
                        </button>
                    </div>
                </div>
            )
            }

            <div
                className={`modal ${showModal ? "show" : ""}`}
                id="leaveMeetingModal"
                tabIndex="-1"
                role="dialog"
                style={{ display: showModal ? "block" : "none" }}
            >
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Abandonar conferencia</h5>
                            <button
                                type="button"
                                className="closeModalButton"
                                onClick={handleCancelLeave}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>¿Quieres abandonar la video conferencia?</p>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={handleConfirmLeave}
                            >
                                Sí, quiero abandonar la conferencia
                            </button>
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={handleCancelLeave}
                            >
                                No, me quedo
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

function ParticipantView(props) {
    const micRef = useRef(null);
    const {
        webcamStream,
        micStream,
        webcamOn,
        micOn,
        isLocal,
        displayName,
    } = useParticipant(props.participantId);

    const videoStream = useMemo(() => {
        if (webcamOn && webcamStream) {
            const mediaStream = new MediaStream();
            mediaStream.addTrack(webcamStream.track);
            return mediaStream;
        }
    }, [webcamStream, webcamOn]);

    useEffect(() => {
        if (micRef.current) {
            if (micOn && micStream) {
                const mediaStream = new MediaStream();
                mediaStream.addTrack(micStream.track);

                micRef.current.srcObject = mediaStream;
                micRef.current
                    .play()
                    .catch((error) =>
                        console.error("videoElem.current.play() failed", error)
                    );
            } else {
                micRef.current.srcObject = null;
            }
        }
    }, [micStream, micOn]);

    return (
        <div className="col-md-4 col-sm-6">
            <audio ref={micRef} autoPlay playsInline muted={isLocal} />
            {webcamOn && (
                <div className="video-container">
                    <ReactPlayer
                        className="video-player"
                        playsInline
                        pip={false}
                        light={false}
                        controls={false}
                        muted={true}
                        playing={true}
                        url={videoStream}
                        height={"17.5rem"}
                        width={"28.125rem"}
                        onError={(err) => {
                            console.log(err, "participant video error");
                        }} />
                </div>
            )}
        </div>
    );
}

const VideocallViajero = () => {
    return (
        <MeetingProvider
            config={{
                meetingId: "6rey-jzg6-7yoc",
                micEnabled: true,
                webcamEnabled: true,
                name: "Alexander's Org",
            }}
            token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiIxZGE2YjUyZi0zOGI2LTQyZWMtOGNiMi1hN2NhMzQ0NGNlNzkiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY4Njc1Nzc2MywiZXhwIjoxODQ0NTQ1NzYzfQ.n9WB5l4buZ-KX5FvydWbUtB0s-ZFEOEHOZcnSppEDUA"
        >
            <div className="wrapper no-scroll">
                <div className="content">
                    <MeetingView />
                </div>
            </div>
        </MeetingProvider>
    );
};

export default VideocallViajero;
