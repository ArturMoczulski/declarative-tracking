# declarative-tracking
Simple user tracking library which allows you to easily gather information about user behavior with Google Analytics, Facebook and YouTube content using just HTML.

## Usage
Simply add `data-track` and `data-track-service` to HTML elements you want to track. 

`data-track` defines what user behavior you want to track.
`data-track-service` defines where you want to send your data, like Google Analytics, Facebook or other tracking software. 

### Google Analytics

For example, if you want to send your data to Google Analytics when users click a specific outbound link:
```html
<a href="example.com"
   data-track="click"
   data-track-service="google-analytics"
   data-track-event-category="Outbound link"
   data-track-event-action="click"
   data-track-event-label="example.com">
   Sign Up Now
</a>
```

In your account you will receive an event with provided values when event occurs. This allows to easy set up Conversion Goals in your account.
