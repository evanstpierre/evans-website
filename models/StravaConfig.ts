// models/StravaConfig.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IStravaConfig extends Document {
  BASE_URL: string;
  STRAVA_ACCESS_TOKEN: string;
  STRAVA_ATHLETE_ID: string;
  STRAVA_AUTH_CODE: string;
  STRAVA_CLIENT_ID: string;
  STRAVA_CLIENT_SECRET: string;
  STRAVA_EXPIRES_AT: string;   // you can change to number if you want
  STRAVA_REFRESH_TOKEN: string;
}

const StravaConfigSchema = new Schema<IStravaConfig>(
  {
    BASE_URL: { type: String, required: true },
    STRAVA_ACCESS_TOKEN: { type: String, required: true },
    STRAVA_ATHLETE_ID: { type: String, required: true },
    STRAVA_AUTH_CODE: { type: String, required: true },
    STRAVA_CLIENT_ID: { type: String, required: true },
    STRAVA_CLIENT_SECRET: { type: String, required: true },
    STRAVA_EXPIRES_AT: { type: String, required: true },
    STRAVA_REFRESH_TOKEN: { type: String, required: true },
  },
  {
    collection: "strava", // 👈 put the actual collection name here
    versionKey: false,
  }
);

// Hot-reload safe
export const StravaConfig: Model<IStravaConfig> =
  mongoose.models.StravaConfig ||
  mongoose.model<IStravaConfig>("StravaConfig", StravaConfigSchema);