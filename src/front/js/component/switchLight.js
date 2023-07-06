
import React, { useContext, useState, useEffect } from "react";

import ReactSwitch from "react-switch";
import { ThemeContext } from "../layout";
import { Context } from "../store/appContext";






export const SwitchLight = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    return (
      <div className="switch ms-4 mt-2 me-3">
                <label className="mode me-2 switch">{theme === "light" ? <i className="fa-regular fa-lightbulb"></i> : <i className="fa-solid fa-lightbulb"></i>}</label>
                <ReactSwitch
                  onChange={toggleTheme}
                  checked={theme === "dark"}
                  className="switch"
                  checkedIcon={null}
                  uncheckedIcon={null}
                  onColor="#200000"
                />
              </div>
    )
  };
