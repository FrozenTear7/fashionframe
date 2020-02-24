# Fashionframe

### App for sharing fashion setups in Warframe.

## About

View setups created by other people or create your own after signing into the app.
The app is still in development and is being maintained.

If you have any issues regarding the application create an [Issue](https://github.com/FrozenTear7/fashionframe/issues)

Application's server is deployed on **Heroku** on a free plan, meaning there is monthly hour limit the server can be up, so if the app gets really popular and runs 24/7 I will look a better alternative.

Application's frontend is deployed on **Github Pages** I currently haven't bought my own domain and since I don't plan putting ads on the app I will probably stay that way.

If you want to show your support please give the project a **Star** it means a lot.

---

## Warframe data

The app also provides endpoints with Warframe data taken from [Warframe Wiki](https://warframe.fandom.com/wiki/WARFRAME_Wiki) such as Frames, Attachments, Syandanas, Color pickers, etc. put into _.json_ files.

## Server Endpoints

All data is being served as _.json_, where specific data is put into a json object as:

```
{
    "<data_name>": [
        "Record1",
        "Record2",
        ...
    ]
}
```

The exception are the Color Pickers where the Json data looks like:

```
{
  "colorPickers": {
    "Agony": [
      "#676767",
      "#6f6f6f",
      ...
    ],
    ...
  }
}
```

| Endpoint              | Data                                                                        |
| --------------------- | --------------------------------------------------------------------------- |
| /api/frames           | [Frames](https://fashionframe.herokuapp.com/api/frames)                     |
| /api/ephemeras        | [Ephemeras](https://fashionframe.herokuapp.com/api/ephemeras)               |
| /api/helmets          | [Helmets](https://fashionframe.herokuapp.com/api/helmets)                   |
| /api/skins            | [Skins](https://fashionframe.herokuapp.com/api/skins)                       |
| /api/colorPickers     | [ColorPickers](https://fashionframe.herokuapp.com/api/colorPickers)         |
| /api/chestAttachments | [ChestAttachments](https://fashionframe.herokuapp.com/api/chestAttachments) |
| /api/armAttachments   | [ArmAttachments](https://fashionframe.herokuapp.com/api/armAttachments)     |
| /api/legAttachments   | [LegAttachments](https://fashionframe.herokuapp.com/api/legAttachments)     |
| /api/syandanas        | [Syandanas](https://fashionframe.herokuapp.com/api/syandanas)               |

## License

The project is open source under MIT license, feel free to do anything with the code, the app was not made for profit, merely as a cool tool for the community and polishing own programming skills.

###### Fashionframe isn’t endorsed by Digital Extremes and doesn’t reflect the views or opinions of Digital Extremes or anyone officially involved in producing or managing Warframe. Warframe and Digital Extremes are trademarks or registered trademarks of Digital Extremes ©.

Created and maintaned by: [FrozenTear7](https://github.com/FrozenTear7) - pawelmendroch7@gmail.com

Thanks to [Arcustangens](https://github.com/arcustangens) for helping with Color Pickers data.

Other cool Warfame colors data: https://polychrome.seldszar.fr/

For anything Warframe related whisper at **FrozenTear7** in-game.
