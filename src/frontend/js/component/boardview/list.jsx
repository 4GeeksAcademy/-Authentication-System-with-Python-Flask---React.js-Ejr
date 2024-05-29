import React from "react"
import Constants from "../../app/constants.js"

import { Context } from "../../store/appContext.jsx"
import Task from "./task.jsx"

const List = ({id, title, coords, bref}) => {
  
  // --------------------------------------------------------------- INITIALIZATION 

	const 
    { language, store, actions } = React.useContext(Context),
    itemRef= React.useRef(null)

  const 
    [ itemState, _scs ]= React.useState({
      title: title,
      coords: { x:coords[0], y:coords[1] },
      offset: { x:0, y:0 },
      size: { x:0, y:0 },
      dirty: 0,
      millistamp: Date.now()
    }),
    [ childItems, set_childItems ]= React.useState([]),
    itemUtils= React.useRef([])
  
  function merge_itemState(new_state){ _scs({ ...Object.assign(itemState, { ...new_state, millistamp: Date.now() })})}

  React.useEffect(()=>{ 
    bref[0].current[bref[1]]= {
      get: (prop)=> { return !prop ? itemRef : itemState[prop] }, 
      set: (state)=>{ merge_itemState(state) }
    }
    merge_itemState({dirty:Constants.ITEM_DIRTY.all | Constants.ITEM_DIRTY.data})
  },[])

  // --------------------------------------------------------------- DIRTY UPDATES
  
  // apply canvas position changes
  React.useEffect(()=>{
    if(itemState.dirty != 0){
      const itemStyle= itemRef.current.style

      if(itemState.dirty & Constants.ITEM_DIRTY.data){
        
        const content= store.items.find(e=>e.id===parseInt(id))?.content
        if(content?.length > 0){
        
          itemUtils.current= Array(content.length)
        
          const react= content.map((c,i)=>{
            const item= store.items.find(e=>e.id===c)
            if(item) {
              return <Task key={`${item.id}|${item.bid}`} id={item.id} bref={[itemUtils, i]} {...item.props} />
            }
          }).filter(e=>e!=null)
        
          set_childItems(react)
          console.log(`item contains ${react.length} child items`)
        }
        else console.dirxml(`%cempty item with id: ${id}`, 'color:#ff0')
      }

      if(itemState.dirty & Constants.ITEM_DIRTY.coords){
        itemStyle.setProperty("--item-coords-x", itemState.coords.x + "px" )
        itemStyle.setProperty("--item-coords-y", itemState.coords.y + "px" )
      }
  
      if(itemState.dirty & Constants.ITEM_DIRTY.size){
        itemStyle.setProperty("--item-size-x", itemState.size.x + "px")
        itemStyle.setProperty("--item-size-y", itemState.size.y + "px")
      }
  
      if(itemState.dirty & Constants.ITEM_DIRTY.style){
      }
      
      if(itemState.dirty & Constants.ITEM_DIRTY.cursor){
      }
  
      merge_itemState({dirty:0})
    }
  },[itemState.millistamp])
  
  // --------------------------------------------------------------- CONTEXTUAL MENU 
    
  function handleContextualMenu(e){
    if(pointerUtils.getZsort(canvasRef.current) === 0) {
      console.log("board context menu!")
      e.preventDefault()
    }
  }

  // --------------------------------------------------------------- BUTTON HANDLES

  function handleAddRowButton(e) {
    actions.addChildItem(id, Constants.ITEMTYPE.task)
  }

  function handleBuzzButton(e) {
    console.log("buzz button")
  }

  function handleStylesButton(e) {
    console.log("styles button")
  }

  function handleMenuButton(e) {
    console.log("menu button")
  }

  // --------------------------------------------------------------- RETURN 

	return (
		<div ref={itemRef} className="k--list k--ghostifyable h-min min-w-80 rounded-lg cursor-auto bg-zinc-100 text-gray-700 dark:bg-zinc-900 dark:text-white">
      <div className="flex flex-col h-full justify-between">
        <div>
          <button data-knob="grab" className="devknob w-full h-6 cursor-move pointer-skip-below text-gray-400 dark:text-zinc-700 overflow-hidden">
            <div className="w-fit mx-auto my-auto">
              <i className="-translate-y-1 fa fa-solid fa-grip-lines text-2xl" />
            </div>
          </button>
          <h3 className="mx-4 h-8 font-bold text-xl" >{itemState.title}</h3>
          <div className="flex flex-col m-2 gap-2">
            {childItems}
          </div>
        </div>
        <div className="flex flex-row justify-between h-6 relative text-lg text-gray-400 dark:text-zinc-600">
          <button className="flex hover:text-gray-600 dark:hover:text-zinc-500" onClick={handleAddRowButton}>
            <i className="mx-2 mb-2 fa fa-solid fa-plus my-auto" />
            <span className="-mt-1.5">{language.get("board.list.btn-additem")}</span>
          </button>
          <div className="flex">
            <div className="flex mr-4 gap-3">
              <ListIconButton icon="fa-solid fa-bell-concierge" onClick={handleBuzzButton} />
              <ListIconButton icon="fa-solid fa-palette" onClick={handleStylesButton} />
              <ListIconButton icon="fa-solid fa-bars" onClick={handleMenuButton} />
            </div>
            <div className="-mt-1 relative">
              <i className="fa fa-solid fa-angles-right my-auto rotate-45 text-2xl" />
              <button data-knob="resize" className="devknob absolute cursor-se-resize size-7 right-0 bottom-0" />
            </div>
          </div>
        </div>
      </div>
		</div>
	)
}

export default List

const ListIconButton= ({ icon, onClick})=>{
  return (
    <button className="flex hover:text-gray-600 dark:hover:text-zinc-400" onClick={onClick}>
      <i className={"fa " + icon} />
    </button>
  )
}
