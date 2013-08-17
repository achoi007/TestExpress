var Prime = (function () {
    function Prime() {
        this.primes_ = [2, 3, 5, 7];
    }
    Prime.prototype.primes = function () {
        return this.primes_;
    };

    Prime.prototype.extendToIndex = function (n) {
        this.extend(function (val, idx) {
            return idx < n;
        });
    };

    Prime.prototype.extendToValue = function (n) {
        this.extend(function (val, idx) {
            return val <= n;
        });
    };

    Prime.prototype.extend = function (cond) {
        var primes = this.primes_;
        var last = primes.length - 1;

        var isPrime = function (num) {
            for (var j = 1; j <= last; ++j) {
                var p = primes[j];
                if (p * p > num) {
                    return true;
                }
                if (num % p == 0) {
                    return false;
                }
            }
            return true;
        };

        while (true) {
            for (var n = primes[last] + 2; !isPrime(n); n += 2)
                ;

            if (!cond(n, last)) {
                break;
            }

            // Add to list of prime found.  Adjust last index
            primes.push(n);
            last++;
        }
    };
    return Prime;
})();
exports.Prime = Prime;
;

