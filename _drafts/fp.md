---
layout: post
title: "Utility Classes Have Nothing to Do With Functional Programming"
date: 2015-02-20
tags: oop
description:
  Utility classes, even though they look like collections of
  functions, have nothing to do with functional programming, mostly
  because they are bags of procedures
keywords:
  - functional programming
  - utility classes in java
  - utility classes vs functional programming
  - utility classes are not functional programming
  - utility classes
---

I was accused recently that I'm against
[functional programming](http://en.wikipedia.org/wiki/Functional_programming)
because [I call utility classes an anti-pattern]({% pst 2014/may/2014-05-05-oop-alternative-to-utility-classes %}).
That's absolutely wrong! Well, I do consider them a terrible anti-pattern,
but they have nothing to do with functional programming. For two basic
reasons, I believe. First, functional programming is declarative, while
utility class methods are imperative. Second,
functional programming is based on lambda calculus, where
a function can be assigned to a variable. Utility class methods
are not functions in this sense. I'll decode these statements in a minute.

In Java, there are basically two valid alternatives to these ugly utility
classes agressively promoted by [Guava](https://code.google.com/p/guava-libraries/),
[Apache Commons](http://commons.apache.org/) and others. The first one
is traditional classes and the second one is [Java 8 lamba](http://docs.oracle.com/javase/tutorial/java/javaOO/lambdaexpressions.html).
Now let's see why utility classes are not even close to functional programming
and where this misconception is coming from.

<!--more-->

Here is a typical example of a utility class
[`Math`](http://docs.oracle.com/javase/7/docs/api/java/lang/Math.html) from Java 1.0:

{% highlight java %}
public class Math {
  public static double abs(double a);
  // a few dozens other methods of the same style
}
{% endhighlight %}

Here is how you would use it when you want to calculate an absolute
value of a floating point number:

{% highlight java %}
double x = Math.abs(3.1415926d);
{% endhighlight %}

What's wrong about it? We need a function and we get it from class `Math`.
The class has many useful functions inside that can be used for many typical
mathematical operations, like calculating maximum, minimum, sinus, cosinus, etc.
It is a very popular concept, look at any commercial or an open source product.
These utility classes are used everywhere, since Java was invented (this
`Math` class was introduced in Java's first version). Well, technically
there is nothing wrong. The code will work. But it is not an object-oriented
programming. Instead, it is imperative and procedural. Do we care? Well,
it's up to you to decide. Let's see what is the difference.

There is basically two different approaches &mdash; declarative and imperative.

[Imperative programming](http://en.wikipedia.org/wiki/Imperative_programming)
is focused on describing **how** a program operates,
in terms of statements that change a program state. We just saw an example
of imperative programming above. Here is more (this pure imperative/procedural
programming that has nothing to do with OOP):

{% highlight java %}
public class MyMath {
  public double f(double a, double b) {
    double max = Math.max(a, b);
    double x = Math.abs(max);
    return x;
  }
}
{% endhighlight %}

[Declarative programming](http://en.wikipedia.org/wiki/Declarative_programming)
focuses on **what** the program should accomplish without prescribing
how to do it in terms of sequences of actions to be taken. This is how
the same code would look in Lisp, a functional programming language:

{% highlight lisp %}
(defun f (a b) (abs (max a b)))
{% endhighlight %}

Where is the trick? Just a difference syntax? Not really.

There are [many definitions](http://en.wikipedia.org/wiki/Comparison_of_programming_paradigms)
of the difference between imperative and declarative styles, I will try to
give my own. There are basically three roles in the interaction scenario
with this `f` function/method: a _buyer_, a _packager_ of the result,
and a _consumer_ of the result. Let's say I call this function like this:

{% highlight java %}
public void foo() {
  double x = this.calc(5, -7);
  System.out.println("max+abs equals to " + x);
}
private double calc(double a, double b) {
  double x = Math.f(a, b);
  return x;
}
{% endhighlight %}

Here, method `calc()` is a buyer, method `Math.f()` is a packager of the result,
and method `foo()` is a consumer. No matter which programming style is used,
there are always these three guys taking participation in the process:
the buyer, the packager, and the consumer.

Imagine you're a buyer and want to purchase a gift for your (girl|boy)friend. The first
option is to visit a shop, to pay $50, to let them package that perfume for you
and then bring it to the friend (and get a kiss). This is an **imperative** style.

The second option is to visit a shop, pay them $50 and get a gift card from them.
Then, present this card to the friend (and get a kiss). When he or she decides to convert it
to a perfume, he or she will visit the shop and get it. This
is a **declarative** style.

See the difference?

In the first case, which is imperative, you force the packager (a beauty shop)
to find that perfume in stock, to package it and return you back as
a ready to be used product. In the second scenario, which is declarative,
you're just getting a promise from the shop that eventually, when it's
necessary, they will find the perfume in stock, package it and return to
those who needs it. If your friend will never visit them with that gift card,
the perfume will remain in stock.

Moreover, your friend can use that gift card as a product itself, never
visiting the shop. He or she may present it to somebody else again as a gift
or just exchange for another card or a product. The gift card itself
becomes a product!

So the difference is what the consumer is getting &mdash; either a
product ready to be used (imperative) or a voucher for the product, which
he can convert later to a real product (declarative).

Utility classes, like `Math` from JDK or `StringUtils` from Apache Commons
return products ready to be used immediately, while functions in Lisp
in other functional languages return "vouchers". For example, if you
call `max` function in Lisp, the actual maximum between two numbers
will only be calculated when you actually start using it:

{% highlight lisp %}
(let (x (max 1 5))
  (print "X equals to " x))
{% endhighlight %}

Until this `print` is actually starting to output characters to the
terminal function `max` won't be called. This `x` is a "voucher" returned
to us when we attempted to "buy" a maximum between `1` and `5`.

Pay attention, nesting Java static functions one into another doesn't
make them declarative. This code is still imperative, because its execution
delivers the result here and now:

{% highlight java %}
public class MyMath {
  public double f(double a, double b) {
    return Math.abs(Math.max(a, b));
  }
}
{% endhighlight %}

OK, you may say, I got it, but why declarative style is better than imperative?
What's the big deal? I'm getting to it. Let me first show the difference
between functions in functional programming and static methods in OOP.
As mentioned above, this is the second big difference between utility
classes and functional programming.

In any functional programming language you can do this:

{% highlight lisp %}
(defun foo (x) (x 5))
{% endhighlight %}

Then, later, you can call that `x`:

{% highlight lisp %}
(defun bar (x) (+ x 1)) // defining function bar
(print (foo bar)) // passing bar as an argument to foo
{% endhighlight %}

Static methods in Java are not _functions_ in terms of functional programming.
You can't do anything like this with a static method. You can pass a static
method as an argument to another method. Basically, static
methods are procedures or, simply put, Java statements grouped under a unique
name. The only way to access them is to call a procedure and pass all
necessary arguments to it. The procedure will calculate something and return
a result that is immediately ready for usage.

And now we're getting to the final question I can hear you asking &mdash;
OK, utility classes are not functional programming, but they look like
functional programming, and they work very fast, and they are very easy to
use. Why not? Why aiming for perfection if 20 years of Java history
proved that utility classes is the main instrument of each Java developer?

Besides OOP fundamentalism, which I'm very often accused of, there are
a few very practical reasons (BTW, I am an OOP fundamentalist):

**Testability**.
Calls to static methods in utility classes are hard-coded dependencies, which
can never be broken for testing purposes. If you class is calling
`FileUtils.readFile()`, I will never be able to test it, without using
a real file on disc.

**Efficiency**.
Utility classes, due to their imperative nature, are much less efficient
than their [declarative alternatives]({% pst 2014/may/2014-05-05-oop-alternative-to-utility-classes %}).
They simply do all calculations right here and now, taking processor
resources even when it's not yet necessary. Instead of returning a promise
to break down a string into chunks, `StringUtils.split()` breaks it down
right now. And it breaks it down into all possible chunks, even if only
the first one is required by the "buyer".

**Readability**.
Utility classes tend to be huge (try to read the source code of `StringUtils`
or `FileUtils` from Apache Commons). The entire idea of separation of concerns,
which makes OOP so beautiful, is vanished in utility classes. They just
put all possible procedures into one huge `.java` file, which becomes
absolutely unmaintainable when it gets more than a dozen of static methods.

To conclude let me re-iterate, utility classes have nothing to do
with functional programming. They are simply bags of static methods, which
are imperative procedures. Try to stay away from them as far as possible and
use solid cohesive objects, no matter how many of them you have to declare
and how small they are.