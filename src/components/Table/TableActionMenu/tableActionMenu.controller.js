import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $deleteTableColumn__EXPERIMENTAL,
  $deleteTableRow__EXPERIMENTAL,
  $getNodeTriplet,
  $getTableColumnIndexFromTableCellNode,
  $getTableNodeFromLexicalNodeOrThrow,
  $getTableRowIndexFromTableCellNode,
  $insertTableColumn__EXPERIMENTAL,
  $insertTableRow__EXPERIMENTAL,
  $isTableCellNode,
  $isTableRowNode,
  $isTableSelection,
  $unmergeCell,
  getTableObserverFromTableElement,
  TableCellHeaderStates,
  TableCellNode,
} from '@lexical/table';
import {
  $createParagraphNode,
  $getRoot,
  $getSelection,
  $isParagraphNode,
  $isRangeSelection,
} from 'lexical';
import { useCallback, useEffect, useRef, useState } from "react";
import { $canUnmerge, $cellContainsEmptyParagraph, $selectLastDescendant, currentCellBackgroundColor, isTableSelectionRectangular } from "./tableActionFunctions";

export function useTableActionMenuController ({onClose,
    tableCellNode: _tableCellNode,
    setIsMenuOpen,
    contextRef,
}) {


    const [editor] = useLexicalComposerContext();
    const dropDownRef = useRef(null);
    const [tableCellNode, updateTableCellNode] = useState(_tableCellNode);
    const [selectionCounts, updateSelectionCounts] = useState({
    columns: 1,
    rows: 1,
    });
    const [canMergeCells, setCanMergeCells] = useState(false);
    const [canUnmergeCell, setCanUnmergeCell] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState(
    () => currentCellBackgroundColor(editor) || '',
    );


    function computeSelectionCount(selection) {
        const selectionShape = selection.getShape();
        return {
          columns: selectionShape.toX - selectionShape.fromX + 1,
          rows: selectionShape.toY - selectionShape.fromY + 1,
        };
      }
    
    useEffect(() => {
    return editor.registerMutationListener(
        TableCellNode,
        (nodeMutations) => {
        const nodeUpdated =
            nodeMutations.get(tableCellNode.getKey()) === 'updated';

        if (nodeUpdated) {
            editor.getEditorState().read(() => {
            updateTableCellNode(tableCellNode.getLatest());
            });
            setBackgroundColor(currentCellBackgroundColor(editor) || '');
        }
        },
        {skipInitialization: true},
    );
    }, [editor, tableCellNode]);

    useEffect(() => {
    editor.getEditorState().read(() => {
        const selection = $getSelection();
        // Merge cells
        if ($isTableSelection(selection)) {
        const currentSelectionCounts = computeSelectionCount(selection);
        updateSelectionCounts(computeSelectionCount(selection));
        setCanMergeCells(
            isTableSelectionRectangular(selection) &&
            (currentSelectionCounts.columns > 1 ||
                currentSelectionCounts.rows > 1),
        );
        }
        // Unmerge cell
        setCanUnmergeCell($canUnmerge());
    });
    }, [editor]);

    useEffect(() => {
    const menuButtonElement = contextRef.current;
    const dropDownElement = dropDownRef.current;
    const rootElement = editor.getRootElement();

    if (
        menuButtonElement != null &&
        dropDownElement != null &&
        rootElement != null
    ) {
        const rootEleRect = rootElement.getBoundingClientRect();
        const menuButtonRect = menuButtonElement.getBoundingClientRect();
        dropDownElement.style.opacity = '1';
        const dropDownElementRect = dropDownElement.getBoundingClientRect();
        const margin = 5;
        let leftPosition = menuButtonRect.right + margin;
        if (
        leftPosition + dropDownElementRect.width > window.innerWidth ||
        leftPosition + dropDownElementRect.width > rootEleRect.right
        ) {
        const position =
            menuButtonRect.left - dropDownElementRect.width - margin;
        leftPosition = (position < 0 ? margin : position) + window.pageXOffset;
        }
        dropDownElement.style.left = `${leftPosition + window.pageXOffset}px`;

        let topPosition = menuButtonRect.top;
        if (topPosition + dropDownElementRect.height > window.innerHeight) {
        const position = menuButtonRect.bottom - dropDownElementRect.height;
        topPosition = (position < 0 ? margin : position) + window.pageYOffset;
        }
        dropDownElement.style.top = `${topPosition + +window.pageYOffset}px`;
    }
    }, [contextRef, dropDownRef, editor]);

    useEffect(() => {
    function handleClickOutside(event) {
        if (
        dropDownRef.current != null &&
        contextRef.current != null &&
        !dropDownRef.current.contains(event.target) &&
        !contextRef.current.contains(event.target)
        ) {
        setIsMenuOpen(false);
        }
    }

    window.addEventListener('click', handleClickOutside);

    return () => window.removeEventListener('click', handleClickOutside);
    }, [setIsMenuOpen, contextRef]);

    const clearTableSelection = useCallback(() => {
    editor.update(() => {
        if (tableCellNode.isAttached()) {
        const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode);
        const tableElement = editor.getElementByKey(
            tableNode.getKey(),
        );

        if (!tableElement) {
            throw new Error('Expected to find tableElement in DOM');
        }

        const tableSelection = getTableObserverFromTableElement(tableElement);
        if (tableSelection !== null) {
            tableSelection.clearHighlight();
        }

        tableNode.markDirty();
        updateTableCellNode(tableCellNode.getLatest());
        }

        const rootNode = $getRoot();
        rootNode.selectStart();
    });
    }, [editor, tableCellNode]);

    const mergeTableCellsAtSelection = () => {
    editor.update(() => {
        const selection = $getSelection();
        if ($isTableSelection(selection)) {
        const {columns, rows} = computeSelectionCount(selection);
        const nodes = selection.getNodes();
        let firstCell = null;
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            if ($isTableCellNode(node)) {
            if (firstCell === null) {
                node.setColSpan(columns).setRowSpan(rows);
                firstCell = node;
                const isEmpty = $cellContainsEmptyParagraph(node);
                let firstChild;
                if (
                isEmpty &&
                $isParagraphNode((firstChild = node.getFirstChild()))
                ) {
                firstChild.remove();
                }
            } else if ($isTableCellNode(firstCell)) {
                const isEmpty = $cellContainsEmptyParagraph(node);
                if (!isEmpty) {
                firstCell.append(...node.getChildren());
                }
                node.remove();
            }
            }
        }
        if (firstCell !== null) {
            if (firstCell.getChildrenSize() === 0) {
            firstCell.append($createParagraphNode());
            }
            $selectLastDescendant(firstCell);
        }
        onClose();
        }
    });
    };

    const unmergeTableCellsAtSelection = () => {
    editor.update(() => {
        $unmergeCell();
    });
    };

    const insertTableRowAtSelection = useCallback(
    (shouldInsertAfter)  => {
        editor.update(() => {
        $insertTableRow__EXPERIMENTAL(shouldInsertAfter);
        onClose();
        });
    },
    [editor, onClose],
    );

    const insertTableColumnAtSelection = useCallback(
    (shouldInsertAfter)  => {
        editor.update(() => {
        for (let i = 0; i < selectionCounts.columns; i++) {
            $insertTableColumn__EXPERIMENTAL(shouldInsertAfter);
        }
        onClose();
        });
    },
    [editor, onClose, selectionCounts.columns],
    );

    const deleteTableRowAtSelection = useCallback(() => {
    editor.update(() => {
        $deleteTableRow__EXPERIMENTAL();
        onClose();
    });
    }, [editor, onClose]);

    const deleteTableAtSelection = useCallback(() => {
    editor.update(() => {
        const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode);
        tableNode.remove();

        clearTableSelection();
        onClose();
    });
    }, [editor, tableCellNode, clearTableSelection, onClose]);

    const deleteTableColumnAtSelection = useCallback(() => {
    editor.update(() => {
        $deleteTableColumn__EXPERIMENTAL();
        onClose();
    });
    }, [editor, onClose]);

    const toggleTableRowIsHeader = useCallback(() => {
    editor.update(() => {
        const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode);

        const tableRowIndex = $getTableRowIndexFromTableCellNode(tableCellNode);

        const tableRows = tableNode.getChildren();

        if (tableRowIndex >= tableRows.length || tableRowIndex < 0) {
        throw new Error('Expected table cell to be inside of table row.');
        }

        const tableRow = tableRows[tableRowIndex];

        if (!$isTableRowNode(tableRow)) {
        throw new Error('Expected table row');
        }

        tableRow.getChildren().forEach((tableCell) => {
        if (!$isTableCellNode(tableCell)) {
            throw new Error('Expected table cell');
        }

        tableCell.toggleHeaderStyle(TableCellHeaderStates.ROW);
        });

        clearTableSelection();
        onClose();
    });
    }, [editor, tableCellNode, clearTableSelection, onClose]);

    const toggleTableColumnIsHeader = useCallback(() => {
    editor.update(() => {
        const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode);

        const tableColumnIndex =
        $getTableColumnIndexFromTableCellNode(tableCellNode);

        const tableRows = tableNode.getChildren();
        const maxRowsLength = Math.max(
        ...tableRows.map((row) => row.getChildren().length),
        );

        if (tableColumnIndex >= maxRowsLength || tableColumnIndex < 0) {
        throw new Error('Expected table cell to be inside of table row.');
        }

        for (let r = 0; r < tableRows.length; r++) {
        const tableRow = tableRows[r];

        if (!$isTableRowNode(tableRow)) {
            throw new Error('Expected table row');
        }

        const tableCells = tableRow.getChildren();
        if (tableColumnIndex >= tableCells.length) {
            // if cell is outside of bounds for the current row (for example various merge cell cases) we shouldn't highlight it
            continue;
        }

        const tableCell = tableCells[tableColumnIndex];

        if (!$isTableCellNode(tableCell)) {
            throw new Error('Expected table cell');
        }

        tableCell.toggleHeaderStyle(TableCellHeaderStates.COLUMN);
        }

        clearTableSelection();
        onClose();
    });
    }, [editor, tableCellNode, clearTableSelection, onClose]);

    const handleCellBackgroundColor = useCallback(
    (value) => {
        editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection) || $isTableSelection(selection)) {
            const [cell] = $getNodeTriplet(selection.anchor);
            if ($isTableCellNode(cell)) {
            cell.setBackgroundColor(value);
            }

            if ($isTableSelection(selection)) {
            const nodes = selection.getNodes();

            for (let i = 0; i < nodes.length; i++) {
                const node = nodes[i];
                if ($isTableCellNode(node)) {
                node.setBackgroundColor(value);
                }
            }
            }
        }
        });
    },
    [editor],
    );

    return {
        selectionCounts, insertTableColumnAtSelection, deleteTableColumnAtSelection, deleteTableRowAtSelection, deleteTableAtSelection, toggleTableRowIsHeader, toggleTableColumnIsHeader, tableCellNode, canMergeCells, mergeTableCellsAtSelection, canUnmergeCell, unmergeTableCellsAtSelection, dropDownRef, backgroundColor, handleCellBackgroundColor, insertTableRowAtSelection
    }
}