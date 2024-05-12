import { tryInput, existQuery, tryTextArea, clickOnPopup, waitForAutomationId, waitForXPath, delay, tryReactInput, stateFilter, countryFilter, setValue, degreeFilter, attachFileToInput, getTrimLabel, emptyFilter, ethnicFilter, vetFilter } from '@root/utils/utils';
import { AutoFillManager, EventEmitter } from './autoManager';
import { Achievement, AdditionType, Education, Experience, Profile, WebsiteData } from '@root/src/shared/typing/types';
import { authorizedPattern, eighteenPattern, githubPattern, linkedInPattern, sponsorshipPattern, websitePattern } from '@root/src/shared/typing/constant';

const delaySpeed: number = 50;

const fillDate = (frame: Node, input_value: string, type: string): void => {
  const dateParts = input_value.split('-');
  const year = dateParts[0];
  const month = dateParts[1];
  const day = dateParts.length > 2 ? dateParts[2] : undefined;
  const input_day = document.evaluate(
    `.//div[@data-automation-id='formField-${type}']//input[@aria-label='Day']`,
    frame,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null,
  ).snapshotItem(0) as HTMLInputElement;
  if (input_day) {
    input_day.scrollIntoView();
    setValue(input_day, day);
  }
  const input_month = document.evaluate(
    `.//div[@data-automation-id='formField-${type}']//input[@aria-label='Month']`,  
    frame,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null,
  ).snapshotItem(0) as HTMLInputElement;
  if (input_month) {
    input_month.scrollIntoView();
    setValue(input_month, month);
  }
  const input_year = document.evaluate(
    `.//div[@data-automation-id='formField-${type}']//input[@aria-label='Year']`,
    frame,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null,
  ).snapshotItem(0 ) as HTMLInputElement;
  if (input_year) {
    input_year.scrollIntoView();
    setValue(input_year, year);
  }
};

const fillWorkExperienceTime = (frame:Node, experience: Experience): void => {
  fillDate(frame, experience.startDate, "startDate");
  if (experience.current === true) {
    const checkbox = document.evaluate('//input[@data-automation-id="currentlyWorkHere"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0) as HTMLInputElement;
    if (checkbox && !checkbox.checked) {
      checkbox.dispatchEvent(new FocusEvent('focus'));
      checkbox.dispatchEvent(new MouseEvent('mousedown'));
      checkbox.dispatchEvent(new MouseEvent('mouseup'));
      checkbox.click();
      checkbox.dispatchEvent(new FocusEvent('blur'));
    }
  } else {
    fillDate(frame, experience.endDate, "endDate");
  }
};

const fillEducationTime = (frame: Node, education: Education) => {
  if (frame) {
    fillDate(frame, education.startDate, "startDate");
    fillDate(frame, education.endDate, "endDate");
  }
};

const createOptionXPath = (option: string) => {
  const normalizedOption = option.toUpperCase().replace(/ /g, " ");
  return `//div[@data-automation-activepopup="true"]//ul[@role="listbox"]//li[@role="option" and starts-with(translate(normalize-space(translate(., " ", " ")), "${normalizedOption}", "${normalizedOption.toLowerCase()}"), "${normalizedOption.toLowerCase()}")]`;
}

const createButtonXPath = (buttons: string[]): string => {
  const parts = buttons.map(button => {
    const normalizedButton = button.toUpperCase().replace(/ /g, " ");
    return `contains(translate(@aria-label, "${normalizedButton.toUpperCase()}", "${normalizedButton.toLowerCase()}"), "${normalizedButton.toLowerCase()}")`;
  });

  return `//button[${parts.join(' or ')}]`;
};

const fillContent = async (text: string, delay: number) => {
  const targetstate = document.evaluate(createOptionXPath(text), document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0) as HTMLElement;
  if (!targetstate) {
    return;
  }

  targetstate.scrollIntoView();
  console.log(targetstate);
  targetstate.dispatchEvent(new FocusEvent('focus'));
  targetstate.dispatchEvent(new MouseEvent('mousedown'));
  targetstate.dispatchEvent(new MouseEvent('mouseup'));
  await new Promise(resolve => setTimeout(resolve, delay));
  targetstate.click();
  targetstate.dispatchEvent(new FocusEvent('blur'));
}

const clickButton = async (xpath: string): Promise<void> => {
  const button = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue as HTMLButtonElement;
  if (button) {
    button.click();
    await delay(500);
  }
};

const clickSelection = async (xpath: string, input: string, filter: (value: string) => string, delayIndex: number): Promise<void> => {
  await clickButton(xpath);
  await waitForXPath(createOptionXPath(filter(input))).then(async () => {
    await fillContent(filter(input), delaySpeed * delayIndex++);
  });
};

export class WorkdayAutoFillManager extends AutoFillManager {
  constructor(eventEmitter: EventEmitter) {
    super(eventEmitter);
  }

  private async handleIdentityFields(profile: Profile): Promise<void> {
    let delayIndex = 0;
    await clickSelection('//label[contains(text(), "Country")]//following::button[1]', profile.country, countryFilter, delayIndex);


    await new Promise(resolve => setTimeout(resolve, delaySpeed * delayIndex++));
    tryReactInput("input[data-automation-id='legalNameSection_firstName']", profile.first_name);
    await new Promise(resolve => setTimeout(resolve, delaySpeed * delayIndex++));
    tryReactInput("input[data-automation-id='legalNameSection_lastName']", profile.last_name);
    await new Promise(resolve => setTimeout(resolve, delaySpeed * delayIndex++));
    tryReactInput("input[data-automation-id='addressSection_city']", profile.city);
    await clickSelection('//label[contains(text(), "State")]//following::button[1]', profile.state, stateFilter, delayIndex++);
    await new Promise(resolve => setTimeout(resolve, delaySpeed * delayIndex++));
    tryReactInput("input[data-automation-id='addressSection_postalCode']", profile.zip_code);
    await new Promise(resolve => setTimeout(resolve, delaySpeed * delayIndex++));
    await clickSelection('//label[contains(text(), "Phone Device Type")]//following::button[1]', "Mobile", (value) => value, delayIndex);
    tryReactInput("input[data-automation-id='phone-number']", profile.phone);
  }

  private async handleUpload(profile: Profile): Promise<void> {
    if (profile.resumeUrl) {
      const resumeInput = document.evaluate("//input[@data-automation-id='file-upload-input-ref']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue as HTMLInputElement | null;
      if (resumeInput) {
        await attachFileToInput(profile.resumeUrl, resumeInput, profile.resumeFileName);
      }
    }

    if (profile.coverLetterUrl) {
      const coverLetterInput = document.evaluate("//input[@data-automation-id='file-upload-input-ref']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue as HTMLInputElement | null;
      if (coverLetterInput) {
        await attachFileToInput(profile.coverLetterUrl, coverLetterInput, profile.coverLetterFileName);
      }
    }
  }

  private async handleCustomFields(profile: Profile): Promise<void> {
    let delayIndex: number = 0;
    const primaryQuestion = document.evaluate("//div[@data-automation-id='primaryQuestionnairePage']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue as HTMLElement | null;
    if (primaryQuestion) {
      primaryQuestion.childNodes.forEach(async (node) => {
        await new Promise(resolve => setTimeout(resolve, 700 * delayIndex++));
        const label = document.evaluate(".//div[@data-automation-id='richText']//p//b", node, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue as unknown as HTMLBRElement | null;
        const input = document.evaluate(".//input[@type='text']", node, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null) as unknown as HTMLInputElement | null;
        const button = document.evaluate("//button[@aria-haspopup='listbox']", node, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null) as unknown as HTMLButtonElement | null;
        const question = getTrimLabel(label?.innerText.toLowerCase() || "");
        if (button){
          if (sponsorshipPattern.test(question || "")) {
            const sponsorshipPatterns = sponsorshipPattern.source.split('|');
            await clickSelection(createButtonXPath(sponsorshipPatterns), profile.sponsorship, emptyFilter, delayIndex);
          } else if (authorizedPattern.test(question || "")) {
            const authorizedPatterns = authorizedPattern.source.split('|');
            await clickSelection(createButtonXPath(authorizedPatterns), profile.legally_authorized, emptyFilter, delayIndex);

          } else if (eighteenPattern.test(question || "")) {
            const eighteenPatterns = eighteenPattern.source.split('|');
            await clickSelection(createButtonXPath(eighteenPatterns), "Yes", emptyFilter, delayIndex);

          }
        }else if (input) {
          if (linkedInPattern.test(question || "")) {
            tryReactInput(input, profile.linkedin);
          } else if (githubPattern.test(question || "")) {
            tryReactInput(input, profile.github);
          } else if (websitePattern.test(question || "")) {
            tryReactInput(input, profile.website);
          } else if (sponsorshipPattern.test(question || "")) {
            tryReactInput(input, profile.sponsorship);
          } else if (authorizedPattern.test(question || "")) {
            tryReactInput(input, profile.legally_authorized);
          } else if (eighteenPattern.test(question || "")) {
            tryReactInput(input, "Yes");
          }
        }
      });
    }
  }

  private async handleEEOCFields(profile: Profile): Promise<void> {
    let delayIndex = 0;
    if (existQuery("div[data-automation-id='voluntaryDisclosuresPage']")){
      await clickSelection("//button[@data-automation-id='gender']", profile.gender, emptyFilter, delayIndex++);
      await clickSelection("//button[@data-automation-id='ethnicityDropdown']", profile.race, ethnicFilter, delayIndex++);
      await clickSelection("//button[@data-automation-id='veteranStatus']", profile.veteran, vetFilter, delayIndex++);
    }

    if (existQuery("div[data-automation-id='selfIdentificationPage']")) {
      await new Promise(resolve => setTimeout(resolve, delaySpeed * delayIndex++));
      tryReactInput("input[data-automation-id='name']", profile.first_name + " " + profile.last_name);
      const e = document.querySelector("div[data-automation-id='selfIdentificationPage']")
      if (e) {
        const date = new Date();
        await new Promise(resolve => setTimeout(resolve, delaySpeed * delayIndex++));
        fillDate(e, `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`, "todaysDate");
      }
      await new Promise(resolve => setTimeout(resolve, delaySpeed * delayIndex++));
      const disabilityPath = '//*[@data-automation-id="disability"]';
      const value = profile.disability.toUpperCase().replace(/ /g, " ");
      const disabilityXpath = `${disabilityPath}//label[starts-with(translate(normalize-space(translate(., "Â ", " ")), "${value.toUpperCase()}", "${value.toLowerCase()}"), "${value.toLowerCase()}")]/parent::*//input[@type="checkbox"]`;
      const checkbox = document.evaluate(disabilityXpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue as HTMLInputElement | null;
      if (checkbox && !checkbox.checked) {
        checkbox.click();
      }

    }
    
  }

  private async handleExperience(profile: Profile): Promise<void> {
    let delayIndex = 0;
    const experiences: Experience[] = profile.experience;
    if (experiences.length == 0) {
      return;
    }
    if (existQuery("div[data-automation-id='workExperienceSection']")) {
      let experience = experiences[0];
      let i = 0;
      await clickButton("//button[@aria-label='Add Work Experience']");
      //Maybe add mutation observer here
      let e = await waitForAutomationId(`workExperience-${i + 1}`);
      if (e) {
        await new Promise(resolve => setTimeout(resolve, delaySpeed * delayIndex++));
        tryReactInput(`div[data-automation-id='workExperience-${i + 1}'] input[data-automation-id='jobTitle']`, experience.position);
        await new Promise(resolve => setTimeout(resolve, delaySpeed * delayIndex++));
        tryReactInput(`div[data-automation-id='workExperience-${i + 1}'] input[data-automation-id='company']`, experience.company);
        await new Promise(resolve => setTimeout(resolve, delaySpeed * delayIndex++));
        tryReactInput(`div[data-automation-id='workExperience-${i + 1}'] input[data-automation-id='location']`, experience.location);
        await new Promise(resolve => setTimeout(resolve, delaySpeed * delayIndex++));
        fillWorkExperienceTime(e, experience);
        await new Promise(resolve => setTimeout(resolve, delaySpeed * delayIndex++));
        tryReactInput(`div[data-automation-id='workExperience-${i + 1}'] textarea[data-automation-id='description']`, experience.description);
      }
      i++;
      for (; i < experiences.length; i++) {
        let experience = experiences[i];
        if (document.querySelector(`[data-automation-id="workExperience-${i + 1}"]`) == null) {
            await clickButton("//button[@aria-label='Add Another Work Experience']");
        }
        e = await waitForAutomationId(`workExperience-${i + 1}`);
        if (e) {
          await new Promise(resolve => setTimeout(resolve, delaySpeed * delayIndex++));
          tryReactInput(`div[data-automation-id='workExperience-${i + 1}'] input[data-automation-id='jobTitle']`, experience.position);
          await new Promise(resolve => setTimeout(resolve, delaySpeed * delayIndex++));
          tryReactInput(`div[data-automation-id='workExperience-${i + 1}'] input[data-automation-id='company']`, experience.company);
          await new Promise(resolve => setTimeout(resolve, delaySpeed * delayIndex++));
          tryReactInput(`div[data-automation-id='workExperience-${i + 1}'] input[data-automation-id='location']`, experience.location);
          await new Promise(resolve => setTimeout(resolve, delaySpeed * delayIndex++));
          fillWorkExperienceTime(e, experience);
          await new Promise(resolve => setTimeout(resolve, delaySpeed * delayIndex++));
          tryReactInput(`div[data-automation-id='workExperience-${i + 1}'] textarea[data-automation-id='description']`, experience.description);
        }
      }
    }
  }
  private async handleEducation(profile: Profile): Promise<void> {
    const educations: Education[] = profile.education;
    const initalEducation = educations[0];
    let i = 0;
    let delayIndex = 0;
    if (educations.length == 0) {
      return;
    }
    if (existQuery("[data-automation-id='educationSection']")) {
      await clickButton("//button[@aria-label='Add Education']");
      let e = await waitForAutomationId(`education-${i + 1}`);
      if (e) {
        tryReactInput(`div[data-automation-id='education-${i + 1}'] input[data-automation-id='school']`, initalEducation.school);
        tryReactInput(`div[data-automation-id='education-${i + 1}'] input[data-automation-id='gpa']`, initalEducation.gpa.toString());
        const degreeButtonXPath = `//div[@data-automation-id='education-${i + 1}']//label[contains(text(), 'Degree')]//following::button[1]`;
        await clickSelection(degreeButtonXPath, initalEducation.degree, degreeFilter, delayIndex);

        fillEducationTime(e, initalEducation);
      }
      i++;
      for (; i < educations.length; i++) {
        let education = educations[i];
        if (document.querySelector(`[data-automation-id="education-${i + 1}"]`) == null) {
            await clickButton("//button[@aria-label='Add Another Education']");
        }
        e = await waitForAutomationId(`education-${i + 1}`)
        if (e) {
          tryReactInput(`div[data-automation-id='education-${i + 1}'] input[data-automation-id='school']`, education.school);
          tryReactInput(`div[data-automation-id='education-${i + 1}'] input[data-automation-id='gpa']`, education.gpa.toString());
          const degreeButtonXPath = `//div[@data-automation-id='education-${i + 1}']//label[contains(text(), 'Degree')]//following::button[1]`;
          await clickSelection(degreeButtonXPath, education.degree, degreeFilter, delayIndex);
          fillEducationTime(e, education);
        }
      }
    }
  }

  private async handleLinks(profile: Profile): Promise<void> {
    const shouldSkipInput = (automationId?: string): boolean => {
      return automationId ? Boolean(document.querySelector(`input[data-automation-id="${automationId}"]`)) : false;
    };
  
    let websiteData: WebsiteData[] = [
      { url: profile.linkedin, type: 'linkedin', questionId: 'linkedinQuestion' },
      { url: profile.github, type: 'github', questionId: 'githubQuestion' },
      { url: profile.website, type: 'website' }
    ]

    if(websiteData[0] && websiteData[0].questionId) {
      tryReactInput(`input[data-automation-id='${websiteData[0].questionId}']`, websiteData[0].url);
    }

    if(websiteData[1] && websiteData[1].questionId) {
      tryReactInput(`input[data-automation-id='${websiteData[1].questionId}']`, websiteData[1].url);
    }

    websiteData= websiteData.filter((website) => website.url && !shouldSkipInput(website.questionId));
  
    const handleWebsiteAddition = async (website: WebsiteData, index: number): Promise<void> => {
      if (index > 0) {
        await clickButton("//button[@aria-label='Add Another Websites']");
      } else {
        await clickButton("//button[@aria-label='Add Websites']");
      }
      tryReactInput(`div[data-automation-id='websitePanelSet-${index + 1}'] input[data-automation-id="website"]`, website.url);
    };
    for (let i = 0; i < websiteData.length; i++) {
      await handleWebsiteAddition(websiteData[i], i);
    }

  };

  private async handleAdditionalFields(addition: AdditionType): Promise<void> {
    let delayIndex = 0;
    addition.forEach(async ([label, value, input]) => {
      await new Promise(resolve => setTimeout(resolve, delaySpeed * delayIndex++));
      if (input) {
        input.scrollIntoView();
        tryReactInput(input, value);
      }
    });
}
  

  async autoFill(profile: Profile, additionalFields: AdditionType): Promise<void> {
    this.eventEmitter.publish('loading', true);
    if (!existQuery('h2.css-1j9bnzb')) {
      return;
    }
    const currentPage = document.querySelector('h2.css-1j9bnzb')?.innerHTML.toLowerCase();
    if (!currentPage) {
      return;
    }
    if (currentPage.includes('my information')) {
      await this.handleIdentityFields(profile);
    } else if (currentPage.includes('my experience')) {
      await this.handleExperience(profile);
      await this.handleEducation(profile);
      await this.handleUpload(profile);
      await this.handleLinks(profile);
    } else if (currentPage.includes('application questions')) {
      await this.handleCustomFields(profile);
      await this.handleAdditionalFields(additionalFields);
    } else if (currentPage.includes('voluntary disclosures') || currentPage.includes('self identify') ){
      await this.handleEEOCFields(profile);
    }
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
    await this.handleEducation(profile);
    this.eventEmitter.publish('loading', false);
  }
}
