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

export const tryReactInput = (selector: string | HTMLInputElement | HTMLTextAreaElement, input: string) => {  
  let ele: HTMLInputElement | HTMLTextAreaElement | null = null;

  if (typeof selector === 'string') {
    ele = document.querySelector(selector);
  } else if (selector instanceof HTMLInputElement || selector instanceof HTMLTextAreaElement) {
    ele = selector;
  }

  if (ele) {
    ele.scrollIntoView();
    ele.value = input;
    ele.dispatchEvent(new Event('blur', { bubbles: true }));
  }
}


export const tryTextArea = (selector: string, value: string) => {
  const element = document.querySelector(selector) as HTMLTextAreaElement | null;
  if (element) {
    element.scrollIntoView();
    element.innerText = value;
    element.dispatchEvent(new Event('blur'));    
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

// function downloadFile(file: File): void {
//   const url = URL.createObjectURL(file);
//   const a = document.createElement('a');
//   a.href = url;
//   a.download = file.name;
//   document.body.appendChild(a);
//   a.click();
//   document.body.removeChild(a);
//   URL.revokeObjectURL(url);
// }

export const clickOnPopup = async (e: HTMLElement | null, value: string): Promise<void> => {
  if (!e) return;
  e.click();
  const target: null | HTMLElement = (await waitForXPath(`//div[contains(text(), "${value}")]`)) as null | HTMLElement;
  if (target) {
    target.click();
  }
};

export function waitForXPath(xpath: string) {
  return new Promise((resolve, reject) => {
    // Initial check to avoid unnecessary observer setup
    let element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (element) {
      resolve(element);
      return;
    }

    // Function to evaluate XPath and resolve if the element is found
    const evaluateAndResolve = () => {
      let element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      if (element) {
        observer.disconnect();
        resolve(element);
      }
    };

    // Set up a mutation observer to watch for changes
    const observer = new MutationObserver(mutations => {
      for (let mutation of mutations) {
        if (mutation.addedNodes.length) {
          evaluateAndResolve();  // Only re-evaluate XPath when nodes are added
          break;  // Exit the loop after finding the element
        }
      }
    });

    observer.observe(document.documentElement, { childList: true, subtree: true });
    // Set timout to exit wait state
    setTimeout(() => resolve(null), 3000);
  });
}
export const waitForAutomationId = async (id: string): Promise<Node | null> => {
  return new Promise((resolve, reject) => {
    const element = document.querySelector(`[data-automation-id="${id}"]`);
    if (element) {
      resolve(element);
      return;
    }

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          // Check if the added node itself is the target
          if (node.nodeType === Node.ELEMENT_NODE && (node as Element).matches(`[data-automation-id="${id}"]`)) {
            observer.disconnect();
            resolve(node);
            return;
          }
          // Additionally, check if any child of the added node is the target
          const target = (node as Element).querySelector(`[data-automation-id="${id}"]`);
          if (target) {
            observer.disconnect();
            resolve(target);
            return;
          }
        }
      }
    });

    observer.observe(document.documentElement, { childList: true, subtree: true, attributes: false });

    // Set a timeout to stop observing and resolve with null if not found
    setTimeout(() => {
      observer.disconnect();
      resolve(null);
    }, 3000);
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

export const delay = async (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};



export const setValue = async (targetElement: HTMLInputElement | HTMLTextAreaElement , newValue: string | undefined): Promise<boolean> => {
  try {
      if (!(targetElement instanceof HTMLInputElement || targetElement instanceof HTMLTextAreaElement)) {
          throw new Error("Input is not an HTMLInputElement or HTMLTextAreaElement!");
      }
      if (newValue === undefined) {
          throw new Error("Value is undefined!");
      }

      targetElement.focus();
      targetElement.click();

      // Dispatch a series of keyboard events to simulate user interaction
      targetElement.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true }));
      targetElement.dispatchEvent(new KeyboardEvent("keypress", { bubbles: true }));
      targetElement.value = newValue;
      targetElement.dispatchEvent(new InputEvent("input", { bubbles: true }));
      targetElement.dispatchEvent(new KeyboardEvent("keyup", { bubbles: true }));
      targetElement.dispatchEvent(new Event("change", { bubbles: true }));
      targetElement.dispatchEvent(new Event("blur", { bubbles: true }));
  } catch (error) {
      console.error(error);
      return false;
  }

  return true;
};

export const stateFilter = (value: string) => {
  const states = {
    'AL': 'Alabama', 'AK': 'Alaska', 'AZ': 'Arizona', 'AR': 'Arkansas',
    'CA': 'California', 'CO': 'Colorado', 'CT': 'Connecticut', 'DE': 'Delaware',
    'FL': 'Florida', 'GA': 'Georgia', 'HI': 'Hawaii', 'ID': 'Idaho',
    'IL': 'Illinois', 'IN': 'Indiana', 'IA': 'Iowa', 'KS': 'Kansas',
    'KY': 'Kentucky', 'LA': 'Louisiana', 'ME': 'Maine', 'MD': 'Maryland',
    'MA': 'Massachusetts', 'MI': 'Michigan', 'MN': 'Minnesota', 'MS': 'Mississippi',
    'MO': 'Missouri', 'MT': 'Montana', 'NE': 'Nebraska', 'NV': 'Nevada',
    'NH': 'New Hampshire', 'NJ': 'New Jersey', 'NM': 'New Mexico', 'NY': 'New York',
    'NC': 'North Carolina', 'ND': 'North Dakota', 'OH': 'Ohio', 'OK': 'Oklahoma',
    'OR': 'Oregon', 'PA': 'Pennsylvania', 'RI': 'Rhode Island', 'SC': 'South Carolina',
    'SD': 'South Dakota', 'TN': 'Tennessee', 'TX': 'Texas', 'UT': 'Utah',
    'VT': 'Vermont', 'VA': 'Virginia', 'WA': 'Washington', 'WV': 'West Virginia',
    'WI': 'Wisconsin', 'WY': 'Wyoming'
  };

  return states[value as keyof typeof states] || value;
}

export const countryFilter = (value: string): string => {
  const countries: { [key: string]: string } = {
    'United States': 'United States of America',
    'United Kingdom': 'United Kingdom of Great Britain and Northern Ireland',
    'South Korea': 'Korea (Republic of)',
    'North Korea': 'Korea (Democratic People\'s Republic of)',
    'Czech Republic': 'Czechia',
    'Congo': 'Congo (Democratic Republic of the)',
    'Congo (Brazzaville)': 'Congo',
    'Côte d\'Ivoire': 'Ivory Coast',
    'East Timor': 'Timor-Leste',
    'Macedonia': 'North Macedonia',
    'Micronesia': 'Micronesia (Federated States of)',
    'Palestine': 'State of Palestine',
    'Russia': 'Russian Federation',
    'Syria': 'Syrian Arab Republic',
    'Taiwan': 'Taiwan, Province of China',
    'Venezuela': 'Venezuela (Bolivarian Republic of)',
    'Vietnam': 'Viet Nam',
    'Bolivia': 'Bolivia (Plurinational State of)',
    'Laos': 'Lao People\'s Democratic Republic',
    'Iran': 'Iran (Islamic Republic of)',
    'Slovakia': 'Slovak Republic',
    'Moldova': 'Republic of Moldova',
    'Tanzania': 'Tanzania, United Republic of',
    'Bosnia': 'Bosnia and Herzegovina',
    'Swaziland': 'Eswatini'  // formerly known as Swaziland
  };

  return countries[value as keyof typeof countries] || value;
};

export const degreeFilter = (value: string): string => {
  const degreeMapping: { [key: string]: string } = {
    "Bachelor of Science": "Bachelor",
    "Bachelor of Arts": "Bachelor",
    "Associate of Arts": "Associate",
    "Associate of Science": "Associate",
    "Master of Science": "Master",
    "Master of Arts": "Master",
    "Doctor of Philosophy": "Doctorate",
    "Doctor of Education": "Doctorate"
  };

  return degreeMapping[value] || value;
}

export const vetFilter = (value: string): string => {
  value = value.toLowerCase();
  switch (value) {
    case 'yes':
      return 'I identify as one or more';
    case 'no':
      return 'I am not';
    case 'dont':
      return 'I do not';
    default:
      return value;
  }
};