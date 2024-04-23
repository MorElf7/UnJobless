import reloadOnUpdate from 'virtual:reload-on-update-in-background-script';
import 'webextension-polyfill';

reloadOnUpdate('pages/background');

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate('pages/content/style.scss');

console.log('background loaded');


const getProfileFromStorage = () => {
    console.log('getProfileFromStorage');
    return "";
}

var PROFILE = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    linkedin: "",
    website: "",
    github: "",
    street_address: "",
    city: "",
    state: "",
    zip_code: "",
    university: "",
    uni_city: "",
    gpa: 4,
    major: "",
    degree: "",
    sponsorship: "",
    legally_authorized: "",
    gender : "",
    hispanic_eth: "",
    race: "",
    veteran: "",
    disability: "",
}

var TEST_PROFILE = {
    first_name: "test_first_name",
    last_name: "test_last_name",
    email: "test_email",
    phone: "test_phone",
    linkedin: "test_linkedin",
    website: "test_website",
    github: "test_github",
    street_address: "test_street_address",
    city: "test_city",
    state: "test_state",
    zip_code: "test_zip_code",
    university: "test_university",
    uni_city: "test_uni_city",
    gpa: 4,
    major: "test_major",
    degree: "test_degree",
    sponsorship: "Yes",
    legally_authorized: "Yes",
    gender: "Male",
    hispanic_eth: "No",
    race: "Asian",
    veteran: "No",
    disability: "No",
}


const saveProfile = (profile: Object) => {
    const jsonProfile = JSON.stringify(profile);        
    chrome.storage.sync.set({ profile: jsonProfile })

}

const getProfile = () => {
    console.log('getProfile');
    chrome.storage.sync.get(
        'profile', (profile) => {
        if (profile) {
            console.log('profile', profile);
            return JSON.parse(profile.profile);
        } else {
            try {
                // PROFILE = getProfileFromStorage();
                console.log('getProfileFromStorage');
            } catch (error) {
                console.log(error);
            }
        }
    });
    //someAPI
}

const assignTestProfile = () => {
    console.log('assignTestProfile');
    saveProfile(TEST_PROFILE);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'getProfile') {
        console.log('sendgetProfile');
        sendResponse({profile: getProfile()});
    }else if (request.message === 'saveProfile') {
        saveProfile(request.profile);
    }else if (request.message === 'assignTestProfile') {
        assignTestProfile();
        console.log(PROFILE)
    }
    return true;
});

