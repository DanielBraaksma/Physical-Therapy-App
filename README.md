# Physical-Therapy-App

This project was inspired by a recent knee injury and a need to simplify a physical therapy routine.

It was built with vanilla JavaScript, Materialize CSS, SASS, and the Wger.de REST API.

I really enjoyed solving the challenges this project presented, and it feels very satisfying to build something that has real world value for myself.

## Features
- Users can add their own custom exercises to the app to complete.
- Users can choose to include a timer with each exercise.
- Users have the ability to stop/pause/reset timers and edit the list of exercises.
- When the user clicks each exercise bar, a details accordion will reveal.
- Timers are tied to each exercise, this allows the user to modify other exercises without resetting the timer.
- When a timed exercise completes its timer, an alarm will sound to notify the user and the exercise item in the list will automatically update as completed.
- Users can search exercises through the wger.de REST API.
- Search results can be copied to the "Add an exercise" clipboard, allowing users to modify any content before adding to exercise list.
- If an image was available in the API search results, it will be rendered in the exercise details when added.
- Modal element allows the user to save their next Physical Therapy appointment.
- local storage saves the user's exercises and appointment information. (app is preloaded with examples).

## Takeaways / notables

The most challenging part of this project was setting up the timer correctly to each exercise. Initially it was straightforward, but during testing I noticed bugs when submitting timer buttons and other buttons like "reset-all". I could have gotten away with just a standalone timer that the user would manually manipulate every time and it would have been a lot easier. However, I wanted to challenge myself to create a seamless experience. I am glad I persisted as it was a great learning experience and I think this feature adds a lot more value to the application.

Upon attempting to implement the pause button of the timer, I did some research looking at other JavaScript timers online and how they achieved this. I wasn't very satisfied with what I found, the solutions I came across were overly complicated and consisted of separate functions to handle pausing and resuming. I came up with a single function that relied on a boolean named "paused" to track the state of the timer and appropriately clearInterval of the timer or make the function call to resume the timer. The result is a very simple, effective, and readable solution that I am very happy with.
