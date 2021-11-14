const Tab = element => {
  const text = element.innerHTML;
  const targetId = element.getAttribute('target-id');
  const dom = {
    li: document.createElement('li'),
    link: document.createElement('a'),
    target: document.querySelector(`#${targetId}`)
  };
  let status = false; // true: active
  let targetStatus = dom.target.className.indexOf("hidden") === -1; // true: visible

  dom.link.setAttribute('href', '');
  dom.link.innerHTML = text;
  dom.link.addEventListener('click', e => {
    e.preventDefault();
    status = true;
    targetStatus = true;
    render();
  });

  element.innerHTML = '';
  element.appendChild(dom.li);
  dom.li.appendChild(dom.link);

  const render = () => {
    dom.li.className = status ? 'active' : '';
    if (targetStatus) {
      dom.target.className = '';
    } else {
      dom.target.className = 'hidden';
    }
  };

  const activate = () => {
    status = true;
    targetStatus = true;
    render();
  };

  const deactivate = () => {
    status = false;
    targetStatus = false;
    render();
  };

  render();

  return {activate, deactivate, li: dom.li};
};