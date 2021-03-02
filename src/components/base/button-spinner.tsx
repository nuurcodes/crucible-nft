import React from 'react';
import { CgSpinner } from 'react-icons/cg';
import { CSSTransition } from 'react-transition-group';

type Props = {
  visible: boolean
}

const ButtonSpinner: React.FC<Props> = ({ visible }) => {
  return (
    <CSSTransition
      in={visible}
      timeout={200}
      unmountOnExit
      classNames='button-spinner'
    >
      <div className='button__spinner'>
        <CgSpinner className='button__spinner__icon animate-spin' />
      </div>
    </CSSTransition>
  );
};

export default ButtonSpinner;
