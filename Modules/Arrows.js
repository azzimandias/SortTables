class Arrow {
    constructor(elem) {
        this.elem = elem;
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
        this.elem.disabled = true;
    }

    enable() {
        this.elem.disabled = false;
    }
}

class ArrowToFirs extends Arrow {
    constructor(elem) {
        super(elem);
        this.pageToDisable = 1;
    }

    getThis(context) {
        this.currentPage = context.currentPage;
        this.pages = context.pages;
        this.disableOrNo(this.pageToDisable);
    }
}

class ArrowToLast extends Arrow {
    constructor(elem) {
        super(elem);
        this.pageToDisable = this.pages;
    }

    getThis(context) {
        this.currentPage = context.currentPage;
        this.pageToDisable = context.pages;
        this.disableOrNo(this.pageToDisable);
    }
}

export { ArrowToFirs, ArrowToLast };
