/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// caculate the time difference between tweet post time and current time 
function timeDiff(time1, time2) {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;
  let diff = time1 - time2;
  if (diff < msPerMinute) {
   return Math.round(diff/1000) + ' seconds ago';
  } else if (diff < msPerHour) {
   return Math.round(diff/msPerMinute) + ' minutes ago';
  } else if (diff < msPerDay ) {
   return Math.round(diff/msPerHour ) + ' hours ago';
  } else if (diff < msPerMonth) {
   return Math.round(diff/msPerDay) + ' days ago';
  } else if (diff < msPerYear) {
   return Math.round(diff/msPerMonth) + ' months ago';
  } else {
   return Math.round(diff/msPerYear ) + ' years ago';
  }
 }

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
      const  tweetTime = timeDiff(Date.now(),tweet.created_at);
      let $tweet = $("<article>").addClass("tweet");
      let $header = $("<header>");
      let $profile = $("<img>").addClass("profile").attr("src", tweet.user.avatars.small);
      let $username = $("<h1>").addClass("username").text(tweet.user.name);
      let $ID = $("<p>").addClass("ID").text(tweet.user.handle);
      let $content = $("<div>").addClass("content");
      let $text = $("<p>").addClass("post").text(tweet.content.text);
      let $footer = $("<footer>");
      let $date = $("<p>").addClass("date").text(tweetTime);
      let $iconContainer = $("<div>").addClass("icons");
      let $flag = $("<i>").addClass("fab fa-font-awesome-flag");
      let $retweet = $("<i>").addClass("fas fa-retweet");
      let $heart = $("<i>").addClass("fas fa-heart");

      $iconContainer.append($flag,$retweet,$heart);
      $header.append($profile, $username, $ID);
      $content.append($text);
      $footer.append($date,$iconContainer);
      $tweet.append($header, $content, $footer);
      return $tweet;

    }

    const tweet = $(function(){
      var $button = $('.submit');
      $button.on("click", function(event) {
          event.preventDefault();
        
          if($('textarea').val() === ""){
             return $( ".error" ).slideDown().text("no tweet has been typed");
         
          }
          if ($('textarea').val().length > 140) {
            return $( ".error" ).slideDown().text("over 140 character limit");
           
          }

          $.ajax({
            type:'post',
            url:'/tweets',
            data:$('section.new-tweet form textarea').serialize(),
            complete: function(){
              $('textarea').val(null);
              loadTweets();
              $(".error").slideUp();
            }

          });
      });
  }) 

  




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
  // $( ".error" ).clear()



});
 