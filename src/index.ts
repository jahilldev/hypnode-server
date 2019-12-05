import { IVNode, Tag } from 'hypnode';

/* -----------------------------------
 *
 * IAttrs
 *
 * -------------------------------- */

interface IAttrs {
   [index: string]: any;
}

/* -----------------------------------
 *
 * Render
 *
 * -------------------------------- */

function render(input: any): string {
   const node = input as IVNode;

   return renderElementNode(node);
}

/* -----------------------------------
 *
 * Node
 *
 * -------------------------------- */

function renderElementNode(node: IVNode | string): string {
   if (typeof node === 'string') {
      return node;
   }

   const { nodeName, attrs, children = [] } = node;

   return (
      openElementTag(nodeName, attrs) +
      children.map((child: any) => renderElementNode(child)).join('') +
      closeElementTag(nodeName)
   );
}

/* -----------------------------------
 *
 * Open
 *
 * -------------------------------- */

function openElementTag(name: Tag, attrs: IAttrs): string {
   return `<${name + applyNodeProperties(attrs)}>`;
}

/* -----------------------------------
 *
 * Attributes
 *
 * -------------------------------- */

function applyNodeProperties(attrs: IAttrs) {
   const keys = Object.keys(attrs || {});

   if (!keys.length) {
      return '';
   }

   const result = keys.map(key => addElementAttributes(key, attrs[key]));

   return ` ${result.join(' ')}`;
}

/* -----------------------------------
 *
 * Props
 *
 * -------------------------------- */

function addElementAttributes(key: string, value: string) {
   if (['disabled', 'autocomplete', 'selected', 'checked'].indexOf(key) > -1) {
      return `${key}="${key}"`;
   }

   if (!value) {
      return;
   }

   if (key === 'className') {
      key = 'class';
   }

   return `${key}="${value}"`;
}

/* -----------------------------------
 *
 * Close
 *
 * -------------------------------- */

function closeElementTag(name: Tag): string {
   return `</${name}>`;
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { render };
