import { BallTriangle } from 'react-loader-spinner';
import s from './Loader.module.css';

export default function Loader() {
  return (
    <div className={s.loaderWrap}>
      <BallTriangle
        heigth="100"
        width="100"
        color="grey"
        ariaLabel="loading-indicator"
      />
    </div>
  );
}
