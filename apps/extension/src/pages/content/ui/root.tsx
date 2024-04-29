import { createRoot } from 'react-dom/client';
import App from '@pages/content/ui/app';
import refreshOnUpdate from 'virtual:reload-on-update-in-view';
import injectedStyle from './injected.css?inline';
import CustomChakraProvider from '@pages/content/ui/CustomChakraProvider';
import EmotionCacheProvider from '@pages/content/ui/EmotionCacheProvider';
import { existQuery } from '@root/utils/utils';

refreshOnUpdate('pages/content');

const root = document.createElement('div');
root.id = 'chrome-extension-boilerplate-react-vite-content-view-root';

document.body.append(root);

const rootIntoShadow = document.createElement('div');
rootIntoShadow.id = 'shadow-root';

const shadowRoot = root.attachShadow({ mode: 'open' });
shadowRoot.appendChild(rootIntoShadow);

/** Inject styles into shadow dom */
const styleElement = document.createElement('style');
styleElement.innerHTML = injectedStyle;
shadowRoot.appendChild(styleElement);

/**
 * https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite/pull/174
 *
 * In the firefox environment, the adoptedStyleSheets bug may prevent contentStyle from being applied properly.
 * Please refer to the PR link above and go back to the contentStyle.css implementation, or raise a PR if you have a better way to improve it.
 */

/*Injecting Google Fonts*/
const link = document.createElement('link');
link.href = "https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap";
link.rel = 'stylesheet';
document.head.appendChild(link);
// linkNunito.href = 'https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap';
// linkNunito.rel = 'stylesheet';
// document.head.appendChild(linkNunito);

const renderApp = (type : number) => {
  createRoot(rootIntoShadow).render(
    <EmotionCacheProvider rootId={root.id}>
      <CustomChakraProvider shadowRootId={rootIntoShadow.id}>
        <App type={type}/>
      </CustomChakraProvider>
    </EmotionCacheProvider>,
  );
}

// window.addEventListener('load', function() {
const iFrame = document.querySelector("iframe[id='grnhse_iframe']") as HTMLIFrameElement | null;
if (iFrame) {
  iFrame.onload = () => {
    const path = iFrame?.src;
    if (path){
      alert("The application is not supported in the iframe. Redirecting to the application page.")
      window.open(path, '_blank');
    }
  }
}
if (existQuery("input[id='email']")) {
  renderApp(0);
}
// });
// createRoot(rootIntoShadow).render(<App />);

