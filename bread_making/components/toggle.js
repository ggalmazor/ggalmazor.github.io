const Toggle = element => {
  const text = element.innerHTML;
  const targetId = element.getAttribute('target-id');
  const dom = {
    target: document.querySelector(`#${targetId}`),
    link: document.createElement("a")
  };

  let status = dom.target.className.indexOf("hidden") === -1; // true: visible

  dom.link.setAttribute('href', '');
  dom.link.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();
    status = !status;
    render();
  });

  element.innerHTML = '';
  element.appendChild(dom.link);

  const render = () => {
    if (status) {
      dom.target.className = '';
      dom.link.innerHTML = `▴ ${text} ▴`;
    } else {
      dom.target.className = 'hidden';
      dom.link.innerHTML = `▾ ${text} ▾`;
    }
  };

  render();

  return {};
};