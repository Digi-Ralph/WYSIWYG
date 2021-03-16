const h2 = document.querySelector('h1')
const containertitle = document.querySelector('.title-container')
const titleLayout = document.querySelector('.layout-title')


const input = e => {
    const nextSpan = h2.firstElementChild.tagName
    const title = h2.innerText.length
    if (title === 1) {
        const a = `<span class="placeholder-title" placeholder = "Untitled"></span>`
        titleLayout.insertAdjacentHTML('afterbegin', a)
        return
    } else if (title > 1 && nextSpan === "SPAN") {
        h2.firstElementChild.remove()
        return
    }

}



const blockCretChange = (e) => {
    if (e.key === 'Enter') {
        e.preventDefault()
        document.querySelector('#block_one').focus()
    }
}



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
            `display: flex;
            justify-content: space-evenly;
            align-items: center; 
            left:${(x + (width / 2)) - 140}px; 
            top: ${(y + scrollTop) - 65}px;
            `
        );
    } else {
        tooltip.setAttribute("aria-hidden", "true");
        tooltip.setAttribute("style", "display: none;");
    }
}




const textcontainer = document.querySelector('.text-container')
const layouttext = document.querySelector('.layout-text')
const placeholdertext = document.querySelector('.placeholder-text')


const holderText = () => {
    const innerLength = textcontainer.firstElementChild.innerText.valueOf().length
    const nextSpan = layouttext.firstElementChild.tagName
    if (innerLength === 1) {
        const a = `<span class="placeholder-text" placeholder = "Write Your Story"></span>`
        layouttext.insertAdjacentHTML('afterbegin', a)
        return
    } else if (innerLength > 1 && nextSpan === "SPAN") {
        layouttext.firstElementChild.remove()
        return
    }
}

const stopDefault = e => {
    const x = h2.innerText.valueOf().length
  
    // layouttext.textContent.length // 
    if ((e.key == 'Backspace' || e.key == "Delete") && x < 2) {
        e.preventDefault()
    }  

}
const stopDefaultText = e => {
    const innerLength = textcontainer.firstElementChild.innerText.valueOf().length
    console.log(innerLength)
    if ((e.key == 'Backspace' || e.key == "Delete") && innerLength === 1) {
        e.preventDefault()
    }
}

containertitle.addEventListener('input', input)
containertitle.addEventListener('keydown', stopDefault)
containertitle.addEventListener('keydown', blockCretChange)
textcontainer.addEventListener('input', holderText)
textcontainer.addEventListener('keydown', stopDefaultText)
document.addEventListener("mouseup", (e) => toggleTooltip());