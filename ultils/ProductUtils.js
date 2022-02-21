export const calRealPrice = (unitPrice, discountOff) =>
  Math.round(
    discountOff ? unitPrice - (unitPrice * discountOff) / 100 : unitPrice
  )
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " ";

export const calTotalPrice = (carts) => {
  return (
    Math.round(
      carts.reduce(
        (pre, cur) =>
          pre +
          (cur.isChecked
            ? cur.quantity *
              (cur.discountOff
                ? cur.unitPrice - (cur.unitPrice * cur.discountOff) / 100
                : cur.unitPrice)
            : 0),
        0
      )
    )
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " "
  );
};
export const calTotalBook = (carts) => {
  return carts.reduce(
    (pre, cur) => pre + (cur.isChecked ? cur.quantity : 0),
    0
  );
};
