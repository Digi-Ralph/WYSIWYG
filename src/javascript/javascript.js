// Editor & text manupilation.

const text_bold = document.getElementById("bold")
text_bold.addEventListener('click', e => {
    const SelectionText = window.getSelection().toString()
    document.execCommand('bold', false, SelectionText)
})
//ITALIC
const text_italic = document.getElementById("italic")
text_italic.addEventListener('click', e => {
    const SelectionText = window.getSelection().toString()
    document.execCommand('italic', false, SelectionText)
})
//underline
const text_underline = document.getElementById("underline")
text_underline.addEventListener('click', e => {
    const SelectionText = window.getSelection().toString()
    document.execCommand('underline', false, SelectionText)
    
})

//Highlight
// bug => from right to left works / anchoring from left to right create a bug where 
// all text written or the caret position get inside the colored tag (highlited)
// fix with white-space = pre-wrap  on the parent cotenteditable. 
const text_highlight = document.getElementById("highlighter")
text_highlight.addEventListener('click', e => {
    document.execCommand('HiliteColor', false, 'yellow')
    const Sel = window.getSelection()
    const space = `\uFEFF`
    const node = Sel.anchorNode.parentElement // select the wrapped text
    node.insertAdjacentHTML("afterend", space) // bug fixing //fixed with pre-wrap
    Sel.removeAllRanges()
})


//HyperLink
const hyperLink = document.getElementById('link')
hyperLink.addEventListener('click', e => {
    const link = prompt('Enter a URL:', 'http://');
    var savedSel = saveSelection();
    var url = link;
    restoreSelection(savedSel);
    document.execCommand("CreateLink", false, url);
    const TheSel = window.getSelection()
    const range = TheSel.getRangeAt(0)
    const att = range.endContainer.parentElement // select the selected node
    att.setAttribute('style', `cursor:pointer;`)
    att.setAttribute('target', `_blank`)


    function saveSelection() {
        if (window.getSelection) {
            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                const ranges = [];
                for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                    ranges.push(sel.getRangeAt(i));
                }
                return ranges;
            }
        } else if (document.selection && document.selection.createRange) {
            return document.selection.createRange();
        }
        return null;
    }

    function restoreSelection(savedSel) {
        if (savedSel) {
            if (window.getSelection) {
                sel = window.getSelection();
                sel.removeAllRanges();
                for (var i = 0, len = savedSel.length; i < len; ++i) {
                    sel.addRange(savedSel[i]);
                }
            } else if (document.selection && savedSel.select) {
                savedSel.select();
            }
        }
    }



})
