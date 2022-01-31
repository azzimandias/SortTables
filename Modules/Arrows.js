class Arrow {
    constructor(elemHTML) {
        this.elemHTML = elemHTML;
        this.currentPage = 1;
        this.pages = 0;
    }

    disableOrNo(pageToDisable) {
        if (this.currentPage === pageToDisable) {
            this.disable();
        } else {
            this.enable();
        }
    }

    disable() {
        this.elemHTML.disabled = true;
    }

    enable() {
        this.elemHTML.disabled = false;
    }
}

class ArrowToFirs extends Arrow {
    constructor(elemHTML) {
        super(elemHTML);
        this.pageToDisable = 1;
    }

    getThis(context) {
        this.currentPage = context.currentPage;
        this.pages = context.pages;
        this.disableOrNo(this.pageToDisable);
    }
}

class ArrowToLast extends Arrow {
    constructor(elemHTML) {
        super(elemHTML);
        this.pageToDisable = this.pages;
    }

    getThis(context) {
        this.currentPage = context.currentPage;
        this.pageToDisable = context.pages;
        this.disableOrNo(this.pageToDisable);
    }
}

export { ArrowToFirs, ArrowToLast };
