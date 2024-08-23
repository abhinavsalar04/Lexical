
import {useLexicalEditable} from '@lexical/react/useLexicalEditable';
import {createPortal} from 'react-dom';
import { TableCellActionMenuContainer } from './TableActionMenu/tableActionMenuContainer';

export default function TableActionMenuPlugin({
  anchorElem = document.body,
  cellMerge = false,
}) {
  const isEditable = useLexicalEditable();
  return createPortal(
    isEditable ? (
      <TableCellActionMenuContainer
        anchorElem={anchorElem}
        cellMerge={cellMerge}
      />
    ) : null,
    anchorElem,
  );
}
