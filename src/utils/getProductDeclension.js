export const getProductDeclension = (count, language = 'ua') => {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;
    if (language === 'ua') {
        if (lastTwoDigits >= 11 && lastTwoDigits <= 14)
            return 'Продуктів';
        if (lastDigit === 1)
            return 'Продукт';
        if (lastDigit >= 2 && lastDigit <= 4)
            return 'Продукти';
        return 'Продуктів';
    }
    if (language === 'ru') {
        if (lastTwoDigits >= 11 && lastTwoDigits <= 14)
            return 'Продуктов';
        if (lastDigit === 1)
            return 'Продукт';
        if (lastDigit >= 2 && lastDigit <= 4)
            return 'Продукта';
        return 'Продуктов';
    }
    if (language === 'en')
        return count === 1 ? 'Product' : 'Products';
    return 'Invalid language';
};
