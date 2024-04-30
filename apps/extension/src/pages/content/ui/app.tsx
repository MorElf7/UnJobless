import { PopupProps } from '@root/src/shared/typing/types';
import Popup from './Popup';


export default function App({ type } : PopupProps) {
  return  (
    <div>
      <Popup type={type} />
    </div>);
}
