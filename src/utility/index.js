import slugify from 'slugify';
import { message } from "antd";
import moment from 'moment';

export const disabledDate = (current) => {
  return current.isBefore(moment().subtract(1, 'day'))
}

export const generatingRandomCode = () => {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  var randomString = '';

  for (var i = 0; i < 22; i++) {
    var randomIndex = Math.floor(Math.random() * chars.length);
    randomString += chars[randomIndex];
  }

  return randomString;
}

export const convertToSlug = (value) => {
  const slug = slugify(value, {
    lower: true,
    remove: /[*+~.()'"!:@,]/g,
  });

  return slug
}

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

export const validateFile = (file) => {
  // console.log("file", file);
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt10M = file.size / 1024 / 1024 < 10;
  if (!isLt10M) {
    message.error("Your image must less than 10MB");
  }
  return isJpgOrPng && isLt10M;
};