import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

// --------------- ICONS --------------------- //
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { BiEqualizer } from 'react-icons/bi';
import { BsExclamationDiamondFill } from 'react-icons/bs';
import { BsPersonPlus } from 'react-icons/bs';
import { FaUserCheck } from 'react-icons/fa';
// ------------------------------------------- //

class BandProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bandId: null,
      songId: null,
      bandName: null,
      bandImageUrl: null,
      followers: null,
      tracks: null,
      isFollowing: false
    };
    this.updateBio = this.updateBio.bind(this);
    this.handleFollowClick = this.handleFollowClick.bind(this);
    this.getIdAndUpdateDOM = this.getIdAndUpdateDOM.bind(this);

    this.getIdAndUpdateDOM();
  }

  updateBio(data) {
    this.setState({
      bandId: data.band_id,
      songId: data.songId,
      bandName: data.band_name,
      bandImageUrl: data.band_image_url,
      followers: data.followers,
      tracks: data.tracks,
      isFollowed: false
    });
  }

  handleFollowClick(event) {
    var bandId = event.target.value;
    this.setState({
      isFollowed: !this.state.isFollowed
    }, () => {
      // post request to server to update followers

      axios.post('/bands/followers', {
        id: bandId,
        value: this.state.isFollowed ? 1 : -1
      })
        .then((response) => {
          if (this.state.isFollowed === true) {
            this.setState({
              followers: this.state.followers + 1
            });
          } else {
            this.setState({
              followers: this.state.followers - 1
            });
          }
        })
        .catch((error) => {
          console.log('Error updating followers: ', error);
        });
    });
  }

  getIdAndUpdateDOM() {
    let splitUrl = window.location.pathname.split('/');
    let songId = splitUrl.filter(function(id) {
      return parseInt(id);
    });
    axios.get(`/bands/get/${songId}`)
      .then((response) => {
        this.updateBio(response.data);
      })
      .catch((error) => {
        console.log('Error setting initial state: ', error);
      });
  }

  render () {
    return (
      <div className="cam artist-bio">
        <img className="band-image" src={this.state.bandImageUrl}/>
        <h3 className="band-name">{this.state.bandName}</h3>
        <div className="user-stats">
          <ul>
            <li>
              <FontAwesomeIcon className="followers-icon" icon={faUserFriends}/> <span className="followers">{this.state.followers}</span><BiEqualizer className="tracks-icon" /> <span className="tracks">{this.state.tracks}</span>
            </li>
          </ul>
        </div>
        <div>
          {this.state.isFollowed ? <button className="following-btn" value={this.state.bandId} onClick={this.handleFollowClick}><FaUserCheck/> Following </button> : <button className='follow-btn' value={this.state.bandId} onClick={this.handleFollowClick}> <BsPersonPlus/>  Follow </button>}
        </div>
        <ul>

          <li>
            <BsExclamationDiamondFill className="report-icon" /> <span className="report-text">Report</span>
          </li>
        </ul>
      </div>
    );
  }
}

export default BandProfile;
