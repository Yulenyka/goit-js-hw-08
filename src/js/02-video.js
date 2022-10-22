import Player from '@vimeo/player';
import { throttle } from 'lodash';

const videoEl = document.querySelector('iframe');
const player = new Player(videoEl);
const TIME_KEY = 'videoplayer-current-time';

player.on(
    'timeupdate',
    throttle(event => {
      localStorage.setItem(TIME_KEY, event.seconds);
    }, 1000)
);

player.setCurrentTime(localStorage.getItem(TIME_KEY));