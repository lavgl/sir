import { distance } from './plainDistance';

export function buildDecisiveFn(standard) {
  return image => {
    // TODO: add standard, image checking
    const { x, y } = image;
    const { x: zx, y: zy } = standard;

    return x * zx + y * zy - 0.5 * (Math.pow(zx, 2) + Math.pow(zy, 2));
  };
}

const getDecisiveValue = image => decisiveFn => decisiveFn(image);

export default function calculateResultsWithDecisiveFunctions(standards, images) {
  const decisiveFns = standards.map(buildDecisiveFn);

  return images.map(image => {
    const values = decisiveFns.map(getDecisiveValue(image));

    const maxValue = Math.max.apply(null, values);
    const index = values.indexOf(maxValue);
    const standard = standards[index];

    return {
      image,
      standard,
      distance: distance(standard, image)
    };
  });
}
