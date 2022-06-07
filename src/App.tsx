import { useState, useEffect } from 'react';
import AppContext from './context/AppContext';
import useInitialState from './hooks/useInitialState';
import { Modal, Form, GiftList } from './containers/main';
import './styles/App.sass';

import volume from "./images/volume.svg";
import mute from "./images/volume-mute.svg"

const App = () => {
  const initialState = useInitialState();
  const [showAdd, setShowAdd] = useState(false);
  const [music, setMusic] = useState<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const url = 'https://andresguanov.github.io/assets/christmas.mp3';
    const music = new Audio(url);
    music.volume = 0.12;
    music.muted = true;
    music.loop = true;
    music.autoplay = true;

    setMusic(music);
    setIsMuted(music.muted);
  }, []);

  const handleMusic = () => {
    if (isMuted) {
      music!.muted = false;
    } else {
      music!.muted= true;
    }

    setIsMuted(!isMuted);
  }

  return (
    <AppContext.Provider value={initialState}>
      <main className="App">
        <section className="Form-container">
          <div>
            <h1>Gifts</h1>

            <figure
              onClick={handleMusic}
              className="btn music-btn">
              {isMuted
                ? <img src={mute} alt="Music muted" />
                : <img src={volume} alt="Music unmuted" />
              }
            </figure>
          </div>
          <button
            onClick={() => setShowAdd(!showAdd)}
            className="btn add-btn"
          >
            Add gift
          </button>

          <Modal show={showAdd} onClose={() => setShowAdd(false)}>
            <Form onClose={() => setShowAdd(false)} />
          </Modal>
        </section>
        <section className="GiftList-container">
          <GiftList />
        </section>
      </main>
    </AppContext.Provider>
  )
}

export default App;