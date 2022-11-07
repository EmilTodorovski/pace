# Writeup

## Initial strategy and missing content

I tried to adhere to the 3 hours limit as much as possible. For that (as proposed in the readme as well), I had to prioritize a working solution, rather than polished/complete one.
After a short analysis , I first started with the algorithm for the positioning, which took me about half of the alloted time, and then I proceeded with simple visualization, which with small visual improvements, took the other half.
Besides the small visual improvements, this sounded like the fastest way to achieve a basic working example (MVP).

Since I ran out of time, the next things I would have done (in order of priority) are:

- TESTS! eventUtils.ts is a perfect file that should be thoroughly tested - it contains most (all) of the logic of the app, and is a pure function, so no need for mocks.
- To save time, I started with as little changes to the existing files as possible. What I would have done next is remove all react-unrelated code from the react file (e.g. the fetcher should be a separate file, maybe some of the constants used there should be extracted as well, along with the function that creates the time offsets and the labels for the hours).
- Visual improvements - the example provided in the readme might have not been the exact goal of the excersise, rather than a guideline, however it looks much better than my solution. How the starting times are displayed within the events, how the hours are just left of the delimiter line, and other improvements would be included in this step.
- Make a more thorough review, and try to make the code more readable. 2 potential places (not sure how clear/good they are) to be improved would be the eventsUtil, maybe something can be reduced/improved; and the css portion (how the events are being rendered). For the latter, I would check few online examples, and see whether I can find a better way to implement that part. I know the calcs are pretty complex, there is react inline style that I dislike, and whenever possible I try to avoid using absolute position. However, Im not sure if this can be avoided.
- There are several places where a proper js doc is needed, at least in the main function in eventUtils.ts. Similarly, the projects needs a proper readme with instructions how to run the project (although they are very simple, its nice to have such things documented)

## Challenges

The greatest challenge for frontend projects for me is usually the css. I have recently started using it with greater frequency, previously I have been just using ready-made UI components (from design systems), so whenever I have to do something with css I'm much slower, and I guess with such a time constraint, unable to research a proper solution.

## Feedback

I have never had a time-constrained excercise like this, and I love the concept! The excersice was simple and representative-of-a-real-project enough, and could be done within the timelimit, however this (to be discussed live, I guess) remain. The time constraint "levels" the field, making it a fair comparison between candidates that have more, and less time to pursue an ideal solution that would take more time. The problem itself contains both "algorithmic" and "frontend-dev" portions, with a nice balance (I have more often than not seen excercises that ask for only one of these aspects).
I guess the whole concept depends on the follow up interview, so I cant have a "final" mark for it yet, but so far it looks like 5/5 :D.

(p.s.) Although this might not be the place for that feedback, but I liked less the previous step in the interview, since most of the questions are discussions (IMO) better done in a live conversation, rather than in a written form.
