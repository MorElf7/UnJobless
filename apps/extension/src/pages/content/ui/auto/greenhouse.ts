import { Profile } from "@root/src/shared/typing/types";
import { AutoFillManager, EventEmitter } from "./autoManager";
import {
tryInput, selectOptionByPartialText, selectOptionByValue, existQuery,
emptyFilter, hispanicFilter, ethnicFilter, selectCheckBoxByPartialText,
genderFilter, selectCheckBoxByValue,
attachFileToInput
} from "@root/utils/utils";
import { authorizedPattern, githubPattern, linkedInPattern, sponsorshipPattern, websitePattern } from "@root/src/shared/typing/constant";

const delaySpeed : number = 100;

export class GreenHouseAutoFillManager extends AutoFillManager {
    private eventEmitter: EventEmitter;
    constructor(eventEmitter: EventEmitter) {
        super();
        this.eventEmitter = eventEmitter;
    }

    private async handleIdentityFields(profile: Profile): Promise<void> {
        let delayIndex = 0;
        await new Promise(resolve => setTimeout(resolve, delaySpeed * delayIndex++));
        await tryInput("input[id='first_name']", profile.first_name);
        await new Promise(resolve => setTimeout(resolve, delaySpeed * delayIndex++));
        await tryInput("input[id='last_name']", profile.last_name);
        await new Promise(resolve => setTimeout(resolve, delaySpeed * delayIndex++));
        await tryInput("input[id='email']", profile.email);
        await new Promise(resolve => setTimeout(resolve, delaySpeed * delayIndex++));
        await tryInput("input[id='phone']", profile.phone);
        await new Promise(resolve => setTimeout(resolve, delaySpeed * delayIndex++));
        await tryInput("div[id='location_autocomplete_root'] input[id='auto_complete_input']", profile.street_address);
    }

    private async handleUpload(profile: Profile): Promise<void> {
        const resumeInput = document.querySelector("form[id='s3_upload_for_resume'] input[type='file']") as HTMLInputElement | null;
        const coverLetterInput = document.querySelector("form[id='s3_upload_for_cover_letter'] input[type='file']") as HTMLInputElement | null;

        if (resumeInput && profile.resumeUrl) {
            await attachFileToInput(profile.resumeUrl, resumeInput, profile.resumeFileName);
        }

        if (coverLetterInput && profile.coverLetterUrl) {
            await attachFileToInput(profile.coverLetterUrl, coverLetterInput, profile.coverLetterFileName);
        }
    }

    private async handleCustomFields(profile: Profile): Promise<void> {
        let delayIndex = 0;
        const customs = document.querySelectorAll('#custom_fields .field');
        customs.forEach(async (field) => {
            await new Promise(resolve => setTimeout(resolve, delaySpeed * delayIndex++));
            const label = field.querySelector('label')?.textContent;
            const input = field.querySelector('input:not([type="hidden"])') as HTMLInputElement | null;
            const select = field.querySelector('select') as HTMLSelectElement | null;

            if (select) {
                if (sponsorshipPattern.test(label || "")) {
                    selectOptionByPartialText(select, profile.sponsorship, emptyFilter);
                } else if (authorizedPattern.test(label || "")) {
                    selectOptionByPartialText(select, profile.legally_authorized, emptyFilter);
                }
            } else if (input) {
                if (linkedInPattern.test(label || "")) {
                    input.value = profile.linkedin;
                } else if (githubPattern.test(label || "")) {
                    input.value = profile.github;
                } else if (websitePattern.test(label || "")) {
                    input.value = profile.website;
                }
            } 
        });
    }

    private async handleEEOCFields(profile: Profile): Promise<void> {
        let delayIndex = 0;
        if (existQuery("#eeoc_fields")) {
            const genderSelect = document.querySelector("#job_application_gender") as HTMLSelectElement | null;
            if (genderSelect) {
                await new Promise(resolve => setTimeout(resolve, delaySpeed * delayIndex++));
                selectOptionByValue(genderSelect, profile.gender, emptyFilter);
            }

            const hispanicEthnicitySelect = document.querySelector("#job_application_hispanic_ethnicity") as HTMLSelectElement | null;
            if (hispanicEthnicitySelect) {
                await new Promise(resolve => setTimeout(resolve, delaySpeed * delayIndex++));
                selectOptionByPartialText(hispanicEthnicitySelect, profile.race, hispanicFilter);
            }

            const raceSelect = document.querySelector("#job_application_race") as HTMLSelectElement | null;
            if (raceSelect) {
                await new Promise(resolve => setTimeout(resolve, delaySpeed * delayIndex++));
                selectOptionByPartialText(raceSelect, profile.race, ethnicFilter);
            }

            const veteranStatusSelect = document.querySelector("#job_application_veteran_status") as HTMLSelectElement | null;
            if (veteranStatusSelect) {
                await new Promise(resolve => setTimeout(resolve, delaySpeed * delayIndex++));
                selectOptionByPartialText(veteranStatusSelect, profile.veteran, emptyFilter);
            }

            const disabilityStatusSelect = document.querySelector("#job_application_disability_status") as HTMLSelectElement | null;
            if (disabilityStatusSelect) {
                await new Promise(resolve => setTimeout(resolve, delaySpeed * delayIndex++));
                selectOptionByPartialText(disabilityStatusSelect, profile.disability, emptyFilter);
            }
        } else if (existQuery("#demographic_questions")) {
            const demographics = document.querySelectorAll(".demographic_question") as NodeListOf<HTMLDivElement>;
            demographics.forEach(async (demo) => {
                await new Promise(resolve => setTimeout(resolve, delaySpeed * delayIndex++));
                const question = demo.textContent;
                if (question) {
                    if (/gender identity/i.test(question)) {
                        selectCheckBoxByValue(demo, profile.gender, genderFilter);
                    } else if (/racial/i.test(question)) {
                        selectCheckBoxByPartialText(demo, profile.race, emptyFilter);
                    } else if (/veteran/i.test(question)) {
                        selectCheckBoxByPartialText(demo, profile.veteran, emptyFilter);
                    } else if (/disability/i.test(question)) {
                        selectCheckBoxByPartialText(demo, profile.disability, emptyFilter);
                    }
                }
            });
        }
    }

    async autoFill(profile: Profile): Promise<void> {
        this.eventEmitter.publish('loading', true);
        await this.handleIdentityFields(profile);
        await this.handleUpload(profile);
        await this.handleCustomFields(profile);
        await this.handleEEOCFields(profile);
        this.eventEmitter.publish('loading', false);
    }

    async fillIdentityFields(profile: Profile): Promise<void> {
        this.eventEmitter.publish('loading', true);
        await this.handleIdentityFields(profile);
        this.eventEmitter.publish('loading', false);
    }

    async fillUpload(profile: Profile): Promise<void> {
        this.eventEmitter.publish('loading', true);
        this.handleUpload(profile);
        this.eventEmitter.publish('loading', false);
    }

    async fillCustomFields(profile: Profile): Promise<void> {
        this.eventEmitter.publish('loading', true);
        await this.handleCustomFields(profile);
        this.eventEmitter.publish('loading', false);
    }

    async fillEEOCFields(profile: Profile): Promise<void> {
        this.eventEmitter.publish('loading', true);
        await this.handleEEOCFields(profile);
        this.eventEmitter.publish('loading', false);
    }

    
}

// Usage:
// const profile: Profile = {
//     first_name: "John",
//     last_name: "Doe",
//     email: "john.doe@example.com",
//     phone: "1234567890",
//     street_address: "123 Main St",
//     sponsorship: "Yes",
//     legally_authorized: "Yes",
//     linkedin: "https://www.linkedin.com/in/johndoe",
//     github: "https://github.com/johndoe",
//     website: "https://www.example.com",
//     gender: "Male",
//     race: "Asian",
//     veteran: "No",
//     disability: "No"
// };

// const manager = new GreenHouseAutoFillManager();
// manager.autoFill(profile, 0);
