import ChatBot from "react-chatbotify";

// export const MyChatBot = () => {
// 	const helpOptions = ["Quickstart", "API Docs", "Examples", "Github", 'Troubleshooting'];
//     const binaryOptions = ['Yes', 'No'];
//     const openWindowLink = (link) => {
//         window.open(link);
//         return 'repeat';
//     }

//     let dynamicPath = null;
//     let hasError = false;
//     const api_stream = async (params) => {
//         try {
//             // await params.streamMessage
//             await new Promise((res, rej) => res('show_options'));
//             console.log('what are the params', params);
//             hasError = true;
//             await params.streamMessage('soemthing');

// 			// we call endStreamMessage to indicate that all streaming has ended here
// 			await params.endStreamMessage();
//         } catch (error) {
//             await params.injectMessage("Something went WRONG!!");
// 			hasError = true;
//         }
//     };
// 	const flow = {
// 		start: {
// 			message: "Hello! Welcome to our chatbot!",
// 			transition: {duration: 1000},
// 			path: "show_options"
// 		},
// 		show_options: {
// 			message: "What can I help you with today?",
// 			options: helpOptions,
// 			path: "process_options"
// 		},
// 		prompt_again: {
// 			message: "Do you need any other help?",
// 			options: helpOptions,
// 			path: "process_options"
// 		},
// 		unknown_input: {
// 			message: "Sorry, I do not understand your message 😢! If you require further assistance, you may click on " +
// 				"the Github option and open an issue there or visit our discord.",
// 			options: helpOptions,
// 			path: "process_options"
// 		},
//         response_redirect: {
//             message: 'Is there something wrong with your user?',
//             options: binaryOptions,
//             path: ''
//         },
// 		process_options: {
// 			transition: {duration: 0},
// 			chatDisabled: true,
// 			path: async (params) => {
// 				let link = "";
                
// 				switch (params.userInput) {
                    
// 				case "Quickstart":
// 					link = "https://react-chatbotify.com/docs/introduction/quickstart/";
// 					break;
// 				case "API Docs":
// 					link = "https://react-chatbotify.com/docs/api/settings";
// 					break;
// 				case "Examples":
// 					link = "https://react-chatbotify.com/docs/examples/basic_form";
// 					break;
// 				case "Github":
//                     await params.injectMessage("Sit tight! Processing your request");
// 					link = "https://github.com/ianagpawa/chatbotify-example";
//                     return openWindowLink(link);
//                 case "Troubleshooting":
//                     return 'loop';
// 				default:
// 					return "unknown_input";
// 				}
// 				await params.injectMessage("Sit tight! Processing your request");
// 				setTimeout(() => {

//                     window.open(link);
// 				}, 1000)
// 				// return 'repeat';
// 			},
// 		},
//         process_user_issues: {
//             transition: {duration: 0},
// 			chatDisabled: true,
// 			path: async (params) => {
// 				let link = "";
//                 let request = null;
//                 let responseAction = '';
                
// 				switch (params.userInput) {
                    
// 				case "Yes":
// 					return 'start';
// 				case "No":
//                     return 'repeat';
// 				default:
// 					return "unknown_input";
// 				}
// 			}
//         },
//         loop: {
// 			message: async (params) => {
// 				await api_stream(params);
// 			},
//             options: binaryOptions,
// 			path: () => {
// 				// if (hasError) {
// 				// 	return "process_options"
// 				// }
// 				return "process_user_issues"
// 			}
// 		},
//         thank: {
// 			message: async (params) => {
// 				await params.injectMessage("I am an injected message!");
// 				return "I am a return message!";
// 			},
// 			path: "start"
// 		},
// 		repeat: {
// 			transition: {duration: 3000},
// 			path: "prompt_again"
// 		},
//         try_something_else: {
//             transition: {duration: 3000},
// 			path: "unknown_input"
//         }
// 	}
// 	return (
// 		// <ChatBot settings={{general: {embedded: true}, chatHistory: {storageKey: "example_faq_bot"}}} flow={flow}/>
//         <ChatBot settings={{general: {embedded: true}, chatHistory: {storageKey: "example_simulation_stream"}, botBubble: {simStream: true}}} flow={flow}/>
//     );
// };

const err1: ServerResponse = {
    message: 'some message here',
    errorCode: 'error1',
    options: ['Yes', 'No']
};

const err12: ServerResponse = {
    message: 'SOmething wrong with user access.  Do you want me to fix this for the user?',
    errorCode: 'query',
    options: ['Yes', 'No']
};
const res1: ServerResponse = {
    message: 'some message here',
    errorCode: null,
    options: []
};

function createErrMessage(message, errorCode = 'error1') {
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
            transition: {duration: 0},
			chatDisabled: true,
            message: async (params) => {
                // const result = await fetchData(userId);
                cachedResponse = rez;  // replace this !!!!!!!!!!!!!!!!!
                return cachedResponse.message;
            },
            options: async (params) => {
                // params.userInput = null;
                // return cachedResponse.options;
            },
            path: 'loop'
            // path: async (params) => {
            //     // if (!params.userInput) { 
            //     //     cachedResponse = null;
            //     //     userId = null;
            //     //     return 'start';
            //     // }
            //     console.log('params input', params.current, params.userInput, params);
            //     console.log('cachedResponse', cachedResponse);
            //     // return cachedResponse.errorCode;
            //     switch(params.userInput) {
            //         case 'Yes':
            //             return cachedResponse.errorCode; // returns back
            //         case 'No':
            //             return 'start';
            //         default:
            //             return 'unknown_input';
            //     }
            // },
        }
    }
	const flow={
		start: {
			message: "Hey! What is the number you are looking for?",
			path: "loop"
		},
		loop: {
            
            message: async (params) => {
                userId = params.userInput;
                const result = await fetchData(params.userInput);
                cachedResponse = createErrMessage('DO you want to fix user issues?'); // DO you want to fix user issues?
                return cachedResponse.message;
            },
            options: async (params) => {
                return cachedResponse.options;
            },
            path: async (params) => {
                // return cachedResponse.errorCode;
                switch(params.userInput) {
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
        error1: {
            ...createGenericConfig(err12)
        },
        unknown_input: {
            transition: {duration: 0},
			chatDisabled: true,
            message: "Sorry, I do not understand your message!  Returning you on home options.",
            path: "start"
        },
	}
	return (
		<ChatBot settings={{general: {embedded: true}, chatHistory: {storageKey: "example_smart_conversation"}}} flow={flow}/>
	);
};