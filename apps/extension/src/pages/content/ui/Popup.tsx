import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import{ greenHouse } from './greenhouse';

const Popup = ({ type }) => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        chrome.storage.sync.get(['profile'], (result) => {
            if (result.profile) {
                setProfile(JSON.parse(result.profile));
            } else {
                chrome.runtime.sendMessage({ message: "getProfile" }, () => {
                    chrome.storage.sync.get(['profile'], (updatedResult) => {
                        if (updatedResult.profile) {
                            setProfile(JSON.parse(updatedResult.profile));
                        }
                    });
                });
            }
        });
    }, []);

    const handleAutofill = () => {
        if (!profile) {
            alert("No profile loaded");
            return;
        }
        switch (type) {
            case 0:
                greenHouse(profile);
                break;
            case 1:
                // Implement case 1 logic
                break;
            default:
                alert("System not supported");
        }
    };

    return (
        <div id="kumquatOverlay">
            <img id="kumquatTree" src={chrome.runtime.getURL("kumquat_tree.png")} alt="Kumquat Tree" />
            <div id="popupText">Kumquat Compatible!</div>
            <button id="kumquatButton" onClick={handleAutofill}>Autofill Application</button>
            <button id="saveProfile" onClick={() => chrome.runtime.sendMessage({ message: "assignTestProfile" })}>
                Save Profile
            </button>
            <div id="popupClose" onClick={() => document.getElementById("kumquatOverlay").remove()}>
                Try Later
            </div>
        </div>
    );
};

// Render the Popup component into a new div element appended to the document body
const injectPopup = (type) => {
    const popupRoot = document.createElement('div');
    popupRoot.id = 'react-popup-root';
    document.body.appendChild(popupRoot);
    ReactDOM.render(<Popup type={type} />, popupRoot);
};

export { Popup };
