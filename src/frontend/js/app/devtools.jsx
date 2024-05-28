import React from "react"
import { useNavigate } from "react-router-dom"

import Constants from "./constants.js"
import Utils from "./utils.js"

import { Context } from "../store/appContext.jsx"

const _DEV_PAGES= Object.freeze([
// label, url
  ["landing", "/"],
  [null],
  ["sesmgr-signup", "/signup"],
  ["sesmgr-login", "/login"],
  ["sesmgr-logout", "/logout"],
  ["sesmgr-recover", "/recover"],
  ["sesmgr-farewell", "/farewell"],
  [null],
  ["settings", "/settings"],
  //["profile", "/profile"],
  //["profile-X", "/profile/-1"],
  //["team-X", "/team/-1"],
  [null],
  ["dashboard", "/dashboard"],
  ["workspace-X", "/workspace/-1"],
  //["project-X", "/project/-1"],
  ["board-X", "/board/-1"],
  [null],
  ["404", "/404"],
  ["healthcheck", "/healthcheck"],
  ["creamyfap", "/creamyfap"]
])

const _DEVTOOL_POSITIONS= Object.freeze([
  [[" top-4 left-4"],       [" flex-row mb-2"],           [" flex-col"]],
  [[" top-4 right-4"],      [" flex-row-reverse mb-2"],   [" flex-col"]],
  [[" bottom-4 left-4"],    [" flex-row mt-2"],           [" flex-col-reverse"]],
  [[" bottom-4 right-4"],   [" flex-row-reverse mt-2"],   [" flex-col-reverse"]]
])

const DevTools = () => {
  const 
    { language, store, actions }= React.useContext(Context),
    nav= useNavigate()

  // ------------------------------------------------------------------- DEV
  const
    _devToolState= actions.getDevPref(Constants.DEVPREFS_SHOWSTATE),
    _devToolPosition= actions.getDevPref(Constants.DEVPREFS_PANELPOSITION),
    _devRender= actions.getDevPref(Constants.DEVPREFS_DEVRENDER),
    _fakeAuth= actions.getDevPref(Constants.DEVPREFS_FAKEAUTH),
    _fakeOwner= actions.getDevPref(Constants.DEVPREFS_FAKEOWNER)

  function toggle_devTools(e){ Utils.cancelEvent(e); actions.toggleDevPref(Constants.DEVPREFS_SHOWSTATE)}
  function move_devToolsPanel(e, i){ Utils.cancelEvent(e); actions.setDevPref(Constants.DEVPREFS_PANELPOSITION, i)}
  function toggle_devRender(e){ 
    Utils.cancelEvent(e)
    const new_devRender= !_devRender
    if(new_devRender) document.body.setAttribute("data-devrender", "PAJA_A_LA_CREMA")
    else document.body.removeAttribute("data-devrender")
    actions.toggleDevPref(Constants.DEVPREFS_DEVRENDER)
  }
  function toggle_fakeAuth(e){ 
    actions.accounts_signup("username", "displayname", "email@email.com", "cojones33", false, true)
    Utils.cancelEvent(e); actions.toggleDevAuth()}
  function toggle_fakeOwner(e){ Utils.cancelEvent(e); actions.toggleDevPref(Constants.DEVPREFS_FAKEOWNER)}

  // ------------------------------------------------------------------- USER
  const 
    _userDarkMode= actions.getUserPref(Constants.USERPREFS_DARKMODE),
    _userLanguage= actions.getUserPref(Constants.USERPREFS_LANGUAGE)
  
  function toggle_darkModeState(e){ actions.toggleUserPref(Constants.USERPREFS_DARKMODE)}

  function cycle_language(e){ 
    if(store.readyState.language){
      Utils.cancelEvent(e)
      actions.setUserPref(Constants.USERPREFS_LANGUAGE, _userLanguage < Constants.LANGUAGE_FILES.length -1 ? _userLanguage+1 : 0)
    }
  }

  function load_userPrefs(e){ Utils.cancelEvent(e); actions.loadUserPrefs() }
  function save_userPrefs(e){ Utils.cancelEvent(e); actions.saveUserPrefs() }
  function navigate_page(e, url){ Utils.cancelEvent(e); nav(url) }
  
  // ------------------------------------------------------------------- RETURN
  return (
		<div className={"devtools fixed text-center text-white text-xs" + _DEVTOOL_POSITIONS[_devToolPosition][0]}>
      <div className={"flex" + _DEVTOOL_POSITIONS[_devToolPosition][2]}>
        <div className={"flex" + _DEVTOOL_POSITIONS[_devToolPosition][1]}>
          <button className="bg-slate-400 px-0.5 rounded-md w-7 aspect-square" onClick={toggle_devTools}>{_devToolState ? "❌" : "🛠️"}</button>
        </div>
        { _devToolState &&
        <div className="max-h-70scr w-36 overflow-hidden bg-black bg-opacity-50 border border-slate-600 rounded-xl">
          <div className="max-h-70scr hidescroll-y overflow-x-hidden overflow-y-scroll">
            <div className="flex flex-col w-36 gap-2 p-2">
              <p>-- devPrefs --</p>
              <button className="devtools-btn w-32" onClick={toggle_devRender}>devRender: {_devRender ? "true" : "false"}</button>
              <button className="devtools-btn w-32" onClick={toggle_fakeAuth}>fake auth: {_fakeAuth ? "true" : "false"}</button>
              <button className="devtools-btn w-32" onClick={toggle_fakeOwner}>fake owner: {_fakeOwner ? "true" : "false"}</button>
              <div className="flex flex-col w-28 mx-auto border border-gray-600 gap-2">
                <div className="flex justify-between">
                  <button className="devtools-corner-btn rounded-br-3xl" onClick={(e)=>{move_devToolsPanel(e, 0)}}>TL</button>
                  <button className="devtools-corner-btn rounded-bl-3xl" onClick={(e)=>{move_devToolsPanel(e, 1)}}>TR</button>
                </div>
                <div className="flex justify-between">
                  <button className="devtools-corner-btn rounded-tr-3xl" onClick={(e)=>{move_devToolsPanel(e, 2)}}>BL</button>
                  <button className="devtools-corner-btn rounded-tl-3xl" onClick={(e)=>{move_devToolsPanel(e, 3)}}>BR</button>
                </div>
              </div>
              <p>-- userPrefs --</p>
              <button className="devtools-btn w-32" onClick={toggle_darkModeState}>{_userDarkMode ? "dark mode" : "light mode"}</button>
              <button className="devtools-btn w-32" onClick={cycle_language}>language: {language.get("_name")}</button>
              <div className="flex gap-3">
                <button className="devtools-btn w-20" onClick={load_userPrefs}>load</button>
                <button className="devtools-btn w-20" onClick={save_userPrefs}>save</button>
              </div>
              <p>-- navigation --</p>
              <div className="flex flex-col gap-1">
                { _DEV_PAGES.map((p,i)=> p[0] ?
                  <button key={`nav-${i}-${p[0]}`} className={"devtools-btn w-32 " + (window.location.pathname.toLowerCase()===p[1] ? "active" : "")} onClick={(e)=>{navigate_page(e, p[1])}}>{p[0]}</button>
                  :
                  <div key={`sep-${i}`} className="h-1"></div>
                )}
              </div>
            </div>
          </div>
        </div>
        }
      </div>
		</div>
	)
}

export default DevTools
