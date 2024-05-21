
const Constants= Object.freeze({

  MOUSE_BTN_LEFT: 0,
  MOUSE_BTN_MIDDLE: 1,
  MOUSE_BTN_RIGHT: 2,

  COOKIE_SAMESITE_NONE: "None",
  COOKIE_SAMESITE_NONE_SECURE: "None; Secure",
  COOKIE_SAMESITE_LAX: "Lax",
  COOKIE_SAMESITE_STRICT: "Strict",

  SESSION_MODE_SIGNUP: 0,
  SESSION_MODE_LOGIN: 1,
  SESSION_MODE_LOGOUT: 2,
  SESSION_MODE_RECOVER: 3,
  SESSION_MODE_DELETED: 4,

  USERPREFS_DARKMODE: "darkMode",

  DEVPREFS_SHOWSTATE: "showState",
  DEVPREFS_PANELPOSITION: "panelPosition",
  DEVPREFS_DEVRENDER: "devRender",
  DEVPREFS_FAKEAUTH: "fakeAuth",

  SITENAME: "KeQQu",

  PAGETITLE: {
    settings:   "Settings",
    dashboard:  "Dashboard",
    workspace:  "Workspace",
    project:    "Project",
    board:      "Board",
    team:       "Team",
    profile:    "Profile",
    login:      "Login",
    signup:     "SignUp",
    logout:     "Come back soon!",
    delete:     "Farewell! :(",
    recover:    "Account recovery"
  },

  BOARD_SIZE_PIXELS: 1048576,

  CANVAS_DIRTY: {
    size:         0b0000_0000_0000_0001,
    origin:       0b0000_0000_0000_0010,
    coords:       0b0000_0000_0000_0100,
    zoom:         0b0000_0000_0000_1000,
    style:        0b0000_0000_0001_0000,
    background:   0b0000_0000_0010_0000,
    cursor:       0b0000_0000_0100_0000,

    transform:    0b0000_0000_0000_1111,
    display:      0b0000_0000_0111_0000,
    all:          0b0000_0000_0111_1111,

    data:         0b1000_0000_0000_0000 // require database reload
  },

  ITEMTYPE: {
    workspace:  0,  
    project:    1,  
    team:       2,  
    user:       3,  
    board:      4,  
    list:       5,  
    task:       6,  
    text:       7,  
    media:      8,  
    embed:      9
  },

  ITEMDATA: {
    coords: "coords",
    size: "size"
  },

  ITEM_DIRTY: {
    coords:       0b0000_0000_0000_0001,
    size:         0b0000_0000_0000_0010,
    style:        0b0000_0000_0000_0100,
    cursor:       0b0000_0000_0000_1000,

    transform:    0b0000_0000_0000_0011,
    display:      0b0000_0000_0000_1100,
    all:          0b0000_0000_0000_1111,

    data:         0b1000_0000_0000_0000 // require database reload
  }
})

export default Constants