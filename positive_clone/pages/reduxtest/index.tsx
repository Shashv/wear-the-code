// import { Typography } from "@mui/material";
// import React from "react";
// import { useDispatch } from "react-redux";
// import { useRef, useEffect } from "react";
// import { UnknownAction } from "redux";
// import style from "./index.module.css";
// import { functionLogger } from "../redux/actions/testingactions";
// const ReduxTest: React.FC = () => {
//     let dispatch: any = useDispatch();
//     let ref = useRef<HTMLButtonElement>(null);
//     useEffect(() => ref.current?.addEventListener("click", () => dispatch(functionLogger())))
//     return (
//         <>
//             <div className={style.reduxcontainer}>
//                 <Typography className="" variant={"h4"}>
//                     Inside the process of redux actions
//                 </Typography>
//                 <button className={style.reduxactions} ref={ref}>
//                     Click me to dispatch redux actions
//                 </button>
//             </div>
//         </>
//     )
// }
// export default ReduxTest;
// import { Box, Typography } from "@mui/material";
// import { FiSend } from "react-icons/fi";
// import style from "./index.module.css";
// import { useRef, useEffect } from "react";
// const ChatBot: React.FC = () => {
//     let chatBox = useRef<HTMLUListElement>(null);
//     let sendMessage = useRef<HTMLSpanElement>(null);
//     let chatMessage = useRef<HTMLTextAreaElement>(null);

//     let createListItem = (message: string, className: string) => {
//         let listItem = document.createElement("li");
//         listItem.style.borderRadius = "10px";
//         listItem.style.padding = "10px";
//         listItem.style.border = "none";
//         listItem.style.outline = "none";
//         listItem.style.width = "fit-content";
//         listItem.classList.add("chat", className);
//         if (listItem.classList.contains("outgoing")) {
//             listItem.style.backgroundColor = "lightblue";
//             listItem.style.color = "white";
//         }
//         else if (listItem.classList.contains("incoming")) {
//             listItem.style.backgroundColor = "#e7d9d9";
//             listItem.style.color = "#000";
//         }
//         listItem.classList.add("chat", className);
//         listItem.innerHTML = (className === "outgoing") ? `<p>${message}</p>` : `<p>${message}</p>`
//         return listItem;
//     }
//     const fetchResponse = async (api_key: string, message: string) => {
//         //  const api_key = ""
//         let response = fetch("https://api.openai.com/v1/chat/completions", {
//             method: "POST",
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${api_key}`
//             },
//             body: JSON.stringify({
//                 model: "gpt-3.5-turbo-16k",
//                 messages: [{ role: "user", content: message }]
//             })
//         }).then(response => response.json()).then(response => response);
//         console.log(response);
//     }
//     useEffect(() => {
//         sendMessage.current?.addEventListener("click", () => {
//             let message: string = chatMessage.current?.value || "";
//             if (message)
//                 chatBox.current?.appendChild(createListItem(message, "outgoing"));
//             else return;
//             if (chatMessage?.current?.value) {
//                 chatMessage.current.value = ""
//             }
//             fetchResponse("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",message);
//             chatBox.current?.appendChild(createListItem("Thinking....", "incoming"))
//         })
//     }, []);
//     return (
//         <>
//             <Box component={"div"} className={style.chatbotcontainer}>
//                 <div className="chatbot-header">
//                     <Typography className="" color={"blue"} fontWeight={"bold"} variant={"h6"}>
//                         Custom Chatbot
//                     </Typography>
//                 </div>
//                 <ul className={style.chatbox} ref={chatBox}>
//                     <li className={`${style.chat} ${style.incoming}`}>
//                         <span className=""></span>
//                         <p>Hii Whatsup how can i help you ?</p>
//                     </li>
//                     <li className={`${style.chat} ${style.outgoing}`}>
//                         <p>
//                             Positive thinking will lead to success
//                         </p>
//                     </li>
//                 </ul>
//                 <div className={style.chatinput}>
//                     <textarea className="border border-none p-2" ref={chatMessage} style={{ outline: "transparent" }} placeholder={"Enter Message here"}></textarea>
//                     <span className="send-message border border-white" ref={sendMessage}>
//                         <FiSend size={34} />
//                     </span>
//                 </div>
//             </Box>
//         </>
//     )
// }
// export default ChatBot;
import React from "react";
import style from "./index.module.css";
const Dotted: React.FC = () => {
    return (
        <>
            <div className={style.section}>
                <span className={style.dot}></span>
                <span className={style.dot}></span>
                <span className={style.dot}></span>
                <span className={style.dot}></span>
                <span className={style.dot}></span>
                <span className={style.dot}></span>
                <span className={style.dot}></span>
                <span className={style.dot}></span>
                <span className={style.dot}></span>
                <span className={style.dot}></span>
            </div>
        </>
    )
}
export default Dotted;