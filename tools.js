
//兼容性纯文本操作
//获取文本
function getText (element) {
  if(typeof element.innerText !== 'undefined') {
    return element.innerText;
  }else {
    return element.textContent;
  }
}
//设置文本
function setText (element, value) {
  if(typeof element.innerText !== 'undefined') {
    element.innerText = value;
  }else {
    element.textContent = value
  }
}
//对上面两个的综合
function Text (element, value) {
  if(arguments.length = 1){
    if(typeof element.innerText !== 'undefined') {
      return element.innerText;
    }else {
      return element.textContent;
    }
  }else if (arguments.length = 2) {
    if(typeof element.innerText !== 'undefined') {
      element.innerText = value;
    }else {
      element.textContent = value
    }
  }
}

//样式获取的兼容性问题
//当对象的属性名是字符串形式时，一定要使用[]的属性访问方式
function getStyle (element, styleName) {
  if(element.currentStyle) {
    return element.currentStyle[styleName];
  }else {
    return getComputedStyle(element)[styleName]
  }
}

//根据类名获取元素
function getTagName (tagName, element) {
  element = element || document.body

  if(typeof document.getElementsByClassName === 'function') {
    return element.getElementsByClassName(tagName);
  }else {
    var resultArr = [];
    var tags = document.getElementsByClassName('*');
    var tempArr, j
    for (var i = 0; i < tags.length; i++) {
      tempArr = tags[i].className.split(' ');
      for(j = 0; j < tempArr.length; j++) {
        if(tempArr[j] === tagName) {
          resultArr.push(tags[i]);
          break;
        }
      }
    }
    return resultArr;
  }
}

//兼容事件操作的函数
function addEvent (element, eventType, fn) {
  if(element.addEventListener === 'function') {
    element.addEventListener(eventType, fn)
  }else {
    element.attachEvent('on' + eventType, fn)
  }
}

//匀速运动函数
var timer = null;
function animate1 (element, target) {
  clearInterval(element.timer)
  element.timer = setInterval(function () {
    var current = element.offsetLeft;
    var step = 10;
    step = target > current ? step : -step;
    if(Math.abs(current - target) > Math.abs(step)) {
      current = current + step;
      element.style.left = current + 'px';
      clearInterval(element.timer)
    }
  },20)
}

//变速运动函数
function animate2 (element, target) {
  clearInterval(element.timer);
  element.timer = setInterval(function () {
    var current = element.offsetLeft;
    var step = (target - current) / 10;
    step = step > 0 ? Math.ceil(step) : Math.floor(step);
    current = current + step;
    element.style.left = current + 'px';
    if(current === target) {
      clearInterval(element.timer)
    }
  },20)
}

//让任意样式运动函数
function animate3 (element, styleName, target){
  clearInterval(element.timer);
  element.timer = setInterval(function() {
    var current = parseInt(getStyle(element, styleName)) || 0;
    var step = (target - current) / 10;
    step = step > 0 ? Math.ceil(step) : Math.floor(step);
    current = current + step;
    element.style[styleName] = current + 'px';
    if(current === target) {
      clearInterval(element.timer)
    }
  },20)
}

//同时让多个样式运动
function animate4 (element, obj) {
  clearInterval(element.timer)
  element.timer = setInterval (function () {
    var flag = true;
    for (var k in obj) {
      var styleName = k;
      var target = obj[k];
      var current = parseInt(getStyle(element, styleName)) || 0;
      var step = (target - current) / 10;
      step = step > 0 ? Math.ceil(step) : Math.floor(step)
      current = current + step;
      element.style[styleName] = current + 'px';
      if(current !== target) {
        flag = false;
      }
    }
    if(flag) {
      clearInterval(element.timer)
    }
  },20)
}

//添加透明度和层级
function animate5 (element, obj) {
  clearInterval(element.timer);
  element.timer = setInterval(function() {
    var flag = true;
    for(var k in obj) {
      if(k === 'opacity') {
        var styleName = k;
        var target = obj[k] * 100;
        var current = getStyle(element,styleName) *100;
        var step = (target - current) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        current = current + step;
        element.style[styleName] = current / 100;
        if(current !== target) {
          flag = false;
        }
      }else if(k === zIndex) {
        element.style.zIndex = obj[k];
      }else {
        var styleName = k;
        var target = obj[k];
        var current = parseInt(getStyle(element, styleName)) || 0;
        var step = (target - current) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        current = current + step;
        element.style[styleName] = current + 'px';
        if (current !== target) {
          flag = false;
        }
      }
    }
    if (flag) {
      clearInterval(element.timer);
    }

  },20)
}

//多段运动
function animate (element, obj, fn) {
  clearInterval(element.timer);
  element.timer = setInterval(function () {
    var flag = true;
    for (var k in obj) {
      if (k === 'opacity') {
        var styleName = k;
        var target = obj[k] * 100;
        var current = getStyle(element, styleName) * 100;
        var step = (target - current) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        current = current + step;
        element.style[styleName] = current / 100;
        if (current !== target) {
          flag = false;
        }

      } else if (k === 'zIndex') {
        element.style.zIndex = obj[k];

      } else {
        var styleName = k;
        var target = obj[k];
        var current = parseInt(getStyle(element, styleName)) || 0;
        var step = (target - current) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        current = current + step;
        element.style[styleName] = current + 'px';
        if (current !== target) {
          flag = false;
        }
      }
    }
      if (flag) {
      clearInterval(element.timer);
      if (typeof fn === 'function') {
        fn();
      }
    }
  }, 20);
}


//获取地址栏参数对象
function getParamObj () {
  var search = location.search;
  if(search.indexOf('?') === -1) {
    return null;
  }
  search = search.slice(1);
  var arr = search.split('&');
  var obj = {};

  for (var i = 0; i < arr.length; i++) {
    var key = arr[i].split('=')[0]
    var value = arr[i].split('=')[1]
    obj[key] = value;
  }
  return obj;
}

//把地址栏拼接
function setUrl (obj, str) {
  str = str + '?'
  var newArr = [];
  for (var key in obj) {
    newArr.push(key + '=' + obj[key])
  }
  return str + newArr.join('&');
}