
import './buttonStyle.css';
export default function Button({
  'data-test-id': dataTestId,
  children,
  className,
  onClick,
  disabled,
  small,
  title,
}){

  
  function joinClasses(...args) {
    return args.filter(Boolean).join(' ');
  }
  return (
    <button
      disabled={disabled}
      className={joinClasses(
        'LexicalButton__root',
        disabled && 'LexicalButton__disabled',
        small && 'LexicalButton__small',
        className,
      )}
      onClick={onClick}
      title={title}
      aria-label={title}
      {...(dataTestId && {'data-test-id': dataTestId})}>
      {children}
    </button>
  );
}
