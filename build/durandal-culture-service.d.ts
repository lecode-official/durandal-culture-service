declare module 'durandal-culture-service/CultureConfiguration' {
	 class CultureConfiguration {
	    /**
	     * Gets or sets the fallback culture of the service.
	     */
	    defaultCulture: string;
	    /**
	     * Gets or sets all supported cultures of the service.
	     */
	    supportedCultures: Array<string>;
	    /**
	     * Gets or sets the translations that are used by the culture service.
	     */
	    translations: any;
	}
	export = CultureConfiguration;

}
declare module 'durandal-culture-service/CultureDetectionMethod' {
	 enum CultureDetectionMethod {
	    /**
	     * The culture is not detected yet.
	     */
	    None = 0,
	    /**
	     * The culture has been detected from the browser.
	     */
	    Browser = 1,
	    /**
	     * The culture has been detected from the URL path.
	     */
	    Uri = 2,
	}
	export = CultureDetectionMethod;

}
declare module 'durandal-culture-service/CultureService' {
	import CultureConfiguration = require("durandal-culture-service/CultureConfiguration");
	import CultureDetectionMethod = require("durandal-culture-service/CultureDetectionMethod");
	import CultureInfo = require("durandal-globalization/CultureInfo"); class CultureService {
	    /**
	     * Contains the default culture, which is used if the browser culture is not supported.
	     */
	    private static _defaultCulture;
	    /**
	     * Contains the current culture of the web application. If the culture requested by the browser is not supported, then the default culture will be returned.
	     */
	    private static _supportedCultures;
	    /**
	     * Contains the detection method that was used to set the current culture.
	     */
	    private static _detectionMethod;
	    /**
	     * Contains the current configuration of the culture service.
	     */
	    private static configuration;
	    /**
	     * Gets the default culture, which is used if the browser culture is not supported.
	     */
	    static readonly defaultCulture: CultureInfo;
	    /**
	     * Gets all cultures that are supported by the web application.
	     */
	    static readonly supportedCultures: CultureInfo[];
	    /**
	     * Gets the detection method that was used to set the current culture.
	     */
	    static readonly detectionMethod: CultureDetectionMethod;
	    /**
	     * Detects the current culture based on the URL, browser or default culture.
	     */
	    private static detectCurrentCulture();
	    /**
	     * Configures the i18n module so that it can be used throughout the web application.
	     * @param {CultureConfiguration} configuration The configuration that the culture service should use.
	     */
	    static use(configuration: CultureConfiguration): void;
	}
	export = CultureService;

}
declare module 'durandal-culture-service/Localization' {
	 class Localization {
	    /**
	     * Gets the localization for the requested resource.
	     * @param {string} key The key that identifies the resource.
	     * @param {{ [name: string]: any }} parameters The optional parameters that can be used to replace variables in the resource.
	     */
	    static get(key: string, parameters?: {
	        [name: string]: any;
	    }): string;
	}
	export = Localization;

}
