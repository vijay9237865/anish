import React, { useEffect, useState, useRef } from "react";
import Header from "../../components/Header";
import { BiMessageAlt } from "react-icons/bi";
import "./Query.css";
// import "./loadin.scss";
import pensil from "../../assets/svg/icons/pencil.svg";
import trash from "../../assets/svg/icons/trash.svg";
import { IoIosArrowBack } from "react-icons/io";
import avatar from "../../assets/png/Avatar.png";
import sendarr from "../../assets/svg/icons/send.svg";
import { Link } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import bot_logo from "../../assets/png/bot_logo.png";
import { axiosInstance } from "../../config/config";

function Query() {
  const [sendmessage, setsendmessage] = useState(false);
  const [message, setmessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseMessage, setresponseMessage] = useState([]);
  const [scroll, setScroll] = useState(false);
  // const [typingMessage, setTypingMessage] = useState("");

  // const Typing = ({ text }) => {
  //   const index = useRef(0);
  //   const [currentText, setCurrentText] = useState("");

  //   useEffect(() => {
  //     index.current = 0;
  //     setCurrentText("");
  //   }, [text]);

  //   useEffect(() => {
  //     const timeoutId = setTimeout(() => {
  //       setCurrentText((prevText) => prevText + text.charAt(index.current));
  //       index.current += 1;
  //     }, 50);

  //     return () => {
  //       clearTimeout(timeoutId);
  //     };
  //   }, [currentText, text]);

  //   return <div>{currentText}</div>; // Render the currentText to display the typing animation
  // };

  const Typing = ({ text }) => {
    const [currentText, setCurrentText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      setCurrentIndex(0);
      setCurrentText("");
    }, [text]);

    useEffect(() => {
      if (currentIndex < text.length) {
        const timeoutId = setTimeout(() => {
          setCurrentText((prevText) => prevText + text.charAt(currentIndex));
          setCurrentIndex((prevIndex) => prevIndex + 1);
        }, 50);

        return () => {
          clearTimeout(timeoutId);
        };
      }
    }, [currentIndex, text]);

    return <div>{currentText}</div>;
  };

  const sendmessagehandler = (e) => {
    e.preventDefault();
    setLoading(true);
    setmessage("");

    setresponseMessage((prev) => [
      ...prev,
      { userMessage: message, responseMessage: "" },
    ]);

    axiosInstance
      .post("/api/chatbot", { message: message })
      .then((reas) => {
        const text = reas.data;
        console.log(text);

        setresponseMessage((prev) => [
          ...prev.slice(0, -1),
          { userMessage: message, responseMessage: <Typing text={text} /> },
        ]);

        // setresponseMessage((prev) => {
        //   const updatedResponse = [...prev];
        //   updatedResponse[updatedResponse.length - 1].responseMessage = <Typing text={text} /> ;
        //   return updatedResponse;
        // });

        setScroll(true);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (scroll) {
      var element = document.getElementById("msgCon");
      if (element) {
        element.scroll({ top: element.scrollHeight, behavior: "smooth" });
        setScroll(false);
      }
    }
  }, [scroll]);

  return (
    <div>
      <Header />
      <div className="d-flex">
        <div className="body_of_query_page">
          <div
            className="suggestion_query_container pt-5 container d-flex flex-column"
            style={{ height: "90vh" }}
          >
            <div className="new_chat_box d-flex ">
              <BiMessageAlt style={{ fontSize: "25px", margin: "0px" }} />
              <p className="m-0 ms-2">New chat</p>
            </div>
            <div className="today_container mt-auto mb-5">
              <p className="m-0">Today</p>
              <div className="chat_store_container d-flex justify-content-between ">
                <div className="d-flex">
                  <BiMessageAlt style={{ fontSize: "25px", margin: "0px" }} />
                  <div className="overflow-content">
                    <p className="m-0 ms-2">Find new stocks in ay if</p>
                    <span></span>
                  </div>
                </div>
                <div className="d-flex">
                  <img src={pensil} alt="pensil" />
                  <img src={trash} alt="trash icon" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-100 position-relative" style={{}}>
          <div className="py-3 ps-2 Body_of_conversation">
            <Link to="/" style={{ textDecoration: "none" }}>
              <p className="back_arrow mb-0">
                <IoIosArrowBack className="me-2" />
                Back
              </p>
            </Link>
          </div>
          <div className="chat_box_container" id="msgCon">
            {responseMessage.length > 0
              ? responseMessage.map((mes, key) => (
                  <div>
                    <div className="chat_each d-flex mt-4">
                      {/* <img style={{ height: "50px" }} src={avatar} alt="" /> */}
                      <div className="user_icon_container">
                        <BiUser
                          className="d-flex justify-content-center align-item-center"
                          style={{ fontSize: "30px" }}
                        />
                      </div>
                      <p className="ms-4 my-auto chat_msg">{mes.userMessage}</p>
                    </div>
                    <div
                      className="mt-4"
                      style={{
                        backgroundColor: "rgb(242,242,242)",
                        padding: "1.25rem 0",
                      }}
                    >
                      {loading && key == responseMessage.length ? (
                        <div className="chat_each d-flex  ">
                          <div>
                            <img src={bot_logo} alt="" width={50} />
                          </div>
                          <p className="ms-4 my-auto chat_msg"></p>
                        </div>
                      ) : (
                        <div className="chat_each d-flex  ">
                          <div>
                            <img src={bot_logo} alt="" width={50} />
                          </div>
                          <p className="ms-4 my-auto chat_msg">
                            {mes.responseMessage ? (
                              mes.responseMessage
                            ) : (
                              <div className="loading">
                                <div></div>
                                <div></div>
                                <div></div>
                              </div>
                            )}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              : ""}

            <form onSubmit={sendmessagehandler}>
              <div className="chat_input_box mb-5 d-flex justify-content-center mx-auto">
                <input
                  type="text"
                  placeholder="Send a message"
                  value={message}
                  onChange={(e) => {
                    setsendmessage(true);
                    setmessage(e.target.value);
                    // console.log(e.target.value);
                  }}
                />
                {sendmessage ? (
                  <button
                    className="send_btn"
                    type="submit"
                    // onClick={sendmessagehandler}
                  >
                    <img src={sendarr} alt="" />
                  </button>
                ) : (
                  ""
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Query;
