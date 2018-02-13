function element(name, el, attributes) {
    var parent = document.createElement(name);
    if (attributes) {
        attributes.forEach(attr => {
            parent.attributes.setNamedItem(attr);
        });
    }
    if (el) {
        if (Array.isArray(el)) {
            el.forEach(e => parent.appendChild(e));
        } else {
            parent.appendChild(el);
        }
    }
    return parent;
}
function attribute(name, value) {
    var attr = document.createAttribute(name);
    attr.value = value;
    return attr;
}
function text(text) {
    return document.createTextNode(text);
}


function onInit(){
    createHomePage();
}