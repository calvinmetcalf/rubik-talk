var MarkdownIt = require('markdown-it');
var markdown = new MarkdownIt('commonmark');
var xhr = new window.XMLHttpRequest();
xhr.open('get', './body.md');
xhr.onload = function () {
  onLoad(xhr.responseText);
};
xhr.send();
var md = global.md;
var time = global.time;
var cur = -1;
var curTime = 1;
var s = document.getElementsByTagName('div');
var started = false;
var finished = false;
function go () {
  if (finished) {
    return;
  }
  cur++;
  var i = 1e3;
  var e = s[cur];
  for (var k = 0; k < s.length; k++) s[k].style.display = 'none';
  e.style.display = 'inline';
  e.style.fontSize = i + 'px';
  if (e.firstChild.nodeName === 'IMG') {
    document.body.style.backgroundImage = 'url(' + e.firstChild.src + ')';
    e.firstChild.style.display = 'none';
  } else {
    document.body.style.backgroundImage = '';
    if (cur % 2) {
      document.body.className = ' even';
    } else {
      document.body.className = ' odd';
    }
  }
  while (e.offsetWidth > window.innerWidth || e.offsetHeight > window.innerHeight) {
    e.style.fontSize = (i -= 10) + 'px';
    if (i < 0) break;
  }
  e.style.marginTop = ((window.innerHeight - e.offsetHeight) / 2) + 'px';
  if (window.location.hash !== cur) window.location.hash = cur;
  document.title = e.textContent || e.innerText;
}

function setTime (newTime) {
  time.innerHTML = newTime;
}
function onLoad (pres) {
  var html = markdown.render(pres);
  md.innerHTML = html.replace(/\<(\/)?(?:[ph]|pre|ul)\d?((?:\s*)?(?:id|class)\=[\'\"]\w+?[\'\"](?:\s*)?)?\>/g, '<$1div$2>');
  function start () {
    if (started) {
      return;
    }
    started = true;
    step();
  }
  function step () {
    if (curTime === 1) {
      go();
      if (cur > 20) {
        finished = true;
        setTime('');
        return;
      }
      curTime = 16;
    }
    curTime--;
    setTime(curTime);
    setTimeout(step, 1000);
  }
  document.onclick = start;

  document.onkeydown = start;
  go();
}
