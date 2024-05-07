/**
 * Sends data to a specified Chrome extension.
 * @param data The string data to send to the extension.
 */

export const sendMessageToExtension = (data: string): void => {
    const extensionId = 'fenloblpljnlongiclhfcpjboniablen'; // Your Chrome Extension ID
    if (window.chrome && chrome.runtime && chrome.runtime.sendMessage) {
      chrome.runtime.sendMessage(extensionId, { token: data }, (response: any) => {
        console.log('Response from extension:', response);
      });
    } else {
      console.error('Chrome runtime is not available.');
    }
  }