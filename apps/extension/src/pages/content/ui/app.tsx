import { useEffect, useState } from 'react';
import { Popup } from './Popup';
import { PopupProps } from '@root/src/shared/typing/types';
import { findAdditionalFields } from './auto/additionalFields';

export default function App({ type } : PopupProps) {
  useEffect(() => {
    const init = async () => {
      await findAdditionalFields(type);
    };
    init();
  }, []);


  return  (
    <div>
      <Popup type={type} />
    </div>);
}
