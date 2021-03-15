// Editor & text manupilation.
const tooltip = document.getElementById("tooltip");
// console.log(tooltip)
//   bold
//               italic
//                 highlighter



//                 font
//                 quote
//                link


// BOLD
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
// only works with white-space = pre-wrap  on the parent cotenteditable. 
const text_highlight = document.getElementById("highlighter")
text_highlight.addEventListener('click', e => {
    const Sel = window.getSelection()
    document.execCommand('HiliteColor', false, 'yellow')
    const space = `\uFEFF`
    const node = Sel.anchorNode.parentElement // select the wrapped text
    // const scontainer = Sel.endContainer.parentNode
// console.log(scontainer)
    node.insertAdjacentHTML("afterend" , space) // bug fixing //fixed with pre-wrap
    console.log(Sel)
    Sel.removeAllRanges()
    const x = document.querySelector('text-container')
    x.addEventListener('click' , e => {
        e.preventDefault()
        e.stopPropagation()
    })
})


// Blockquote 
const quote_text = document.getElementById('quote')
quote_text.addEventListener('mouseover' , e => {
    const sel = window.getSelection()
    const selection = sel.getRangeAt(0)
    const span = document.createElement('span')
    const node = sel.focusNode
    console.log(node)
    console.log(selection)
    // selection.surroundContents(span)
    sel.removeAllRanges()
})