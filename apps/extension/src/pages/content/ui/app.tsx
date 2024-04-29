import { useEffect, useState } from 'react';
import { Popup } from './Popup';
import { PopupProps } from '@root/src/shared/typing/types';

export default function App({ type } : PopupProps) {
  const [addtional, setAdditional] = useState<any>({});
  useEffect(() => {
    const getAdditionalFields = async() => {
      
    }
  }, []);


  return  (
    <div>
      <Popup type={type} />
    </div>);
}
