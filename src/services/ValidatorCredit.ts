export default class ValidatorCreditCard {

    public validCreditCard(value: string) {

        if (/[^0-9-\s]+/.test(value)) return false;

        var nCheck = 0, nDigit = 0, bEven = false;
        value = value.replace(/\D/g, "");

        for (var n = value.length - 1; n >= 0; n--) {
            var cDigit = value.charAt(n),
                nDigit = parseInt(cDigit, 10);

            if (bEven) {
                if ((nDigit *= 2) > 9) nDigit -= 9;
            }

            nCheck += nDigit;
            bEven = !bEven;
        }

        return (nCheck % 10) == 0;
    }

    public validExpirationDate(date: string[]) {


        const minMonth = new Date().getMonth() + 1,
            minYear = new Date().getFullYear(),
            month = Number(date[0]),
            year = Number(date[1]);
        
        if (year > minYear) {
            return true
        } else if (year === minYear && (month >= minMonth)) {
            return true
        } else {
            return false
        }

    }

    public validateCVV(creditCard: string, cvv: string) {
        const acceptedCreditCards = {
            visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
            mastercard: /^5[1-5][0-9]{14}$|^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{12}$/,
            amex: /^3[47][0-9]{13}$/,
            discover: /^65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})$/,
            diners_club: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
            jcb: /^(?:2131|1800|35[0-9]{3})[0-9]{11}$/
        };
        // remove all non digit characters
        var creditCard = creditCard.replace(/\D/g, '');
        var cvv = cvv.replace(/\D/g, '');
        // american express and cvv is 4 digits
        if ((acceptedCreditCards.amex).test(creditCard)) {
            if ((/^\d{4}$/).test(cvv))
                return true;
        } else if ((/^\d{3}$/).test(cvv)) { // other card & cvv is 3 digits
            return true;
        }
        return false;
    }


}    