import Quote from "./quote";

export enum FilterCriteria {
    id = 'ID',
    quote = 'Quote',
    date = 'Date',
    customer = 'Customer',
    site_delivery = 'Site / Delivery',
    no_quotes = 'No.Quotes',
    sub_total = 'Sub Total',
    VAT = 'VAT',
    total = 'Total',
    deposit = 'Deposit',
    outstanding = 'Outstanding',
    profit = 'Profit',
    email = 'Email',
    description = 'Description',
    job_ref = 'Customer Job Ref',
}

export const FilterCriteriaMap: { [k in FilterCriteria]: keyof Quote } = {
    [FilterCriteria.id]: 'id',
    [FilterCriteria.quote]: 'quote',
    [FilterCriteria.date]: 'date',
    [FilterCriteria.customer]: 'customer',
    [FilterCriteria.site_delivery]: 'site_delivery',
    [FilterCriteria.no_quotes]: 'no_quotes',
    [FilterCriteria.sub_total]: 'sub_total',
    [FilterCriteria.VAT]: 'VAT',
    [FilterCriteria.total]: 'total',
    [FilterCriteria.deposit]: 'deposit',
    [FilterCriteria.outstanding]: 'outstanding',
    [FilterCriteria.profit]: 'profit',
    [FilterCriteria.email]: 'email',
    [FilterCriteria.description]: 'description',
    [FilterCriteria.job_ref]: 'job_ref',
}

export enum Order {
    asc = 'Ascending',
    desc = 'Descending',
}