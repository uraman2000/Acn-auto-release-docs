export const copyTable2 = () => {
  const elTable: any = document.querySelector("table");

  let range, sel;

  // Ensure that range and selection are supported by the browsers
  if (document.createRange && window.getSelection) {
    range = document.createRange();
    sel = window.getSelection();
    // unselect any element in the page

    sel?.removeAllRanges();

    try {
      range.selectNodeContents(elTable);
      sel?.addRange(range);
    } catch (e) {
      range.selectNode(elTable);
      sel?.addRange(range);
    }

    document.execCommand("copy");
  }

  sel?.removeAllRanges();

  console.log("Element Copied! Paste it in a file");
};

export const copyTable = () => {
  const elTable: any = document.getElementById(`table`);

  let range, sel;

  // Ensure that range and selection are supported by the browsers
  if (document.createRange && window.getSelection) {
    range = document.createRange();
    sel = window.getSelection();
    // unselect any element in the page

    sel?.removeAllRanges();

    try {
      range.selectNodeContents(elTable);
      sel?.addRange(range);
    } catch (e) {
      range.selectNode(elTable);
      sel?.addRange(range);
    }

    document.execCommand("copy");
  }

  sel?.removeAllRanges();

  console.log("Element Copied! Paste it in a file");
};
