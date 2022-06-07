import { ContextProps } from '../types';
import { Gift } from '../gifts/gift.model';

import { useContext, useState, useEffect } from 'react';
import AppContext from '../context/AppContext';
import Modal from './Modal';
import GiftFC from '../components/GiftFC';

import xmas from '../images/undraw-xmas-surprise.svg';
import '../styles/GiftList.sass';

interface Props {
  onClose?: () => void;
  preview?: boolean;
  total?: string;
}

const totalPriceReducer = (prev: number, curr: Gift): number => {
  return prev + (curr.price * curr.quantity);
}

const GiftList: React.FC<Props> = ({ onClose, preview, total }) => {
  const { state, deleteAll } = useContext<ContextProps>(AppContext);
  const [areThereGifts, setAreThereGifts] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [totalPrice, setTotalPrice] = useState('');

  useEffect(() => {
    state?.gifts.length !== 0 ? setAreThereGifts(true) : setAreThereGifts(false);
    setTotalPrice((state?.gifts.reduce(totalPriceReducer, 0)!).toFixed(2));
  }, [state?.gifts])

  return (
    areThereGifts
      ?
        <div className={`GiftList ${preview ? 'preview' : ''}`}>
          <ul id="list" className="List">
            {state?.gifts.map(gift => (
              <GiftFC key={gift.id} gift={gift} preview={preview} />
            ))}
          </ul>
          <div className={`total-container ${preview ? 'preview' : ''}`}>
            <p>Total: $ {totalPrice}</p>
          </div>
          <div className={`noGifts-container ${preview ? 'preview' : ''}`}>
            {!preview
              ?
                <>
                  <button
                    onClick={deleteAll}
                    className="noGifts-btn"
                  >
                    Remove ALL
                  </button>
                  <button
                    onClick={() => setShowPreview(!showPreview)}
                    className="noGifts-preview"
                  >
                    Preview
                  </button>
                </>
              :
              <>
                <h2>Total: $ {total}</h2>
                <div className="noGifts-buttons">
                  <button
                    onClick={onClose}
                    className="noGifts-close"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      const toPrint = document.getElementById('list')!.innerHTML;
                      const original = document.body.innerHTML;

                      document.body.innerHTML = toPrint;
                      window.print();

                      document.body.innerHTML = original;
                      window.location.reload();
                    }}
                    className="noGifts-print"
                  >
                    Print
                  </button>
                </div>
              </>
            }
          </div>

          <Modal show={showPreview} onClose={() => setShowPreview(false)}>
            <>
              <h1>Buy:</h1>
              <GiftList onClose={() => setShowPreview(false)} preview total={totalPrice} />
            </>
          </Modal>
        </div>
      :
        <div className="GiftList">
          <div className="noGifts-container">
            <img className="noGifts-img" src={xmas} alt="No gifts added"/>
            <p className="noGifts-msg">No gifts added :(</p>
          </div>
        </div>
  )
}

export default GiftList;