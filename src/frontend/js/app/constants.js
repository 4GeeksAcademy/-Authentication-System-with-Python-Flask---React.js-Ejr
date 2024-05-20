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
    all:          0b0000_0000_0111_1111
  },

  ITEMTYPE_WORKSPACE: 0,
  ITEMTYPE_PROJECT: 1,
  ITEMTYPE_TEAM: 2,
  ITEMTYPE_USER: 3,
  ITEMTYPE_BOARD: 4,
  ITEMTYPE_LIST: 5,
  ITEMTYPE_TASK: 6,
  ITEMTYPE_TEXT: 7,
  ITEMTYPE_MEDIA: 8,
  ITEMTYPE_EMBED: 9,

  ITEMDATA_COORDS: "coords",
  ITEMDATA_SIZE: "size",

  ITEM_DIRTY: {
    coords:       0b0000_0000_0000_0001,
    size:         0b0000_0000_0000_0010,
    style:        0b0000_0000_0000_0100,
    cursor:       0b0000_0000_0000_1000,

    transform:    0b0000_0000_0000_0011,
    display:      0b0000_0000_0000_1100,
    all:          0b0000_0000_0000_1111
  }
})

export default Constants