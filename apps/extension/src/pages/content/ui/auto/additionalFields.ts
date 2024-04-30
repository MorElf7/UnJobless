import { combinedPattern } from "@root/src/shared/typing/constant";
import { AdditionType } from "@root/src/shared/typing/types";
import { getTrimLabel } from "@root/utils/utils";

const findAdditionalFields = async (type: number): Promise<AdditionType> => {
    let addition: AdditionType = [];
    switch (type) {
        case 0:
            addition = await findGreenhouse();
            break;
        default:
            console.error("Not supported type");
    }
    return addition;
}
//TODO: Add the following code to the content script
const findGreenhouse = async (): Promise<AdditionType> => {
    const customs = document.querySelectorAll('#custom_fields .field');
    const additions: AdditionType = [];

    for (const field of customs) {
        const label = field.querySelector('label')?.textContent;
        const trimLabel = getTrimLabel(label || "");
        const input = field.querySelector('input[type="text"]') as HTMLInputElement | null;
        const textarea = field.querySelector('textarea') as HTMLTextAreaElement | null;
        
        if (!field.querySelector('select') && !combinedPattern.test(trimLabel)){
            if (input) {
                additions.push([trimLabel, input.value, input]);
            } else if (textarea) {
                additions.push([trimLabel, textarea.value, textarea]);
            }
        }
    }

    // If you need to send the data immediately after collection, uncomment and handle this part
    /*
    try {
        await chrome.runtime.sendMessage({ method: 'saveAddition', addition: additions });
    } catch (error) {
        console.error('Error saving addition:', error);
    }
    */

    return additions;
};

export default findAdditionalFields;