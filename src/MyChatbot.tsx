import ChatBot from "react-chatbotify";

export const MyChatBot = () => {
	const helpOptions = ["Quickstart", "API Docs", "Examples", "Github", 'Troubleshooting'];
    const binaryOptions = ['Yes', 'No'];
    const openWindowLink = (link) => {
        window.open(link);
        return 'repeat';
    }

    let dynamicPath = null;
    let hasError = false;
    const api_stream = async (params) => {
        try {
            // await params.streamMessage
            await new Promise((res, rej) => res('show_options'));
            console.log('what are the params', params);
            hasError = true;
            await params.streamMessage('soemthing');

			// we call endStreamMessage to indicate that all streaming has ended here
			await params.endStreamMessage();
        } catch (error) {
            await params.injectMessage("Something went WRONG!!");
			hasError = true;
        }
    };
	const flow = {
		start: {
			message: "Hello! Welcome to our chatbot!",
			transition: {duration: 1000},
			path: "show_options"
		},
		show_options: {
			message: "What can I help you with today?",
			options: helpOptions,
			path: "process_options"
		},
		prompt_again: {
			message: "Do you need any other help?",
			options: helpOptions,
			path: "process_options"
		},
		unknown_input: {
			message: "Sorry, I do not understand your message 😢! If you require further assistance, you may click on " +
				"the Github option and open an issue there or visit our discord.",
			options: helpOptions,
			path: "process_options"
		},
        response_redirect: {
            message: 'Is there something wrong with your user?',
            options: binaryOptions,
            path: ''
        },
		process_options: {
			transition: {duration: 0},
			chatDisabled: true,
			path: async (params) => {
				let link = "";
                
				switch (params.userInput) {
                    
				case "Quickstart":
					link = "https://react-chatbotify.com/docs/introduction/quickstart/";
					break;
				case "API Docs":
					link = "https://react-chatbotify.com/docs/api/settings";
					break;
				case "Examples":
					link = "https://react-chatbotify.com/docs/examples/basic_form";
					break;
				case "Github":
                    await params.injectMessage("Sit tight! Processing your request");
					link = "https://github.com/ianagpawa/chatbotify-example";
                    return openWindowLink(link);
                case "Troubleshooting":
                    return 'loop';
				default:
					return "unknown_input";
				}
				await params.injectMessage("Sit tight! Processing your request");
				setTimeout(() => {

                    window.open(link);
				}, 1000)
				// return 'repeat';
			},
		},
        process_user_issues: {
            transition: {duration: 0},
			chatDisabled: true,
			path: async (params) => {
				let link = "";
                let request = null;
                let responseAction = '';
                
				switch (params.userInput) {
                    
				case "Yes":
					return 'start';
				case "No":
                    return 'repeat';
				default:
					return "unknown_input";
				}
			}
        },
        loop: {
			message: async (params) => {
				await api_stream(params);
			},
            options: binaryOptions,
			path: () => {
				// if (hasError) {
				// 	return "process_options"
				// }
				return "process_user_issues"
			}
		},
        thank: {
			message: async (params) => {
				await params.injectMessage("I am an injected message!");
				return "I am a return message!";
			},
			path: "start"
		},
		repeat: {
			transition: {duration: 3000},
			path: "prompt_again"
		},
        try_something_else: {
            transition: {duration: 3000},
			path: "unknown_input"
        }
	}
	return (
		// <ChatBot settings={{general: {embedded: true}, chatHistory: {storageKey: "example_faq_bot"}}} flow={flow}/>
        <ChatBot settings={{general: {embedded: true}, chatHistory: {storageKey: "example_simulation_stream"}, botBubble: {simStream: true}}} flow={flow}/>
    );
};