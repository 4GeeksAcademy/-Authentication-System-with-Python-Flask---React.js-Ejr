import board_default_background from "../../assets/img/board-default-bg.png" 
import Constants from "../app/constants.js"

// ------------------------------------------------------------ DEFAULT VALUES FOR STORE SHIT

export const storeDefaults = Object.freeze({
  // user preferences
  userPrefs: {
    darkMode: false   // site dark mode state
  },
  // dev preferences, for us, stored on cookie, remove on production or make it unaccessible for non-admins
  devPrefs: {
    showState: false, // current show state of the devtools panel
    panelPosition: 3, // corner of the devtools panel (0:TL 1:TR 2:BL 3:BR)
    devRender: false  // general purpose usage, toggleable in dev panel
  },
  // board data
  board:{
    title: "Untitled",
    description: "Write a description of your board",
    backgroundUrl: board_default_background, 
    itemCount: 2,
    items: [
      {
        id:0,
        type: Constants.BOARD_ITEMTYPE_LIST,
        meta: {
          title: "first test",
          coords: [0,0]
        }
      },
      {
        id:1,
        type: Constants.BOARD_ITEMTYPE_LIST,
        meta: {
          title: "example two",
          coords: [128,256]
        }
      },
      {
        id:1,
        type: Constants.BOARD_ITEMTYPE_LIST,
        meta: {
          title: "un pollardo loco",
          coords: [-400,-24]
        }
      }
    ]
  }
})