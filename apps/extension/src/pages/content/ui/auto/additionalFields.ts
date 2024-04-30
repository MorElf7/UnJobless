import { combinedPattern } from "@root/src/shared/typing/constant";
import { AdditionType } from "@root/src/shared/typing/types";
import { getTrimLabel } from "@root/utils/utils";

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
    let idx = 0;
    customs.forEach(async (field, index) => {
        const label = field.querySelector('label')?.textContent;
        const trimLabel = getTrimLabel(label || "");
        const input = field.querySelector('input[type="text"]') as HTMLInputElement | null;
        const textarea = field.querySelector('textarea') as HTMLTextAreaElement | null;
        const select = field.querySelector('select') as HTMLSelectElement | null;

        if (!select && (input || textarea) && !combinedPattern.test(trimLabel || "")) {
            addition[`value${idx}`] = [trimLabel || "", ""];
            idx++;
        }
    });
    try {
        chrome.runtime.sendMessage({ method: 'saveAddition' , addition: addition });
    } catch (error) {
        console.error('Error saving addition:', error);
    }
}