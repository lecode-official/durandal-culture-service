///<amd-module name='durandal-culture-service/CultureService'/>
define("durandal-culture-service/CultureService", ["require", "exports", "durandal/binder", "durandal-culture-service/CultureDetectionMethod", "durandal-globalization/CultureInfo", "i18next", "jquery"], function (require, exports, binder, CultureDetectionMethod, CultureInfo, i18next, jquery) {
    "use strict";
    // #endregion
    /**
     * Represents a service that is used to serve culture information and localization for all resources.
     */
    var CultureService = /** @class */ (function () {
        function CultureService() {
        }
        Object.defineProperty(CultureService, "defaultCulture", {
            // #endregion
            // #region Public Static Properties
            /**
             * Gets the default culture, which is used if the browser culture is not supported.
             */
            get: function () {
                // Initializes the default culture if it does not exist
                if (!CultureService._defaultCulture) {
                    CultureService._defaultCulture = CultureInfo.createSpecificCulture(CultureService.configuration.defaultCulture);
                }
                // Returns the default culture
                return CultureService._defaultCulture;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CultureService, "supportedCultures", {
            /**
             * Gets all cultures that are supported by the web application.
             */
            get: function () {
                // Initializes the supported cultures if they do not exist
                if (!CultureService._supportedCultures) {
                    CultureService._supportedCultures = CultureService.configuration.supportedCultures.map(function (name) { return CultureInfo.createSpecificCulture(name); });
                }
                // Returns the supported cultures
                return CultureService._supportedCultures;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CultureService, "detectionMethod", {
            /**
             * Gets the detection method that was used to set the current culture.
             */
            get: function () {
                // Initializes the detection method if it does not exist
                if (!CultureService._detectionMethod) {
                    return CultureDetectionMethod.None;
                }
                // Returns the detection method
                return CultureService._detectionMethod;
            },
            enumerable: true,
            configurable: true
        });
        // #endregion
        // #region Private Static Methods
        /**
         * Detects the current culture based on the URL, browser or default culture.
         */
        CultureService.detectCurrentCulture = function () {
            // Checks whether an explicit culture is required from the path
            if (!!window.location.pathname && window.location.pathname.substr(1).length > 0) {
                // Checks whether the pathname start with the requested culture
                var requestedCultures = CultureService.supportedCultures.filter(function (supportedCulture) { return window.location.pathname.substr(1, supportedCulture.name.length).toUpperCase() == supportedCulture.name.toUpperCase(); });
                if (requestedCultures.length > 0) {
                    CultureInfo.currentCulture = requestedCultures[0];
                    CultureService._detectionMethod = CultureDetectionMethod.Uri;
                    return;
                }
            }
            // Gets the culture that has been requested from the browser
            var requestedCulture = CultureInfo.createSpecificCulture(window.navigator.language);
            // Checks whether the requested culture is supported, if not, then the default culture is returned
            if (CultureService.supportedCultures.some(function (supportedCulture) { return supportedCulture.name == requestedCulture.name; })) {
                CultureInfo.currentCulture = requestedCulture;
                CultureService._detectionMethod = CultureDetectionMethod.Browser;
            }
            else {
                CultureInfo.currentCulture = CultureService.defaultCulture;
                CultureService._detectionMethod = CultureDetectionMethod.None;
            }
        };
        // #endregion
        // #region Public Static Methods
        /**
         * Configures the i18n module so that it can be used throughout the web application.
         * @param {CultureConfiguration} configuration The configuration that the culture service should use.
         */
        CultureService.use = function (configuration) {
            // Sets the configuration
            CultureService.configuration = configuration;
            // Initializes the current culture
            CultureService.detectCurrentCulture();
            // Initializes the i18n module
            i18next.init({
                lng: CultureInfo.currentCulture.twoLetterIsoCode,
                resources: CultureService.configuration.translations,
                interpolation: {
                    prefix: "{{",
                    suffix: "}}"
                }
            });
            // Signs up for the event that fires when view models are bound to their view
            binder.binding = function (viewModel, view) { return jquery(view).find("[data-localization]").each(function (index, element) {
                jquery(element).text(i18next.t(jquery(element).data("localization")));
            }); };
            // Gets the window in order to add variables to it
            var currentWindow = window;
            // Adds the localization function to the window, so that it can be used in knockout data bindings
            currentWindow["localization"] = { get: function (key, options) { return i18next.t(key, options); } };
            // Adds the current culture to the window, so that it can be used in knockout data bindings
            currentWindow["currentCulture"] = CultureInfo.currentCulture;
        };
        /**
         * Contains the detection method that was used to set the current culture.
         */
        CultureService._detectionMethod = CultureDetectionMethod.None;
        return CultureService;
    }());
    return CultureService;
});
