
///<amd-module name='durandal-culture-service/Localization'/>

// #region Import Directives

import i18next = require("i18next");

// #endregion

/**
 * Represents an access point to the localized resources of the culture service.
 */
class Localization {

    // #region Public Static Methods

    /**
     * Gets the localization for the requested resource.
     * @param {string} key The key that identifies the resource.
     * @param {{ [name: string]: any }} parameters The optional parameters that can be used to replace variables in the resource.
     */
    public static get(key: string, parameters?: { [name: string]: any }): string {
        if (!!parameters) {
            return i18next.t(key, parameters);
        } else {
            return i18next.t(key);
        }
    }

    // #endregion

}

// Exports the module, so that it can be loaded by Require
export = Localization;