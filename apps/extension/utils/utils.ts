const existQuery = (selector: string) => {
    return document.querySelector(selector) !== null;
}

const tryInput = (selector: string, value: string) => {
    if (existQuery(selector)) {
        document.querySelector(selector).setAttribute('value', value);
    }else{
        console.log(`Selector ${selector} not found`);
    }
}

const selectOptionByPartialText = (selectElement: HTMLSelectElement, text?: string) => {
    const options = selectElement.options;
    let matched = false;
    let correctOpt = null;
    for (let option of options) {
        if (option && option.text.toLowerCase().includes(text.toLowerCase())) {
            correctOpt = option;            
            matched = true;
        }
    }

    selectElement.value = correctOpt.value;
    selectElement.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));

    if (!matched) {
        console.log("No matching option found for text:", text);
    }
    // return matched;
}

export { existQuery, tryInput, selectOptionByPartialText };