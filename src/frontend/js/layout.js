import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Constants from "./app/constants.js"

import DevTools from "./app/devtools.jsx"

import Navbar from "./component/navbar.jsx"

import LandingView from "./pages/landingView.jsx" // Landing page when logged out (correct naming for old "home")
import SessionManagerView from "./pages/sessionManagerView.jsx" // signup / login / forgot password / logout screen / account removed screen

import SettingsView from "./pages/settingsView.jsx" // profile/account settings
//import ProfileView from "./pages/profileView.jsx" // user's public profile

import DashboardView from "./pages/dashboardView.jsx" // landing page when logged in
import WorkspaceView from "./pages/workspaceView.jsx" // workspace manager
//import TeamView from "./pages/teamView.jsx" // team manager
//import ProjectView from "./pages/projectView.jsx" // project view
import BoardView from "./pages/boardView.jsx" // board view

import { Redirector, NotFound_Generic, HealthCheck, CreamyFap } from "./app/internal.jsx" // redirector, generic 404, health check, paja a la crema
import GlobalListener from "./app/globalListener.jsx" // redirector, generic 404, health check, paja a la crema

import appContext from "./store/appContext.jsx"

const Layout = () => {

  // strict means it wont accept trailing slashes, so "/settings" works while "/settings/" not
  // exact means exact, needed in some cases where we don't want "parent" routes to interfere in children ones
  return (
    <BrowserRouter>
        <DevTools />
        <Routes>
            <Route strict path="/healthcheck" element={<HealthCheck />} exact />
            <Route strict path="/creamyfap" element={<CreamyFap />} exact />
            <Route strict path="/404" element={<NotFound_Generic />} exact />
            <Route path="*" element={
              <>
              <Navbar />
              <Routes>
                  <Route path="/" element={<LandingView />} exact />
      
                  <Route strict path="/signup" element={<SessionManagerView mode={Constants.SESSION_MODE_SIGNUP}/>} />
                  <Route strict path="/login" element={<SessionManagerView mode={Constants.SESSION_MODE_LOGIN}/>} />
                  <Route strict path="/logout" element={<SessionManagerView mode={Constants.SESSION_MODE_LOGOUT}/>} />
                  <Route strict path="/recover" element={<SessionManagerView mode={Constants.SESSION_MODE_RECOVER}/>} />
                  <Route strict path="/farewell" element={<SessionManagerView mode={Constants.SESSION_MODE_DELETED}/>} />
      
                  <Route strict path="/settings" element={<SettingsView />} />
                  {/* <Route strict path="/profile" element={<ProfileView self/>} exact /> */}
                  {/* <Route strict path="/profile/:uid" element={<ProfileView />} /> */}
      
                  <Route strict path="/dashboard" element={<DashboardView />} />
                  <Route strict path="/workspace/:wid" element={<WorkspaceView />} />
                  {/* <Route strict path="/team/:tid" element={<TeamView />} /> */}
                  {/* <Route strict path="/project/:pid" element={<ProjectView />} exact /> */}
                  <Route strict path="/board/:bid" element={<BoardView />}/>
                  
                  <Route path="*" element={<Redirector url="/404" replace/>} />
              </Routes>
              </>
            } />
        </Routes>
        <GlobalListener />
    </BrowserRouter>
  )
}

export default appContext(Layout)
