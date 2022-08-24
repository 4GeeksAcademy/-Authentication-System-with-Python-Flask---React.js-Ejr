import React from "react";
import Chat from "../component/Chat";
import CloseChat from "../component/CloseChat";
import { auth } from "./fire";
import { useAuthState } from "react-firebase-hooks/auth";
import "../../styles/msgs.css";
import SendMessage from "../component/SendMessage";

const ChatPage = () => {
  const [user] = useAuthState(auth);

  return (
    <section className="container w-75 mb-3">
      <CloseChat />
      <div className="container  pb-3">
        <div className="row">
          <div className="col-md-12">
            <div className="card" id="chat3">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 col-lg-5 col-xl-5 mb-4 mb-md-0">
                    <div className="p-3">
                      <div className="input-group rounded mb-3">
                        <input
                          type="search"
                          className="form-control rounded"
                          placeholder="Search"
                          aria-label="Search"
                          aria-describedby="search-addon"
                        />
                        <span
                          className="input-group-text border-0 bg-white"
                          id="search-addon"
                        >
                          <i className="fas fa-search"></i>
                        </span>
                      </div>

                      <div data-mdb-perfect-scrollbar="true" id="cards">
                        <ul className="list-unstyled mb-0">
                          <li className="p-2 border-bottom">
                            <div className="d-flex justify-content-between">
                              <div className="d-flex flex-row">
                                <div>
                                  <img
                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                                    alt="avatar"
                                    className="d-flex align-self-center me-3"
                                    width="60"
                                  />
                                </div>
                                <div className="pt-1">
                                  <p className="fw-bold text-primary mb-0">
                                    Alexa Chung
                                  </p>
                                  <p className="small text-muted">
                                    Lorem ipsum dolor sit.
                                  </p>
                                </div>
                              </div>
                              <div className="pt-1">
                                <p className="small text-muted mb-1">
                                  5 mins ago
                                </p>
                                <span className="badge bg-danger rounded-pill float-end">
                                  2
                                </span>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 col-lg-7 col-xl-7">
                    <div
                      className="pt-3 pe-3"
                      data-mdb-perfect-scrollbar="true"
                      id="cards"
                    >
                      {user ? <Chat /> : ""}
                    </div>
                    <SendMessage />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatPage;
