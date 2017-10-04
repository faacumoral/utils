Array.prototype.hasDate = function (date, field) {
    var i;
    if (field) {
        for (i = 0; i < this.length; i++) {
            if (this[i][field].format("DDMMYYYY") === date.format("DDMMYYYY")) {
                return true;
            }
        }
    } else {
        for (i = 0; i < this.length; i++) {
            if (this[i].format("DDMMYYYY") === date.format("DDMMYYYY")) {
                return true;
            }
        }
    }
    return false;
};

Array.prototype.removeDate = function (date, field) {
    var i;
    if (field) {
        for (i = 0; i < this.length; i++) {
            if (this[i][field].format("DDMMYYYY") === date.format("DDMMYYYY")) {
                this.splice(i, 1);
                i--;
            }
        }
    } else {
        for (i = 0; i < this.length; i++) {
            if (this[i].format("DDMMYYYY") === date.format("DDMMYYYY")) {
                this.splice(i, 1);
                i--;
            }
        }
    }
    return this;
};