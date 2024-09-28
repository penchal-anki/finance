const setContextApiData = (
  setAppContextData: (arg0: (prevState: any) => any) => void,
  storeData: any
) => {
  setAppContextData((prevState: any) => {
    return {
      ...prevState,
      ...storeData
    };
  });
};

export {
  setContextApiData
}
