import { tryInput, existQuery, tryTextArea, clickOnPopup, waitForAutomationId, waitForXPath } from '@root/utils/utils';
import { AutoFillManager, EventEmitter } from './autoManager';
import { Achievement, AdditionType, Education, Experience, Profile } from '@root/src/shared/typing/types';
import { authorizedPattern, sponsorshipPattern } from '@root/src/shared/typing/constant';

const delaySpeed: number = 100;

const fillCurrentDate = (input_date: XPathResult, index: number): void => {
  const month = input_date.snapshotItem(0 + index * 3) as HTMLInputElement,
    day = input_date.snapshotItem(1 + index * 3) as HTMLInputElement,
    year = input_date.snapshotItem(2 + index * 3) as HTMLInputElement;
  const date = new Date();
  month.value = (date.getMonth() + 1).toString();
  day.value = date.getDate().toString();
  year.value = date.getFullYear().toString();
};

const fillStartDate = (input_date: XPathResult, experience: Achievement, index: number): void => {
  const from_month = input_date.snapshotItem(index * 4 + 0) as HTMLInputElement,
    from_year = input_date.snapshotItem(index * 4 + 1) as HTMLInputElement;
  from_month.value = experience.start_date.split('-')[1];
  from_year.value = experience.start_date.split('-')[0];
};

const fillEndDate = (input_date: XPathResult, experience: Achievement, index: number): void => {
  const to_month = input_date.snapshotItem(index * 4 + 2) as HTMLInputElement,
    to_year = input_date.snapshotItem(index * 4 + 3) as HTMLInputElement;
  to_month.value = experience.end_date.split('-')[1];
  to_year.value = experience.end_date.split('-')[0];
};

const fillWorkExperienceTime = (input_date: XPathResult, experience: Experience, index: number): void => {
  if (input_date) {
    fillStartDate(input_date, experience, index);
  }
  if ((experience.current = true)) {
    (document.querySelector('[data-automation-id="currentlyWorkHere"]') as HTMLElement).click();
  } else {
    fillEndDate(input_date, experience, index);
  }
};

const fillEducationTime = (input_date: XPathResult, education: Education, index: number) => {
  if (input_date) {
    fillStartDate(input_date, education, index);

    fillEndDate(input_date, education, index);
  }
};

export class WorkdayAutoFillManager extends AutoFillManager {
  constructor(eventEmitter: EventEmitter) {
    super(eventEmitter);
  }

  private async handleIdentityFields(profile: Profile): Promise<void> {
    tryInput("input[data-automation-id='legalNameSection_firstName']", profile.first_name);
    tryInput("input[data-automation-id='legalNameSection_lastName']", profile.last_name);
    tryInput("input[data-automation-id='addressSection_city']", profile.city);
    tryInput("input[data-automation-id='phone-number']", profile.city);
    await clickOnPopup(
      document.querySelector("button[data-automation-id='addressSection_countryRegion']"),
      profile.state,
    );
  }

  private async handleUpload(profile: Profile): Promise<void> {}

  private async handleCustomFields(profile: Profile): Promise<void> {
    let delayIndex: number = 0;
    const customs = document.querySelectorAll("button[aria-haspopup='listbox']");
    customs.forEach(async custom => {
      await new Promise(resolve => setTimeout(resolve, delaySpeed * delayIndex++));
      const label = custom.getAttribute('aria-label');

      if (sponsorshipPattern.test(label || '')) {
        clickOnPopup(custom as HTMLElement, profile.sponsorship);
      } else if (authorizedPattern.test(label || '')) {
        clickOnPopup(custom as HTMLElement, profile.legally_authorized);
      }
    });
  }

  private async handleEEOCFields(profile: Profile): Promise<void> {
    await clickOnPopup(document.querySelector("button[data-automation-id='gender']"), profile.gender);
    await clickOnPopup(document.querySelector("button[data-automation-id='ethnicityDropdown']"), profile.race);
    await clickOnPopup(document.querySelector("button[data-automation-id='veteranStatus']"), profile.veteran);
    tryInput("input[data-automation-id='name']", `${profile.first_name} ${profile.last_name}`);
    const input_date: XPathResult = document.evaluate(
      "//*[@data-automation-id='selfIdentificationPage']//*[@data-automation-id='dateInputWrapper']/input",
      document,
      null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null,
    );
    const input_date_length = document.querySelectorAll("[data-automation-id='dateInputWrapper']").length;
    for (let i = 0; i < input_date_length; i++) {
      fillCurrentDate(input_date, i);
    }

    if (existQuery("[data-automation-id='disability']")) {
      const labels = document.evaluate(
        "//*[@data-automation-id='disability']/label",
        document,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null,
      );
      let label = labels.iterateNext() as HTMLElement | null;

      while (label) {
        const input = document.querySelector(`#${label.getAttribute('for')}`) as HTMLInputElement;
        if (label.innerText.includes(profile.disability)) {
          input.checked = true;
          input.setAttribute('aria-checked', 'true');
          break;
        }

        label = labels.iterateNext() as HTMLElement | null;
      }
    }
  }

  private async handleExperience(profile: Profile): Promise<void> {
    const experiences: Experience[] = profile.experience;
    if (experiences.length == 0) {
      return;
    }
    if (existQuery("[data-automation-id='workExperienceSection']")) {
      let experience = experiences[0];
      (document.querySelector("[aria-label='Add Work Experience']") as HTMLElement).click();
      let e = await waitForAutomationId('jobTitle');
      const input_date: XPathResult = document.evaluate(
        "//*[@data-automation-id='experienceSection']//*[@data-automation-id='dateInputWrapper']/input",
        document,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null,
      );
      if (e) {
        tryInput("input[data-automation-id='jobTitle']", experience.position); // Is this field called position
        tryInput("input[data-automation-id='company']", experience.company);
        tryInput("input[data-automation-id='location']", experience.location);
        tryTextArea("textarea[data-automation-id='description']", experience.description);
        fillWorkExperienceTime(input_date, experience, 0);
      }

      for (let i = 1; i < experiences.length; i++) {
        let experience = experiences[i];
        (document.querySelector("[aria-label='Add Another Work Experience']") as HTMLElement).click();
        e = await waitForAutomationId('jobTitle');
        if (e) {
          tryInput("input[data-automation-id='jobTitle']", experience.position);
          tryInput("input[data-automation-id='company']", experience.company);
          tryInput("input[data-automation-id='location']", experience.location);
          tryTextArea("textarea[data-automation-id='description']", experience.description);
          fillWorkExperienceTime(input_date, experience, i);
        }
      }
    }
  }
  private async handleEducation(profile: Profile): Promise<void> {
    const educations: Education[] = profile.education;
    if (educations.length == 0) {
      return;
    }
    if (existQuery("[data-automation-id='educationSection']")) {
      let education = educations[0];
      (
        document
          .evaluate(
            '//*[contains(text(), "Education")]//following::button',
            document,
            null,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
            null,
          )
          .snapshotItem(0) as HTMLElement
      ).click();
      let e = await waitForAutomationId('school');
      const input_date: XPathResult = document.evaluate(
        "//*[@data-automation-id='educationSection']//*[@data-automation-id='dateInputWrapper']/input",
        document,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null,
      );
      if (e) {
        tryInput("input[data-automation-id='school']", education.school);
        tryInput("input[data-automation-id='gpa']", education.gpa.toString());
        await clickOnPopup(document.querySelector("button[data-automation-id='degree']"), education.degree);
        fillEducationTime(input_date, education, 0);
      }

      for (let i = 1; i < educations.length; i++) {
        let education = educations[i];
        (document.querySelector("[aria-label='Add Another Work Experience']") as HTMLElement).click();
        e = await waitForAutomationId('jobTitle');
        if (e) {
          tryInput("input[data-automation-id='school']", education.school);
          tryInput("input[data-automation-id='gpa']", education.gpa.toString());
          await clickOnPopup(document.querySelector("button[data-automation-id='degree']"), education.degree);
          fillEducationTime(input_date, education, 0);
        }
      }
    }
  }

  private async handleLinks(profile: Profile): Promise<void> {
    tryInput("input[data-automation-id='linkedinQuestion']", profile.linkedin);
    tryInput("input[data-automation-id='github']", profile.github);
    if (existQuery("[data-automation-id='websiteSection']")) {
      (
        document
          .evaluate(
            '//*[contains(text(), "Websites")]//following::button',
            document,
            null,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
            null,
          )
          .snapshotItem(0) as HTMLElement
      ).click();
      let e = (await waitForXPath(
        "//*[contains(text(), 'Websites 1')]//following::input[data-automation-id='website']",
      )) as HTMLInputElement;
      if (e) {
        e.value = profile.website;
      }
    }
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
      await this.handleLinks(profile);
      // await this.handleUpload(profile);
    } else if (currentPage.includes('questionnaire')) {
      await this.handleCustomFields(profile);
    } else if (currentPage.includes('equal opportunity')) {
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
