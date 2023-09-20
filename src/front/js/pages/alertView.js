import React from "react";
import "../../styles/global.css"
import "./global.js"
import { SideBar } from "../component/sideBar"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';



const AlertView = () => {
    

    const myStyle = {padding: "1rem 1rem"}
    return (

        
<div className="container">
    <div className="row">
        <SideBar />
        <div className="col-10">
        {/* seccion derecha de la pagina */}
        <div className="container">
            <div className="row"> 
          {/* titulo */}
            
                <h1 className="mt-3">Alerts</h1> 
                <p className="fs-5 mt-2 mb-3">The <span style={{ "color": "#FD5812" }}>c-alert component</span> is used to convey important information to the user through the use of contextual types, icons, and colors.
                Alerts are available for any length of text. For proper styling, use one of the eighteen required contextual classes (e.g., <span className="text-componentify">.c-alert-componentify</span>).</p>
            </div> 
            
  <div className="row">
      {/* <div className="border border-secondary-subtle px-3 rounded shadow bg-body-tertiary rounded"> */}
        {/* Componentes */}
        {/* <div className="row">
          <div className="col-3 border-end border-secondary-subtle c-alert">
              <div className="c-alert c-alert-dark" role="alert">
                This is a dark alert!
              </div>
          </div>
          <div className="col-9 c-alert">
              <SyntaxHighlighter language="html" style={prism}> */}
                {/* {`<div class="c-alert c-alert-slate" role="alert"> This is a slate alert!</div>`} */}
              {/* </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </div> */}

<div className="col-lg-3 col-md-3 col-sm-3 col-12">
    <div className="c-alert c-alert-dark" role="alert">
        This is a dark alert!
    </div>
</div>
<div className="col-lg-9 col-md-9 col-sm-9 col-12">
    <SyntaxHighlighter className="mt-0 c-alert" language="html" style={prism}> 
        {`<div class="c-alert c-alert-dark" role="alert"> This is a dark alert!</div>`} 
    </SyntaxHighlighter>
</div>
<div className="col-lg-3 col-md-3 col-sm-3 col-12">
    <div className="c-alert c-alert-slate" role="alert">
        This is a slate alert!
    </div>
</div>
<div className="col-lg-9 col-md-9 col-sm-9 col-12">
    <SyntaxHighlighter className="mt-0 c-alert" language="html" style={prism}> 
        {`<div class="c-alert c-alert-slate" role="alert"> This is a slate alert!</div>`} 
    </SyntaxHighlighter>
</div>
<div className="col-lg-3 col-md-3 col-sm-3 col-12">
    <div className="c-alert c-alert-gloomy" role="alert">
        This is a gloomy alert!
    </div>
</div>
<div className="col-lg-9 col-md-9 col-sm-9 col-12">
    <SyntaxHighlighter className="mt-0 c-alert" language="html" style={prism}> 
        {`<div class="c-alert c-alert-gloomy" role="alert"> This is a gloomy alert!</div>`} 
    </SyntaxHighlighter>
</div>
<div className="col-lg-3 col-md-3 col-sm-3 col-12">
    <div className="c-alert c-alert-silver" role="alert">
        This is a silver alert!
    </div>
</div>
<div className="col-lg-9 col-md-9 col-sm-9 col-12">
    <SyntaxHighlighter className="mt-0 c-alert" language="html" style={prism}> 
        {`<div class="c-alert c-alert-silver" role="alert"> This is a silver alert!</div>`} 
    </SyntaxHighlighter>
</div>
<div className="col-lg-3 col-md-3 col-sm-3 col-12">
    <div className="c-alert c-alert-risk" role="alert">
        This is a risk alert!
    </div>
</div>
<div className="col-lg-9 col-md-9 col-sm-9 col-12">
    <SyntaxHighlighter className="mt-0 c-alert" language="html" style={prism}> 
        {`<div class="c-alert c-alert-risk" role="alert"> This is a risk alert!</div>`} 
    </SyntaxHighlighter>
</div>
<div className="col-lg-3 col-md-3 col-sm-3 col-12">
    <div className="c-alert c-alert-caution" role="alert">
        This is a caution alert!
    </div>
</div>
<div className="col-lg-9 col-md-9 col-sm-9 col-12">
    <SyntaxHighlighter className="mt-0 c-alert" language="html" style={prism}> 
        {`<div class="c-alert c-alert-caution" role="alert"> This is a caution alert!</div>`} 
    </SyntaxHighlighter>
</div>
<div className="col-lg-3 col-md-3 col-sm-3 col-12">
    <div className="c-alert c-alert-gold" role="alert">
        This is a golden alert!
    </div>
</div>
<div className="col-lg-9 col-md-9 col-sm-9 col-12">
    <SyntaxHighlighter className="mt-0 c-alert" language="html" style={prism}> 
        {`<div class="c-alert c-alert-gold" role="alert"> This is a golden alert!</div>`} 
    </SyntaxHighlighter>
</div>
<div className="col-lg-3 col-md-3 col-sm-3 col-12">
    <div className="c-alert c-alert-lime" role="alert">
        This is a lime alert!
    </div>
</div>
<div className="col-lg-9 col-md-9 col-sm-9 col-12">
    <SyntaxHighlighter className="mt-0 c-alert" language="html" style={prism}> 
        {`<div class="c-alert c-alert-lime" role="alert"> This is a lime alert!</div>`} 
    </SyntaxHighlighter>
</div>
<div className="col-lg-3 col-md-3 col-sm-3 col-12">
    <div className="c-alert c-alert-mint" role="alert">
        This is a mint alert!
    </div>
</div>
<div className="col-lg-9 col-md-9 col-sm-9 col-12">
    <SyntaxHighlighter className="mt-0 c-alert" language="html" style={prism}> 
        {`<div class="c-alert c-alert-mint" role="alert"> This is a mint alert!</div>`} 
    </SyntaxHighlighter>
</div>
<div className="col-lg-3 col-md-3 col-sm-3 col-12">
    <div className="c-alert c-alert-win" role="alert">
        This is a win alert!
    </div>
</div>
<div className="col-lg-9 col-md-9 col-sm-9 col-12">
    <SyntaxHighlighter className="mt-0 c-alert" language="html" style={prism}> 
        {`<div class="c-alert c-alert-win" role="alert"> This is a win alert!</div>`} 
    </SyntaxHighlighter>
</div>
<div className="col-lg-3 col-md-3 col-sm-3 col-12">
    <div className="c-alert c-alert-azure" role="alert">
        This is an azure alert!
    </div>
</div>
<div className="col-lg-9 col-md-9 col-sm-9 col-12">
    <SyntaxHighlighter className="mt-0 c-alert" language="html" style={prism}> 
        {`<div class="c-alert c-alert-azure" role="alert"> This is an azure alert!</div>`} 
    </SyntaxHighlighter>
</div>
<div className="col-lg-3 col-md-3 col-sm-3 col-12">
    <div className="c-alert c-alert-aqua" role="alert">
        This is an aqua alert!
    </div>
</div>
<div className="col-lg-9 col-md-9 col-sm-9 col-12">
    <SyntaxHighlighter className="mt-0 c-alert" language="html" style={prism}> 
        {`<div class="c-alert c-alert-aqua" role="alert"> This is an aqua alert!</div>`} 
    </SyntaxHighlighter>
</div>
<div className="col-lg-3 col-md-3 col-sm-3 col-12">
    <div className="c-alert c-alert-lavender" role="alert">
        This is a lavender alert!
    </div>
</div>
<div className="col-lg-9 col-md-9 col-sm-9 col-12">
    <SyntaxHighlighter className="mt-0 c-alert" language="html" style={prism}> 
        {`<div class="c-alert c-alert-lavender" role="alert"> This is a lavender alert!</div>`} 
    </SyntaxHighlighter>
</div>
<div className="col-lg-3 col-md-3 col-sm-3 col-12">
    <div className="c-alert c-alert-purple" role="alert">
        This is a purple alert!
    </div>
</div>
<div className="col-lg-9 col-md-9 col-sm-9 col-12">
    <SyntaxHighlighter className="mt-0 c-alert" language="html" style={prism}> 
        {`<div class="c-alert c-alert-purple" role="alert"> This is a purple alert!</div>`} 
    </SyntaxHighlighter>
</div>
<div className="col-lg-3 col-md-3 col-sm-3 col-12">
    <div className="c-alert c-alert-lollypop" role="alert">
        This is a lollypop alert!
    </div>
</div>
<div className="col-lg-9 col-md-9 col-sm-9 col-12">
    <SyntaxHighlighter className="mt-0 c-alert" language="html" style={prism}> 
        {`<div class="c-alert c-alert-lollypop" role="alert"> This is a lollypop alert!</div>`} 
    </SyntaxHighlighter>
</div>
<div className="col-lg-3 col-md-3 col-sm-3 col-12">
    <div className="c-alert c-alert-foggy" role="alert">
        This is a foggy alert!
    </div>
</div>
<div className="col-lg-9 col-md-9 col-sm-9 col-12">
    <SyntaxHighlighter className="mt-0 c-alert" language="html" style={prism}> 
        {`<div class="c-alert c-alert-foggy" role="alert"> This is a foggy alert!</div>`} 
    </SyntaxHighlighter>
</div>
<div className="col-lg-3 col-md-3 col-sm-3 col-12">
    <div className="c-alert c-alert-componentify" role="alert">
        This is a componentify alert!
    </div>
</div>
<div className="col-lg-9 col-md-9 col-sm-9 col-12">
    <SyntaxHighlighter className="mt-0 c-alert" language="html" style={prism}> 
        {`<div class="c-alert c-alert-componentify" role="alert"> This is a componentify alert!</div>`} 
    </SyntaxHighlighter>
</div>
<div className="col-lg-3 col-md-3 col-sm-3 col-12">
    <div className="c-alert c-alert-mocca" role="alert">
        This is a mocca alert!
    </div>
</div>
<div className="col-lg-9 col-md-9 col-sm-9 col-12">
    <SyntaxHighlighter className="mt-0 c-alert" language="html" style={prism}> 
        {`<div class="c-alert c-alert-mocca" role="alert"> This is a mocca alert!</div>`} 
    </SyntaxHighlighter>
</div>



</div>
        </div> 
    </div>
 </div> 
 </div>
    )}
        // <div className="container">
        //   <h1 className="mt-5">Buttons</h1>
        //   <p className="fs-5 mt-2 mb-3">The <span style={{ "color": "#FD5812" }}>c-btn component</span> replaces the standard html button with a material design theme and a multitude of options. Any color helper class can be used to alter the background or text color.</p>
    
    
        {/*aqui inicia el boton y el codigo */}
    //       <div className="row container border border-secondary-subtle px-4 py-4 rounded shadow p-3 mb-5 bg-body-tertiary rounded">
    //         <div className="col-2 border border-secondary-subtle">
    //           <button type="button" class="c-btn c-btn-dark">Dark</button>
    //         </div>
    //         <div className="col-10 border border-secondary-subtle">
    //           <pre className="c-btn">
    //             <code>{`<button type="button" class="c-btn c-btn-dark c-btn-dark-hover">Dark</button>`} </code>
    //           </pre>
    //         </div>
    //       </div>
    //       <div className="row container border border-secondary-subtle px-4 py-4 rounded shadow p-3 mb-5 bg-body-tertiary rounded">
    //         <div className="col-2 border border-secondary-subtle">
    //         <button type="button" class="c-btn c-btn-slate">Slate</button>
    //         </div>
    //         <div className="col-10 border border-secondary-subtle">
    //           <pre className="c-btn">
    //           <code>{`<button type="button" class="c-btn c-btn-slate c-btn-slate-hover">Slate</button>`} </code>
    //           </pre>
    //         </div>
    //       </div>
    //       <div className="row container border border-secondary-subtle px-4 py-4 rounded shadow p-3 mb-5 bg-body-tertiary rounded">
    //         <div className="col-2 border border-secondary-subtle">
    //         <button type="button" class="c-btn c-btn-gloomy">Gloomy</button>
    //         </div>
    //         <div className="col-10 border border-secondary-subtle">
    //           <pre className="c-btn">
    //           <code>{`<button type="button" class="c-btn c-btn-gloomy c-btn-gloomy-hover">Gloomy</button>`} </code>
    //           </pre>
    //         </div>
    //       </div>
    //       <div className="row container border border-secondary-subtle px-4 py-4 rounded shadow p-3 mb-5 bg-body-tertiary rounded">
    //         <div className="col-2 border border-secondary-subtle">
    //         <button type="button" class="c-btn c-btn-silver">Silver</button>
    //         </div>
    //         <div className="col-10 border border-secondary-subtle">
    //           <pre className="c-btn">
    //           <code>{`<button type="button" class="c-btn c-btn-silver">Silver</button>`} </code>
    //           </pre>
    //         </div>
    //       </div>
    //       <div className="row container border border-secondary-subtle px-4 py-4 rounded shadow p-3 mb-5 bg-body-tertiary rounded">
    //         <div className="col-2 border border-secondary-subtle">
    //         <button type="button" class="c-btn c-btn-risk">Risk</button>
    //         </div>
    //         <div className="col-10 border border-secondary-subtle">
    //           <pre className="c-btn">
    //           <code>{`<button type="button" class="c-btn c-btn-risk">Risk</button>`} </code>
    //           </pre>
    //         </div>
    //       </div>
    //       <div className="row container border border-secondary-subtle px-4 py-4 rounded shadow p-3 mb-5 bg-body-tertiary rounded">
    //         <div className="col-2 border border-secondary-subtle">
    //         <button type="button" class="c-btn c-btn-caution">Caution</button>
    //         </div>
    //         <div className="col-10 border border-secondary-subtle">
    //           <pre className="c-btn">
    //           <code>{`<button type="button" class="c-btn c-btn-caution">Caution</button>`} </code>
    //           </pre>
    //         </div>
    //       </div>
    //       <div className="row container border border-secondary-subtle px-4 py-4 rounded shadow p-3 mb-5 bg-body-tertiary rounded">
    //         <div className="col-2 border border-secondary-subtle">
    //         <button type="button" class="c-btn c-btn-gold">Gold</button>
    //         </div>
    //         <div className="col-10 border border-secondary-subtle">
    //            <pre className="c-btn"> 
    //           <code>{`<button type="button" class="c-btn c-btn-gold">Gold</button>`} </code>
    //            </pre> 
    //         </div>
    //       </div>
    //       <div className="row container border border-secondary-subtle px-4 py-4 rounded shadow p-3 mb-5 bg-body-tertiary rounded">
    //         <div className="col-2 border border-secondary-subtle">
    //         <button type="button" class="c-btn c-btn-lime">Lime</button>
    //         </div>
    //         <div className="col-10 border border-secondary-subtle">
    //           <pre className="c-btn">
    //           <code>{`<button type="button" class="c-btn c-btn-lime">Lime</button>`} </code>
    //           </pre>
    //         </div>
    //       </div>
    //       <div className="row container border border-secondary-subtle px-4 py-4 rounded shadow p-3 mb-5 bg-body-tertiary rounded">
    //         <div className="col-2 border border-secondary-subtle">
    //         <button type="button" class="c-btn c-btn-mint">Mint</button>
    //         </div>
    //         <div className="col-10 border border-secondary-subtle">
    //           <pre className="c-btn">
    //           <code>{`<button type="button" class="c-btn c-btn-mint">Mint</button>`} </code>
    //           </pre>
    //         </div>
    //       </div>
    //       <div className="row container border border-secondary-subtle px-4 py-4 rounded shadow p-3 mb-5 bg-body-tertiary rounded">
    //         <div className="col-2 border border-secondary-subtle">
    //         <button type="button" class="c-btn c-btn-win">Win</button>
    //         </div>
    //         <div className="col-10 border border-secondary-subtle">
    //           <pre className="c-btn">
    //           <code>{`<button type="button" class="c-btn c-btn-win">Win</button>`} </code>
    //           </pre>
    //         </div>
    //       </div>
    //       <div className="row container border border-secondary-subtle px-4 py-4 rounded shadow p-3 mb-5 bg-body-tertiary rounded">
    //         <div className="col-2 border border-secondary-subtle">
    //         <button type="button" class="c-btn c-btn-azure">Azure</button>
    //         </div>
    //         <div className="col-10 border border-secondary-subtle">
    //           <pre className="c-btn">
    //           <code>{`<button type="button" class="c-btn c-btn-azure">Azure</button>`} </code>
    //           </pre>
    //         </div>
    //       </div>
    //       <div className="row container border border-secondary-subtle px-4 py-4 rounded shadow p-3 mb-5 bg-body-tertiary rounded">
    //         <div className="col-2 border border-secondary-subtle">
    //         <button type="button" class="c-btn c-btn-aqua">Aqua</button>
    //         </div>
    //         <div className="col-10 border border-secondary-subtle">
    //           <pre className="c-btn">
    //           <code>{`<button type="button" class="c-btn c-btn-aqua">Aqua</button>`} </code>
    //           </pre>
    //         </div>
    //       </div>
    //       <div className="row container border border-secondary-subtle px-4 py-4 rounded shadow p-3 mb-5 bg-body-tertiary rounded">
    //         <div className="col-2 border border-secondary-subtle">
    //         <button type="button" class="c-btn c-btn-lavender">Lavender</button>
    //         </div>
    //         <div className="col-10 border border-secondary-subtle">
    //           <pre className="c-btn">
    //           <code>{`<button type="button" class="c-btn c-btn-lavender">Lavender</button>`} </code>
    //           </pre>
    //         </div>
    //       </div>
    //       <div className="row container border border-secondary-subtle px-4 py-4 rounded shadow p-3 mb-5 bg-body-tertiary rounded">
    //         <div className="col-2 border border-secondary-subtle">
    //         <button type="button" class="c-btn c-btn-purple">Purple</button>
    //         </div>
    //         <div className="col-10 border border-secondary-subtle">
    //           <pre className="c-btn">
    //           <code>{`<button type="button" class="c-btn c-btn-purple">Purple</button>`} </code>
    //           </pre>
    //         </div>
    //       </div>
    //       <div className="row container border border-secondary-subtle px-4 py-4 rounded shadow p-3 mb-5 bg-body-tertiary rounded">
    //         <div className="col-2 border border-secondary-subtle">
    //         <button type="button" class="c-btn c-btn-lollypop">Lollypop</button>
    //         </div>
    //         <div className="col-10 border border-secondary-subtle">
    //           <pre className="c-btn">
    //           <code>{`<button type="button" class="c-btn c-btn-lollypop">Lollypop</button>`} </code>
    //           </pre>
    //         </div>
    //       </div>
    //       <div className="row container border border-secondary-subtle px-4 py-4 rounded shadow p-3 mb-5 bg-body-tertiary rounded">
    //         <div className="col-2 border border-secondary-subtle">
    //         <button type="button" class="c-btn c-btn-fog">Fog</button>
    //         </div>
    //         <div className="col-10 border border-secondary-subtle">
    //           <pre className="c-btn">
    //           <code>{`<button type="button" class="c-btn c-btn-fog">Fog</button>`} </code>
    //           </pre>
    //         </div>
    //       </div>
    //       <div className="row container border border-secondary-subtle px-4 py-4 rounded shadow p-3 mb-5 bg-body-tertiary rounded">
    //         <div className="col-2 border border-secondary-subtle">
    //         <button type="button" class="c-btn c-btn-componentify">Compify</button>
    //         </div>
    //         <div className="col-10 border border-secondary-subtle">
    //           <pre className="c-btn">
    //           <code>{`<button type="button" class="c-btn c-btn-componentify">Componentify</button>`} </code>
    //           </pre>
    //         </div>
    //       </div>
    //       <div className="row container border border-secondary-subtle px-4 py-4 rounded shadow p-3 mb-5 bg-body-tertiary rounded">
    //         <div className="col-2 border border-secondary-subtle">
    //         <button type="button" class="c-btn c-btn-mocca">Mocca</button>
    //         </div>
    //         <div className="col-10 border border-secondary-subtle">
    //           <pre className="c-btn">
    //           <code>{`<button type="button" class="c-btn c-btn-mocca c-btn-mocca-hover">Mocca</button>`} </code>
    //           </pre>
    //         </div>
    //       </div>
    // </div>
    
          


    {/* return (
    <div className="container">
        <div className="row">
            <SideBar />
            <div className="col-10 ">
                {/* seccion derecha de la pagina */}
                {/* <div className="row"> */}
                    {/* titulo */}
                    {/* <h1 className="mt-3">Alerts</h1>
                    <p className="fs-5 mt-2 mb-3">The <span style={{ "color": "#FD5812" }}>c-alert component</span> is used to convey important information to the user through the use of contextual types, icons, and colors.</p>
                </div>
                <div className="row"> */}
                    {/* Componentes */}
                    {/* <div className="col-4">
                        <div className="container border border-secondary-subtle px-2 py-3 rounded shadow">
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
                    <div className="col-8">
                        <div className="container border border-secondary-subtle px-4 py-4 rounded shadow p-3 mb-5 bg-body-tertiary rounded">
                            <div class="c-alert" role="alert" style={{ height: "58px", backgroundColor:"#f8f9fa", border:"solid 1px #dee2e6" }}>
                                <pre >
                                    <span >{`<div class="c-alert c-alert-dark" role="alert">This is a dark alert!</div>`}
                                    </span>
                                </pre>
                             </div>
                            <SyntaxHighlighter language="html" style={prism}>
                                    {`<div class="c-alert c-alert-slate" role="alert"> This is a slate alert!</div>`}
                            </SyntaxHighlighter>
                            <div class="c-alert c-alert-gloomy" role="alert" style={{ height: "58px" }}>
                                <pre>
                                    <code>{`<div class="c-alert c-alert-gloomy" role="alert">`} </code>
                                </pre>
                            </div>
                            <div class="c-alert c-alert-silver" role="alert" style={{ height: "58px" }}>
                                <pre>
                                    <code>{`<div class="c-alert c-alert-silver" role="alert">`} </code>
                                </pre>
                            </div>
                            <div class="c-alert c-alert-risk" role="alert" style={{ height: "58px" }}>
                                <pre>
                                    <code>{`<div class="c-alert c-alert-risk" role="alert">`} </code>
                                </pre>
                            </div>
                            <div class="c-alert c-alert-caution" role="alert" style={{ height: "58px" }}>
                                <pre>
                                    <code>{`<div class="c-alert c-alert-caution" role="alert">`} </code>
                                </pre>
                            </div>
                            <div class="c-alert c-alert-gold" role="alert" style={{ height: "58px" }}>
                                <pre>
                                    <code>{`<div class="c-alert c-alert-gold" role="alert">`} </code>
                                </pre>
                            </div>
                            <div class="c-alert c-alert-lime" role="alert" style={{ height: "58px" }}>
                                <pre>
                                    <code>{`<div class="c-alert c-alert-lime" role="alert">`} </code>
                                </pre>
                            </div>
                            <div class="c-alert c-alert-mint" role="alert" style={{ height: "58px" }}>
                                <pre>
                                    <code>{`<div class="c-alert c-alert-mint" role="alert">`} </code>
                                </pre>
                            </div>
                            <div class="c-alert c-alert-win" role="alert" style={{ height: "58px" }}>
                                <pre>
                                    <code>{`<div class="c-alert c-alert-win" role="alert">`} </code>
                                </pre>
                            </div>
                            <div class="c-alert c-alert-azure" role="alert" style={{ height: "58px" }}>
                                <pre>
                                    <code>{`<div class="c-alert c-alert-azure" role="alert">`} </code>
                                </pre>
                            </div>
                            <div class="c-alert c-alert-aqua" role="alert" style={{ height: "58px" }}>
                                <pre>
                                    <code>{`<div class="c-alert c-alert-aqua" role="alert">`} </code>
                                </pre>
                            </div>
                            <div class="c-alert c-alert-lavender" role="alert" style={{ height: "58px" }}>
                                <pre>
                                    <code>{`<div class="c-alert c-alert-lavender" role="alert">`} </code>
                                </pre>
                            </div>
                            <div class="c-alert c-alert-purple" role="alert" style={{ height: "58px" }}>
                                <pre>
                                    <code>{`<div class="c-alert c-alert-purple" role="alert">`} </code>
                                </pre>
                            </div>
                            <div class="c-alert c-alert-lollypop" role="alert" style={{ height: "58px" }}>
                                <pre>
                                    <code>{`<div class="c-alert c-alert-lollypop" role="alert">`} </code>
                                </pre>
                            </div>
                            <div class="c-alert c-alert-fog" role="alert" style={{ height: "58px" }}>
                                <pre>
                                    <code>{`<div class="c-alert c-alert-fog" role="alert">`} </code>
                                </pre>
                            </div>
                            <div class="c-alert c-alert-componentify" role="alert" style={{ height: "58px" }}>
                                <pre>
                                    <code>{`<div class="c-alert c-alert-componentify" role="alert">`} </code>
                                </pre>
                            </div>
                            <div class="c-alert c-alert-mocca" role="alert" style={{ height: "58px" }}>
                                <pre>
                                    <code>{`<div class="c-alert c-alert-mocca" role="alert">`} </code>
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> */}


{/* // ESTRUCTURA:
// <div className="container">
//     <div className="row">
//         <SideBar />
//         <div className="col-10">
//         {/* seccion derecha de la pagina */}
{/* //             <div className="row"> */}
          {/* titulo */}
{/* //                 <h1 className="mt-5">Alerts</h1>
//                 <p className="fs-5 mt-2 mb-3">The <span style={{ "color": "#FD5812" }}>c-alert component</span> is used to convey important information to the user through the use of contextual types, icons, and colors.</p>
//             </div> */}
{/* //             <div className="row"> */}
            {/* Componentes */}
{/* //                 <div className="col-3">

//                 </div>
//                 <div className="col-9">
                            
//                 </div>
//             </div> */}
{/* //         </div> */}
{/* //     </div> */}
{/* // </div> */}





 {/* */} 

        {/* // <div className="container">
            
            
            
        //     <div className="row">
            
        //         <div className="col-10">
        //             <div clasName="row">
        //             <h1 className="mt-5">Alerts</h1>
        //             <p className="fs-5 mt-2 mb-3">The <span style={{ "color": "#FD5812" }}>c-alert component</span> is used to convey important information to the user through the use of contextual types, icons, and colors.</p>
        //         </div>
        //         </div>
            
            
        //     <div className="row">
        //         <div className="col-3">
        //             <div className="container border border-secondary-subtle px-4 py-4 rounded shadow p-3 mb-5 bg-body-tertiary rounded"> */}

                     {/* CODIGO VISUAL DE LAS ALERTS */}

        {/* //                 <div class="c-alert c-alert-dark" role="alert">
        //                     This is a dark alert!
        //                 </div>
        //                 <div class="c-alert c-alert-slate" role="alert">
        //                     This is a slate alert!
        //                 </div>
        //                 <div class="c-alert c-alert-gloomy" role="alert">
        //                     This is a gloomy alert!
        //                 </div>
        //                 <div class="c-alert c-alert-silver" role="alert">
        //                     This is a silver alert!
        //                 </div>
        //                 <div class="c-alert c-alert-risk" role="alert">
        //                     This is a risk alert!
        //                 </div>
        //                 <div class="c-alert c-alert-caution" role="alert">
        //                     This is a caution alert!
        //                 </div>
        //                 <div class="c-alert c-alert-gold" role="alert">
        //                     This is a golden alert!
        //                 </div>
        //                 <div class="c-alert c-alert-lime" role="alert">
        //                     This is a lime alert!
        //                 </div>
        //                 <div class="c-alert c-alert-mint" role="alert">
        //                     This is a mint alert!
        //                 </div>
        //                 <div class="c-alert c-alert-win" role="alert">
        //                     This is a win alert!
        //                 </div>
        //                 <div class="c-alert c-alert-azure" role="alert">
        //                     This is an azure alert!
        //                 </div>
        //                 <div class="c-alert c-alert-aqua" role="alert">
        //                     This is an aqua alert!
        //                 </div>

        //                 <div class="c-alert c-alert-lavender" role="alert">
        //                     This is a lavender alert!
        //                 </div>
        //                 <div class="c-alert c-alert-purple" role="alert">
        //                     This is a purple alert!
        //                 </div>
        //                 <div class="c-alert c-alert-lollypop" role="alert">
        //                     This is a lollypop alert!
        //                 </div>
        //                 <div class="c-alert c-alert-fog" role="alert">
        //                     This is a foggy alert!
        //                 </div>
        //                 <div class="c-alert c-alert-componentify" role="alert">
        //                     This is a componentify alert!
        //                 </div>
        //                 <div class="c-alert c-alert-mocca" role="alert">
        //                     This is a mocca alert!
        //                 </div>
        //             </div> */}

                 {/* </div> */}
            
               {/* COMIENZA CODIGO CRUDO DE LAS ALERTS */}

        {/* //         <div className="col-5">
        //             <div className="container border border-secondary-subtle px-4 py-4 rounded shadow p-3 mb-5 bg-body-tertiary rounded">


        //                 <div class="c-alert c-alert-dark" role="alert" style={{ height: "58px" }}>
        //                     <pre>
        //                         <code>{`<div class="c-alert c-alert-dark" role="alert">`} </code>
        //                     </pre>
        //                 </div>


        //                 <div class="c-alert c-alert-slate" role="alert" style={{ height: "58px" }}>
        //                     <pre>
        //                         <code>{`<div class="c-alert c-alert-slate" role="alert">`} </code>
        //                     </pre>
        //                 </div>


        //                 <div class="c-alert c-alert-gloomy" role="alert" style={{ height: "58px" }}>
        //                     <pre>
        //                         <code>{`<div class="c-alert c-alert-gloomy" role="alert">`} </code>
        //                     </pre>
        //                 </div>


        //                 <div class="c-alert c-alert-silver" role="alert" style={{ height: "58px" }}>
        //                     <pre>
        //                         <code>{`<div class="c-alert c-alert-silver" role="alert">`} </code>
        //                     </pre>
        //                 </div>


        //                 <div class="c-alert c-alert-risk" role="alert" style={{ height: "58px" }}>
        //                     <pre>
        //                         <code>{`<div class="c-alert c-alert-risk" role="alert">`} </code>
        //                     </pre>
        //                 </div>


        //                 <div class="c-alert c-alert-caution" role="alert" style={{ height: "58px" }}>
        //                     <pre>
        //                         <code>{`<div class="c-alert c-alert-caution" role="alert">`} </code>
        //                     </pre>
        //                 </div>


        //                 <div class="c-alert c-alert-gold" role="alert" style={{ height: "58px" }}>
        //                     <pre>
        //                         <code>{`<div class="c-alert c-alert-gold" role="alert">`} </code>
        //                     </pre>
        //                 </div>


        //                 <div class="c-alert c-alert-lime" role="alert" style={{ height: "58px" }}>
        //                     <pre>
        //                         <code>{`<div class="c-alert c-alert-lime" role="alert">`} </code>
        //                     </pre>
        //                 </div>


        //                 <div class="c-alert c-alert-mint" role="alert" style={{ height: "58px" }}>
        //                     <pre>
        //                         <code>{`<div class="c-alert c-alert-mint" role="alert">`} </code>
        //                     </pre>
        //                 </div>


        //                 <div class="c-alert c-alert-win" role="alert" style={{ height: "58px" }}>
        //                     <pre>
        //                         <code>{`<div class="c-alert c-alert-win" role="alert">`} </code>
        //                     </pre>
        //                 </div>


        //                 <div class="c-alert c-alert-azure" role="alert" style={{ height: "58px" }}>
        //                     <pre>
        //                         <code>{`<div class="c-alert c-alert-azure" role="alert">`} </code>
        //                     </pre>
        //                 </div>


        //                 <div class="c-alert c-alert-aqua" role="alert" style={{ height: "58px" }}>
        //                     <pre>
        //                         <code>{`<div class="c-alert c-alert-aqua" role="alert">`} </code>
        //                     </pre>
        //                 </div>


        //                 <div class="c-alert c-alert-lavender" role="alert" style={{ height: "58px" }}>
        //                     <pre>
        //                         <code>{`<div class="c-alert c-alert-lavender" role="alert">`} </code>
        //                     </pre>
        //                 </div>


        //                 <div class="c-alert c-alert-purple" role="alert" style={{ height: "58px" }}>
        //                     <pre>
        //                         <code>{`<div class="c-alert c-alert-purple" role="alert">`} </code>
        //                     </pre>
        //                 </div>


        //                 <div class="c-alert c-alert-lollypop" role="alert" style={{ height: "58px" }}>
        //                     <pre>
        //                         <code>{`<div class="c-alert c-alert-lollypop" role="alert">`} </code>
        //                     </pre>
        //                 </div>


        //                 <div class="c-alert c-alert-fog" role="alert" style={{ height: "58px" }}>
        //                     <pre>
        //                         <code>{`<div class="c-alert c-alert-fog" role="alert">`} </code>
        //                     </pre>
        //                 </div>


        //                 <div class="c-alert c-alert-componentify" role="alert" style={{ height: "58px" }}>
        //                     <pre>
        //                         <code>{`<div class="c-alert c-alert-componentify" role="alert">`} </code>
        //                     </pre>
        //                 </div>


        //                 <div class="c-alert c-alert-mocca" role="alert" style={{ height: "58px" }}>
        //                     <pre>
        //                         <code>{`<div class="c-alert c-alert-mocca" role="alert">`} </code>
        //                     </pre>
        //                 </div>


        //             </div>
        //         </div>
        //     </div> */}
        {/* // </div> */}
        {/* // </div> */}
        
    
{/* } } */}



export default AlertView;