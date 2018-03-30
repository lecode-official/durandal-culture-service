///<amd-module name='durandal-culture-service/CultureDetectionMethod'/>
define("durandal-culture-service/CultureDetectionMethod", ["require", "exports"], function (require, exports) {
    "use strict";
    /**
     * Represents the detection method that was used to set the current culture.
     */
    var CultureDetectionMethod;
    (function (CultureDetectionMethod) {
        /**
         * The culture is not detected yet.
         */
        CultureDetectionMethod[CultureDetectionMethod["None"] = 0] = "None";
        /**
         * The culture has been detected from the browser.
         */
        CultureDetectionMethod[CultureDetectionMethod["Browser"] = 1] = "Browser";
        /**
         * The culture has been detected from the URL path.
         */
        CultureDetectionMethod[CultureDetectionMethod["Uri"] = 2] = "Uri";
    })(CultureDetectionMethod || (CultureDetectionMethod = {}));
    return CultureDetectionMethod;
});
