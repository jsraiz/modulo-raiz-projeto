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

export default function el(tag, attrsArr, childrensArr) {
  if (typeof tag === 'function') {
    return tag(attrsArr);
  }

  const tagName = extractTagName(tag);

  const { classes, id } = extractClassesAndId(tag);

  const attrs = !isChildren(attrsArr) ? attrsArr : {};

  if (id.length) {
    attrs.id = id.pop();
  }

  if (classes.length) {
    attrs.classNames = classes;
  }

  const childrens = toArray((isChildren(attrsArr) ) ? attrsArr : childrensArr);

  return {
    tagName,
    nodeType: 'element',
    attrs,
    childrens: childrens ? childrens : []
  };
}

export function renderServer(node) {
  if (isString(node)) {
    return node;
  }

  if (node.nodeType === 'fragment') {
    return node.childrens.map(renderServer).join('');
  };

  const { tagName, attrs, childrens } = node;

  const attrsHTML = Object.entries(attrs).map(function([ attrKey, attrValue ]) {
    const values = Array.isArray(attrValue) ? attrValue.join(' ') : attrValue;
    return `${attrKey}="${values}"`
  })
  .join(' ')
  .replaceAll('classNames', 'class');

  const startTag = `<${tagName}${attrsHTML && ' '}${attrsHTML}>`;
  const endTag = `</${tagName}>`;

  const childrensHTML = childrens.map(function(children) {
    return renderServer(children);
  }).join('');

  const html = `${startTag}${childrensHTML}${endTag}`;

  return html;
}

export function render(node) {
  // '<div class="card"><h1>Olá mundo</h1></div>'
  // <img />
  if (isString(node)) {
    return document.createTextNode(node);
  }

  const { tagName, attrs, childrens } = node;

  const $element = (node.nodeType === 'fragment')
    ? document.createDocumentFragment()
    : document.createElement(tagName);

  Object.entries(attrs).forEach(function([attrKey, attrValue]) {
    const values = Array.isArray(attrValue) ? attrValue.join(' ') : attrValue;
    $element.setAttribute(attrKey.replaceAll('classNames', 'class'), values)
  })

  childrens.forEach(function(children) {
    $element.appendChild(
      render(children)
    )
  });

  return $element;
}

export function Fragment (childrens) {
  return {
    tagName: null,
    nodeType: 'fragment',
    attrs: {},
    childrens: childrens ? childrens : []
  }
}

/**
 * RESULTADO
 * 
 * 
 * <div id="card" class="card card-teste" style="color: red"><h3>Oi JS Raiz! <span>!!!!</span></h3></div>
 * 
 * el('div#card.card.card-teste', { style: 'color: red' }, [
 *  el('h3', [
 *    'OI JS Raiz!',
 *    el('span', '!!!!')
 *  ])
 * ])
 * 
 * {
 *  tagName: 'div',
 *  nodeType: 'element',
 *  id: 'card',
 *  classNames: ['card', 'card-teste'],
 *  attrs: { style: 'color: red', alt="asdasdas" },
 *  childrens: [
 *    {
 *      tagName: 'h3',
 *      nodeType: 'element',
 *      childrens: [
 *         'Oi JS Raiz!',
 *         {
 *           tagName: 'span',
 *           nodeType: 'element',
 *           childrens: ['!!!!']
 *         }
 *      ]
 *    }
 *  ]
 * }
 */