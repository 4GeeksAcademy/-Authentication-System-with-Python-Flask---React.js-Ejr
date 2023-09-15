import React from "react";
import "../../styles/global.css"
import "./global.js"


const AlertView = () => {
    const [isAlertVisible, setIsAlertVisible] = useState(true);
    const closeAlert = () => {
        setIsAlertVisible(false);
      };
    return (
        <div className="container w-50">
            <h1 className="mt-5">Alerts</h1>
            <p className="fs-5 mt-2 mb-3">The <span style={{"color":"#FD5812"}}>c-alert component</span> is used to convey important information to the user through the use of contextual types, icons, and colors.</p>
            <div className="container border border-secondary-subtle px-4 py-4 rounded shadow p-3 mb-5 bg-body-tertiary rounded">
                
                <div class="c-alert c-alert-dark" role="alert"> 
                    This is a dark alert!
                </div>
                <div class="c-alert c-alert-slate" role="alert"> 
                    This is a slate alert!
                </div>
                <div class="c-alert c-alert-gloomy" role="alert"> 
                    This is a gloomy alert!
                </div>
                <div class="c-alert c-alert-silver" role="alert"> 
                    This is a silver alert!
                </div>
                <div class="c-alert c-alert-risk" role="alert"> 
                    This is a risk alert!
                </div>
                <div class="c-alert c-alert-caution" role="alert"> 
                    This is a caution alert!
                </div>
                <div class="c-alert c-alert-gold" role="alert"> 
                    This is a golden alert!
                </div>
                <div class="c-alert c-alert-lime" role="alert"> 
                    This is a lime alert!
                </div>
                <div class="c-alert c-alert-mint" role="alert"> 
                    This is a mint alert!
                </div>
                <div class="c-alert c-alert-win" role="alert"> 
                    This is a win alert!
                </div>
                <div class="c-alert c-alert-azure" role="alert"> 
                    This is an azure alert!
                </div>
                <div class="c-alert c-alert-aqua" role="alert"> 
                    This is an aqua alert!
                </div>
                
                <div class="c-alert c-alert-lavender" role="alert"> 
                    This is a lavender alert!
                </div>
                <div class="c-alert c-alert-purple" role="alert"> 
                    This is a purple alert!
                </div>
                <div class="c-alert c-alert-lollypop" role="alert"> 
                    This is a lollypop alert!
                </div>
                <div class="c-alert c-alert-fog" role="alert"> 
                    This is a foggy alert!
                </div>
                <div class="c-alert c-alert-componentify" role="alert"> 
                    This is a componentify alert!
                </div>
                <div class="c-alert c-alert-mocca" role="alert"> 
                    This is a mocca alert!
                </div>
            </div>
        </div>
    )
}
    


export default AlertView;