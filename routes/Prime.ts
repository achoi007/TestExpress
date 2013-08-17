export class Prime {

    private primes_: number[];

    constructor() {
        this.primes_ = [2,3,5,7];
    }

    public primes() : number[] {
        return this.primes_;
    }

    public extendToIndex(n: number) {
        this.extend(function(val, idx) { 
            return idx < n;
        });
    }

    public extendToValue(n: number) {
        this.extend(function(val, idx) { 
            return val <= n;
        });
    }

    public extend(cond: (val: number, idx: number) => boolean) {
        var primes = this.primes_;
        var last = primes.length - 1;

        var isPrime = function(num) {
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
            // Find the next prime
            for (var n = primes[last] + 2; !isPrime(n); n += 2);

            // Check if we want prime
            if (!cond(n, last)) {
                break;
            }

            // Add to list of prime found.  Adjust last index
            primes.push(n);
            last++;
        }
    }
};