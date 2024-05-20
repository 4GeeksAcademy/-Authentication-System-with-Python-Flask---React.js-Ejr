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
    id: 0,
    pid: 0,
    timestamp: Date.now(),
    visibility: 0b0000_0001,

    title: "Example Table",
    owner_id: 0,

    thumb: board_default_background,

    size: 4096,
    background: board_default_background,
    origin: [0, 0],
    zoom: 1.0,

    styles: {}
  },
  // items
  items: [
    {
      id: 5512,
      bid: 0,
      timestamp: Date.now(),
      
      type: Constants.ITEMTYPE_LIST,

      props: {
        title: "first test",
        coords: [0, 0],
        size: [-1,-1],
      },

      style: {},
      content: {}
    },
    {
      id: 1346,
      bid: 0,
      timestamp: Date.now(),
      
      type: Constants.ITEMTYPE_LIST,
      
      props: {
        title: "example two",
        coords: [128, 256],
        size: [-1,-1],
      },

      style: {},
      content: {}
    },
    {
      id: 43,
      bid: 0,
      timestamp: Date.now(),
      
      type: Constants.ITEMTYPE_LIST,
      
      props: {
        title: "un pollardo loco",
        coords: [-400,-24],
        size: [-1,-1],
      },

      style: {},
      content: {}
    },
    {
      id: 675,
      bid: 0,
      timestamp: Date.now(),
      
      type: Constants.ITEMTYPE_LIST,
      
      props: {
        title: "paja a la crema",
        coords: [-400,-324],
        size: [450, -1],
      },

      style: {},
      content: {}
    }
  ]
})