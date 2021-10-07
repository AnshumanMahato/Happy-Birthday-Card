# Happy Birthday Card

A Web based birthday card to wish your friends and family in a unique way.

Check out the [Preview](https://happy-birthday-card.vercel.app/).

If you liked it, please consider giving it star 🤩⭐. Feel free to fork too 🤗.

---

## <ins>How to setup</ins>

Setup is very simple. Just edit the configuration object in [animation.js](./js/animation.js). This is what the configuration object looks like.

```js
const config = {
    name: "", // actual name of the recipient (Mandatory)
    nickname: "", // nickname(optional)
    pic: "", //image url of recipients (Mandatory)
    showScrollMsg: true, // set to false if you do not want the scrolling message
};

```

The `name` and `nickname` are self explainatory and `nickname` is optional. If no nickname is provided, then value of name will be used in its place.

`showScrollMsg` takes `true` or `false`. If set to `false`, the scroll message will be skipped and card will apper directly.

`pic` will take the url of the image of the recipient. This will appear on the birthday card. 

### <ins>Setting up the pic</ins>

You can upload your image to telegra.ph, publish it and then get the image url (image address). It would be good if the image is of 1:1 aspect ratio and not more than 400px in height and width as larger images can affect load times.

Alternatively, you can also manually replace [Asset.png](./resources/img/Asset.png) with your image, make necessary changes at line 97 in [here](./scss/_components.scss) and then rebuild.

---

## <ins>Atributions</ins>

- <a href='https://www.freepik.com/vectors/pattern'>Pattern vector created by mokoland - www.freepik.com</a>

- <a href='https://www.freepik.com/vectors/christmas'>Christmas vector created by freepik - www.freepik.com</a>
- <a href='https://www.freepik.com/vectors/background'>Background vector created by brgfx - www.freepik.com</a>
- <a href='https://www.freepik.com/vectors/halloween'>Halloween vector created by vectorpouch - www.freepik.com</a>
