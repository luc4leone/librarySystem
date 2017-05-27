/**
 * Very simple in-browser unit-test library, with zero deps.
 *
 * Background turns green if all tests pass, otherwise red.
 * View the JavaScript console to see failure reasons.
 *
 * Example:
 *
 *   adder.js (code under test)
 *
 *     function add(a, b) {
 *       return a + b;
 *     }
 *
 *   adder-test.html (tests - just open a browser to see results)
 *
 *     <script src="tinytest.js"></script>
 *     <script src="adder.js"></script>
 *     <script>
 *
 *     tests({
 *
 *       'adds numbers': function() {
 *         eq(6, add(2, 4));
 *         eq(6.6, add(2.6, 4));
 *       },
 *
 *       'subtracts numbers': function() {
 *         eq(-2, add(2, -4));
 *       },
 *
 *     });
 *     </script>
 *
 * That's it. Stop using over complicated frameworks that get in your way.
 *
 * -Joe Walnes
 * MIT License. See https://github.com/joewalnes/jstinytest/
 */


var SimpleTestHelper = {
    renderStats: function(tests, failures){
        var numberOfTests = Object.keys(tests).length;
        var successes = numberOfTests - failures;

        function pluralize(count, word) {
            if(word === 'test') {
                return count === 1 ? word : word + 's';
            }
            if(word === 'failure') {
                return count === 1 ? word : word + 's';
            }
            if(word === 'success'){
                return count === 1 ? word : word + 'es';
            }
        }

        var summaryString = 'Ran ' + numberOfTests + ' ' + pluralize(numberOfTests,'test') + ': '  + successes + ' ' + pluralize(successes, 'success') + ' ' + failures + ' ' + pluralize(successes, 'failure') + '.';
            
        var summaryElement = document.createElement('h1');
        summaryElement.textContent = summaryString;
        document.body.appendChild(summaryElement);

    }
}
var SimpleTest = {
    
    // main method to run the tests I write
    run: function(tests) {
        var failures = 0;
        for (var testName in tests) {
            var testAction = tests[testName];
            try {
                testAction.apply(this);
                console.log('%c' + testName, 'color: green');
            } catch (e) {
                failures++;

                console.groupCollapsed('%c' + testName, 'color: red');
                console.error(e.stack);
                console.groupEnd();
            }
        }
        setTimeout(function() { // Give document a chance to complete
            if (window.document && document.body) {
                document.body.style.backgroundColor = (failures == 0 ? '#99ff99' : '#ff9999');
                SimpleTestHelper.renderStats(tests, failures);
            }
        }, 0);
    },

    // helper methods to use inside tests 
    fail: function(msg) {
        throw new Error('fail(): ' + msg);
    },

    assertStrictEquals: function(expected, actual) {
        if (expected !== actual) {
            throw new Error('assertStrictEquals() "' + expected + '" !== "' + actual + '"');
        }
    },

};

// to make it easy to write tests 
var fail = SimpleTest.fail, 
      eq = SimpleTest.assertStrictEquals;
