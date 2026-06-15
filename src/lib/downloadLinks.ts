export const APP_STORE_URL = 'https://apps.apple.com/app/minute-bank/id6757351945'
export const TESTFLIGHT_URL = 'https://testflight.apple.com/join/BZTj7yJe'
export const MIN_IOS_VERSION = 18

export type DownloadDestination = 'App Store' | 'TestFlight'

export const ACTIVE_DOWNLOAD_DESTINATION = 'App Store' as DownloadDestination

export const IS_APP_STORE_DOWNLOAD = ACTIVE_DOWNLOAD_DESTINATION === 'App Store'

export const ACTIVE_DOWNLOAD_URL = IS_APP_STORE_DOWNLOAD ? APP_STORE_URL : TESTFLIGHT_URL

export const QR_CARD_TITLE = IS_APP_STORE_DOWNLOAD
  ? 'Open the App Store page'
  : 'Open in TestFlight'

export const IOS_REQUIREMENT_TEXT = `iOS ${MIN_IOS_VERSION}+ required`
