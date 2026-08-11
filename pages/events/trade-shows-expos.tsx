import EventPageLayout from '../../components/EventPageLayout'
import { getTradeShowExpoPageProps } from '../../lib/tradeShowExpoPageProps'

const props = getTradeShowExpoPageProps({
  canonicalPath: '/events/trade-shows-expos',
  formSource: 'Trade Show & Expo Ads',
})

export default function TradeShowsExposAdsPage() {
  return <EventPageLayout {...props} />
}
