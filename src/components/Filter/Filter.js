import PropTypes from 'prop-types';
import s from './Filter.module.css';

export default function Filter({ changeFilter }) {
  return (
    <div className={s.filter}>
      <label htmlFor="filter" className={s.title}>
        Find contacts
      </label>
      <input
        className={s.input}
        id="filter"
        onChange={e => changeFilter(e.target.value)}
      />
    </div>
  );
}

Filter.propTypes = {
  changeFilter: PropTypes.func.isRequired,
};
