import React from 'react';
import classnames from 'classnames';

import ButtonSpinner from './button-spinner';

type Props = React.ComponentPropsWithRef<'button'> & {
  className?: string
  isLoading?: boolean
  isRound?: boolean
  isFullWidth?: boolean
  variant?: 'filled' | 'outline'
  colorScheme?: 'primary'
  size?: 'sm' | 'md' | 'lg'
}

const Button: React.FC<Props> = ({
  children,
  className,
  isLoading,
  isRound,
  isFullWidth,
  variant = 'filled',
  colorScheme = 'primary',
  size = 'md',
  ...otherProps
}) => {
  const classes = classnames('button', className, {
    'button--rounded': isRound,
    'button--fullwidth': isFullWidth,
    [`button--${size}`]: size,
    [`button--${variant}`]: variant,
    [`button--${colorScheme}`]: colorScheme
  });

  return (
    <button
      className={classes}
      data-loading={isLoading}
      disabled={isLoading}
      {...otherProps}
    >
      <ButtonSpinner visible={!!isLoading} />
      {children}
    </button>
  );
};

export default Button;
