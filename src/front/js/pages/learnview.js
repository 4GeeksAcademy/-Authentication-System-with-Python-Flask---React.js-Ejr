import React from 'react';

const LearnView = () => {
    return (
        <div className="container" id="learn" style={{ marginBottom: '150px', marginTop: '200px' }}>
        <h1 className="my-4" style={{ fontSize: '3rem' }}>
          <strong>Begin however you prefer</strong>
        </h1>
        <p className="my-4" style={{ fontSize: '1.3rem' }}>
          Jump right into building with Componentify—use the CDN, install it via package manager, or download the source code.
        </p>
      
        <div className="col-lg-6 py-lg-4 pe-lg-5">
         
           
 
          <h3 className="fw-semibold">Install via package manager</h3>
          <p className="pe-lg-5">
            Install Bootstrap’s source Sass and JavaScript files via npm, RubyGems, Composer, or Meteor. Package managed installs don’t include documentation or our full build scripts. You can also <a href="https://github.com/twbs/examples/">use any demo from our Examples repo</a> to quickly jumpstart Bootstrap projects.
          </p>
          <div className="bd-code-snippet">
            <div className="bd-clipboard">
              <button type="button" className="btn-clipboard">
                <svg className="bi" role="img" aria-label="Copy">
                </svg>
              </button>
            </div>
            <div className="highlight">
              <pre tabindex="0" className="chroma">
                <code className="language-sh" data-lang="sh">
                  <span className="line"><span className="cl">npm install bootstrap@5.3.2</span></span>
                </code>
              </pre>
            </div>
          </div>
          <div className="bd-code-snippet">
            <div className="bd-clipboard">
              <button type="button" className="btn-clipboard">
                <svg className="bi" role="img" aria-label="Copy">
                </svg>
              </button>
            </div>
            <div className="highlight">
              <pre tabindex="0" className="chroma">
                <code className="language-sh" data-lang="sh">
                  <span className="line"><span className="cl">gem install bootstrap -v 5.3.2</span></span>
                </code>
              </pre>
            </div>
          </div>
          <p>
            <a href="/docs/5.3/getting-started/download/">Read our installation docs</a> for more info and additional package managers.
          </p>
        </div>
        
          </div>
  
      
    );
};

export default LearnView;
