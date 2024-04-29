const findAdditionalFields = (type: number) => {
    switch (type) {
        case 1:
            
        default:
            console.error("Not supported type")
    }
}
//TODO: Add the following code to the content script
const findGreenhouse = async () => {
    const customs = document.querySelectorAll('#custom_fields .field');
    customs.forEach(async (field) => {
        const label = field.querySelector('label')?.textContent;
        const input = field.querySelector('input:not([type="hidden"])') as HTMLInputElement | null;
        const select = field.querySelector('select') as HTMLSelectElement | null;

        // if (input) {
        //     if (/linkedin profile/i.test(label || "") || /linkedin/i.test(label || "")) {
        //     } else if (/github profile/i.test(label || "") || /github/i.test(label || "")) {
        //     } else if (/website/i.test(label || "")) {
        //     }
        // } 
    });
}