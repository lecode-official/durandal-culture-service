
///<amd-module name='Culture/CultureConfiguration'/>

/**
 * Represents the configuration of the culture service.
 */
class CultureConfiguration {

    // #region Public Properties

    /**
     * Gets or sets the fallback culture of the service.
     */
    public defaultCulture: string;

    /**
     * Gets or sets all supported cultures of the service.
     */
    public supportedCultures: Array<string>;

    /**
     * Gets or sets the translations that are used by the culture service.
     */
    public translations: any;

    // #endregion

}

// Exports the module, so that it can be loaded by Require
export = CultureConfiguration;