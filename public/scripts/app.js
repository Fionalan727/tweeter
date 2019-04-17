/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

$(document).ready(function() {

  function renderTweets(tweets) {
    // loops through tweets
    $('.tweet-container').empty();
    tweets.reverse();
    tweets.forEach(function(element){
      
      $('.tweet-container').append(createTweetElement(element));

    })
  };

  $( ".compose" ).click(function() {
    $( ".new-tweet" ).slideToggle( "slow" );
    $("textarea").focus();
  });

  function createTweetElement (tweet) {
 
      let $tweet = $("<article>").addClass("tweet");
      let $header = $("<header>");
      let $profile = $("<img>").addClass("profile").attr("src", tweet.user.avatars.small);
      let $username = $("<h1>").addClass("username").text(tweet.user.name);
      let $ID = $("<p>").addClass("ID").text(tweet.handle);
      let $content = $("<div>").addClass("content");
      let $text = $("<p>").addClass("post").text(tweet.content.text);
      let $footer = $("<footer>");
      let $date = $("<p>").addClass("date").text(tweet.created_at);

      $header.append($profile, $username, $ID);
      $content.append($text);
      $footer.append($date);
      $tweet.append($header, $content, $footer);
      return $tweet;

    }
  

  function eventHandler(event){
    event.preventDefault();
    if($('textarea').val() === ""){
      return alert("You didn't type anything!!")
    }
    if ($('textarea').val().length > 140) {
      return alert("You have typed over character limit!!")
    }
    $.ajax({
      type:'post',
      url:'/tweets',
      data:$('section.new-tweet form textarea').serialize(),
      complete: function(){
        $('textarea').val(null);
        loadTweets();
      }
    });
  }
  const loadTweets = function(){
    $.ajax({
      type:'get',
      url:'/tweets',
      dataType:'json',
      success: function(data){
        renderTweets(data);
      }
    })
  };
  
  loadTweets();
  var $button = $('.submit');
  $button.on('click', eventHandler);

});
 