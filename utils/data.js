import AsyncStorage from '@react-native-community/async-storage';

const DATA_STORAGE_KEY = 'FlashCards:data';

export const resetDataAsync = () => {
  return AsyncStorage.setItem(DATA_STORAGE_KEY, JSON.stringify({}));
}

export const fetchDataAsync = () => {
  return AsyncStorage.getItem(DATA_STORAGE_KEY)
    .then((results) => JSON.parse(results));
}

const updateDeckAsync = (id, newData) => {
  return AsyncStorage.mergeItem(DATA_STORAGE_KEY, JSON.stringify({
    [id]: newData
  }));
}

export const addDeckAsync = (id, title, timestamp) => {
  const newData = { id, title, timestamp, questions: [] };
  return updateDeckAsync(id, newData);
}

export const deleteDeckAsync = (id) => {
  return fetchDataAsync()
    .then((data) => {
      delete data[id];
      AsyncStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(data));
    });
}

export const addCardAsync = (id, question, answer) => {
  return fetchDataAsync()
    .then((data) => {
      const newData = data[id];
      newData.questions.push({ question, answer });
      return updateDeckAsync(id, newData);
    });
}