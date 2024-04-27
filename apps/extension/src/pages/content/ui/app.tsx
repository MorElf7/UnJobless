import { useEffect } from 'react';
import { Popup } from './Popup';
import { existQuery } from '@root/utils/utils';

export default function App({ type }) {
  useEffect(() => {
    // window.onload = () => {
    //   if (existQuery("input[id='email']")) {
    //     console.log("The input field with ID 'email' exists.");
    //     type = 0;
    //   }
    // };
  }, []);

  return <Popup type={type} />;
}
