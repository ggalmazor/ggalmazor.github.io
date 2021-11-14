const View = () => {
  const components = {
    tabs: Array.from(document.querySelectorAll("tabs"))
        .map(element => Tabs(element)),
    values: Array.from(document.querySelectorAll("value"))
        .map(element => Value(element)),
    results: Array.from(document.querySelectorAll("result"))
        .map(element => Result(element)),
    toggles: Array.from(document.querySelectorAll("toggle"))
        .map(element => Toggle(element))
  };

  const valueIndex = {};
  components.values.forEach(value => {
    valueIndex[value.id] = value;
  });

  const resultIndex = {};
  components.results.forEach(result => {
    resultIndex[result.id] = result;
  });

  return {
    getValues: () => components.values,
    getValue: id => {
      return valueIndex[id].getValue();
    },
    getResult: id => {
      return resultIndex[id].getValue();
    },
    setResult: (id, value) => {
      resultIndex[id].setValue(value);
    },
    onValueChange: (id, callback) => {
      valueIndex[id].onChange(callback);
    },
    onResultChange: (id, callback) => {
      resultIndex[id].onChange(callback);
    }
  };
};