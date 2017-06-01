## watchandcode.com challenge 4: creating libraries out of order

In the previous challenge, you wrote a librarySystem function that could handle dependencies. It worked like this:

```javascript
librarySystem('name', [], function() {
  return 'Gordon';
});

librarySystem('company', [], function() {
  return 'Watch and Code';
});

librarySystem('workBlurb', ['name', 'company'], function(name, company) {
  return name + ' works at ' + company;
});
```

`librarySystem('workBlurb')`; // 'Gordon works at Watch and Code'
However, the order of these function calls was very important. Specifically, you could only create the 'workBlurb' library after 'name' and 'company'.

Your task is to rewrite librarySystem so that the following code works too. The only difference is that we're loading the libraries out of order (i.e. 'workBlurb' is created before its dependencies, 'name' and 'company').

```javascript
librarySystem('workBlurb', ['name', 'company'], function(name, company) {
  return name + ' works at ' + company;
});

librarySystem('name', [], function() {
  return 'Gordon';
});

librarySystem('company', [], function() {
  return 'Watch and Code';
});
```

`librarySystem('workBlurb'); // 'Gordon works at Watch and Code'`

Since this is starting to get complicated, you should write tests to make sure your solution fulfills all the requirements. If you want some warmup before tackling this, writing reduce on your own (as we did in Test Driven Development Part 9) is a good exercise to get you into the right mindset.

Your tests should ensure that libraries can be created out of order. They should also ensure that all the requirements from the previous challenge are still being met.

In addition to the new loading order feature, your solution should ensure that the callback function for each library is run only once. So for example, even if librarySystem('workBlurb') appears 100 times in your app, the 'workBlurb' callback function should only run once. You should definitely have a test for this.

Since you'll have tests, use the same folder structure from the Test Driven Development series, which uses tinytest. When all your tests pass, upload the entire project to a Github repository and post a link to it in a comment below.

Good luck!
