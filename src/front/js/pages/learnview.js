// import React from 'react';

// const LearnView = () => {
//   return (
//     <div className="container" id="learn" style={{ marginBottom: '200px', marginTop: '80px' }}>
//       <strong><svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-code-square" viewBox="0 0 16 16">
//         <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
//         <path d="M6.854 4.646a.5.5 0 0 1 0 .708L4.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0zm2.292 0a.5.5 0 0 0 0 .708L11.793 8l-2.647 2.646a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708 0z" />
//       </svg></strong>
//       <h1 className="my-4" style={{ fontSize: '3rem' }}>
//         <strong>Begin however you prefer</strong>
//       </h1>
//       <p className="my-4" style={{ fontSize: '1.3rem' }}>
//         Jump right into building with Componentify—use the CDN, install it via package manager, or download the source code.
//       </p>
//       <p class="d-flex justify-content-md-start justify-content-md-center lead fw-normal">
//         <a href="/docs/5.3/getting-started/download/" class="icon-link icon-link-hover fw-semibold ps-md-4">
//           Read installation docs <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-square-fill" viewBox="0 0 16 16">
//   <path d="M0 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v12zm4.5-6.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1 0-1z"/>
// </svg>
//         </a>
//       </p>
// <br></br>


//       <div className="row">

//         <div className="col-lg-6 py-lg-4 pe-lg-5" style={{ textAlign: "left", borderRight: "1px solid #ccc" }}>
//           <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-box-seam" viewBox="0 0 16 16">
//             <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z" />
//           </svg>
//           <h3 className="fw-semibold">Install via package manager</h3>
//           <p className="pe-lg-5">
//             Install Componentify's source Sass and JavaScript files via npm. Package managed installs don’t include documentation or our full build scripts.
//           </p>
//           <div class="c-alert c-alert-silver" role="alert" style={{ height: "60px" }}>
//             npm install Componentify@5.3.2
//           </div>
//           <div class="c-alert c-alert-silver" role="alert" style={{ height: "60px" }}>
//             gem install Componentify -v 5.3.2
//           </div>
//           <p>
//             <a href="/docs/5.3/getting-started/download/">Read our installation docs</a> for more info and additional package managers.
//           </p>
//         </div>

//         <div className="col-lg-6 py-lg-4 pe-lg-5" style={{ textAlign: "left", paddingLeft: "50px" }}>
//           <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-globe2" viewBox="0 0 16 16">
//             <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855-.143.268-.276.56-.395.872.705.157 1.472.257 2.282.287V1.077zM4.249 3.539c.142-.384.304-.744.481-1.078a6.7 6.7 0 0 1 .597-.933A7.01 7.01 0 0 0 3.051 3.05c.362.184.763.349 1.198.49zM3.509 7.5c.036-1.07.188-2.087.436-3.008a9.124 9.124 0 0 1-1.565-.667A6.964 6.964 0 0 0 1.018 7.5h2.49zm1.4-2.741a12.344 12.344 0 0 0-.4 2.741H7.5V5.091c-.91-.03-1.783-.145-2.591-.332zM8.5 5.09V7.5h2.99a12.342 12.342 0 0 0-.399-2.741c-.808.187-1.681.301-2.591.332zM4.51 8.5c.035.987.176 1.914.399 2.741A13.612 13.612 0 0 1 7.5 10.91V8.5H4.51zm3.99 0v2.409c.91.03 1.783.145 2.591.332.223-.827.364-1.754.4-2.741H8.5zm-3.282 3.696c.12.312.252.604.395.872.552 1.035 1.218 1.65 1.887 1.855V11.91c-.81.03-1.577.13-2.282.287zm.11 2.276a6.696 6.696 0 0 1-.598-.933 8.853 8.853 0 0 1-.481-1.079 8.38 8.38 0 0 0-1.198.49 7.01 7.01 0 0 0 2.276 1.522zm-1.383-2.964A13.36 13.36 0 0 1 3.508 8.5h-2.49a6.963 6.963 0 0 0 1.362 3.675c.47-.258.995-.482 1.565-.667zm6.728 2.964a7.009 7.009 0 0 0 2.275-1.521 8.376 8.376 0 0 0-1.197-.49 8.853 8.853 0 0 1-.481 1.078 6.688 6.688 0 0 1-.597.933zM8.5 11.909v3.014c.67-.204 1.335-.82 1.887-1.855.143-.268.276-.56.395-.872A12.63 12.63 0 0 0 8.5 11.91zm3.555-.401c.57.185 1.095.409 1.565.667A6.963 6.963 0 0 0 14.982 8.5h-2.49a13.36 13.36 0 0 1-.437 3.008zM14.982 7.5a6.963 6.963 0 0 0-1.362-3.675c-.47.258-.995.482-1.565.667.248.92.4 1.938.437 3.008h2.49zM11.27 2.461c.177.334.339.694.482 1.078a8.368 8.368 0 0 0 1.196-.49 7.01 7.01 0 0 0-2.275-1.52c.218.283.418.597.597.932zm-.488 1.343a7.765 7.765 0 0 0-.395-.872C9.835 1.897 9.17 1.282 8.5 1.077V4.09c.81-.03 1.577-.13 2.282-.287z" />
//           </svg>
//           <h3 className="fw-semibold">Incorporate via CDN</h3>
//           <p className="pe-lg-5">
//             If you only need Componentify's ready-made CSS or JS, you can use jsDelivr. Explore its capabilities with our quick start guide.
//           </p>
//           <div class="c-alert c-alert-silver" role="alert" style={{ height: "60px" }}>
//             <pre>
//               <code>{`<link href="https://cdn.jsdelivr.net/npm/Componentify@5.3.2/dist/css/Componentify.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">`} </code>
//             </pre>
//           </div>

//           <div class="c-alert c-alert-silver" role="alert" style={{ height: "60px" }}>
//             <pre>
//               <code>{`<script src="https://cdn.jsdelivr.net/npm/Componentify@5.3.2/dist/js/Componentify.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>`} </code>
//             </pre>
//           </div>

//         </div>


//       </div>
//     </div>


//   );
// };

// export default LearnView;
