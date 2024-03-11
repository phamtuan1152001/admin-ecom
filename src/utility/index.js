export const generateLink = (pathElements) => {
  // Reverse the array to match the order you specified
  pathElements.reverse();

  // Join the path elements with '/'
  var link = '/' + pathElements.join('/');
  return link;
}

export function formatToCurrencyVND(number) {
  if (number) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(number);
  }

  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(0);
}

export const convertFileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () =>
      resolve({
        fileName: file.name,
        base64: reader.result,
      });
    reader.onerror = reject;
  });