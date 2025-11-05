// Parse machine layout to infer port types per your token rules.
export const parseLayoutPorts = (layoutString, ports) => {
  const lines = layoutString.split('\n');
  const portMap = new Map(ports.map(p => [p.id, { ...p, inferredType: 'unknown' }]));

  lines.forEach((line) => {
    for (let col = 0; col < line.length; col += 3) {
      const token = line.substring(col, col + 3);
      if (token.length !== 3) continue;

      let portName = null;
      let shapeChar = null;

      for (let i = 0; i < 3; i++) {
        const char = token[i];
        if (char >= 'A' && char <= 'Z') {
          portName = char;
        } else if (['#', '~', "'", '@', '|'].includes(char)) {
          shapeChar = char;
        }
      }

      if (portName && shapeChar) {
        const port = portMap.get(portName);
        if (port) {
          let type = 'unknown';
          switch (shapeChar) {
            case '#': type = 'countable'; break;
            case '~': type = 'loose'; break;
            case "'": type = 'molten'; break;
            case '@': type = 'fluid'; break;
            case '|': type = 'shaft'; break;
          }
          portMap.set(portName, { ...port, inferredType: type });
        }
      }
    }
  });

  return Array.from(portMap.values());
};