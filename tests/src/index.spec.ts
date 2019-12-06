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

      const nodes = {
         nodeName: 'h1',
         attrs: {
            class: testClass,
         },
         children: [{ nodeName: 'p', attrs: {}, children: [testText] }],
      };

      const result = render(nodes);

      expect(result).toEqual(sample);
   });

   it('applies style object correctly to DOM string', () => {
      const sample = `<div style="text-transform:uppercase;font-weight:bold;color:#000;">${testText}</div>`;

      const nodes = {
         nodeName: 'div',
         attrs: {
            style: testStyles,
         },
         children: [testText],
      };

      const result = render(nodes);

      expect(result).toEqual(sample);
   });

   it('applies self referencing attributes correctly', () => {
      const sample = `<input disabled="disabled" />`;

      const nodes = {
         nodeName: 'input',
         attrs: {
            disabled: true,
         },
      };

      const result = render(nodes);

      expect(result).toEqual(sample);
   });

   it('converts "className" to "class" when provided', () => {
      const sample = `<p class="${testClass}" title="${testText}">${testText}</p>`;

      const nodes = {
         nodeName: 'p',
         attrs: {
            className: testClass,
            title: testText,
         },
         children: [testText],
      };

      const result = render(nodes);

      expect(result).toEqual(sample);
   });

   it('does not apply attributes without a value', () => {
      const sample = `<p>${testText}</p>`;

      const nodes = {
         nodeName: 'p',
         attrs: {
            class: false,
            id: '',
         },
         children: [testText],
      };

      const result = render(nodes);

      expect(result).toEqual(sample);
   });
});
