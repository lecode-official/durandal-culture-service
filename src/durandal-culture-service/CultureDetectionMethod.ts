
///<amd-module name='durandal-culture-service/CultureDetectionMethod'/>

/**
 * Represents the detection method that was used to set the current culture.
 */
enum CultureDetectionMethod {

    /**
     * The culture is not detected yet.
     */
    None,

    /**
     * The culture has been detected from the browser.
     */
    Browser,

    /**
     * The culture has been detected from the URL path.
     */
    Uri

}

// Exports the module, so that it can be loaded via Require
export = CultureDetectionMethod;