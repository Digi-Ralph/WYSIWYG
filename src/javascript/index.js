const h2 = document.querySelector('h1')
const containertitle = document.querySelector('.title-container')
const titleLayout = document.querySelector('.layout-title')


const input = e => {
    const nextSpan = h2.firstElementChild.tagName
    const title = h2.innerText.length
    if (title === 1) {
        const a = `<span class="placeholder-title" placeholder = "Title"></span>`
        titleLayout.insertAdjacentHTML('afterbegin', a)
        return
    } else if (title > 1 && nextSpan === "SPAN") {
        h2.firstElementChild.remove()
        return
    }

}

const stopDefault = e => {
    const x = h2.innerText.valueOf().length
    if ((e.key == 'Backspace' || e.key == "Delete") && x < 2 ) {
        e.preventDefault()
    }

}

const blockCretChange = (e) => {
    if (e.key === 'Enter') {
     
       document.querySelector('#block_one').focus()
    
    
        // console.log(p)
    }
}
containertitle.addEventListener('input', input)
containertitle.addEventListener('keydown', stopDefault)
containertitle.addEventListener('keydown', blockCretChange)


//
function getCaretCoordinates() {
    let x = 0,
        y = 0;
        width = 0;
    const isSupported = typeof window.getSelection !== "undefined";
    if (isSupported) {
        const selection = window.getSelection();
        // Check if there is a selection (i.e. cursor in place)
        if (selection.rangeCount !== 0) {
            // Clone the range
            const range = selection.getRangeAt(0).cloneRange();
            // Collapse the range to the start, so there are not multiple chars selected
            // range.collapse(true);
            // getCientRects returns all the positioning information we need
            const rect = range.getClientRects()[0];
            // console.log(rect)
            // const rect = range.getBoundingClientRect();
            if (rect) {
                x = rect.left; // since the caret is only 1px wide, left == right
                y = rect.top; // top edge of the caret
                width = rect.width
            }
        }
    }
    return {
        x,
        y,
        width
    };

}



function toggleTooltip() {
    const tooltip = document.getElementById("tooltip");
    const stringLength = window.getSelection().toString().length
    if (stringLength > 0) {
        let scrollTop = 
        (window.pageYOffset !== undefined) ? window.pageYOffset : 
        (document.documentElement || document.body.parentNode || document.body).scrollTop;
            const {
            x,
            y,
            width
        } = getCaretCoordinates();
        tooltip.setAttribute("aria-hidden", "false");
        tooltip.setAttribute(
            "style",
            `display: inline-block; 
            left:${(x + (width / 2)) - 32}px; 
            top: ${(y + scrollTop) - 36}px;
            `
            );
        } else {
            tooltip.setAttribute("aria-hidden", "true");
            tooltip.setAttribute("style", "display: none;");
        }
}

document.addEventListener("mouseup", (e) => toggleTooltip());

