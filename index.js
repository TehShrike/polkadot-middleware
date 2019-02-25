module.exports = (...fns) => fns.reduceRight((acc, fn) => fn(acc))
