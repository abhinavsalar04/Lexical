
import {
  TableCellHeaderStates,
} from '@lexical/table';
import { createPortal } from "react-dom";
import ColorPicker from "../../ColorPicker/ColorPicker";
import { useTableActionMenuController } from "./tableActionMenu.controller";

  export function TableActionMenu({
    onClose,
    tableCellNode: _tableCellNode,
    setIsMenuOpen,
    contextRef,
    cellMerge,
    showColorPickerModal,
  }) {
    const {selectionCounts, insertTableColumnAtSelection, deleteTableColumnAtSelection, deleteTableRowAtSelection, deleteTableAtSelection, toggleTableRowIsHeader, toggleTableColumnIsHeader, tableCellNode, canMergeCells, mergeTableCellsAtSelection, canUnmergeCell, unmergeTableCellsAtSelection, dropDownRef, backgroundColor, handleCellBackgroundColor, insertTableRowAtSelection} = useTableActionMenuController({
      onClose,
      tableCellNode: _tableCellNode,
      setIsMenuOpen,
      contextRef,
      cellMerge,
      showColorPickerModal,
    })
    let mergeCellButton = null;
    if (cellMerge) {
      if (canMergeCells) {
        mergeCellButton = (
          <button
            type="button"
            className="item"
            onClick={() => mergeTableCellsAtSelection()}
            data-test-id="table-merge-cells">
            Merge cells
          </button>
        );
      } else if (canUnmergeCell) {
        mergeCellButton = (
          <button
            type="button"
            className="item"
            onClick={() => unmergeTableCellsAtSelection()}
            data-test-id="table-unmerge-cells">
            Unmerge cells
          </button>
        );
      }
    }
  
    return createPortal(
      <div
        className="dropdown"
        ref={dropDownRef}
        onClick={(e) => {
          e.stopPropagation();
        }}>
        {mergeCellButton}
        <button
          type="button"
          className="item"
          onClick={() =>
            showColorPickerModal('Cell background color', () => (
              <ColorPicker
                color={backgroundColor}
                onChange={handleCellBackgroundColor}
              />
            ))
          }
          data-test-id="table-background-color">
          <span className="text">Background color</span>
        </button>
        <hr />
        <button
          type="button"
          className="item"
          onClick={() => insertTableRowAtSelection(false)}
          data-test-id="table-insert-row-above">
          <span className="text">
            Insert{' '}
            {selectionCounts.rows === 1 ? 'row' : `${selectionCounts.rows} rows`}{' '}
            above
          </span>
        </button>
        <button
          type="button"
          className="item"
          onClick={() => insertTableRowAtSelection(true)}
          data-test-id="table-insert-row-below">
          <span className="text">
            Insert{' '}
            {selectionCounts.rows === 1 ? 'row' : `${selectionCounts.rows} rows`}{' '}
            below
          </span>
        </button>
        <hr />
        <button
          type="button"
          className="item"
          onClick={() => insertTableColumnAtSelection(false)}
          data-test-id="table-insert-column-before">
          <span className="text">
            Insert{' '}
            {selectionCounts.columns === 1
              ? 'column'
              : `${selectionCounts.columns} columns`}{' '}
            left
          </span>
        </button>
        <button
          type="button"
          className="item"
          onClick={() => insertTableColumnAtSelection(true)}
          data-test-id="table-insert-column-after">
          <span className="text">
            Insert{' '}
            {selectionCounts.columns === 1
              ? 'column'
              : `${selectionCounts.columns} columns`}{' '}
            right
          </span>
        </button>
        <hr />
        <button
          type="button"
          className="item"
          onClick={() => deleteTableColumnAtSelection()}
          data-test-id="table-delete-columns">
          <span className="text">Delete column</span>
        </button>
        <button
          type="button"
          className="item"
          onClick={() => deleteTableRowAtSelection()}
          data-test-id="table-delete-rows">
          <span className="text">Delete row</span>
        </button>
        <button
          type="button"
          className="item"
          onClick={() => deleteTableAtSelection()}
          data-test-id="table-delete">
          <span className="text">Delete table</span>
        </button>
        <hr />
        <button
          type="button"
          className="item"
          onClick={() => toggleTableRowIsHeader()}>
          <span className="text">
            {(tableCellNode.__headerState & TableCellHeaderStates.ROW) ===
            TableCellHeaderStates.ROW
              ? 'Remove'
              : 'Add'}{' '}
            row header
          </span>
        </button>
        <button
          type="button"
          className="item"
          onClick={() => toggleTableColumnIsHeader()}
          data-test-id="table-column-header">
          <span className="text">
            {(tableCellNode.__headerState & TableCellHeaderStates.COLUMN) ===
            TableCellHeaderStates.COLUMN
              ? 'Remove'
              : 'Add'}{' '}
            column header
          </span>
        </button>
      </div>,
      document.body,
    );
  }