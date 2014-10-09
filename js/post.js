/*globals $:false, window:false, document:false, URL:false */
$(
  function() {
    'use strict';
    var url = encodeURIComponent(document.location.href);
    $.getJSON(
      'http://free.sharedcount.com/?apikey=d730c518430eabcabc46ab79528c744067afa17e&url=' + url,
      function (data) {
        if (data.Facebook.total_count !== 0) {
          $('.count-facebook').html(data.Facebook.total_count).fadeIn();
        }
        if (data.Twitter !== 0) {
          $('.count-twitter').html(data.Twitter).fadeIn();
        }
        if (data.GooglePlusOne !== 0) {
          $('.count-googleplus').html(data.GooglePlusOne).fadeIn();
        }
        if (data.LinkedIn !== 0) {
          $('.count-linkedin').html(data.LinkedIn).fadeIn();
        }
        if (data.StumbleUpon !== 0) {
          $('.count-stumbleupon').html(data.StumbleUpon).fadeIn();
        }
      }
    );
    $.getJSON(
      'http://www.reddit.com/api/info.json?jsonp=?&url=' + url,
      function(json) {
        var count = json.data.children.length;
        if (count > 0) {
          $('.count-reddit').html(count).fadeIn();
        }
      }
    );
    $.getJSON(
      'http://feeds.delicious.com/v2/json/urlinfo/data?url=' + url + '&callback=?',
      function(data) {
        var count = 0;
        if (data.length > 0) {
          count = data[0].total_posts;
        }
        if (count !== 0) {
          $('.count-delicious').html(data[0].total_posts).fadeIn();
        }
      }
    );
    /*
    digg API doesn't work at the momemt, they are refactoring it
    $.getJSON(
      'http://services.digg.com/1.0/endpoint?method=story.getAll?type=javascript&callback=?&link=' + url,
      function(data) {
        var count = data.stories[0].diggs;
        if (count !== 0) {
          $('.count-digg').html(data.stories[0].diggs).fadeIn();
        }
      }
    );
    */
  }
);

$(
  function() {
    'use strict';
    $('.button').click(
      function (event) {
        event.preventDefault();
        var $this = $(this);
        window.open(
          $this.attr('href'),
          $this.attr('title'),
          'width=640,height=300'
        );
      }
    );
    $('h2').each(
      function (idx, element) {
        var $element = $(element), id = $element.attr('id');
        if (id) {
          $element.append(
            $('<a/>').addClass('link')
              .attr('href', '#' + id)
              .append('<i class="icon icon-link"></i>')
          );
        }
      }
    );
  }
);