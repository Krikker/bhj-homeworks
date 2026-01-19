function updateParent(node) {
    const mainList = node.closest('li');
    const checkbox = mainList.querySelectorAll('.interest__check');
    const checkedAmount = Array.from(checkbox).filter(el => el !== node);
    const checkedCount = checkedAmount.filter(el => el.checked).length;
    const amount = checkedAmount.length;

    if (amount === 0) return;
    if (checkedCount === 0) {
        node.checked = false;
        node.indeterminate = false;
    } else if (checkedCount === amount) {
        node.checked = true;
        node.indeterminate = false;
    } else {
        node.checked = false;
        node.indeterminate = true;
    }
}

document.querySelectorAll('.interest__check').forEach(item => {
    item.addEventListener('change', function(event) {
        const upParent = this.closest('li');
        const ulChild = upParent.querySelector('.interests');
        if (ulChild) {
            const checkboxInsideUl = ulChild.querySelectorAll('.interest__check');
            checkboxInsideUl.forEach(child => child.checked = this.checked);
            this.indeterminate = false;
        }
        let currentLi = upParent;
        while (currentLi) {
            const parent = currentLi.querySelector(':scope > label > .interest__check');
            if (!parent) break;
            updateParent(parent);
            currentLi = currentLi.parentElement.closest('li');
        }
    })
})