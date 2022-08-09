# Environment Variables

Following is the list of all the environment variables that are used in this project.

```sh
  # Mandatory Variables
  NAME
  PIC

  # Optional Variables
  NICKNAME
  HBD_MSG
  SCROLL_MSG
  OPEN_DATE
```

- The `NAME` and `NICKNAME` are self explainatory. `NICKNAME` is optional. If no nickname is provided, then value of name will be used in its place.

- `PIC` is the image that will appear on the card.

  - For local building, one needs to add the image file to the `./local` directory and add the name of the file as its value.

  - For remote deployment, it is the web address of image file. If don't have the image hosted somewhere, you may publish a [telegra.ph article](https://telegra.ph) with your image and copy the image address from there.

  NOTE: Picture must be in 1:1 ratio or it will get cropped.

- `HBD_MSG` is an optional variable that adds a custom HBD greeting. It takes the custom message as value. Check [Customizations](./customizations.md#custom-happy-bday-text) to know how to set up.

- `SCROLL_MSG` is an optional variable to specify a custom scrolling message that appears before the card.

  - For local building, one needs to add a `.txt` file with the message, to the `./local` directory and add the name of the file as its value.

  - For remote deployment, it is the url of the telegra.ph article.

  Check [Customizations](./customizations.md#the-scrolling-message) to know how to set up.

- `OPEN_DATE` is an optional variable to specify the active date for the webpage. It the takes the date in `YYYY-MM-DD` format as value. Used to setup the Live Date feature. Check [Customizations](./customizations.md#live-only-for-a-specific-day) to know how to set up.

---

<div align="center">Made with 💖 by Anshuman Mahato</div>
