import type { PropsWithChildren } from "react";
import { Window } from "../Window";
import * as css from "./Settings.css";

interface RowProps {
  label: string;
}

const Row = (props: PropsWithChildren<RowProps>) => {
  const { label, children } = props;
  return (
    <div className={css.row}>
      <p className={css.rowLabel}>{label}</p>
      {children}
    </div>
  );
};

export const Settings = () => {
  return (
    <Window title="Settings" x="70%" y="40%" maximizeDisabled>
      <div className={css.container}>
        <div className={css.list}>
          <Row label="Color mode">
            Auto / Light / Dark
          </Row>
        </div>
      </div>
    </Window>
  );
};
