import { el, setChildren, svg } from 'redom';
import { el as miscEl, svg as miscSvg } from '@phpcoder2022/redom';

export const createPage = () => {
  const iconTypes = Object.keys(icons);
  let i = 0;
  setChildren(document.body, [el(
    'ul.list',
    depModes.flatMap(depMode => (
      classModes.map(classMode => (
        (!(i % 2) ? el : miscEl)(
          'li',
          { class: 'list__item', 'data-func': !(i % 2) ? 'el' : 'miscEl' },
          createSvg(
            iconTypes[i++ % iconTypes.length],
            'list__icon',
            classMode,
            depMode
          ),
        )
      ))
    )),
  )])
};

export const createSvg = (iconType, className, classMode, depMode) => {
  const iconData = icons[iconType];
  if (!iconData) throw new Error('icon type not found');
  if (!classModes.includes(classMode)) throw new Error('unidentified classMode');
  if (!depModes.includes(depMode)) throw new Error('unidentified depMode');
  const classWithTagName = classMode === 'with tag name' ? `.${className}` : '';
  const classInAttsObj = !(classMode === 'with tag name') ? { class: className } : {};
  const elem = (depMode === 'original' ? svg : miscSvg)(
    'svg' + classWithTagName,
    { ...svgAttrs, ...iconData.svgAttrs, ...classInAttsObj },
    iconData.pathD.map(d => (
      svg('path', { ...pathAttrs, d })
    )),
  );
  elem.dataset.classMode = classMode;
  elem.dataset.depMode = depMode;
  return elem;
};

const classModes = Object.freeze(['with tag name', 'in attrs obj']);
const depModes = Object.freeze(['original', 'patched']);

const svgAttrs = Object.freeze({
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
})

const pathAttrs = Object.freeze({
  stroke: '#FC6D3E',
  'stroke-width': 2,
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round',
});

export const icons = Object.freeze({
  music: Object.freeze({
    svgAttrs: Object.freeze({ width: 25, height: 27, viewBox: '0 0 25 27' }),
    pathD: Object.freeze([
      'M20.5 22C22.433 22 24 20.433 24 18.5C24 16.567 22.433 15 20.5 15C18.567 15 17 16.567 17 18.5C17 20.433 18.567 22 20.5 22Z',
      'M4.5 26C6.433 26 8 24.433 8 22.5C8 20.567 6.433 19 4.5 19C2.567 19 1 20.567 1 22.5C1 24.433 2.567 26 4.5 26Z',
      'M24 7L8 11',
      'M8 22.5V5L24 1V18.5',
    ]),
  }),
  play: Object.freeze({
    svgAttrs: Object.freeze({ width: 22, height: 26, viewBox: '0 0 22 26' }),
    pathD: Object.freeze([
      'M20.5185 12.1467L2.52146 1.14814C2.36988 1.0555 2.19634 1.00492 2.01872 1.00159C1.8411 0.998268 1.6658 1.04232 1.51085 1.12922C1.3559 1.21612 1.2269 1.34273 1.13711 1.49602C1.04733 1.64932 1 1.82376 1 2.00142V23.9986C1 24.1762 1.04733 24.3507 1.13711 24.504C1.2269 24.6573 1.3559 24.7839 1.51085 24.8708C1.6658 24.9577 1.8411 25.0017 2.01872 24.9984C2.19634 24.9951 2.36988 24.9445 2.52146 24.8519L20.5185 13.8533C20.6647 13.7639 20.7855 13.6386 20.8693 13.4891C20.9531 13.3397 20.9971 13.1713 20.9971 13C20.9971 12.8287 20.9531 12.6603 20.8693 12.5108C20.7855 12.3614 20.6647 12.2361 20.5185 12.1467Z',
    ]),
  })
});
