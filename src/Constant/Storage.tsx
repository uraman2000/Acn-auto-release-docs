const RESULT = "RESULT";
const STORYRESULT = "STORYRESULT";

interface Istore {
  result: Array<any> | null;
  storyResult: Array<any> | null;
}

export const setStorage = (value: Istore) => {
  localStorage.setItem(RESULT, JSON.stringify(value.result));
  localStorage.setItem(STORYRESULT, JSON.stringify(value.storyResult));
};

export const clearStorage = () => {
  localStorage.setItem(RESULT, "");
  localStorage.setItem(STORYRESULT, "");
};

export function getStorage(): any {
  const res = localStorage.getItem(RESULT) + "";
  const storyres = localStorage.getItem(STORYRESULT) + "";
  const test = {
    result: res ? JSON.parse(res) : [],
    storyResult: storyres ? JSON.parse(storyres) : [],
  };

  return test;
}
