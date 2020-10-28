/**
 * An IP address (of the v4 variety) which is represented in string
 * form like: `8.8.8.8`
 */
export declare type ipv4 = string;
/**
 * An IP address (of the v6 variety) which is reprented in string
 * form like: `2001:0db8:85a3:0000:0000:8a2e:0370:7334`
 */
export declare type ipv6 = string;
/**
 * A IP range stated in [CIDR](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing)
 * notation (e.g,. `192.168.100.0/22`)
 */
export declare type CIDR = string;
/**
 * A string representation of a _subnet mask_
 * (e.g., `255.255.0.0`).
 *
 * Subnet masks provide similar functionality to CIDR
 * but predate it and still are used today.
 */
export declare type subnetMask = string;
