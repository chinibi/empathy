# SENTiment

![](./public/images/SentimentImage.png)

Our initial goal was to build an app that provies real value to its users. Now days everyone has public conversation on social media platforms with friends and strangers. We want the to make users aware of how they look when they participate in an online conversation. 

We decided to build SENTiment, a web app that retrieves your twitter posts, sends them through IBM Watson's Tone Analyzer, and then composes a sentiment analysis report of your tweets. By providing user with this information we make them aware of how they look and they can modify their tone when posting on social media if needed.

The approach was simple, request to the Twitter API user's tweets and apply to them some treatment so the IBM Watson API accept them and give us back the report for the given Tweets.

Check it out!!!

Link to app - 



[Pitch Deck on Google docs.](https://docs.google.com/presentation/d/1gLL5K8bnQC0_a563k9mCnNnDUxLli_goIzNYAYA6PsM/edit?usp=sharing)



## How's it work

When you log in with Twitter you're sent to a profile page where you can enter a date range to retrieve your tweets.  The tweets within these dates are passed on to Watson which performs the analysis.  Watson's response is then saved in our database.  Results are retrieved from our own API through AJAX and are displayed graphically with a Google Charts library.



#Wireframes

![](./public/images/WireFrame1.png)

![](./public/images/WireFrame2.png)

![](./public/images/WireFrame3.png)



## Technologies Used: 

| Technology                   | Role                                     |
| ---------------------------- | ---------------------------------------- |
| Express                      | Framework used to build the app.         |
| Node.js                      | Primary language used in the backend.    |
| MongoDB                      | Database.                                |
| Jquery                       | JavaScript library for larger flexibility between HTML and JS files. |
| Bootstrap                    | Library to style html pages.             |
| AJAX                         | Web development techniques to handle http methods on the client side. |
| Google Charts                | html and css library to work on charts and display them. |
| Date Range Picker            | JavaScript component for choosing date ranges. |
| twitter                      | Node package to ease work with Twitter API. |
| Watson-developer-cloud       | Node package to ease work with Watson API. |
| Passport                     | Node package to build Oauth.             |
| Mongoose                     | Node package to ease work with MongoDB.  |
| twitter-passport             | Node package to build Oauth specifically with Twitter |
| Moments.js                   | Node package to manipulate and display dates |
| IBM Watson Tone Analyzer API | Access to Watson string analizer engine. |
| Twitter API                  | Access to Twitter database.              |



## Issues

We were struggling to come up with a good way to give an overall report of many tweets.  Our biggest obstacle was that Watson could only analyze one document at a time. We came up with two solutions: __1__: perform one analysis per tweet and then average the scores, and __2__: concatenate the tweets into one string and do a single analysis on it.  We decided on option 2 since Watson was assumed to have a better idea on how to do the overall analysis and it would reduce the number of API requests to one.

## Links

[Pivotal Tracker](https://www.pivotaltracker.com/n/projects/1582337)

[API Docs](https://github.com/chinibi/empathy/wiki/API-Docs)

[Git repository on GitHub](https://github.com/chinibi/empathy.git)

Created by 

- [Carlos Allende](https://github.com/vanpeta) (Back-end and Scrum master)
- [Trevor Pham](https://github.com/chinibi) (Back-end and Github manager)
- [Joseph del Castillo](https://github.com/josephdc) (Front-end)