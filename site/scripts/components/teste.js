var Test = (function () {
    function Test(m) {
        this.msg = m;
    }
    Test.prototype.print = function () {
        console.log(this.msg);
    };
    return Test;
})();
exports.Test = Test;
