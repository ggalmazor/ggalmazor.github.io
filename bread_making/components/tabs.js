const Tabs = element => {
  const tabs = Array.from(element.querySelectorAll("tab"))
      .map(child => {
        element.removeChild(child);
        return Tab(child);
      });
  const dom = {
    ul: document.createElement('ul')
  };

  dom.ul.className = 'nav nav-tabs';
  element.innerHTML = '';
  element.appendChild(dom.ul);
  element.addEventListener('click', e => tabs.filter(tab => e.target.parentElement != tab.li)
      .forEach(tab => tab.deactivate()));

  tabs.forEach(tab => dom.ul.appendChild(tab.li));

  tabs[0].activate();

  return {};
};