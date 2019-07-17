/**
Define global helper functions for the handlebars file that named xxx.report.html.
See https://jsreport.net/learn/handlebars to learn more.

For example you want to have an upper case helper function. You can register a global function inside a helpers field with the following code:

function toUpperCase(str) {
    return str.toUpperCase();
}

And then you can call function in handlebars using:

say hello world loudly: {{{toUpperCase "hello world"}}}
 */
function now() {
    return new Date().toLocaleDateString()
}