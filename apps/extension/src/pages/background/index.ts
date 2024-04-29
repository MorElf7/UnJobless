import reloadOnUpdate from 'virtual:reload-on-update-in-background-script';
import 'webextension-polyfill';
import { Education, Experience, FileResponse, Profile } from '@src/shared/typing/types';
import { defaultProfile } from '@root/src/shared/typing/constant';

reloadOnUpdate('pages/background');

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate('pages/content/style.scss');


const getProfileFromStorage = () => {
    console.log('getProfileFromStorage');
    return "";
}

var PROFILE = defaultProfile

const testEducation: Education[] = [
    {
        name: "University of Example",
        location: "Example City",
        start_date: "2018-08",
        end_date: "2022-05",
        major: "Computer Science",
        degree: "Bachelor of Science",
        gpa: 3.8
    },
    {
        name: "Example Community College",
        location: "Example Town",
        start_date: "2016-09",
        end_date: "2018-06",
        major: "General Studies",
        degree: "Associate of Arts",
        gpa: 3.5
    }
];

const testExperience: Experience[] = [
    {
        name: "Example Tech Inc.",
        location: "Example City",
        start_date: "2022-06",
        end_date: "Present",
        position: "Software Developer",
        description: "Developed and maintained web applications using React and Node.js."
    },
    {
        name: "Example Startup LLP",
        location: "Example City",
        start_date: "2020-06",
        end_date: "2022-05",
        position: "Junior Developer",
        description: "Assisted in the development of mobile applications and performed software testing."
    }
];

const testProfile: Profile = {
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    phone: "555-1234-567",
    linkedin: "https://www.linkedin.com/in/johndoe",
    website: "https://www.johndoe.com",
    github: "https://github.com/johndoe",
    street_address: "1234 Example St",
    city: "Example City",
    state: "Ex",
    zip_code: "12345",
    resumeUrl: "https://storage.googleapis.com/simplify-resumes/095d312e-3834-4d91-9c5b-537c8133984f/1704811265.pdf?Expires=1714594158&GoogleAccessId=gcs-signing-service-account%40mifflin-backend.iam.gserviceaccount.com&Signature=vJdyVaoFzfH75gHH52Hjc%2FO3Srw1TLVt3cgdtTyWfC%2FfFT1D7Ox34BvEQrGU2CyIQIfCJ48I2VIqdx1M%2BTIaPXeqdl01Ska%2BPuP7rxpPkoCdTfbrdasLLJSRfIfY%2FIcplGxtYGG8txhIexAFba3zgyVsuxAZcc5MoW9%2BuZJiHCHRzYJJwZa1Sow5K7H7C0xJxsiPRXucEttPzC5FSoS4oBYV0B6E4%2BFnO01374id4fnuCgEaGt8SZDnCfu80ay1xqdFV0ZD1MlgtD6JDvZ8i9x0cv3JTGlOrENrrE6Bda2J%2FYh%2B5QnWNFC5sjwP5%2BnsEkEq221W1an3IX%2BI5FvIboA%3D%3D",
    resumeFileName: "John Doe Resume",
    coverLetterUrl: "https://storage.googleapis.com/simplify-resumes/095d312e-3834-4d91-9c5b-537c8133984f/1704811265.pdf?Expires=1714594158&GoogleAccessId=gcs-signing-service-account%40mifflin-backend.iam.gserviceaccount.com&Signature=vJdyVaoFzfH75gHH52Hjc%2FO3Srw1TLVt3cgdtTyWfC%2FfFT1D7Ox34BvEQrGU2CyIQIfCJ48I2VIqdx1M%2BTIaPXeqdl01Ska%2BPuP7rxpPkoCdTfbrdasLLJSRfIfY%2FIcplGxtYGG8txhIexAFba3zgyVsuxAZcc5MoW9%2BuZJiHCHRzYJJwZa1Sow5K7H7C0xJxsiPRXucEttPzC5FSoS4oBYV0B6E4%2BFnO01374id4fnuCgEaGt8SZDnCfu80ay1xqdFV0ZD1MlgtD6JDvZ8i9x0cv3JTGlOrENrrE6Bda2J%2FYh%2B5QnWNFC5sjwP5%2BnsEkEq221W1an3IX%2BI5FvIboA%3D%3D",
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

const additionalFields = {}


const saveProfile = async (profile: Object) => {
    const jsonProfile = JSON.stringify(profile);
    return new Promise((resolve, reject) => {
        chrome.storage.sync.set({ profile: jsonProfile }, () => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError.message);
            } else {
                resolve(true);
            }
        });
    });
}

const getProfile = () => {
    return new Promise((resolve, reject) => {
        console.log('getProfile');
        chrome.storage.sync.get('profile', (result) => {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError.message);
                reject(chrome.runtime.lastError.message);
                return;
            }

            if (result.profile) {
                console.log('profile', result.profile);
                resolve(JSON.parse(result.profile));
            } else {
                // Here, you might need to fetch the profile from another storage or a remote API
                console.log('No profile found in storage, fetching from another source...');
                // Simulate fetching profile from another source
                // For example, let's simulate it with a timeout (you would replace this with an actual API call)
                setTimeout(() => {
                    // This is just an example payload, replace with actual data retrieval logic
                    const simulatedProfile = { name: "John Doe", email: "john@example.com" };
                    console.log('getProfileFromStorage:', simulatedProfile);
                    resolve(simulatedProfile); // resolve the fetched profile
                }, 1000);
            }
        });
    });
};

const assignTestProfile = async () => {
    console.log('assignTestProfile');
    await saveProfile(testProfile);
}

async function getFile(fileURL: string, name: string): Promise<FileResponse> {
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


chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    try {
        if (request.method === 'getProfile') {
            console.log('sendgetProfile');
            const profile = await getProfile();
            sendResponse({ profile: profile });
            return true;  
        } else if (request.method === 'saveProfile') {
            await saveProfile(request.profile);
            sendResponse({ success: true });
            return true;
        } else if (request.method === 'assignTestProfile') {
            await assignTestProfile();
            console.log(PROFILE);
        } else if (request.method === 'getFile') {
            const response = await getFile(request.fileURL, request.name);
            sendResponse(response);
            return true;
        }
    } catch (error: any) {
        console.error('Error:', error);
        sendResponse({ error: error.toString() });
        return true;
    }
});
