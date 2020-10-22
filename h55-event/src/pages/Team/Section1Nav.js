import React from 'react';

const Section1Nav = () => {
  return (
    <section className='sec1'>
      <div className='sec1-box'>
        <a href='#!' onClick={() => window.alert('已經超過報名期限了喔')}>
          {' '}
        </a>
        <a href='#!' onClick={() => window.alert('已經超過報名期限了喔')}>
          {' '}
        </a>
      </div>
    </section>
  );
};

export default Section1Nav;
