require.config({
    // baseURI: "static/tabproject/js/main",
    // The shim config allows us to configure dependencies for
    // scripts that do not call define() to register a module
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        backboneLocalstorage: {
            deps: ['backbone'],
            exports: 'Store'
        }
    },
    paths: {
        // Library
        jquery: '../lib/jquery/jquery-2.2.0.min',
        underscore: '../lib/underscore/underscore',
        backbone: '../lib/backbone/backbone-min',
        backboneLocalstorage: '../lib/backbone.localStorage/backbone.localStorage-min',

        // RequireJS plugin
        text: '../lib/requirejs-plugin/text',
        async: '../lib/requirejs-plugin/async',
        // Developing MVC Javascript module

        //==	Model 	==//
        tab_model: 'models/tab',
        measure_model: 'models/measure',
        musicnote_model: 'models/musicnote',

        player_clock: 'models/playerClock',

        //== Collection	==//
        measure_set: 'collections/measureSet',

        //==	Views 	==//
        tab_view: 'views/tab-view',
        measure_view: 'views/measure-view',
        musicnote_view: 'views/musicnote-view',

        prog_slider: 'views/progSlider',
        playDashboard: 'views/playDashboard',
        search_bar: 'views/SearchBar', // This module depend on Google API
        yt_player: 'views/YTplayer',

        /* === Views Animation === */
        tab_animation: 'views/tabAnimation',

        /* == Internet Resource == */
        /* Google API */
        gapi_config: 'gapi/config',

        /* Api mananger */
        api_manager: 'gapi/APImanager',
        /* Helper function for view*/
        helper_draw: 'helpers/draw',
        helper_coordinate: 'helpers/coordinate',

        /* Testing Animation */
        test_animation: 'sandbox/animation',


        /* Templates */
        search_result: 'templates/searchResult',

        /* Tab SVG Layout Setting */
        tab_layout: 'layout/tabSVG'
    }
});

require([
    'backbone',
    'app',
    'routers/router'

], function(Backbone, App, Workspace) {
    /*jshint nonew:false*/
    // Initialize routing and start Backbone.history()

    new Workspace();
    Backbone.history.start();

    // console.log('hello require JS');
    // Initialize the application view
    // console.log(App);
    new App().getInstance().start();

});
