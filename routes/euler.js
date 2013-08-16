var problems = range(1, 6);

module.exports = function (app) {
    app.namespace('/euler', function () {
        app.get('/', index);
        problems.forEach(function (elem) {
            app.get("/problem" + elem, eval("problem" + elem));
        });
    });
};

function index(req, res) {
    res.render('euler', { 'problems': problems });
}

function gcd(a, b) {
    if (b === 0) {
        return a;
    }
    else if (a > b) {
        return gcd(b, a % b);
    }
    else {
        return gcd(a, b % a);
    }
}

function gcd_array(nums) {
    return nums.reduce(gcd, nums[0]);
}

function lcm(a, b) {
    return a * (b / gcd(a, b));
}

function lcm_array(nums) {
    return nums.reduce(lcm, nums[0]);
}

function range(start, end) {
    var nums = [];
    for (var i = start; i <= end; ++i) {
        nums.push(i);
    }
    return nums;
}

// Find the sum of all the multiples of 3 or 5 below 1000.
function problem1(req, res) {

    // Create an array of numbers from 1 to 999
    var nums = range(1, 999);

    // Filter out all numbers not multiple of 3 or 5.
    nums = nums.filter(function (value) {
        if (value % 3 == 0) {
            return true;
        }
        if (value % 5 == 0) {
            return true;
        }
        return false;
    });

    // Sums all elements
    var sum = nums.reduce(function (acc, curr) {
        return acc + curr;
    });

    res.set('Content-Type', "text/plain");
    res.send("The sum is " + sum);
}

// By considering the terms in the Fibonacci sequence whose values do not exceed four million, 
// find the sum of the even-valued terms.
function problem2(req, res) {
    var f1 = 1, f2 = 2, nf;
    var sum = 0;
    var i = 2;

    while (f2 < 4000000) {
        if (f2 % 2 == 0) {
            sum += f2;
        }
        nf = f1 + f2;
        f1 = f2;
        f2 = nf;
    }

    res.set('Content-Type', "text/plain");
    res.send("The sum is " + sum);
}

// What is the largest prime factor of the number 600851475143 ?
function problem3(req, res) {
    var n = 600851475143;
    var factors = [];
    var i = 2;

    while (n > 1) {
        if (n / i == Math.round(n / i)) {
            factors.push(i);
            n = n / i;
        }
        else {
            ++i;
        }
    }

    res.set('Content-Type', "text/plain");
    res.send("Largest prime factor: " + factors[factors.length - 1]);
}

// Find the largest palindrome made from the product of two 3-digit numbers.
function problem4(req, res) {
    var max = 0, max_x = 0, max_y = 0;

    for (var x = 999; x >= 100; --x) {
        for (var y = 999; y >= 100; --y) {
            var n = x * y;
            if (n > max) {
                var ns = n.toString();
                if (ns == ns.split("").reverse().join("")) {
                    max = n;
                    max_x = x;
                    max_y = y;
                }
            }
        }
    }

    res.set('Content-Type', "text/plain");
    res.send(max_x + " * " + max_y + " = " + max);
}

// What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20?
function problem5(req, res) {
    var nums = range(1, 20);
    res.set('Content-Type', "text/plain");
    res.send("Answer: " + lcm_array(nums));
}

// Find the difference between the sum of the squares of the first one hundred natural numbers and the square of the sum.
function problem6(req, res) {
    var nums = range(1, 100);

    var sum_sq = nums.reduce(function (s, i) {
        return s + i * i;
    });

    var sq_sum = Math.pow(nums.reduce(function (s, i) {
        return s + i;
    }), 2);

    res.set('Content-Type', "text/plain");
    res.send("Answer: " + Math.abs(sum_sq - sq_sum));
}