import { tryInput, selectOptionByPartialText } from "@root/utils/utils";


const greenHouse = (profile) => {
    //process main fields
    tryInput("input[id='first_name']", profile.first_name);
    tryInput("input[id='last_name']", profile.last_name);
    tryInput("input[id='email']", profile.email);
    tryInput("input[id='phone']", profile.phone);
    tryInput("div[id='location_autocomplete_root'] input[id='auto_complete_input']", profile.street_address);
    
    // Process custom fields
    const customFieldsElement = document.getElementById("custom_fields");
    if (customFieldsElement) {
        const customs = customFieldsElement.querySelectorAll('div[class="field"]');
        customs.forEach((field) => {
            const labelElement = field.querySelector('label');
            const label = labelElement ? labelElement.textContent : "";
            const input = field.querySelector('input:not([type="hidden"])');
            const select = field.querySelector('select');

            if (select instanceof HTMLSelectElement && label) {
                if (/Will you now or in the future require sponsorship/i.test(label)) {
                    selectOptionByPartialText(select, profile.sponsorship);
                } else if (/legally authorized/i.test(label)) {
                    selectOptionByPartialText(select, profile.legally_authorized);
                }
            } else if (input instanceof HTMLInputElement && label) {
                if (/linkedin profile/i.test(label) || /linkedin/i.test(label)) {
                    input.value = profile.linkedin; 
                } else if (/github profile/i.test(label) || /github/i.test(label)) {
                    input.value = profile.github;  
                } else if (/website/i.test(label)) {
                    input.value = profile.website;  
                }
            } else {
                console.error("No input or select found for field:", label || "Unknown Label");
            }
        });
    } else {
        console.error("Custom fields element not found");
    }
    // process eeoc_fields
    selectOptionByPartialText(document.querySelector("select[id='job_application_gender']"), profile.gender);
    selectOptionByPartialText(document.querySelector("select[id='job_application_hispanic_ethnicity']"), profile.hispanic_eth);
    selectOptionByPartialText(document.querySelector("select[id='job_application_race']"), profile.race);
    selectOptionByPartialText(document.querySelector("select[id='job_application_veteran_status']"), profile.veteran);
    selectOptionByPartialText(document.querySelector("select[id='job_application_disability_status']"), profile.disability);
}

export { greenHouse };
