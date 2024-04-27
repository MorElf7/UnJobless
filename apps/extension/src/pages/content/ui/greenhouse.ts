import {
    tryInput, selectOptionByPartialText, selectOptionByValue, existQuery,
    emptyFilter, hispanicFilter, ethnicFilter, selectCheckBoxByPartialText,
    genderFilter, selectCheckBoxByValue
} from "@root/utils/utils";

const greenHouse = (profile) => {
    let delayIndex = 0;
    const delaySpeed = 100;

    setTimeout(() => tryInput("input[id='first_name']", profile.first_name), delaySpeed * delayIndex++);
    setTimeout(() => tryInput("input[id='last_name']", profile.last_name), delaySpeed * delayIndex++);
    setTimeout(() => tryInput("input[id='email']", profile.email), delaySpeed * delayIndex++);
    setTimeout(() => tryInput("input[id='phone']", profile.phone), delaySpeed * delayIndex++);
    setTimeout(() => tryInput("div[id='location_autocomplete_root'] input[id='auto_complete_input']", profile.street_address), delaySpeed * delayIndex++);

    // Process custom fields
    const customFieldsElement = document.getElementById("custom_fields");
    if (customFieldsElement) {
        const customs = customFieldsElement.querySelectorAll('div[class="field"]');
        customs.forEach((field) => {
            setTimeout(() => {
                const labelElement = field.querySelector('label');
                const label = labelElement ? labelElement.textContent : "";
                const input = field.querySelector('input:not([type="hidden"])');
                const select = field.querySelector('select');

                if (select instanceof HTMLSelectElement && label) {
                    if (/Will you now or in the future require sponsorship/i.test(label)) {
                        selectOptionByPartialText(select, profile.sponsorship, emptyFilter);
                    } else if (/legally authorized/i.test(label)) {
                        selectOptionByPartialText(select, profile.legally_authorized, emptyFilter);
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
            }, delaySpeed * delayIndex++);
        });
    }

    // Process EEOC fields
    if (existQuery("div[id='eeoc_fields']")) {
        setTimeout(() => selectOptionByValue(document.querySelector("select[id='job_application_gender']"), profile.gender, emptyFilter), delaySpeed * delayIndex++);
        setTimeout(() => selectOptionByPartialText(document.querySelector("select[id='job_application_hispanic_ethnicity']"), profile.race, hispanicFilter), delaySpeed * delayIndex++);
        setTimeout(() => selectOptionByPartialText(document.querySelector("select[id='job_application_race']"), profile.race, ethnicFilter), delaySpeed * delayIndex++);
        setTimeout(() => selectOptionByPartialText(document.querySelector("select[id='job_application_veteran_status']"), profile.veteran, emptyFilter), delaySpeed * delayIndex++);
        setTimeout(() => selectOptionByPartialText(document.querySelector("select[id='job_application_disability_status']"), profile.disability, emptyFilter), delaySpeed * delayIndex++);
    } else if (existQuery("div[id='demographic_questions']")) {
        const demographics = document.querySelectorAll("div[class='field demographic_question ']");
        demographics.forEach((demo: HTMLDivElement) => {
            setTimeout(() => {
                const question = demo.textContent;
                if (/gender identity/i.test(question)) {
                    selectCheckBoxByValue(demo, profile.gender, genderFilter);
                } else if (/racial/i.test(question)) {
                    selectCheckBoxByPartialText(demo, profile.race, emptyFilter);
                } else if (/veteran/i.test(question)) {
                    selectCheckBoxByPartialText(demo, profile.veteran, emptyFilter);
                } else if (/disability/i.test(question)) {
                    selectCheckBoxByPartialText(demo, profile.disability, emptyFilter);
                }
            }, delaySpeed * delayIndex++);
        });
    }

    return delaySpeed * delayIndex;
};

export { greenHouse };
