---
layout: post
title: "Wring.io, a Dispatcher of GitHub Notifications"
date: 2016-02-26
place: Frankfurt, Germany
tags: github
description:
  Too many notifications from GitHub? Try wring.io,
  a free hosted dispatcher of incoming notification traffic.
keywords:
  - github notifications
  - github spam
  - monitor github notifications
  - github gateway
  - read github notifications
---

{% badge http://www.wring.io/images/logo.svg 92 http://www.wring.io %}

I'm taking participation in over 50 repositories in GitHub. We manage all
our software projects there. GitHub is sending me hundreds of emails
per day. I'm serious. Hundreds! I tried to filter them somehow in Gmail,
but it's not really possible. Gmail filters are not powerful enough to
understand the difference between different types of notifications.
I decided to create my own simple filtering machine. It's called
[wring.io](http://www.wring.io).

<!--more-->

The idea of wring.io is simple. First, I'm registering my sources
of notifications (called "pipes"). For example, GitHub. I'm giving
[wring.io](http://www.wring.io) permissions
to connect to GitHub on my behalf and fetch whatever is new there.

Then, I'm configuring what should be filtered out, using text matching or
regular expressions. Right after a new pipe is created,
[wring.io](http://www.wring.io) starts pulling all my sources and updating my inbox.
All I need to do is to delete them from there, when I'm done with them.
That's it.

Let's see by example. First, I'm creating a new pipe:

IMG

It's a JSON object. Property `class` must be set to
`io.wring.agents.github.AgGithub`. This is the name of the Java
class that will be pulling my notifications from GitHub. The project is
open source, you can see how that class actually works:
[`AgGithub`](...).

Property `token` must be set to the personal authentication token that
I should create first, in GitHub. The server will connect to GitHub
on my behalf and under my credentials:

IMG

Property `ignore` must have an array of strings. Each item is a matching
pattern. I can use a text or a regular expression. By default it's
a text. If exactly the same text will be found in a notification, it
will be ignored. To use a regular expression, I wrap it in slashes. Just
like in the example.

Then, I go to my inbox and read what's there.

This solution literally saves hours of time for me now. Feel free to use
it, it's absolutely free. Moreover, it's open source, feel free to
contribute.
