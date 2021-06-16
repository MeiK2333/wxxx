const wxxxGlobal = {};
wxxxGlobal.path = window.location.pathname;

function webSocketInit(generateFunc) {
  wxxxGlobal.generateFunc = generateFunc;
  wxxxGlobal.socket = new WebSocket(`ws://localhost:8777/event?path=${wxxxGlobal.path}`);
  wxxxGlobal.socket.addEventListener('message', function (event) {
    const req = JSON.parse(event.data);
    if (req.event === 'reload') {
      const elem = wxNodeToElem(wxxxGlobal.generateFunc(req.vNode));
      // TODO: diff vNode 部分更新
      wxxxGlobal.app.replaceChild(elem, wxxxGlobal.app.firstElementChild);
    }
  });
}

function clickEvent(e, targetElem) {
  const resp = Object.assign({}, e);
  resp.currentTarget = {
    id: targetElem.id
  };
  return resp;
}

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
          const req = {
            event: 'func',
            func: value,
            param: clickEvent(e, elem)
          };
          wxxxGlobal.socket.send(JSON.stringify(req));
        })
      }
      if (node.tag === 'wx-navigator' && key === 'url') {
        elem.addEventListener('click', (e) => {
          window.parent.openPage(value);
          console.log(e);
          console.log(value);
        })
      }
    }
  }
  return elem;
}
