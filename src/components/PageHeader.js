import React from "react";

const PageHeader = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light ">
      <div class="container d-flex justify-content-between fw-bold ">
        <a class="navbar-brand" href="/">
          Logo
        </a>
        <div>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <div>
                <div>Paid Total:</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default PageHeader;
