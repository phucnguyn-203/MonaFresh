module.exports = function calculateItemTotal(product, quantity) {
    const price = product.price;
    const percentageDiscount = product.percentageDiscount;

    if (percentageDiscount > 0) {
        const discountedPrice = price - price * percentageDiscount;
        return discountedPrice * quantity;
    }

    return price * quantity;
};
