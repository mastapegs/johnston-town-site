import { z } from "zod";

/** Contact email displayed site-wide */
export const CONTACT_EMAIL = z.string().email().parse("mastapegs01@gmail.com");

/** Site name used in document titles and footer */
export const SITE_NAME = "Johnston Community Directory";

/** Johnston, RI geographic coordinates */
export const JOHNSTON_COORDS = { lat: 41.824, lng: -71.516 } as const;
