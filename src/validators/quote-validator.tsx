import { QuoteValidationExceptions } from "../exceptions/quote-validation-exceptions.tsx";
import Quote from "../types/quote.tsx";

const checkEmpty = (quote: Quote) => {
    if (!quote.quote) {
        throw new Error(QuoteValidationExceptions.QUOTE_REQUIRED);
    };

    if (!quote.date) {
        throw new Error(QuoteValidationExceptions.DATE_REQUIRED);
    };

    if (!quote.customer) {
        throw new Error(QuoteValidationExceptions.CUSTOMER_REQUIRED);
    };

    if (!quote.site_delivery) {
        throw new Error(QuoteValidationExceptions.SITE_DELIVERY_REQUIRED);
    };

    if (!quote.no_quotes) {
        throw new Error(QuoteValidationExceptions.NO_QUOTES_REQUIRED);
    };

    if (!quote.sub_total) {
        throw new Error(QuoteValidationExceptions.SUB_TOTAL_REQUIRED);
    };

    if (!quote.VAT) {
        throw new Error(QuoteValidationExceptions.VAT_REQUIRED);
    };

    if (!quote.total) {
        throw new Error(QuoteValidationExceptions.TOTAL_REQUIRED);
    };

    if (!quote.deposit) {
        throw new Error(QuoteValidationExceptions.DEPOSIT_REQUIRED);
    };

    if (!quote.outstanding) {
        throw new Error(QuoteValidationExceptions.OUTSTANDING_REQUIRED);
    };

    if (!quote.profit) {
        throw new Error(QuoteValidationExceptions.PROFIT_REQUIRED);
    };

    if (!quote.email) {
        throw new Error(QuoteValidationExceptions.EMAIL_REQUIRED);
    };

    if (!quote.description) {
        throw new Error(QuoteValidationExceptions.DESCRIPTION_REQUIRED);
    };
    if (!quote.job_ref) {
        throw new Error(QuoteValidationExceptions.JOB_REF_REQUIRED);
    };
}

const checkQuantities = (quote: Quote) => {
    if (quote.sub_total <= 0) {
        throw new Error(QuoteValidationExceptions.INVALID_SUB_TOTAL);
    };

    if (quote.VAT <= 0) {
        throw new Error(QuoteValidationExceptions.INVALID_VAT);
    };

    if (quote.total <= 0) {
        throw new Error(QuoteValidationExceptions.INVALID_TOTAL);
    };

    if (quote.deposit <= 0) {
        throw new Error(QuoteValidationExceptions.INVALID_DEPOSIT);
    };

    if (quote.outstanding <= 0) {
        throw new Error(QuoteValidationExceptions.INVALID_OUTSTANDING);
    };

    if (quote.profit <= 0) {
        throw new Error(QuoteValidationExceptions.INVALID_PROFIT);
    };
}

export const validate = (quote: Quote) => {
    checkEmpty(quote);

    if (quote.email && !quote.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        throw new Error(QuoteValidationExceptions.INVALID_EMAIL);
    };


    if (quote.date && !quote.date.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
        throw new Error(QuoteValidationExceptions.INVALID_DATE);
    };

    checkQuantities(quote);

    if (quote.quote && quote.quote.length < 3) {
        throw new Error(QuoteValidationExceptions.SHORT_NAME);
    };

    return true;
};