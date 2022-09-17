import React from 'react';
import s from './Avatar.module.css';

export default function Avatar({ avatar }) {
  return (
    <div className={s.avatar}>
      <img className={s.avatar} alt="avatar" src={avatar} />
    </div>
  );
}
