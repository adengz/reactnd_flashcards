import AsyncStorage from '@react-native-community/async-storage';

const DATA_STORAGE_KEY = 'FlashCards:data';

export const resetDataAsync = () => {
  return AsyncStorage.setItem(DATA_STORAGE_KEY, JSON.stringify({}));
}

export const fetchDataAsync = () => {
  return AsyncStorage.getItem(DATA_STORAGE_KEY)
    .then((results) => JSON.parse);
}

const updateDeckAsync = (uid, newData) => {
  return AsyncStorage.mergeItem(DATA_STORAGE_KEY, JSON.stringify({
    [uid]: newData
  }));
}

export const addDeckAsync = (uid, title) => {
  const newData = { id: uid, title, questions: [] };
  return updateDeckAsync(uid, newData);
}

export const deleteDeckAsync = (uid) => {
  return fetchDataAsync()
    .then((data) => {
      delete data[uid];
      AsyncStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(data));
    });
}

export const addCardAsync = (uid, question, answer) => {
  return fetchDataAsync()
    .then((data) => {
      const newData = data[uid];
      newData.questions.push({ question, answer });
      return updateDeckAsync(uid, newData);
    });
}