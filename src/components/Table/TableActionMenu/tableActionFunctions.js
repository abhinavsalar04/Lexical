import {
  $getSelection,
  $isElementNode,
  $isParagraphNode,
  $isRangeSelection,
  $isTextNode,
} from 'lexical';

import {
  $getNodeTriplet,
  $isTableCellNode,
  $isTableRowNode,
  $isTableSelection,
} from '@lexical/table';
import invariant from '../../../utils/invariants';

export function isTableSelectionRectangular(selection) {
    const nodes = selection.getNodes();
    const currentRows = [];
    let currentRow = null;
    let expectedColumns = null;
    let currentColumns = 0;
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if ($isTableCellNode(node)) {
        const row = node.getParentOrThrow();
        invariant(
          $isTableRowNode(row),
          'Expected CellNode to have a RowNode parent',
        );
        if (currentRow !== row) {
          if (expectedColumns !== null && currentColumns !== expectedColumns) {
            return false;
          }
          if (currentRow !== null) {
            expectedColumns = currentColumns;
          }
          currentRow = row;
          currentColumns = 0;
        }
        const colSpan = node.__colSpan;
        for (let j = 0; j < colSpan; j++) {
          if (currentRows[currentColumns + j] === undefined) {
            currentRows[currentColumns + j] = 0;
          }
          currentRows[currentColumns + j] += node.__rowSpan;
        }
        currentColumns += colSpan;
      }
    }
    return (
      (expectedColumns === null || currentColumns === expectedColumns) &&
      currentRows.every((v) => v === currentRows[0])
    );
  }
  
  export function $canUnmerge() {
    const selection = $getSelection();
    if (
      ($isRangeSelection(selection) && !selection.isCollapsed()) ||
      ($isTableSelection(selection) && !selection.anchor.is(selection.focus)) ||
      (!$isRangeSelection(selection) && !$isTableSelection(selection))
    ) {
      return false;
    }
    const [cell] = $getNodeTriplet(selection.anchor);
    return cell.__colSpan > 1 || cell.__rowSpan > 1;
  }
  
  export function $cellContainsEmptyParagraph(cell) {
    if (cell.getChildrenSize() !== 1) {
      return false;
    }
    const firstChild = cell.getFirstChildOrThrow();
    if (!$isParagraphNode(firstChild) || !firstChild.isEmpty()) {
      return false;
    }
    return true;
  }
  
  export function $selectLastDescendant(node) {
    const lastDescendant = node.getLastDescendant();
    if ($isTextNode(lastDescendant)) {
      lastDescendant.select();
    } else if ($isElementNode(lastDescendant)) {
      lastDescendant.selectEnd();
    } else if (lastDescendant !== null) {
      lastDescendant.selectNext();
    }
  }
  
  export function currentCellBackgroundColor(editor) {
    return editor.getEditorState().read(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection) || $isTableSelection(selection)) {
        const [cell] = $getNodeTriplet(selection.anchor);
        if ($isTableCellNode(cell)) {
          return cell.getBackgroundColor();
        }
      }
      return null;
    });
  }