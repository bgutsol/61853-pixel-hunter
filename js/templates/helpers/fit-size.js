export default (frame, size) => {
  if (size.width < frame.width && size.height < frame.height) {
    return size;
  }

  const ratio = {
    width: 1,
    height: 1
  };

  if (size.width > frame.width) {
    ratio.width = frame.width / size.width;
  }

  if (size.height > frame.height) {
    ratio.height = frame.height / size.height;
  }

  if (ratio.width > ratio.height) {
    return {
      width: size.width * ratio.height,
      height: size.height * ratio.height
    };
  }

  return {
    width: size.width * ratio.width,
    height: size.height * ratio.width
  };
};

