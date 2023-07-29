export const Roteamento = () => {
  const routeNodes = new Map();

  window.addEventListener('popstate', (event) => {
    console.log('popstate', event)
    navigate(event.state?.path, true);
  });

  const normalizeRoutes = (nodeMap, paths, cb) => {
    if (paths.length <= 0) {
      nodeMap.set('/', cb);

      return routeNodes;
    }

    const [ currentPath, ...otherPaths ] = paths;
    const newNodeMap = nodeMap.has(currentPath) ? nodeMap.get(currentPath) : new Map();

    nodeMap.set(currentPath, newNodeMap);

    return normalizeRoutes(newNodeMap, otherPaths, cb);
  }

  const addRota = (path, cb) => {
    normalizeRoutes(routeNodes, path.split('/'), cb);
    console.log('addRota', routeNodes)
  };

  const findRouteNode = (routeNodes, paths, params = {}) => {
    // Melhoria cacheamento: deixar em memória routeNode da rota corrente

    if (paths.length <= 0) {
      if (!routeNodes.has('/')) {
        // VErificar antes a rota **
        throw new Error('Route not found');
      }

      return {
        cb: routeNodes.get('/'),
        props: {
          params
        }
      };
    }

    const [ currentPath, ...otherPaths ] = paths;
    let currentNodeMap = routeNodes;

    // Iterar keys do routeNodes comparando
    let found = false;
    for (let routeNodeKey of routeNodes.keys()) {
      const isParam = routeNodeKey.startsWith(':');
      if (currentPath === routeNodeKey || isParam) {
        // encontrou
        currentNodeMap = routeNodes.get(routeNodeKey); // definir valor do parametro aqui
        if (isParam) {
          params[routeNodeKey.slice(1)] = currentPath;
        }
        found = true;
        break;
      } 
    }

    if (!found) {
      throw new Error('Path not found');
    }

    return findRouteNode(currentNodeMap, otherPaths, params);
  }

  const navigate = (path, skip = false) => {
    // Normalizar rotas para acessar mais rápido
    // Usado quando navega através do componente Link

    // Para rotas parametrizaveis, preciso normalizar os dados
    // onde a key vai ser por path

    // restaurante/seu-joao/menus/vinhos -> split / -> [restaurante, seu-joao, menus, vinhos]
    // fn recursiva recebe pathSplitted e objeto de rotas normalizadas
    // se contém, passa o array em diante sem o item atual + galho
    // qnd entra na fn, ela verifica se o array é vazio, se for, retorna o root
    // caso não seja, procura o path
    // compara o path com a primeira propriedade, se der match exato ou com parametro, continua a recursao passando o restante do array de paths + o galho atual, caso não, continua comparando
    // caso não encontre, retorna o ** caso definido
    // caso ** não esteja definido, retorna throw 
    // 
    // 
    /**
     * {
     *   "restaurante": {
     *     "/": cb: () => {},
     *     "especial": {
     *       "/": () => {},
     *     },
     *     ":restaurante_id": {
     *       "/": (params) => {},
     *       "menus": {
     *         (nao tem root)
     *        ":menu_id": {
     *           "/": () => {}
     *         }
     *       }
     *     }
     *   }
     * }
     */

    // restaurantes
    // restaurantes/especial
    // restaurantes/:id_restaurante/menus/:menu_id
    // restaurantes/:id_restaurante/menus

    // Normalizacao com new Map para ordenamento

    const routeFound = findRouteNode(routeNodes, path.split('/'));''

   

    if (!skip) {
      history.pushState({ path }, '', path);
    }

    console.log('routeNodes', routeNodes);

    routeFound.cb(routeFound.props);
  };

  return {
    addRota,
    navigate
  }
}