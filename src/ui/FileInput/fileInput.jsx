
import './fileStyle.css';

export default function FileInput({
  accept,
  label,
  onChange,
  'data-test-id': dataTestId,
}) {
  return (
    <div className="Lexical_FileInput__wrapper">
      <label className="Lexical_FileInput__label">{label}</label>
      <input
        type="file"
        accept={accept}
        className="Lexical_FileInput__input"
        onChange={(e) => onChange(e.target.files)}
        data-test-id={dataTestId}
      />
    </div>
  );
}
