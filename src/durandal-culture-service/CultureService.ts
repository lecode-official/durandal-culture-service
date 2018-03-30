
///<amd-module name='durandal-culture-service/CultureService'/>
///<reference types="durandal-globalization" />

// #region Import Directives

import binder = require("durandal/binder");
import CultureConfiguration = require("durandal-culture-service/CultureConfiguration");
import CultureDetectionMethod = require("durandal-culture-service/CultureDetectionMethod");
import CultureInfo = require("durandal-globalization/CultureInfo");
import i18next = require("i18next");
import jquery = require("jquery");

// #endregion

/**
 * Represents a service that is used to serve culture information and localization for all resources.
 */
class CultureService {

    // #region Private Static Fields

    /**
     * Contains the default culture, which is used if the browser culture is not supported.
     */
    private static _defaultCulture: CultureInfo;

    /**
     * Contains the current culture of the web application. If the culture requested by the browser is not supported, then the default culture will be returned.
     */
    private static _supportedCultures: CultureInfo[];

    /**
     * Contains the detection method that was used to set the current culture.
     */
    private static _detectionMethod: CultureDetectionMethod = CultureDetectionMethod.None;

    /**
     * Contains the current configuration of the culture service.
     */
    private static configuration: CultureConfiguration;

    // #endregion

    // #region Public Static Properties

    /**
     * Gets the default culture, which is used if the browser culture is not supported.
     */
    public static get defaultCulture(): CultureInfo {

        // Initializes the default culture if it does not exist
        if (!CultureService._defaultCulture) {
            CultureService._defaultCulture = CultureInfo.createSpecificCulture(CultureService.configuration.defaultCulture);
        }

        // Returns the default culture
        return CultureService._defaultCulture;
    }

    /**
     * Gets all cultures that are supported by the web application.
     */
    public static get supportedCultures(): CultureInfo[]{

        // Initializes the supported cultures if they do not exist
        if (!CultureService._supportedCultures) {
            CultureService._supportedCultures = CultureService.configuration.supportedCultures.map(name => CultureInfo.createSpecificCulture(name));
        }

        // Returns the supported cultures
        return CultureService._supportedCultures;
    }

    /**
     * Gets the detection method that was used to set the current culture.
     */
    public static get detectionMethod(): CultureDetectionMethod {

        // Initializes the detection method if it does not exist
        if (!CultureService._detectionMethod) {
            return CultureDetectionMethod.None;
        }

        // Returns the detection method
        return CultureService._detectionMethod;
    }

    // #endregion

    // #region Private Static Methods

    /**
     * Detects the current culture based on the URL, browser or default culture.
     */
    private static detectCurrentCulture() {

        // Checks whether an explicit culture is required from the path
        if (!!window.location.pathname && window.location.pathname.substr(1).length > 0) {

            // Checks whether the pathname start with the requested culture
            var requestedCultures = CultureService.supportedCultures.filter(supportedCulture => window.location.pathname.substr(1, supportedCulture.name.length).toUpperCase() == supportedCulture.name.toUpperCase());
            if (requestedCultures.length > 0) {
                CultureInfo.currentCulture = requestedCultures[0];
                CultureService._detectionMethod = CultureDetectionMethod.Uri;
                return;
            }
        }

        // Gets the culture that has been requested from the browser
        var requestedCulture = CultureInfo.createSpecificCulture(window.navigator.language);

        // Checks whether the requested culture is supported, if not, then the default culture is returned
        if (CultureService.supportedCultures.some(supportedCulture => supportedCulture.name == requestedCulture.name)) {
            CultureInfo.currentCulture = requestedCulture;
            CultureService._detectionMethod = CultureDetectionMethod.Browser;
        } else {
            CultureInfo.currentCulture = CultureService.defaultCulture;
            CultureService._detectionMethod = CultureDetectionMethod.None;
        }
    }

    // #endregion

    // #region Public Static Methods

    /**
     * Configures the i18n module so that it can be used throughout the web application.
     * @param {CultureConfiguration} configuration The configuration that the culture service should use.
     */
    public static use(configuration: CultureConfiguration) {

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
        binder.binding = (viewModel, view) => jquery(view).find("[data-localization]").each((index, element) => {
            jquery(element).text(i18next.t(jquery(element).data("localization")));
        });

        // Gets the window in order to add variables to it
        var currentWindow: any = window;

        // Adds the localization function to the window, so that it can be used in knockout data bindings
        currentWindow["localization"] = { get: (key: string, options: i18next.TranslationOptions) => i18next.t(key, options) };

        // Adds the current culture to the window, so that it can be used in knockout data bindings
        currentWindow["currentCulture"] = CultureInfo.currentCulture;
    }

    // #endregion
}

// Exports the module, so that it can be loaded by Require
export = CultureService;