import { combinedPattern } from "@root/src/shared/typing/constant";
import { AdditionType } from "@root/src/shared/typing/types";

export const findAdditionalFields = async (type: number) => {
    switch (type) {
        case 0:
            await findGreenhouse();
            break;
        default:
            console.error("Not supported type")
    }
}
//TODO: Add the following code to the content script
const findGreenhouse = async () => {
    const customs = document.querySelectorAll('#custom_fields .field');
    const addition : AdditionType = {};
    customs.forEach(async (field, index) => {
        const label = field.querySelector('label')?.textContent;
        const input = field.querySelector('input:not([type="hidden"])') as HTMLInputElement | null;
        const textarea = field.querySelector('textarea') as HTMLTextAreaElement | null;

        if ((input || textarea) && !combinedPattern.test(label || "")) {
            addition[`value${index}`] = [label || "", ""];
        }
    });
    try {
        chrome.runtime.sendMessage({ method: 'saveAddition' , addition: addition });
    } catch (error) {
        console.error('Error saving addition:', error);
    }
}