#Common Types

This is a tiny library of simple Typescript _typings_ which are highly reusable. Things such as:

* `IDictionary<T>` - a simple dictionary object will allows any key value while allowing you to
* `fk` - a proxy for a _string_ which more effectively describes a _foreign key_ relationship
* `datetime` - a proxy for a _string_ representation of a Datetime value
* `LambdaCallback<T>` - a generic for an AWS Lambda function's callback which allows for typing on both the success and error states that are possible
* `IPackageJson` - typings for the `package.json` file; useful if you're doing CLI work

and a few more. Rather than document them all just have a look at the `common-types.ts` file.

Ken Snyder

## Contributing

The goal is to keep this library small -- actually pretty much zero runtime bytes -- but we're open to new things that can be added. Please drop us a PR if you have a thought on a highly reusable pattern you'd like to see included.

## License

Copyright (c) 2018 LifeGadget Ltd

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
