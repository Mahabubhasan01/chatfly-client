import React from "react";

const ChatMessages = ({ message, messages }) => {
  return (
    <div class="chat-area-main">
      <div>
        <div class="chat-msg">
          <div class="chat-msg-profile">
            <img
              class="chat-msg-img"
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%283%29+%281%29.png"
              alt=""
            />
            <div class="chat-msg-date">Message seen 1.22pm</div>
          </div>
          <div class="chat-msg-content">
            <div class="chat-msg-text">
              Luctus et ultrices posuere cubilia curae.
            </div>
            <div class="chat-msg-text">
              <img src="https://media0.giphy.com/media/yYSSBtDgbbRzq/giphy.gif?cid=ecf05e47344fb5d835f832a976d1007c241548cc4eea4e7e&rid=giphy.gif" />
            </div>
            <div class="chat-msg-text">
              Neque gravida in fermentum et sollicitudin ac orci phasellus
              egestas. Pretium lectus quam id leo.
            </div>
          </div>
        </div>
      </div>
      <div>
        {message?.map((data) => (
          <div className="chat-msg owner" key={data.id}>
            <div className="chat-msg-profile">
              <img
                className="chat-msg-img"
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%281%29.png"
                alt=""
              />
              <div className="chat-msg-date">{data.timestamp}</div>
            </div>
            <div className="chat-msg-content">
              <div className="chat-msg-text">{data.content}</div>
              {/* <div className="chat-msg-text">
                      Cras mollis nec arcu malesuada tincidunt.
                    </div> */}
            </div>
          </div>
        ))}
      </div>
      <div>
        {messages?.map((data) => (
          <div className="chat-msg owner" key={data.id}>
            <div className="chat-msg-profile">
              <img
                className="chat-msg-img"
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%281%29.png"
                alt=""
              />
              <div className="chat-msg-date">{data.timestamp}</div>
            </div>
            <div className="chat-msg-content">
              <div className="chat-msg-text">{data.message}</div>
              {/* <div className="chat-msg-text">
                      Cras mollis nec arcu malesuada tincidunt.
                    </div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatMessages;
