import React from "react";
import "../styles/creategroup.css";
const CreatGroup = () => {
  const handleCreate = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <a href="#modal" role="button" class="add"></a>

      <div class="modal-wrapper" id="modal">
       {/*  <div class="modal-body card"> */}
          {/* <div class="modal-header">
            <a
              href="#!"
              role="button"
              class="close"
              aria-label="close this modal"
            >
              <svg viewBox="0 0 24 24">
                <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
              </svg>
            </a>
          </div> */}
          <p>
            <div className="body">
              <div class="login-container">
                <form>
                  <div class="form-container">
                    <div class="form-sections mb">
                      <div class="heading-container">
                        <h1 class="heading">Login</h1>
                        <a
                          href="#!"
                          role="button"
                          class="close"
                          aria-label="close this modal"
                        >
                          <svg viewBox="0 0 24 24">
                            <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                    <div class="form-sections">
                      <div class="form-fields">
                        <label for="email">Email</label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          class="input-field"
                          tabindex="1"
                          required
                        />
                      </div>
                      <div class="form-fields">
                        <label for="pass">Password</label>
                        <div id="pass-field-container">
                          <input
                            type="password"
                            name="pass"
                            id="pass"
                            class="input-field"
                            required
                            tabindex="2"
                          />
                          <input
                            type="checkbox"
                            id="see"
                            class="input-field"
                            title="Click to view password"
                            tabindex="3"
                          />
                        </div>
                      </div>
                      <div class="form-fields">
                        <input
                          type="submit"
                          value="Log In"
                          class="login-btn"
                          tabindex="4"
                        />
                      </div>
                    </div>
                    <div class="form-sections">
                      <div class="forgot-password">
                        <a href="#">Forgot Password?</a>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </p>
       {/*  </div> */}
       {/*  <a href="#!" class="outside-trigger"></a> */}
      </div>
    </>
  );
};

export default CreatGroup;
