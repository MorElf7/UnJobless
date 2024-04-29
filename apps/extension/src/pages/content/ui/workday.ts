import { tryInput, existQuery, tryTextArea } from '@root/utils/utils';

const clickOnState = (state: string) => {
  (document.querySelector("button[data-automation-id='addressSection_countryRegion']") as HTMLElement).click();
  waitForXPath(`//div[contains(text(), "${state}")]`).then(() => {
    const targetstate = document
      .evaluate(`//div[contains(text(), "${state}")]`, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
      .snapshotItem(0) as HTMLElement;
    targetstate.click();
  });
};

const clickOnDegree = (degree: string) => {
  (document.querySelector("button[data-automation-id='degree']") as HTMLElement).click();
  waitForXPath(`//div[contains(text(), "${degree}")]`).then(() => {
    const targetstate = document
      .evaluate(`//div[contains(text(), "${degree}")]`, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
      .snapshotItem(0) as HTMLElement;
    targetstate.click();
  });
};

const waitForXPath = (xpath: string) => {
  return new Promise(function (resolve, reject) {
    const element = document
      .evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
      .snapshotItem(0);

    if (element) {
      resolve(element);
      return;
    }

    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        const nodes: any[] = Array.from(mutation.addedNodes);
        for (const node of nodes) {
          if (
            node.matches &&
            node ==
              document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0)
          ) {
            observer.disconnect();
            resolve(node);
            return;
          }
        }
      });
    });

    observer.observe(document.documentElement, { childList: true, subtree: true });
  });
};

const waitForAutomationId = (id: string) => {
  return new Promise(function (resolve, reject) {
    const element = document.querySelector(`[data-automation-id="${id}"]`);

    if (element) {
      resolve(element);
      return;
    }

    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        const nodes: any[] = Array.from(mutation.addedNodes);
        for (const node of nodes) {
          if (node.matches && node == document.querySelector(`[data-automation-id="${id}"]`)) {
            observer.disconnect();
            resolve(node);
            return;
          }
        }
      });
    });

    observer.observe(document.documentElement, { childList: true, subtree: true });
  });
};

const fillWorkExperienceTime = (experience, index) => {
  const input_date = document.evaluate(
    "//*[@data-automation-id='dateInputWrapper']/input",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null,
  );
  if (input_date) {
    const from_month = input_date.snapshotItem(index * 4 + 0) as HTMLInputElement,
      from_year = input_date.snapshotItem(index * 4 + 1) as HTMLInputElement;
    from_month.value = (experience.start_time.getMonth() + 1).toString();
    from_year.value = experience.start_time.getFullYear().toString();
  }
  if ((experience.current_job = true)) {
    (document.querySelector('[data-automation-id="currentlyWorkHere"]') as HTMLElement).click();
  } else {
    const to_month = input_date.snapshotItem(index * 4 + 2) as HTMLInputElement,
      to_year = input_date.snapshotItem(index * 4 + 3) as HTMLInputElement;
    to_month.value = (experience.end_time.getMonth() + 1).toString();
    to_year.value = experience.end_time.getFullYear().toString();
  }
};

const fillEducationTime = (education, index) => {
  const input_date = document.evaluate(
    "//*[@data-automation-id='educationSection']//*[@data-automation-id='dateInputWrapper']/input",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null,
  );
  if (input_date) {
    const from_month = input_date.snapshotItem(index * 4 + 0) as HTMLInputElement,
      from_year = input_date.snapshotItem(index * 4 + 1) as HTMLInputElement;
    from_month.value = (education.start_time.getMonth() + 1).toString();
    from_year.value = education.start_time.getFullYear().toString();

    const to_month = input_date.snapshotItem(index * 4 + 2) as HTMLInputElement,
      to_year = input_date.snapshotItem(index * 4 + 3) as HTMLInputElement;
    to_month.value = (education.end_time.getMonth() + 1).toString();
    to_year.value = education.end_time.getFullYear().toString();
  }
};

const fillInformation = profile => {
  tryInput("input[data-automation-id='legalNameSection_firstName']", profile.first_name);
  tryInput("input[data-automation-id='legalNameSection_lastName']", profile.last_name);
  tryInput("input[data-automation-id='addressSection_city']", profile.city);
  tryInput("input[data-automation-id='phone-number']", profile.city);
  clickOnState(profile.state);
};

const fillWorkExperience = experiences => {
  if (experiences.length == 0) {
    return;
  }
  if (existQuery("[data-automation-id='workExperienceSection']")) {
    let experience = experiences[0];
    (document.querySelector("[aria-label='Add Work Experience']") as HTMLElement).click();
    waitForAutomationId('jobTitle').then(() => {
      tryInput("input[data-automation-id='jobTitle']", experience.title);
      tryInput("input[data-automation-id='company']", experience.company);
      tryInput("input[data-automation-id='location']", experience.location);
      tryTextArea("textarea[data-automation-id='description']", experience.description);
      fillWorkExperienceTime(experience, 0);
    });

    for (let i = 1; i < experiences.length; i++) {
      let experience = experiences[i];
      (document.querySelector("[aria-label='Add Another Work Experience']") as HTMLElement).click();
      waitForAutomationId('jobTitle').then(() => {
        tryInput("input[data-automation-id='jobTitle']", experience.title);
        tryInput("input[data-automation-id='company']", experience.company);
        tryInput("input[data-automation-id='location']", experience.location);
        tryTextArea("textarea[data-automation-id='description']", experience.description);
        fillWorkExperienceTime(experience, i);
      });
    }
  }
};

const fillEducation = educations => {
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
    waitForAutomationId('school').then(() => {
      tryInput("input[data-automation-id='school']", education.school);
      tryInput("input[data-automation-id='gpa']", education.gpa);
      clickOnDegree(education.degree);
      fillEducationTime(education, 0);
    });

    for (let i = 1; i < educations.length; i++) {
      let education = educations[i];
      (document.querySelector("[aria-label='Add Another Work Experience']") as HTMLElement).click();
      waitForAutomationId('jobTitle').then(() => {
        tryInput("input[data-automation-id='school']", education.school);
        tryInput("input[data-automation-id='gpa']", education.gpa);
        clickOnDegree(education.degree);
        fillEducationTime(education, 0);
      });
    }
  }
};

const fillExperience = profile => {
  fillWorkExperience(profile.experiences);
  fillEducation(profile.educations);
};

export const workday = profile => {
  if (!existQuery('h2.css-1j9bnzb')) {
    return;
  }
  const currentPage = document.querySelector('h2.css-1j9bnzb').innerHTML.toLowerCase();
  if (currentPage.includes('my information')) {
    fillInformation(profile);
    return;
  }

  if (currentPage.includes('my experience')) {
    fillExperience(profile);
    return;
  }
};
