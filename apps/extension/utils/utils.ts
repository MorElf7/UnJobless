// DOM manipulation functions
export const existQuery = (selector: string) => {
    return document.querySelector(selector) !== null;
}

export const tryInput = (selector: string, value: string) => {
    if (existQuery(selector)) {
        const element = document.querySelector(selector);
        element.scrollIntoView();
        element.setAttribute('value', value);
    } else {
        console.log(`Selector ${selector} not found`);
    }
}

export const selectOptionByPartialText = (selectElement: HTMLSelectElement, text: string, filter: (value: string) => string) => {
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
        console.log("No matching option found for text:", text);
    }
}

export const selectOptionByValue = (selectElement: HTMLSelectElement, text: string, filter: (value: string) => string) => {
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
        console.log("No matching option found for value:", text);
    }
}

export const selectCheckBoxByPartialText = (div: HTMLDivElement, text: string, filter: (value: string) => string) => {
    const checkboxs = div.querySelectorAll("label");
    div.scrollIntoView();
    checkboxs.forEach((checkbox: HTMLLabelElement) => {
        if (checkbox && checkbox.innerText.trim().toLowerCase().includes(filter(text).toLowerCase())) {
            checkbox.querySelector("input").click();
        }
    });
}

export const selectCheckBoxByValue = (div: HTMLDivElement, text: string, filter: (value: string) => string) => {
    const checkboxs = div.querySelectorAll("label");
    div.scrollIntoView();
    checkboxs.forEach((checkbox: HTMLLabelElement) => {
        if (checkbox && checkbox.innerText.trim().toLowerCase() === filter(text).toLowerCase()) {
            checkbox.querySelector("input").click();
        }
    });
}

// Filter functions
export const genderFilter = (value: string) => {
    let check_value = "";
    switch (value) {
        case "Male":
            check_value = "Man";
            break;
        case "Female":
            check_value = "Woman";
            break;
    }
    return check_value;
}

export const ethnicFilter = (value: string) => {
    let check_value = "";
    switch (value) {
        case "East Asian":
        case "South Asian":
        case "Southeast Asian":
            check_value = "Asian";
            break;
        case "Black or of African descent":
        case "Middle Eastern or North African":
            check_value = "African";
            break;
    }
    return check_value;
}

export const emptyFilter = (value: string) => {
    return value;
}

export const hispanicFilter = (value: string) => {
    let check_value = "";
    switch (value) {
        case "Hispanic":
            check_value = "Yes";
            break;
        default:
            check_value = "No";
            break;
    }
    return check_value;
}