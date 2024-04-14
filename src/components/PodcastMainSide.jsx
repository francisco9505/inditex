import * as PropTypes from 'prop-types';
import './PodcastMainSide.css'

PodcastMainSide.propTypes = {podcast: PropTypes.object};

export function PodcastMainSide({podcast}) {
  return <div className="podcast__main-side">
    <div className="podcast__main-side--img">
      <img alt="podcast-img" src={podcast["im:image"][2].label}/>
    </div>
    <hr/>
    <div className="podcast__main-side--vertical-align">
      <span className="podcast__main-side--podcast-name">{podcast["im:name"].label}</span>
      <span className="podcast__main-side--artist-name">by {podcast["im:artist"].label}</span>
    </div>
    <hr/>
    <div className="podcast__main-side--vertical-align">
      <span className="podcast__main-side--description">Description:</span>
      <span className="podcast__main-side--summary">{podcast.summary.label}</span>
    </div>
  </div>;
}