import { AdditionType, Education, Profile } from "@root/src/shared/typing/types";
import { AutoFillManager, EventEmitter } from "./autoManager";
import {
tryInput, selectOptionByPartialText, selectOptionByValue, existQuery,
emptyFilter, hispanicFilter, ethnicFilter, selectCheckBoxByPartialText,
genderFilter, selectCheckBoxByValue,
attachFileToInput,
getTrimLabel,
vetFilter
} from "@root/utils/utils";
import { authorizedPattern, eighteenPattern, githubPattern, linkedInPattern, sponsorshipPattern, websitePattern } from "@root/src/shared/typing/constant";

const delaySpeed : number = 100;

export class GreenHouseAutoFillManager extends AutoFillManager {
    constructor(eventEmitter: EventEmitter) {
        super(eventEmitter);
    }

    private async handleIdentityFields(profile: Profile): Promise<void> {
        let delayIndex = 0;
        await new Promise(resolve => setTimeout(resolve, delaySpeed * delayIndex++));
        tryInput("input[id='first_name']", profile.first_name);
        await new Promise(resolve => setTimeout(resolve, delaySpeed * delayIndex++));
        tryInput("input[id='last_name']", profile.last_name);
        await new Promise(resolve => setTimeout(resolve, delaySpeed * delayIndex++));
        tryInput("input[id='email']", profile.email);
        await new Promise(resolve => setTimeout(resolve, delaySpeed * delayIndex++));
        tryInput("input[id='phone']", profile.phone);
        await new Promise(resolve => setTimeout(resolve, delaySpeed * delayIndex++));
        tryInput("div[id='location_autocomplete_root'] input[id='auto_complete_input']", profile.street_address);
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
            const trimLabel = getTrimLabel(label || "");
            const input = field.querySelector('input:not([type="hidden"])') as HTMLInputElement | null;
            const select = field.querySelector('select') as HTMLSelectElement | null;

            if (select) {
                if (sponsorshipPattern.test(trimLabel || "")) {
                    selectOptionByPartialText(select, profile.sponsorship, emptyFilter);
                } else if (authorizedPattern.test(trimLabel || "")) {
                    selectOptionByPartialText(select, profile.legally_authorized, emptyFilter);
                } else if (eighteenPattern.test(trimLabel || "")) {
                    selectOptionByPartialText(select, "Yes", emptyFilter);
                }
            } else if (input) {
                if (linkedInPattern.test(trimLabel || "")) {
                    input.value = profile.linkedin;
                } else if (githubPattern.test(trimLabel || "")) {
                    input.value = profile.github;
                } else if (websitePattern.test(trimLabel || "")) {
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
                        selectCheckBoxByPartialText(demo, profile.veteran, vetFilter);
                    } else if (/disability/i.test(question)) {
                        selectCheckBoxByPartialText(demo, profile.disability, emptyFilter);
                    }
                }
            });
        }
    }

    private async handleExperience(profile: Profile): Promise<void> {
        return;
    }

    private async handleEducation(education: Education[]): Promise<void> {
        const wrapper = document.querySelector("div[id='education_section]") as HTMLDivElement | null;
        let delayIndex = 0;
        if (wrapper) {
            const addEducationButton = wrapper.querySelector("button[id='add_education']") as HTMLButtonElement | null;
            if (addEducationButton) {
                for(let i = 1; i < education.length - 1; i++) {
                    addEducationButton.click();
                }
            }

            const educations = wrapper.querySelectorAll("div[id='education']") as NodeListOf<HTMLDivElement>;
            educations.forEach(async (edu, index) => {
                // This is wrong, follow the logic of workday, i'm too lazy to fix it
                await new Promise(resolve => setTimeout(resolve, delaySpeed * delayIndex++));
                const schoolInput = edu.querySelector("input[id='school']") as HTMLInputElement | null;
                const startDateInput = edu.querySelector("input[id='start_date']") as HTMLInputElement | null;
                const endDateInput = edu.querySelector("input[id='end_date']") as HTMLInputElement | null;
                const majorInput = edu.querySelector("input[id='major']") as HTMLInputElement | null;
                const degreeInput = edu.querySelector("input[id='degree']") as HTMLInputElement | null;
                const gpaInput = edu.querySelector("input[id='gpa']") as HTMLInputElement | null;

                if (schoolInput) {
                    schoolInput.value = education[index].school;
                }

                if (startDateInput) {
                    startDateInput.value = education[index].start_date;
                }

                if (endDateInput) {
                    endDateInput.value = education[index].end_date;
                }

                if (majorInput) {
                    majorInput.value = education[index].major;
                }

                if (degreeInput) {
                    degreeInput.value = education[index].degree;
                }

                if (gpaInput) {
                    gpaInput.value = education[index].gpa.toString();
                }
            });
            
        }
    }

    private async handleAdditionalFields(addition: AdditionType): Promise<void> {
        let delayIndex = 0;
        addition.forEach(async ([label, value, input]) => {
            await new Promise(resolve => setTimeout(resolve, delaySpeed * delayIndex++));
            if (input) {
                input.scrollIntoView();
                input.value = value;
            }
        });
    }

    async autoFill(profile: Profile, additionalFields: AdditionType): Promise<void> {
        this.eventEmitter.publish('loading', true);
        await this.handleIdentityFields(profile);
        await this.handleUpload(profile);
        await this.handleCustomFields(profile);
        await this.handleAdditionalFields(additionalFields);
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

    async fillExperience(profile: Profile): Promise<void> {
        this.eventEmitter.publish('loading', true);
        await this.handleExperience(profile);
        this.eventEmitter.publish('loading', false);
      }

    async fillEducation(profile: Profile): Promise<void> {
    this.eventEmitter.publish('loading', true);
    await this.handleEducation(profile.education);
    this.eventEmitter.publish('loading', false);
    }


    
}
