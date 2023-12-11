import { assignInlineVars } from "@vanilla-extract/dynamic";

import * as css from "./Window.css";

interface HeaderOptions {
  disableMinimize: boolean;
  disableMaximize: boolean;
}

interface HeaderProps extends HeaderOptions {
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
}

const Header = (props: React.PropsWithChildren<HeaderProps>) => {
  const {
    children,
    disableMaximize,
    disableMinimize,
    onClose,
    onMaximize,
    onMinimize,
  } = props;

  return (
    <div className={css.header}>
      <div className={css.headerButtonGroup}>
        <button className={css.headerButton.close} onClick={onClose} />
        <button
          className={
            !disableMinimize
              ? css.headerButton.minimize
              : css.headerButton.disabled
          }
          onClick={onMinimize}
        />
        <button
          className={
            !disableMaximize
              ? css.headerButton.maximize
              : css.headerButton.disabled
          }
          onClick={onMaximize}
        />
      </div>
      {children}
    </div>
  );
};

/*
export const scrollbarStyle = css`
  ::-webkit-scrollbar {
    width: 8px;
    background: none;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    background-clip: padding-box;
    border: 2px solid transparent;
    border-radius: 4px;
  }
  ::-webkit-scrollbar-track {
    background: none;
  }
`;
*/

interface Props extends Partial<HeaderOptions> {
  title?: string;
  hideStatusBar?: boolean;
  x: number;
  y: number;
}

export const Window = (props: React.PropsWithChildren<Props>) => {
  const {
    children,
    title,
    disableMinimize = false,
    disableMaximize = false,
    x,
    y,
  } = props;

  return (
    <section
      className={css.frame}
      style={assignInlineVars({
        [css.xPos]: `${x}px`,
        [css.yPos]: `${y}px`,
      })}
    >
      <div className={css.wrapper}>
        <Header
          disableMinimize={disableMinimize}
          disableMaximize={disableMaximize}
        >
          {title}
        </Header>
        <div className={css.content}>{children}</div>
      </div>
    </section>
  );
};
