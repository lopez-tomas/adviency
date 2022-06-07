import { useState, useEffect } from 'react';
import AppContext from './context/AppContext';
import useInitialState from './hooks/useInitialState';
import { Modal, Form, GiftList } from './containers/main';
import './styles/App.sass';

import volume from './images/volume.svg';
import mute from './images/volume-mute.svg';

const App = () => {
  const initialState = useInitialState();
  const [showAdd, setShowAdd] = useState(false);
  const [music, setMusic] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const url = 'https://andresguanov.github.io/assets/christmas.mp3';
    const music = new Audio(url);
    music.volume = 0.10;
    music.loop = true;
    setMusic(music);
  }, []);

  const handleMusic = () => {
    !isPlaying ? music?.play() : music?.pause();

    setIsPlaying(!isPlaying);
  }

  return (
    <AppContext.Provider value={initialState}>
      <main className="App">
        <section className="Form-container">
          <div>
            <h1>Gifts</h1>

            <figure className="btn music-btn">
              {isPlaying
                ? <img onClick={handleMusic} src={mute} alt="mute" />
                : <img onClick={handleMusic} src={volume} alt="volume" />
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