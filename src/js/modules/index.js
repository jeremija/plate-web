define([
        'modules/breadcrumbsMod',
        'modules/messagesMod',
        'modules/userMod',
        'modules/languageMod',
        'modules/mainMenuMod',
        'modules/askYesNoMod'
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