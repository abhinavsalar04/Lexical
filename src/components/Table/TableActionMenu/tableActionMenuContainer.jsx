
import {TableActionMenu} from "./tableActionMenu"
import {useTableMenuContainerController} from "./tableMenuContainer.controller" 

 export function TableCellActionMenuContainer({
    anchorElem,
    cellMerge,
  }) {

    const {tableCellNode, menuButtonRef, menuRootRef, isMenuOpen, setIsMenuOpen, colorPickerModal, showColorPickerModal} = useTableMenuContainerController({anchorElem});
    console.log("TableCellActionMenuContainer")
    return (
      <div className="table-cell-action-button-container" ref={menuButtonRef}>
        {tableCellNode != null && (
          <>
            <button
              type="button"
              className="table-cell-action-button chevron-down"
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
              ref={menuRootRef}>
              <i className="chevron-down" />
            </button>
            {colorPickerModal}
            {isMenuOpen && (
              <TableActionMenu
                contextRef={menuRootRef}
                setIsMenuOpen={setIsMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                tableCellNode={tableCellNode}
                cellMerge={cellMerge}
                showColorPickerModal={showColorPickerModal}
              />
            )}
          </>
        )}
      </div>
    );
  }