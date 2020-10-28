import { IDictionary } from "./basics";
import { datestring } from "./timing";
/**
 * This represents a meta-data format that repos which push up an AWS Layer can export
 * as part of their main/module exports to help consumers consume their Layer.
 *
 * **Note:** if you are using the _Yeoman scaffold_ `lambda-typescript` it will automatically
 * understand this meta-data and use it during your deployments
 */
export interface IAwsLayerMeta {
    /**
     * A short, descriptive name for the layer (avoiding spaces by convention)
     */
    name: string;
    /**
     * You may optionally describe what the layer is doing
     */
    description?: string;
    /**
     * Layers are dropped into the Lambda functions `/opt` filesystem but in order
     * to avoid namespace collisions it is a good idea to make sure that you offset
     * your layer by some meaningful _namespace_.
     */
    namespace: string;
    /**
     * For _layers_ which provide the dependency graph of a one or more **npm**
     * modules, the layer author is requested to list them out here.
     *
     * **Note:** this is just the top level packages, the full dependency graph
     * is not desireable and instead you want to just state the "entry points"
     * which the consumer will no longer need to require.
     */
    externals?: string[];
    /**
     * If a particular layer is being used as a "reference layer" ... meaning it
     * will be the "single source of truth" for this layer then an **ARN** should
     * be provided.
     *
     * Alternatively, if a repo is providing organisations the right
     * to publish _their version_ of this layer then the **ARN** will not be known
     * and instead must be calculated at deploy-time from the full set of meta-data
     * known at that time.
     */
    arn?: string;
    versions: IAWSLayerVersion[];
}
/**
 * An AWS Layer is versioned over time and consumers of the layer can peg their
 * dependency to any version or just the "latest" version. This interface helps
 * the consumer to understand what underlying versions of the bundled deps are
 * included in the version so as best to decide when to upgrade and also to help
 * ensure that the consumers development sandbox mimics the deployed environment
 * as possible.
 *
 * **Note:** this is _most_ useful if the layer is providing **npm** modules but
 * can also be leveraged for other versioned assets. Even in cases where the
 * asset is less structured, the versioning concept is core to Layers and
 * documenting the range of options and ideally a description of what that version
 * brings is useful to consumers.
 */
export interface IAWSLayerVersion {
    version: number;
    released?: datestring;
    /**
     * A human readable description of what this release changes from the prior
     * version
     */
    description?: string;
    /**
     * Provides a full fingerprint of the underlying modules which are being handled
     * by this Layer. This _can_ be **npm** modules but doesn't need to be.
     */
    packages?: IDictionary;
}
