// DOM manipulation functions
import { FileResponse } from '@root/src/shared/typing/types';

export const existQuery = (selector: string) => {
  return document.querySelector(selector) !== null;
};

export const tryInput = (selector: string, value: string) => {
  if (existQuery(selector)) {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView();
      element.setAttribute('value', value);
    }
  } else {
    console.log(`Selector ${selector} not found`);
  }
};

export const tryTextArea = (selector: string, value: string) => {
  if (existQuery(selector)) {
    (document.querySelector(selector) as HTMLElement).innerText = value;
  } else {
    console.log(`Selector ${selector} not found`);
  }
};

export const selectOptionByPartialText = (
  selectElement: HTMLSelectElement,
  text: string,
  filter: (value: string) => string,
) => {
  const options = selectElement.options;
  (selectElement.parentNode as HTMLElement).scrollIntoView();
  let matched = false;
  for (let option of options) {
    if (option && option.text.trim().toLowerCase().includes(filter(text).toLowerCase())) {
      selectElement.value = option.value;
      selectElement.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));
      matched = true;
      break;
    }
  }

  if (!matched) {
    console.log('No matching option found for text:', text);
  }
};

export const selectOptionByValue = (
  selectElement: HTMLSelectElement,
  text: string,
  filter: (value: string) => string,
) => {
  const options = selectElement.options;
  (selectElement.parentNode as HTMLElement).scrollIntoView();
  let matched = false;
  for (let option of options) {
    if (option && option.text.trim().toLowerCase() === filter(text).toLowerCase()) {
      selectElement.value = option.value;
      selectElement.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));
      matched = true;
      break;
    }
  }

  if (!matched) {
    console.log('No matching option found for value:', text);
  }
};

export const selectCheckBoxByPartialText = (div: HTMLDivElement, text: string, filter: (value: string) => string) => {
  const checkboxs = div.querySelectorAll('label');
  div.scrollIntoView();
  checkboxs.forEach((checkbox: HTMLLabelElement) => {
    const input = checkbox.querySelector('input');
    if (checkbox && input && checkbox.innerText.trim().toLowerCase().includes(filter(text).toLowerCase())) {
      const wasChecked = input.checked;
      input.checked = true; // Set the checkbox as checked
      if (!wasChecked) {
        // If the checkbox was not previously checked
        input.dispatchEvent(new Event('change', { bubbles: true, cancelable: true })); // Dispatch a change event
      }
    }
  });
};

export const selectCheckBoxByValue = (div: HTMLDivElement, text: string, filter: (value: string) => string) => {
  const checkboxs = div.querySelectorAll('label');
  div.scrollIntoView();
  checkboxs.forEach((checkbox: HTMLLabelElement) => {
    const input = checkbox.querySelector('input');
    if (checkbox && input && checkbox.innerText.trim().toLowerCase() === filter(text).toLowerCase()) {
      const wasChecked = input.checked;
      input.checked = true; // Set the checkbox as checked
      if (!wasChecked) {
        // If the checkbox was not previously checked
        input.dispatchEvent(new Event('change', { bubbles: true, cancelable: true })); // Dispatch a change event
      }
    }
  });
};

// Filter functions
export const genderFilter = (value: string) => {
  let check_value = '';
  switch (value) {
    case 'Male':
      check_value = 'Man';
      break;
    case 'Female':
      check_value = 'Woman';
      break;
  }
  return check_value;
};

export const ethnicFilter = (value: string) => {
  let check_value = '';
  switch (value) {
    case 'East Asian':
    case 'South Asian':
    case 'Southeast Asian':
      check_value = 'Asian';
      break;
    case 'Black or of African descent':
    case 'Middle Eastern or North African':
      check_value = 'African';
      break;
  }
  return check_value;
};

export const emptyFilter = (value: string) => {
  return value;
};

export const hispanicFilter = (value: string) => {
  let check_value = '';
  switch (value) {
    case 'Hispanic':
      check_value = 'Yes';
      break;
    default:
      check_value = 'No';
      break;
  }
  return check_value;
};

export const attachFileToInput = async (
  fileURL: string,
  fileInput: HTMLInputElement,
  fileName: string,
): Promise<boolean> => {
  return new Promise(resolve => {
    if (!fileInput) {
      resolve(false);
      return;
    }

    chrome.runtime
      .sendMessage({
        method: 'getFile',
        fileURL: fileURL,
        name: fileName,
      })
      .then((response: FileResponse) => {
        if (response.status !== 200) {
          throw new Error(`Invalid file (status code was ${response.status}, not 200)`);
        }
        const byteArray = new Uint8Array(response.arrayBuffer);

        const file = new File([byteArray], response.filename, {
          type: response.type,
        });

        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);

        fileInput.files = dataTransfer.files;

        fileInput.dispatchEvent(new Event('change', { bubbles: true }));
        resolve(true);
      })
      .catch((error: Error) => {
        fileInput.dispatchEvent(new Event('change', { bubbles: true }));
        resolve(false);
      });
  });
};

export const clickOnPopup = async (e: HTMLElement | null, value: string): Promise<void> => {
  if (!e) return;
  e.click();
  const target: null | HTMLElement = (await waitForXPath(`//div[contains(text(), "${value}")]`)) as null | HTMLElement;
  if (target) {
    target.click();
  }
};

export const waitForXPath = (xpath: string): Promise<Node | null> => {
  return new Promise(function (resolve, reject) {
    const element: Node | null = document
      .evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
      .snapshotItem(0);

    if (element) {
      resolve(element);
      return;
    }

    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        const nodes: Node[] = Array.from(mutation.addedNodes);
        for (const node of nodes) {
          if (
            node ===
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
    // Set timeout to exit wait stae
    setTimeout(() => resolve(null), 4000);
  });
};

export const waitForAutomationId = (id: string): Promise<Node | null> => {
  return new Promise(function (resolve, reject) {
    const element: Node | null = document.querySelector(`[data-automation-id="${id}"]`);

    if (element) {
      resolve(element);
      return;
    }

    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        const nodes: Node[] = Array.from(mutation.addedNodes);
        for (const node of nodes) {
          if (node == document.querySelector(`[data-automation-id="${id}"]`)) {
            observer.disconnect();
            resolve(node);
            return;
          }
        }
      });
    });

    observer.observe(document.documentElement, { childList: true, subtree: true });
    // Set timout to exit wait state
    setTimeout(() => resolve(null), 4000);
  });
};

export const getTrimLabel = (label: string | ""): string => {
    const cutoff = "\n";
    if (!label) {
        return "";
    }
    const index = label.indexOf(cutoff);
    return index !== -1 ? label.substring(0, index) : label;
} 
