///<amd-module name='durandal-culture-service/Localization'/>
define("durandal-culture-service/Localization", ["require", "exports", "i18next"], function (require, exports, i18next) {
    "use strict";
    // #endregion
    /**
     * Represents an access point to the localized resources of the culture service.
     */
    var Localization = /** @class */ (function () {
        function Localization() {
        }
        // #region Public Static Methods
        /**
         * Gets the localization for the requested resource.
         * @param {string} key The key that identifies the resource.
         * @param {{ [name: string]: any }} parameters The optional parameters that can be used to replace variables in the resource.
         */
        Localization.get = function (key, parameters) {
            if (!!parameters) {
                return i18next.t(key, parameters);
            }
            else {
                return i18next.t(key);
            }
        };
        return Localization;
    }());
    return Localization;
});
