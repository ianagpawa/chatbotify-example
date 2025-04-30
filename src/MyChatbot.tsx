import ChatBot, { ChatBotProvider } from "react-chatbotify";
import { MyNestedComponent} from './NestComponent';
import { Grid } from "./Grid";
import { useState } from "react";


const settings = {
    audio: {
        disabled: false,
    },
    header: {
        title: 'Chatty'
    },
    general: {
        embedded: false,
        showFooter: false
    },
    // chatHistory: {
    //     storageKey: "example_smart_conversation"
    // },

};
let tracker = 0;
function getpayload() {
    switch (tracker) {
        case 0:
            return err1;
        case 1:
            return err12;
        default:
            return err1;
    }
}

const err1: ServerResponse = {
    message: 'some message here',
    errorCode: 'err12',
    options: ['Yes', 'No']
};

const err12: ServerResponse = {
    message: 'SOmething wrong with user access.',
    errorCode: 'err3',
    options: ['Yes', 'No']
};
const err3: ServerResponse = {
    message: 'fixing funcs.',
    errorCode: 'query',
    options: ['Yes', 'No']
};
const res1: ServerResponse = {
    message: 'No issues found',
    errorCode: null,
    options: []
};

function createErrMessage(message, errorCode = 'err1') {
    return {
        message,
        errorCode,
        options: ['Yes', 'No']
    }
}

type ServerResponse = {
    message: string;
    errorCode: string;
    options: string[];
}


export const MyChatBot = () => {
    const [userData, setUserData] = useState({});
    const userDataHandler = (data) => {
        setUserData(data);
        console.log('got data from grid', data);
        userId = 'emailsomething';
    };
    async function fetchData(n) {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${n}`)
            const data = await response.json();
            return data;
        } catch (error) {
            return "Oh no I don't know what to say!";
        }
    }
    let cachedResponse: ServerResponse;
    let userId;

    function createGenericConfig(rez) {
        return {
            transition: { duration: 0 },
            chatDisabled: true,
            message: async (params) => {
                // const result = await fetchData(userId);
                cachedResponse = rez;  // replace this !!!!!!!!!!!!!!!!!
                return cachedResponse.message;
            },
            options: async (params) => {
                // params.userInput = null;
                // return cachedResponse.options;
            },
            path: async (params) => {
                if (!cachedResponse.errorCode) {
                    return 'resolved';
                }
                // return 'checkuser';
                return 'loop';
            }
        }
    }
    const helpOptions = ['Troubleshooting'];
    const flow = {
        start: {
            transition: { duration: 0 },
            chatDisabled: true,
            message: "What can I help you with today?",
            options: helpOptions,
            path: async (params) => {
                if (params.userInput) {
                    switch (params.userInput) {
                        case 'Troubleshooting':
                            return 'troubleshooting';
                    }
                }

            },
        },
        troubleshooting: {
            message: "What is the number you are looking for?",
            path: "checkuser",
        },
        checkuser: {
            message: async (params) => {
                // userId = params.userInput;
                // const result = await fetchData(params.userInput);
                cachedResponse = createErrMessage('Do you want to check for user issues?', userId); // DO you want to fix user issues?
                return cachedResponse.message;
            },
            options: async (params) => {
                return cachedResponse.options;
            },
            path: async (params) => {
                if (params.userInput === 'No') { return 'start'; }
                else return 'loop';
            }

            // path: async (params) => {
            //     switch(params.userInput) {
            //         case 'Yes':
            //             return cachedResponse.errorCode;
            //         case 'No':
            //             return 'start';
            //         default:
            //             return 'unknown_input';
            //     }
            // },
        },
        loop: {
            message: async (params) => {
                userId = params.userInput;
                // const result = await fetchData(userId);
                // cachedResponse = getpayload();
                // tracker++;
                return 'Do you want to fix user issue?';
            },
            options: async (params) => {
                return ['Yes', 'No']
            },
            path: async (params) => {
                console.log('cachedResponse', cachedResponse.errorCode, cachedResponse);
                if (!cachedResponse.errorCode) { return 'start'; }
                switch (params.userInput) {
                    case 'Yes':
                        return cachedResponse.errorCode;
                    case 'No':
                        return 'start';
                    default:
                        return 'unknown_input';
                }
            },
        },

        query: {
            ...createGenericConfig(res1)
        },
        err1: {
            ...createGenericConfig(err12)
        },
        err3: {
            ...createGenericConfig(err3)
        },
        unknown_input: {
            transition: { duration: 500 },
            chatDisabled: true,
            message: "Sorry, I do not understand your message!  Returning to home options.",
            path: "start"
        },
        resolved: {
            transition: { duration: 500 },
            chatDisabled: true,
            message: "All issues have been resolved. Returning home",
            path: "troubleshooting"
        }
    }
    return (
        // <div style={{ width: "50vw", height:" 50vh" }} >
            <ChatBotProvider>
            <div style={{ width: "50vw", height:" 50vh" }} >
                <Grid userDataHandler={userDataHandler}/>
                </div>
                <ChatBot settings={settings} flow={flow} />
            </ChatBotProvider>
        // {/* </div> */}
    );
};