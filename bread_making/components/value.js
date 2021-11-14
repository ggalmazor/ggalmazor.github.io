const Value = element => {
  const id = element.getAttribute("id");
  const units = element.getAttribute("units");
  const dom = {
    span: document.createElement("span"),
    input: document.createElement("input")
  };
  const changeCallbacks = [];

  let value = parseFloat(element.getAttribute("default-value") || 0);

  dom.input.setAttribute('type', 'number');
  dom.input.setAttribute('value', value);
  dom.input.className = 'hidden';
  dom.input.addEventListener('keypress', e => {
    if ((e.which || e.keyCode) === 13) {
      value = parseFloat(dom.input.value);
      changeCallbacks.forEach(callback => callback(value));
      dom.input.className = 'hidden';
      dom.span.className = '';
      render();
    }
  });
  dom.input.addEventListener('blur', () => {
    value = parseFloat(dom.input.value);
    changeCallbacks.forEach(callback => callback(value));
    dom.input.className = 'hidden';
    dom.span.className = '';
    render();
  });

  dom.span.addEventListener('dblclick', () => {
    dom.input.className = '';
    dom.span.className = 'hidden';
    dom.input.focus();
    dom.input.select();
  });

  element.appendChild(dom.span);
  element.appendChild(dom.input);

  const render = () => dom.span.innerHTML = `✎ ${value} ${units}`;

  const getValue = () => value;

  const onChange = callback => changeCallbacks.push(callback);
  render();

  return {id, getValue, onChange};
};