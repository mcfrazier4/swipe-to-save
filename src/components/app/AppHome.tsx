import { SaveWidget } from '../widget/SaveWidget';
import { CoinIcon } from '../icons';

export function AppHome() {
  return (
    <div className="apphome">
      <div className="apphome__top">
        <span className="wordmark">
          <span className="wordmark__disc" aria-hidden />
          sundollar
        </span>
        <span className="avatar" aria-hidden>
          RM
        </span>
      </div>

      <div>
        <h1 className="apphome__greeting">Hey, Riley</h1>
        <p className="apphome__balance">Checking · $1,284.09</p>
      </div>

      <SaveWidget />

      <div className="apphome__teaser">
        <span className="apphome__teaser-icon" aria-hidden>
          <CoinIcon width={20} height={20} />
        </span>
        <div>
          <p className="apphome__teaser-title">Round-ups</p>
          <p className="apphome__teaser-copy">Stash the spare change from every card tap.</p>
        </div>
      </div>
    </div>
  );
}
