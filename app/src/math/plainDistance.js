export function distance(standard, image) {
  return Math.sqrt(
      Math.pow(standard.x - image.x, 2) +
      Math.pow(standard.y - image.y, 2)
  );
}

function findClosestStandardForImage(standards, image) {
  const distances = standards.map(std => distance(std, image));
  const minDistance = Math.min.apply(null, distances);
  const minIndex = distances.indexOf(minDistance);
  return standards[minIndex];
}

export default function calculateResultsWithPlainDistance(standards, images) {
  return images.map(image => {
    const closestStandard = findClosestStandardForImage(standards, image);

    return {
      image,
      standard: closestStandard,
      distance: distance(closestStandard, image)
    };
  });
}
