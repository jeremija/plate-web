define(['jquery'], function(jq) {
    // jq = jq.noConflict(true);
    jq = jq.noConflict();
    delete window.$;
    return jq;
});