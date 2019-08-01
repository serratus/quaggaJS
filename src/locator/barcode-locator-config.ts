export type PatchSizeConfig = number | 'x-small' | 'small' | 'medium' | 'large' | 'x-large';

export interface BarcodeLocatorDebugConfig {
    /**
     * @default false
     */
    showCanvas?: boolean;

    /**
     * @default false
     */
    showPatches?: boolean;

    /**
     * @default false
     */
    showFoundPatches?: boolean;

    /**
     * @default false
     */
    showSkeleton?: boolean;

    /**
     * @default false
     */
    showLabels?: boolean;

    /**
     * @default false
     */
    showPatchLabels?: boolean;

    /**
     * @default false
     */
    showRemainingPatchLabels?: boolean;

    boxFromPatches?: {
        /**
         * @default false
         */
        showTransformed?: boolean;

        /**
         * @default false
         */
        showTransformedBox?: boolean;

        /**
         * @default false
         */
        showBB?: boolean;
    };
}

export interface BarcodeLocatorConfig {
    debug?: BarcodeLocatorDebugConfig;

    /**
     * @default true
     */
    halfSample?: boolean;

    /**
     * @default 'medium'
     */
    patchSize?: PatchSizeConfig;

    useWorker?: boolean;
}
