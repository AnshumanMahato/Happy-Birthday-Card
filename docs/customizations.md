# Customizations

Following are some of the customizations that can be added to the card.

## The Scrolling Message

The scrolling message is a customization that you can enable in the card. Once enabled, a custom message can be displayed to the user before rendering the actual card.

Check it out in this [sample deployment](https://hbd-card.netlify.app/) to see this feature.

### in Remote Deployment

1. For this, we create a telegraph Article with our message. Go to [Telegraph](https://telegra.ph) and publish an article with your message in it.

   Here is a sample for you - https://telegra.ph/Bday-07-24.

2. Copy the url of the published article. In my case, it is this `https://telegra.ph/Bday-07-24`.

3. Add `SCROLL_MSG` environment variable to your deployed site with the above url as its value.

### in Local Build

1. Create a 'filename.txt' file in the `./local` directory with your message in it.

2. Add environment variable `SCROLL_MSG=filename.txt`.

## Custom Happy BDay Text

Instead of the predefined 'Wish you a very happy birthday' text in the card, one can add a custom hbd message by specifying it in the `HBD_MSG` environment variable.

## Live only for a specific day

The card can be set to be visible only for a specific day. On other days, it will show a different page depending upon whether it is accessed before or after the specified date.

To set this, specify the date in `YYYY-MM-DD` format as `OPEN_DATE` environment variable.

---

## Note

For the customizations to take effect, one must redeploy/rebuild the project.

---

<div align="center">Made with 💖 by Anshuman Mahato</div>
