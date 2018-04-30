export default (frame, image) => {
  if (image.width < frame.width && image.height < frame.height) {
    return image;
  }

  const ratio = {
    width: 1,
    height: 1
  };

  if (image.width > frame.width) {
    ratio.width = frame.width / image.width;
  }

  if (image.height > frame.height) {
    ratio.height = frame.height / image.height;
  }

  if (ratio.width > ratio.height) {
    return {
      width: image.width * ratio.height,
      height: image.height * ratio.height
    };
  }

  return {
    width: image.width * ratio.width,
    height: image.height * ratio.width
  };
};

