module Yegor
  module Filters
    def book(book)
      opts = book.strip.split(/\s+/, 2)
      link = 'http://goo.gl/5Yfx1i'
      "<aside class='book'>" \
      "<a href='#{link}'>" \
      "<img src='/images/books/elegant-objects/cover.png' class='book-cover'/>" \
      "</a>" \
      "Read more about this subject in " \
      "<a href='#{link}'>Section&nbsp;#{opts[1]}</a>" \
      " of this book" \
      "<a href='#{link}'><img src='/images/books/amazon-buy-button.png' class='amazon-button'/></a>" \
      "</aside>"
    end
  end
end

Liquid::Template.register_filter(Yegor::Filters)
