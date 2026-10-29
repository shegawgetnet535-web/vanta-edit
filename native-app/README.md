# Vanta Edit — native app starter

This Expo project is the first native iOS/Android scaffold. The existing root-level GitHub Pages web app remains unchanged.

## Current state
- Native photo-library picker
- Dark Vanta Edit UI and preset-preview overlays
- Placeholder Pro screen
- Basic save path for the original image only

## Not production-ready yet
Preset overlays are previews, not baked into exported pixels. Paid subscriptions, account handling, privacy policy, and store listing assets are not implemented. Do not publish this build as a finished editor.

## Cloud build path from an iPhone
1. Open https://expo.dev/ and sign in.
2. Create an Expo project and replace `REPLACE_WITH_EAS_PROJECT_ID` in `app.json` with its project ID.
3. Configure EAS cloud builds for Android and iOS. iOS App Store distribution requires an Apple Developer Program membership; Google Play Console registration is for an adult account holder.
4. Test internal builds before store submission.

A cloud builder or GitHub Actions workflow still needs to be connected; no binaries are produced by this commit.