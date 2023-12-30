function resize(el, factor) {
  var width = el.offsetWidth;
  el.style.fontSize = ((width / factor) | 0) + "px";
}

window.onload = function () {
  function doResize() {
    const textos = document.getElementsByClassName("inv-text");
    let larg = textos.length;
    for (var i = 0; i < larg; i++) {
      resize(textos[i], 16);
    }
  }
  window.onresize = doResize;
  doResize();
};
