import { useState } from 'react';
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";

const theme = {
    background: "#fff",
    fontFamily: 'Helvetica Neue',
    headerBgColor: "#ff8503",
    headerFontColor: "#fff",
    headerFontSize: "30px",
    botBubbleColor: "#ff8503",
    botFontColor: "#fff",
    userBubbleColor: "#fff",
    userFontColor: "#ff8503",
};
const steps = [
    {
        id: "BOT/intro",
        message: "Hello, Welcome to E-commerce",
        trigger: "CHOICES/intro",
    },
    {
        id: "CHOICES/intro",
        options: [
            { label: "Good Morning", trigger: "BOT/pleasantry" },
            { label: "Good Evening", trigger: "BOT/pleasantry" }],
    },
    {
        id: "BOT/pleasantry",
        message: "Lovely to Meet You!",
        trigger: "BOT/introduce-self",
    },
    {
        id: "BOT/introduce-self",
        message: "I'm a Simple ChatBot To Help You.",
        trigger: "BOT/ask-question",
    },
    {
        id: "BOT/ask-question",
        message: "Please Enter Your Name!",
        trigger: "2",
    },
    {
        id: "2",
        user: true,
        trigger: "3",
    },
    {
        id: "3",
        message: "Hi {previousValue}",
        trigger: "4",
    },
    {
        id: "4",
        message: "Please Tell Me What You Want?",
        trigger: "choose",
    },
    {
        id: "choose",
        options: [
            {
                value: "Inquire About How To Deliver Products",
                label: "Inquire About How To Deliver Products",
                trigger: "Inquire About How To Deliver Products",
            },
            {
                value: "How can I assess the quality of the product",
                label: "How can I assess the quality of the product",
                trigger: "How can I assess the quality of the product",
            },
            {
                value: "What is the way I can exchange or return the product?",
                label: "What is the way I can exchange or return the product?",
                trigger: "What is the way I can exchange or return the product?"
            },
        ],
    },
    {
        id: "Inquire About How To Deliver Products",
        message:
            "You have to choose the product and specify the method of purchase through cash or card, and within 24 hours you can receive the order.",
        end: true,
    },
    {
        id: "How can I assess the quality of the product",
        message:
            "You can enter and read customer opinions in the review, and if there is any damage or difference in the product, you can change it, and you have a period of up to a week.",
        end: true,
    },
    {
        id: "What is the way I can exchange or return the product?",
        message:
            "You can cancel for order if you do not want to buy the product, and if the product is received, you must tell the reason for the rejection within a period of 7 days.",
        end: true,
    },
]

const SampleChat = () => {
    const [currentMessage, setCurrentMessage] = useState(steps);
    const handleNewMessage = (message) => {
        setCurrentMessage(message);
    };
    return (
        <ThemeProvider theme={theme} >
            <ChatBot steps={currentMessage} handleNewUserMessage={handleNewMessage} headerTitle="Store Chat" width="350px" floating='true' placeholder='Write the Message ...' />
        </ThemeProvider>
    )
}

export default SampleChat
