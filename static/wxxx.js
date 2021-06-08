function wxNodeToElem(node) {
  if (typeof node === 'string') {
    const elem = document.createTextNode(node);
    return elem;
  }
  let elem;
  if (node.tag === 'wx-image') {
    elem = new Image();
  } else if (node.tag === 'wx-view') {
    elem = document.createElement('div');
  } else if (node.tag === 'wx-page') {
    elem = document.createElement('div');
  } else if (node.tag.startsWith('wx-')) {
    elem = document.createElement(node.tag.slice(3))
  } else {
    document.createElement(node.tag);
  }
  if (node.children) {
    for (const iterator of node.children) {
      elem.appendChild(wxNodeToElem(iterator));
    }
  }
  if (node.attr) {
    for (const [key, value] of Object.entries(node.attr)) {
      elem.setAttribute(key, value);
      if (key === 'bindtap') {
        elem.addEventListener('click', (e) => {
          console.log(e);
          console.log(value)
        })
      }
    }
  }
  return elem;
}