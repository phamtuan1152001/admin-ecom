export const PAGE_SIZE = 1;
export const PAGE_LIMIT = 12;
export const LIMIT_DEFAULT = 10;

export const SUCCESS = 0;
export const FAIL = 1

export const STATUS_DRAFT = "draft";
export const STATUS_PUBLISH = "publish"

export const PAYMENT_METHOD_TYPE = {
  COD: "COD",
  ATM_BANKING: "atm-banking",
  MOMO_BANKING: "momo-banking",
  METAMASK: "metamask",
  APP_BANKING: "other"
}

export const TYPE_FILTER = (type) => {
  switch (type) {
    case 1:
      return "countBuy"
    case 2:
      return "countReview"
    case 3:
      return "countIntroduce"
    case 4:
      return "countSave"
    default:
      return
  }
}

export const RENDER_TITLE = (type) => {
  switch (type) {
    case 1:
      return "THE CHART ILLUSTRATES THE NUMBER OF PRODUCTS PURCHASED BY USERS"
    case 2:
      return "THE GRAPH ILLUSTRATES THE NUMBER OF PRODUCTS VIEWED BY USERS"
    case 3:
      return "THE CHART ILLUSTRATES THE NUMBER OF PRODUCTS RECOMMENDED BY USERS"
    case 4:
      return "THE GRAPH ILLUSTRATES THE NUMBER OF PRODUCTS SAVED BY USERS"
    default:
      return
  }
}

export const TYPE_SEEN = {
  SEEN: "seen",
  NOTE_SEEN: "not-seen"
}