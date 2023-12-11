import * as css from "./Window.css";

interface HeaderProps {
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
}

const Header = (props: React.PropsWithChildren<HeaderProps>) => {
  return (
    <div className={css.header}>
      <div className={css.headerButtonGroup}>
        <button className={css.headerButton.close} onClick={props.onClose} />
        <button className={css.headerButton.minimize} onClick={props.onMinimize} />
        <button className={css.headerButton.maximize}onClick={props.onMaximize}  />
      </div>
      {props.children}
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

interface Props {
  title?: string;
  hideStatusBar?: boolean;
};

export const Window = (props: React.PropsWithChildren<Props>) => {
  const { children, title } = props;

  return (
    <section className={css.frame}>
      <div className={css.wrapper}>
        <Header>{title}</Header>
        <div className={css.content}>
          {children}
        </div>
      </div>
    </section>
  );
};
