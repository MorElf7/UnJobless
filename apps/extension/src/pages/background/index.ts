import reloadOnUpdate from 'virtual:reload-on-update-in-background-script';
import 'webextension-polyfill';
import { AdditionType, Education, Experience, FileResponse, Profile, Request, Response } from '@src/shared/typing/types';
import { defaultProfile } from '@root/src/shared/typing/constant';

reloadOnUpdate('pages/background');

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate('pages/content/style.scss');


const testEducation: Education[] = [
    {
        school: "University of Example",
        start_date: "2018-08",
        end_date: "2022-05",
        major: "Computer Science",
        degree: "Bachelor of Science",
        gpa: 3.8
    },
    {
        school: "Example Community College",
        start_date: "2016-09",
        end_date: "2018-06",
        major: "General Studies",
        degree: "Associate of Arts",
        gpa: 3.5
    }
];

const testExperience: Experience[] = [
    {
        company: "Example Tech Inc.",
        location: "Example City",
        start_date: "2022-06",
        end_date: "Present",
        position: "Software Developer",
        current: true,
        description: "Developed and maintained web applications using React and Node.js."
    },
    {
        company: "Example Startup LLP",
        location: "Example City",
        start_date: "2020-06",
        end_date: "2022-05",
        position: "Junior Developer",
        current: false,
        description: "Assisted in the development of mobile applications and performed software testing."
    }
];

const testProfile: Profile = {
    uid: "string",
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    phone: "555-1234-567",
    linkedin: "https://www.linkedin.com/in/johndoe",
    website: "https://www.johndoe.com",
    github: "https://github.com/johndoe",
    street_address: "1234 Example St",
    city: "Example City",
    state: "MA",
    zip_code: "12345",
    country: "United States",
    resumeUrl: "https://storage.googleapis.com/simplify-resumes/095d312e-3834-4d91-9c5b-537c8133984f/1704811265.pdf?Expires=1717272984&GoogleAccessId=gcs-signing-service-account%40mifflin-backend.iam.gserviceaccount.com&Signature=nSWFOS2Tr%2FB1QH06eYkfekjJQw%2FT2guHNvTFW468NjodC3uZHTVvb4mji9U%2By21DPzLeVNYjAHZtJqcMhr6RSVdL4VaWcaUdo6hq6%2BQG9kqsnitWgQlPBoDMW4%2FiyIiMxkB0vtwrQXeHx4wOWb1mMWQa4LyQKc%2BFUxt9nZIhbXXZEPDj7pmL7S7pE79U3UdlfOIfgJEBq9fPGPkqHY34Yz5KVYvKZ1aqoXBuxayN5Zq2SfxVBc48BX%2BYrA9Jr%2FHebxdXCNrSoam4FFPzj6iRjgYLAXEj4Fr%2Bd7dm4B2C5dALqOmqDFPg4bng%2FArnZSww2rauKPSsbrHk1HdI6irU3w%3D%3D&",
    resumeFileName: "John Doe Resume",
    coverLetterUrl: "https://storage.googleapis.com/simplify-resumes/095d312e-3834-4d91-9c5b-537c8133984f/1704811265.pdf?Expires=1717272984&GoogleAccessId=gcs-signing-service-account%40mifflin-backend.iam.gserviceaccount.com&Signature=nSWFOS2Tr%2FB1QH06eYkfekjJQw%2FT2guHNvTFW468NjodC3uZHTVvb4mji9U%2By21DPzLeVNYjAHZtJqcMhr6RSVdL4VaWcaUdo6hq6%2BQG9kqsnitWgQlPBoDMW4%2FiyIiMxkB0vtwrQXeHx4wOWb1mMWQa4LyQKc%2BFUxt9nZIhbXXZEPDj7pmL7S7pE79U3UdlfOIfgJEBq9fPGPkqHY34Yz5KVYvKZ1aqoXBuxayN5Zq2SfxVBc48BX%2BYrA9Jr%2FHebxdXCNrSoam4FFPzj6iRjgYLAXEj4Fr%2Bd7dm4B2C5dALqOmqDFPg4bng%2FArnZSww2rauKPSsbrHk1HdI6irU3w%3D%3D",
    coverLetterFileName: "John Doe Cover Letter",
    education: testEducation,
    experience: testExperience,
    sponsorship: "No",
    legally_authorized: "Yes",
    gender: "Male",
    race: "Southeast Asian",
    veteran: "No",
    disability: "No"
};



const saveProfile = async (profile: Object) : Promise<Response>=> {
    const jsonProfile = JSON.stringify(profile);
    return new Promise((resolve, reject) => {
        chrome.storage.sync.set({ profile: jsonProfile }, () => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError.message);
            } else {
                resolve({ success: true });
            }
        });
    });
}

const saveApplication = async (Profile: Profile, company: string): Promise<Response> => {

    return new Promise(async (resolve, reject) => {
        // change to saveApplication
        // const response = await fetch('https://cs520-backend-iz0mg9q8e-kientos-projects.vercel.app/application', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwiaWQiOiI2NjMzYmI2MmU3MWQzMzA0NzBjNDI4ZTgiLCJmaXJzdE5hbWUiOiJKb2huIiwibGFzdE5hbWUiOiJEb2UiLCJpYXQiOjE3MTQ2NjYzMzgsImV4cCI6MTcxNDcwMjMzOH0.fE8JhQ18Gqkf13XpgZMYDmGTCcHFw2XMNisYHv1gdu0'
        //     },
        //     body: JSON.stringify({
        //         company: company,
        //         uid: Profile.uid,
        //     })
        // });

        // if (!response.ok) {
        //     reject(new Error(`HTTP error! Status: ${response.status}`));
        // }

        // resolve({ success: true });
        console.log('saveApplication');
    });

}

const getProfile = (): Promise<Response> => {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get('profile', async (result) => {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError.message);
                reject(chrome.runtime.lastError.message);
                return;
            }

            if (result.profile) {
                console.log('profile', result.profile);
                resolve(JSON.parse(result.profile));
            } else {
                // change to getProfile
                // https://cs520-backend-iz0mg9q8e-kientos-projects.vercel.app
                // const response = await fetch('https://cs520-backend-iz0mg9q8e-kientos-projects.vercel.app/application/autofill', {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json',
                //         'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwiaWQiOiI2NjMzYmI2MmU3MWQzMzA0NzBjNDI4ZTgiLCJmaXJzdE5hbWUiOiJKb2huIiwibGFzdE5hbWUiOiJEb2UiLCJpYXQiOjE3MTQ2NjYzMzgsImV4cCI6MTcxNDcwMjMzOH0.fE8JhQ18Gqkf13XpgZMYDmGTCcHFw2XMNisYHv1gdu0'
                //     },
                //     body: JSON.stringify({
                //         prompt: "John Doe is"
                //     })
                    
                // });

                // if (!response.ok) {
                //     throw new Error(`HTTP error! Status: ${response.status}`);
                // }

                // const data = await response.json();
                // await saveProfile(data);
                // resolve(data);
            }
        });
    });
};

const assignTestProfile = async () => {
    console.log('assignTestProfile');
    await saveProfile(testProfile);
}

const clearTestProfile = async () => {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.remove('profile', () => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError.message);
            } else {
                resolve(true);
            }
        });
    });

}

const getFile = async (fileURL: string, name: string): Promise<FileResponse> => {
    const response = await fetch(fileURL);

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const buffer = await response.arrayBuffer();

    const { status } = response;
    const contentType = response.headers.get("Content-Type") || "";

    let extension = "";
    switch (contentType) {
        case "application/pdf":
            extension = ".pdf";
            break;
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            extension = ".docx";
            break;
        case "application/msword":
            extension = ".doc";
            break;
        default:
            extension = "";
            break;
    }

    const filename = name + extension;

    const arrayBuffer = Array.from(new Uint8Array(buffer));
    
    return {
        status: status,
        type: contentType,
        arrayBuffer: arrayBuffer,
        filename: filename
    };
}

const genAi = async (text: string): Promise<Response> => {
    const response = await fetch('https://cs520-backend-iz0mg9q8e-kientos-projects.vercel.app/application/autofill', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwiaWQiOiI2NjMzYmI2MmU3MWQzMzA0NzBjNDI4ZTgiLCJmaXJzdE5hbWUiOiJKb2huIiwibGFzdE5hbWUiOiJEb2UiLCJpYXQiOjE3MTQ2NjYzMzgsImV4cCI6MTcxNDcwMjMzOH0.fE8JhQ18Gqkf13XpgZMYDmGTCcHFw2XMNisYHv1gdu0'
        },
        body: JSON.stringify({
            question: text
        })
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.text();
    // const data = "This is a test response from the AI."

    return {
        data: data
    };

}

// const saveAddition = async (addition: AdditionType) => {
//     const jsonAddition = JSON.stringify(addition);
//     return new Promise((resolve, reject) => {
//         chrome.storage.sync.set({ addition: jsonAddition }, () => {
//             if (chrome.runtime.lastError) {
//                 reject(chrome.runtime.lastError.message);
//             } else {
//                 resolve(true);
//             }
//         });
//     });
// }

// const getAddition = async () => {
//     return new Promise((resolve, reject) => {
//         chrome.storage.sync.get('addition', (result) => {
//             if (chrome.runtime.lastError) {
//                 console.error(chrome.runtime.lastError.message);
//                 reject(chrome.runtime.lastError.message);
//                 return;
//             }

//             if (result.addition) {
//                 resolve(JSON.parse(result.addition));
//             } else {
//                 resolve({});
//             }
//         });
//     });

// }


function handleRequest(
    promise: Promise<any>,
    sendResponse: (response: Response) => void,
    successHandler: (result: any) => void
): void {
    promise.then(successHandler)
           .catch((error: Error) => {
               console.error('Error:', error);
               sendResponse({ error: error.toString() });
           });
}

chrome.runtime.onMessage.addListener((request: Request, sender: chrome.runtime.MessageSender, sendResponse: (response: Response) => void): boolean => {
    try {
        switch (request.method) {
            case 'getProfile':
                handleRequest(getProfile(), sendResponse, (profile) => {
                    sendResponse({ profile });
                });
                break;

            case 'saveProfile':
                handleRequest(saveProfile(request.profile), sendResponse, () => {
                    sendResponse({ success: true });
                });
                break;

            case 'assignTestProfile':
                handleRequest(assignTestProfile(), sendResponse, () => {
                    console.log("Profile assigned"); // Adjust logging appropriately
                });
                break;
            case 'clearTestProfile':
                handleRequest(clearTestProfile(), sendResponse, () => {
                    console.log("Profile cleared"); // Adjust logging appropriately
                });
                break;
            case 'getFile':
                handleRequest(getFile(request.fileURL!, request.name!), sendResponse, (response) => {
                    sendResponse(response);
                });
                break;
            case 'genAi':
                handleRequest(genAi(request.question), sendResponse, (response) => {
                    sendResponse(response);
                });
                break;
            case 'submitForm':
                handleRequest(saveApplication(request.profile, request.company), sendResponse, () => {
                    sendResponse({ success: true });
                });
                break;
            // case 'saveAddition':
            //     handleRequest(saveAddition(request.addition), sendResponse, () => {
            //         sendResponse({ success: true });
            //     });
            //     break;

            // case 'getAddition':
            //     handleRequest(getAddition(), sendResponse, (addition) => {
            //         sendResponse({ addition });
            //     });
            //     break;

            default:
                sendResponse({ error: 'Unsupported request method.' });
        }
    } catch (error) {
        console.error('General Error:', error);
        sendResponse({ error: 'An unexpected error occurred.' });
    }
    return true;  // This ensures asynchronous handling of responses
});
