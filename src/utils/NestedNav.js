import React from "react";
import "../styles/nastednav.css";
import { MdPermMedia } from "react-icons/md";
import { PiFilesFill } from "react-icons/pi";
const NestedNav = () => {
  return (
    <div>
      <div class="row">
        <div class="col">
          <div class="tabs">
            <div class="tab">
              <input className="input" type="checkbox" id="chck1" />
              <label class="tab-label" for="chck1">
                Chat info
              </label>
              <div class="tab-content">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum,
                reiciendis!
              </div>
            </div>
            <div class="tab">
              <input className="input" type="checkbox" id="chck2" />
              <label class="tab-label" for="chck2">
                Customize chat
              </label>
              <div class="tab-content">
                <div class="detail-change">
                  Change Color
                  <div class="colors">
                    <div class="color blue selected" data-color="blue"></div>
                    <div class="color purple" data-color="purple"></div>
                    <div class="color green" data-color="green"></div>
                    <div class="color orange" data-color="orange"></div>
                  </div>
                </div>
                <div class="detail-change">
                  Change theme
                  <div class="colors">
                    <div class="color orange" data-color="orange"></div>
                  </div>
                </div>
                <div class="detail-change">
                  Change emoji
                  <div class="colors">
                    <div class="color orange" data-color="orange"></div>
                  </div>
                </div>
                <div class="detail-change">
                  Search conversation
                  <div class="colors">
                    <div class="color orange" data-color="orange"></div>
                  </div>
                </div>
                <div class="detail-change">
                  Edit nickname
                  <div class="colors">
                    <div class="color orange" data-color="orange"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="tab">
              <input className="input" type="checkbox" id="chck3" />
              <label class="tab-label" for="chck3">
                Media & files
              </label>
              <div class="tab-content">
                <div class="detail-change">
                  Media
                  <div class="colors">
                    <div class="color ">
                      <PiFilesFill></PiFilesFill>
                    </div>
                  </div>
                </div>
                <div class="detail-change">
                  Files
                  <div class="colors">
                    <div class="color">
                      <MdPermMedia />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="tab">
              <input className="input" type="checkbox" id="chck4" />
              <label class="tab-label" for="chck4">
                Help & support
              </label>
              <div class="tab-content">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. A, in!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NestedNav;
