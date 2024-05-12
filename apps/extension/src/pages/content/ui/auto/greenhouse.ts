import { AdditionType, Education, Profile } from "@root/src/shared/typing/types";
import { AutoFillManager, EventEmitter } from "./autoManager";
import {
tryInput, selectOptionByPartialText, selectOptionByValue, existQuery,
emptyFilter, hispanicFilter, ethnicFilter, selectCheckBoxByPartialText,
genderFilter, selectCheckBoxByValue,
attachFileToInput,
getTrimLabel,
vetFilter,
delay,
setValue
} from "@root/utils/utils";
import { authorizedPattern, eighteenPattern, githubPattern, linkedInPattern, sponsorshipPattern, websitePattern } from "@root/src/shared/typing/constant";

const delaySpeed : number = 100;
const getInput = () => {
    return document.evaluate('//div[@id="select2-drop" and not(contains(@style, "display: none"))]//div[contains(@class, "select2-search") and not(contains(@class, "select2-search-hidden"))]//input'
    , document
    , null
    , XPathResult.FIRST_ORDERED_NODE_TYPE
    , null).singleNodeValue as HTMLInputElement | null;
}

const tryEducationInput = (input: HTMLInputElement | null, value: string) => {
    return new Promise<void>((resolve) => {
        setTimeout(async () => {
            if (input) {
                input.scrollIntoView();
                await setValue(input, value);
                await delay(500);
                input.dispatchEvent(new KeyboardEvent('keydown', {
                    bubbles: true,    // Ensure the event bubbles
                    cancelable: true, // Ensure the event is cancelable
                    key: 'Enter',     // Set the 'key' property to 'Enter'
                    keyCode: 13,      // Set the 'keyCode' property to 13 (Deprecated but still used in some places)
                    which: 13         // Set the 'which' property to 13 (Deprecated but still used in some places)
                  }));
            }
            
            resolve();
        }, 500);
    });
}

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
        const wrapper = document.getElementById('education_section') as HTMLDivElement | null;
        const educations: Education[] = education;
        let delayIndex = 0;
        if (educations.length == 0) {
            return;
        }

        if (wrapper) {
            educations.forEach(async (education, i) => {
                if (!existQuery(`label[for="education_school_name_${i}"]`)) {
                    console.log("click add education");
                   (document.querySelector("a[id='add_education']") as HTMLAnchorElement | null)?.click();
                }
            });

            const educationWrappers = document.querySelectorAll("div[class='education']") as NodeListOf<HTMLDivElement>;

            educations.forEach(async (education, i) => {
                const educationWrapper = educationWrappers[i];
                if (educationWrapper) {
                    const fields = educationWrapper.querySelectorAll('fieldset > .field') as NodeListOf<HTMLDivElement>;
                    fields.forEach(async (field) => {
                        const label = field.querySelector("label")?.textContent;
                        const trimLabel = label?.trim().replace(/[^a-zA-Z ]/g, '').replace(/\s+/g, ' ').toLowerCase();
                        if (/school/i.test(trimLabel || "")) {
                            const button = (field.querySelector(`div[id='s2id_education_school_name_${i}'] a[class="select2-choice select2-default"]`) as HTMLAnchorElement | null);
                            const mousedownEvent = new MouseEvent('mousedown', { bubbles: true, cancelable: true });
                            const mouseupEvent = new MouseEvent('mouseup', { bubbles: true, cancelable: true });
                            const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });

                            button?.dispatchEvent(mousedownEvent);
                            button?.dispatchEvent(mouseupEvent);
                            button?.dispatchEvent(clickEvent);
                            await tryEducationInput(getInput(), education.school);
                        } else if (/degree/i.test(trimLabel || "")) {
                            const button = (field.querySelector(`div[id='s2id_education_degree_${i}'] a[class="select2-choice select2-default"]`) as HTMLAnchorElement | null);
                            const mousedownEvent = new MouseEvent('mousedown', { bubbles: true, cancelable: true });
                            const mouseupEvent = new MouseEvent('mouseup', { bubbles: true, cancelable: true });
                            const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });

                            button?.dispatchEvent(mousedownEvent);
                            button?.dispatchEvent(mouseupEvent);
                            button?.dispatchEvent(clickEvent);
                            await tryEducationInput(getInput(), education.degree);
                        } else if (/discipline/i.test(trimLabel || "")) {
                            const button = (field.querySelector(`div[id='s2id_education_major_${i}'] a[class="select2-choice select2-default"]`) as HTMLAnchorElement | null);
                            const mousedownEvent = new MouseEvent('mousedown', { bubbles: true, cancelable: true });
                            const mouseupEvent = new MouseEvent('mouseup', { bubbles: true, cancelable: true });
                            const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });

                            button?.dispatchEvent(mousedownEvent);
                            button?.dispatchEvent(mouseupEvent);
                            button?.dispatchEvent(clickEvent);
                            await tryEducationInput(getInput(), education.major);
                        } else if (/start/i.test(trimLabel || "")) {
                            const dateParts = education.startDate.split('-');
                            const year = dateParts[0];
                            const month = dateParts[1];

                            const inputMonth = field.querySelector(`input[placeholder="MM"]`) as HTMLInputElement | null;
                            const inputYear = field.querySelector(`input[placeholder="YYYY"]`) as HTMLInputElement | null;

                            if (inputMonth) {
                                inputMonth.scrollIntoView();
                                inputMonth.value = month;
                            }

                            if (inputYear) {
                                inputYear.scrollIntoView();
                                inputYear.value = year;
                            }
                            
                        } else if (/end/i.test(trimLabel || "")) {
                            const dateParts = education.endDate.split('-');
                            const year = dateParts[0];
                            const month = dateParts[1];

                            const inputMonth = field.querySelector(`input[placeholder="MM"]`) as HTMLInputElement | null;
                            const inputYear = field.querySelector(`input[placeholder="YYYY"]`) as HTMLInputElement | null;

                            if (inputMonth) {
                                inputMonth.scrollIntoView();
                                inputMonth.value = month;
                            }

                            if (inputYear) {
                                inputYear.scrollIntoView();
                                inputYear.value = year;
                            }
                        }
                    });
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
