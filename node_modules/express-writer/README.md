#express-writer

A small piece of code that sits inside express's res.send function. It captures the route that was called, the body
that would be sent to the browser, and writes that result to an html file.

Think about it like this:

You write an express route `/hello-world` and the result would be `<h1>Hello World</h1>`. This module will write
`dist/hello-world/index.html` with `<h1>Hello World</h1>` inside of it.

During development, you never generate the static pages. The plan is to just have some automation to hit those routes
for you during a build process.

We have an example implementation here:

[https://github.com/meltmedia/express-static](https://github.com/meltmedia/express-static)

#small example

```
var writer = require('express-writer');
app.use(writer.watch);
```

Hit a route in your browser, and watch the static files generate in the `dist` directory.

## Change the dist directory

```
writer.setWriteDirectory('./out');
```

#Test

```
npm test
```


The MIT License (MIT)

Copyright (c) 2013 Richard Torruellas III <rtorruellas@gmail.com>, Jacob Heun <jacob.heun@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.