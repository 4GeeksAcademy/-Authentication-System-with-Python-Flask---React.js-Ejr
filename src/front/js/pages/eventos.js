import React from "react";
import Cards from "../component/cards";
import "../../styles/home.css";
import basket1 from '../../img/basket1.jpeg';
import basket2 from '../../img/basket2.jpeg';
import basket3 from '../../img/basket3.jpeg';

import basket5 from '../../img/basket5.jpeg';
import basket6 from '../../img/basket6.jpeg';
import basket7 from '../../img/basket7.jpeg';
import basket8 from '../../img/basket8.jpeg';
import basket9 from '../../img/basket9.jpeg';
const Eventos=()=>{

    
    const handleShowMore = () => {
		console.log("asdf")
		document.getElementById("hiddenCards").style.display = "block"
		document.getElementById("showMore").style.display = "none"
	  }
	  const handleShowLess = () => {
		document.getElementById("showLess").style.display = "none"
		document.getElementById("hiddenCards").style.display = "none"
		document.getElementById("showMore").style.display = "block"
	  }
	return (
		<div className="App">
		<div className="row">
		  <div className="col-12">
			<h1 id="title">Eventos</h1>
		  </div>
		</div>
		<div className="row">
		  <div className="col-12">
			<button id="button-event" type="button" className="btn btn-outline-primary">Próximos Eventos</button>
  
		  </div>
  
		</div>
		<br />
		<div className='container'>
  
		  <Cards
			src={basket8}
			day="10 "
			
			title="JAM ON IT"
			time="10/09/2023 08:00 PM/ "
			location="New York,NY,USA"
			description="This event article, used for writing about and listing the events planned for the future on your website.You can edit all of this text from the Pages tab by clicking the edit button."
		  />
  
		  <button style={{textAlign:"center"}} className="btn btn-lg btn-block btn-outline-primary"  id="showMore" onClick={() => handleShowMore()}>Show more...</button>
		  <div id="hiddenCards" style={{ display: "none"  }}>
  
			<Cards
			  src={basket7}
			  day="25 Dec"
			  title="THE BIG GAME"
			  time="29/11/2023 08:00 PM/ "
			  location="2816 Cinamon Lane , San Antonio, Tx"
			  description="This event article, used for writing about and listing the events planned for the future on your website.You can edit all of this text from the Pages tab by clicking the edit button."
			/>
			<Cards
			  src={basket1}
			  day="25 Dec"
			  title="JAM ON IT"
			  time="10/09/2023 08:00 PM/ "
			  location="New York,NY,USA"
			  description="This event article, used for writing about and listing the events planned for the future on your website.You can edit all of this text from the Pages tab by clicking the edit button."
			/>
			<Cards
			  src={basket3}
			  day="25 Dec"
			  title="THE BIG GAME"
			  time="29/11/2023 08:00 PM/ "
			  location="2816 Cinamon Lane , San Antonio, Tx"
			  description="This event article, used for writing about and listing the events planned for the future on your website.You can edit all of this text from the Pages tab by clicking the edit button."
			/>
			<button  className="btn btn-lg btn-block btn-outline-primary" id="showLess" onClick={() => handleShowLess()}>ShowLess</button>
		  </div>

		</div>
	  </div>
	);
       
    
}
export default Eventos;