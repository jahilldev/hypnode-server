import { INode } from 'hypnode';

/* -----------------------------------
 *
 * Variables
 *
 * -------------------------------- */

const testClass = 'testClass';
const testLink = '//hypno.de';
const testText = 'testText';
const testStyles = {
   textTransform: 'uppercase',
   fontWeight: 'bold',
   color: '#000',
};

/* -----------------------------------
 *
 * Subject
 *
 * -------------------------------- */

import { render } from '../../src/index';

/* -----------------------------------
 *
 * Render
 *
 * -------------------------------- */

describe('Core:Hypnode', () => {
   beforeEach(() => jest.clearAllMocks());

   it('returns a properly formatted element tree', () => {
      const sample = `<h1 class="${testClass}"><p>${testText}</p></h1>`;

      const node: INode = {
         tag: 'h1',
         attrs: {
            class: testClass,
         },
         children: [{ tag: 'p', attrs: {}, children: [testText] }],
      };

      const result = render(node);

      expect(result).toEqual(sample);
   });

   it('applies style object correctly to DOM string', () => {
      const sample = `<div style="text-transform:uppercase;font-weight:bold;color:#000;">${testText}</div>`;

      const node: INode = {
         tag: 'div',
         attrs: {
            style: testStyles,
         },
         children: [testText],
      };

      const result = render(node);

      expect(result).toEqual(sample);
   });

   it('applies self referencing attributes correctly', () => {
      const sample = `<input disabled="disabled" />`;

      const node: INode = {
         tag: 'input',
         attrs: {
            disabled: true,
         },
         children: [],
      };

      const result = render(node);

      expect(result).toEqual(sample);
   });

   it('converts "className" to "class" when provided', () => {
      const sample = `<p class="${testClass}" title="${testText}">${testText}</p>`;

      const node: INode = {
         tag: 'p',
         attrs: {
            className: testClass,
            title: testText,
         },
         children: [testText],
      };

      const result = render(node);

      expect(result).toEqual(sample);
   });

   it('does not apply attributes without a value', () => {
      const sample = `<p>${testText}</p>`;

      const node: INode = {
         tag: 'p',
         attrs: {
            class: null,
            id: '',
         },
         children: [testText],
      };

      const result = render(node);

      expect(result).toEqual(sample);
   });

   it('ignores interactive type attributes', () => {
      const sample = `<p id="test">${testText}</p>`;

      const node: INode = {
         tag: 'p',
         attrs: {
            class: null,
            id: 'test',
            onClick: () => void 0,
            onKeyUp: () => void 0,
            ref: () => void 0,
         },
         children: [testText],
      };

      const result = render(node);

      expect(result).toEqual(sample);
   });
});
