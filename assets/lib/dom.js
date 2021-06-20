function isChildren (childrens) {
  return Array.isArray(childrens) || typeof childrens === 'string'
}

const isString = value => typeof value === 'string';

const toArray = value => Array.isArray(value) ? value : [value];

function normalizeChildrens (childrens) {
  if (isString(childrens)) {
    return document.createTextNode(childrens)
  }

  if (Array.isArray(childrens)) {
    return childrens.map($children => (
      isString($children)
        ? document.createTextNode($children)
        : $children
    ))
  }

  return childrens;
}

function extractTagName (tagName) {
  return tagName.match(/^\w+/)[0];
}

function extractClassesAndId (tagName) {
  // div#card.card.cardapio
  const regexp = /[\#\.]{1}([\w\-\_]*)/gi;
  
  return Array.from(tagName.matchAll(regexp))
    .reduce(function(acc, current) {
      if (current[0].startsWith('.')) {
        acc.classes.push(current[1]);
      } else {
        acc.id.push(current[1]);
      }

      return acc;
    }, { classes: [], id: [] });
}

export default function el(tagName, attrsArr, childrensArr) {
  const $el = document.createElement(extractTagName(tagName));

  const { classes, id } = extractClassesAndId(tagName);

  if (id.length) {
    $el.id = id.pop();
  }

  if (classes.length) {
    $el.classList.add(...classes);
  }

  const childrens = ( isChildren(attrsArr) ) ? attrsArr : childrensArr;

  const attrs = !isChildren(attrsArr) ? attrsArr : {};

  Object.entries(attrs).forEach(function([ key, value ]) {
    $el.setAttribute(key, value);
  })

  const $childrens = normalizeChildrens(childrens);

  toArray($childrens)
    .forEach(($children) => {
      $el.appendChild($children);
    })

  return $el;
}