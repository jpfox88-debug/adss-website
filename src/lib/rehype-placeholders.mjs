// Wraps [PLACEHOLDER] text in Markdown bodies in <mark class="ph">, matching the Ph component,
// so unconfirmed body copy is as visible as unconfirmed fields.
const PATTERN = /(\[[^\]]+\])/g;

function visit(node) {
  if (!node.children) return;
  node.children = node.children.flatMap((child) => {
    if (child.type === 'text' && PATTERN.test(child.value)) {
      PATTERN.lastIndex = 0;
      return child.value
        .split(PATTERN)
        .filter(Boolean)
        .map((part) =>
          /^\[[^\]]+\]$/.test(part)
            ? {
                type: 'element',
                tagName: 'mark',
                properties: { className: ['ph'], title: 'Placeholder — to be confirmed' },
                children: [{ type: 'text', value: part }],
              }
            : { type: 'text', value: part },
        );
    }
    if (child.type === 'element' && !['code', 'pre', 'a'].includes(child.tagName)) visit(child);
    return [child];
  });
}

export default function rehypePlaceholders() {
  return (tree) => visit(tree);
}
