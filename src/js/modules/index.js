define([
        'modules/breadcrumbs-mod',
        'modules/messages-mod',
        'modules/user-mod',
        'modules/language-mod',
        'modules/main-menu-mod',
        'modules/ask-yes-no-mod'
    ],

    function(
        breadcrumbsMod,
        messagesMod,
        userMod,
        languageMod,
        mainMenuMod,
        askYesNoMod
    ) {

    // initialize static modules
    userMod.bind(document.getElementById('user-mod'));
    breadcrumbsMod.bind(document.getElementById('breadcrumbs-mod'));
    languageMod.bind(document.getElementById('language-mod'));
    mainMenuMod.bind(document.getElementById('main-menu-mod'));
    askYesNoMod.bind(document.getElementById('ask-yes-no-mod'));
    messagesMod.listen();

});