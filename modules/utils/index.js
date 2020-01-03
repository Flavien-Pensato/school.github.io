import { useState, useEffect } from 'react';

export const uuidv4 = () =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;

    return v.toString(16);
  });

export const forMap = (dataSnapshot, childFunction) => {
  const toWait = [];

  dataSnapshot.forEach(childSnapshot => {
    toWait.push(childFunction(childSnapshot));
  });

  return toWait;
};

export const useFirebase = (reference, block = false) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const observer = reference.on('value', snapshot => {
      const classesTmp = [];

      if (snapshot.exists()) {
        snapshot.forEach(classe => {
          classesTmp.push({ key: classe.key, values: classe.val() });
        });
      }

      console.log('COUCOU');

      // setItems(classesTmp);
    });

    if (block) {
      reference.off('value', observer);
    } else if (!loading) {
      console.log('Hello');
      setLoading(true);
    }

    return () => {
      reference.off('value', observer);
    };
  }, [reference, block]);

  return { loading, items };
};
