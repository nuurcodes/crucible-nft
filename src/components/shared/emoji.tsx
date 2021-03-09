import { ReactElement } from "react";

type Props = {
  label: string;
  symbol: string;
};

function Emoji (props: Props): ReactElement {
  return (
    <span
      className="emoji"
      role="img"
      aria-label={props.label || ''}
      aria-hidden={!props.label}
    >
      {props.symbol}
    </span>
  );
}

export default Emoji;
