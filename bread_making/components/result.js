const Result = element => {
  const id = element.getAttribute("id");
  const units = element.getAttribute("units");
  const dom = {
    span: document.createElement("span")
  };
  const changeCallbacks = [];
  let value = '?';

  element.appendChild(dom.span);

  const render = () => dom.span.innerHTML = `${value} ${units}`;

  const getValue = () => value;

  const setValue = newValue => {
    value = newValue;
    changeCallbacks.forEach(callback => callback(value));
    render();
  };

  const onChange = callback => changeCallbacks.push(callback);

  render();

  return {id, getValue, setValue, onChange};
};