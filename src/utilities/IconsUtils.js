function importAll(r) {
  let images = {};
  r.keys().forEach((item, index) => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
}

// export function weatherIcon(imageName) {
//   const allWeatherIcons = importAll(
//     require.context('../assets/icons', false, /\.(png)$/)
//   );

//   const iconsKeys = Object.keys(allWeatherIcons);

//   const iconsValues = Object.values(allWeatherIcons);
//   const iconIndex = iconsKeys.indexOf(imageName);

//   return iconsValues[iconIndex];
// }
export async function weatherIcon(imageName) {
  try {

    // Dynamically import all images from the 'icons' directory
    const allWeatherIconsContext = await import.meta.glob('../assets/icons/*.png');
  

    // Extract the image names from the context keys
    const iconsKeys = Object.keys(allWeatherIconsContext).map((key) => key.replace(/^.*[\\\/]/, '').replace(/\.[^/.]+$/, ''));

    // Find the index of the requested image name
    const firstThreeChars = imageName.slice(0, 3);
    const iconIndex = iconsKeys.indexOf(firstThreeChars);

    if (iconIndex === -1) return null;


    const iconValue = await allWeatherIconsContext[`../assets/icons/${iconsKeys[iconIndex]}.png`]();


    return iconValue.default;
  } catch (error) {
    console.error('Error loading weather icon:', error);
    console.log(error);
    return null;
  }
}

