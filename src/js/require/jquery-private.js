define(['jquery'], function(jq) {
    jq = jq.noConflict(true);
    delete window.$;
    return jq;
});