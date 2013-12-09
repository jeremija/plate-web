define([
        'modules/breadcrumbs-mod',
        'modules/messages-mod',
        'modules/user-mod',
        'modules/language-mod',
        'modules/main-menu-mod'
    ],

    function(
        breadcrumbsMod,
        messagesMod,
        userMod,
        languageMod,
        mainMenuMod
    ) {

    // initialize static modules
    userMod.bind(document.getElementById('user-mod'));
    breadcrumbsMod.bind(document.getElementById('breadcrumbs-mod'));
    languageMod.bind(document.getElementById('language-mod'));
    mainMenuMod.bind(document.getElementById('main-menu-mod'));
    messagesMod.listen();

});