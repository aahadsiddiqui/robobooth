import EventPageLayout from '../../components/EventPageLayout'
import { getTradeShowExpoPageProps } from '../../lib/tradeShowExpoPageProps'

const props = getTradeShowExpoPageProps()

export default function TradeShowExpoPage() {
  return <EventPageLayout {...props} />
}
