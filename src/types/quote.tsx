export default class Quote {
    id: number;
    quote: string;
    date: string;
    customer: string;
    site_delivery: string;
    no_quotes: number;
    sub_total: number;
    VAT: number;
    total: number;
    deposit: number;
    outstanding: number;
    profit: number;
    email: string;
    description: string;
    job_ref: string | null;


    constructor(
        id: number,
        quote: string,
        date: string,
        customer: string,
        site_delivery: string,
        no_quotes: number,
        sub_total: number,
        VAT: number,
        total: number,
        deposit: number,
        outstanding: number,
        profit: number,
        email: string,
        description: string,
        job_ref: string | null = null,
    ) {
        this.id = id;
        this.quote = quote;
        this.date = date;
        this.customer = customer;
        this.site_delivery = site_delivery;
        this.no_quotes = no_quotes;
        this.sub_total = sub_total;
        this.VAT = VAT;
        this.total = total;
        this.deposit = deposit;
        this.outstanding = outstanding;
        this.profit = profit;
        this.email = email;
        this.description = description;
        this.job_ref = job_ref;
    }
}