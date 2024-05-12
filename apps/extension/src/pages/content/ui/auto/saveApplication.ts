import { Profile } from "@root/src/shared/typing/types";

const saveApplication = async (type: number, profile: Profile) => {
    let button = null;
    console.log("page refresh")
    switch (type) {
      case 0:
        button = document.querySelector("input[id='submit_app']");
        break;
      case 1:
        const currentPage = document.querySelector('h2.css-1j9bnzb')?.innerHTML.toLowerCase();
        if (currentPage?.includes("review")) {
          button = document.evaluate(
            "//button[contains(translate(., 'SUBMIT', 'submit'), 'submit')]", 
            document, 
            null, 
            XPathResult.FIRST_ORDERED_NODE_TYPE, 
            null
          ).singleNodeValue as HTMLButtonElement | null;
        } 
        break;
      default:
        console.error("Not supported type");
    }
    if (button) {
      let company = "";
      switch (type) {
        case 0:
          company = document.querySelector('span[class="company-name"]')?.innerHTML || "";
          company = company.split(" at ")[1];
          break;
        case 1:
          const temp = document.evaluate(
            "//div[@data-automation-id='footerContainer']//a[@data-automation-id='privacyLink']", 
            document, 
            null, 
            XPathResult.FIRST_ORDERED_NODE_TYPE, 
            null
          ).singleNodeValue as HTMLAnchorElement | null;
          company = (temp?.innerHTML || "").split(" ")[1];
          break;
        default:
          console.error("Not supported type");
      }
      console.log("found button", button);
      console.log("company", company);
      button.addEventListener('click', () => {
        chrome.runtime.sendMessage({ method: 'submitForm' , profile: profile, company: company}, (response) => {
            if (response.error) {
                console.error('Error saving application:', response.error);
            }
        });
      }, );
    }
}

export default saveApplication;

