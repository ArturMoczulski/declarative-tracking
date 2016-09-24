// GA Tracking Code

var GATrackingId = 'UA-84588374-2';

(function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
e=o.createElement(i);r=o.getElementsByTagName(i)[0];
e.src='//www.google-analytics.com/analytics.js';
r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
ga('create',GATrackingId,'auto');ga('send','pageview');

// GA Embedded
(function(w,d,s,g,js,fs){
  g=w.gapi||(w.gapi={});g.analytics={q:[],ready:function(f){this.q.push(f);}};
  js=d.createElement(s);fs=d.getElementsByTagName(s)[0];
  js.src='https://apis.google.com/js/platform.js';
  fs.parentNode.insertBefore(js,fs);js.onload=function(){g.load('analytics');};
}(window,document,'script'));

$(function() {
    
    hljs.initHighlightingOnLoad();
    
    $('#ga-tracking-id').val(GATrackingId)
    
    require(['require', 
             '../../../resources/js/lib/declarative-tracking/declarative-tracking'], function(require, declarativeTracking) {
        
        declarativeTracking.init();
        declarativeTracking.bindTrackers();
                     
    })
    
})