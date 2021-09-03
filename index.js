const {
  Client,
  Intents,
  MessageSelectMenu,
  MessageActionRow,
  MessageEmbed,
} = require("discord.js");
const { token, API_KEY } = require("./config.json");
const fetch = require("node-fetch");
const { Request, Headers } = require("node-fetch");
const intents = new Intents(32767);
const client = new Client({
  ws: { properties: { $browser: "Discord iOS" } },
  intents,
});

// When the client is ready, run this code (only once)
client.once("ready", () => {
  console.log("Ready!");
  client.user.setPresence({
    activities: [{ name: "bot on mobile or whateva anyways c!check 😈" }],
    status: "online",
  });
});
client.on("interactionCreate", (interaction) => {
  if (interaction.isMessageComponent()) {
    const { guild, values, member, message } = interaction;
    if (values == "first_option") {
      let data = fetch(
        new Request("https://api.livecoinwatch.com/coins/single"),
        {
          method: "POST",
          headers: new Headers({
            "content-type": "application/json",
            "x-api-key": API_KEY,
          }),
          body: JSON.stringify({
            currency: "USD",
            code: "BTC",
            meta: true,
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          const Embed = new MessageEmbed()
            .setAuthor(`BTC ${data.symbol}`, data.png64)
            .setColor(`#fa9e32`)
            .addField(
              "***Rate***",
              `Current: **$${data.rate.toFixed(
                2
              )} USD**\n  All Time High: **$${data.allTimeHighUSD.toFixed(
                2
              )} USD**\n`
            )
            .addField("***Pairs***", `${data.pairs}`)
            .addField("***Circulating Supply***", `${data.circulatingSupply}`)
            .addField("***Volume***", `${data.volume}`)
            .addField("***Cap***", `${data.cap}`)
            .addField("***All Time High***", `${data.allTimeHighUSD}`)
            .addField("***Exchanges***", `${data.exchanges}`)
            .setThumbnail(`${data.png64}`)
            .setTimestamp();
          message.reply({
            embeds: [Embed],
            allowedMentions: { repliedUser: false },
          });
        })
        .catch((err) => console.log(err));
    }

    if (values == "second_option") {
      let data = fetch(
        new Request("https://api.livecoinwatch.com/coins/single"),
        {
          method: "POST",
          headers: new Headers({
            "content-type": "application/json",
            "x-api-key": API_KEY,
          }),
          body: JSON.stringify({
            currency: "USD",
            code: "ETH",
            meta: true,
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          const Embed = new MessageEmbed()
            .setAuthor(`ETH ${data.symbol}`, data.png64)
            .setColor(`${data.color}`)
            .addField(
              "***Rate***",
              `Current: **$${rate.toFixed(
                2
              )} USD**\n  All Time High: **$${allTimeHighUSD.toFixed(
                2
              )} USD**\n`
            )
            .addField("***Pairs***", `${data.pairs}`)
            .addField("***Circulating Supply***", `${data.circulatingSupply}`)
            .addField("***Volume***", `${data.volume}`)
            .addField("***Cap***", `${data.cap}`)
            .addField(
              "***All Time High***",
              `${data.allTimeHighUSD.toFixed(2)}`
            )
            .addField("***Exchanges***", `${data.exchanges}`)
            .setThumbnail(`${data.png64}`)
            .setTimestamp();
          message.reply({
            embeds: [Embed],
            allowedMentions: { repliedUser: false },
          });
        })
        .catch((err) => console.log(err));
    }
    if (values == "third_option") {
      let data = fetch(
        new Request("https://api.livecoinwatch.com/coins/single"),
        {
          method: "POST",
          headers: new Headers({
            "content-type": "application/json",
            "x-api-key": API_KEY,
          }),
          body: JSON.stringify({
            currency: "USD",
            code: "DOGE",
            meta: true,
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          const Reply2 = client.emojis.cache.find(
            (emoji) => emoji.name === "reply"
          );
          const Reply = client.emojis.cache.find(
            (emoji) => emoji.name === "reply2"
          );
          var rate = data.rate;
          var allTimeHighUSD = data.allTimeHighUSD;
          const Embed = new MessageEmbed()
            .setAuthor(`DOGE ${data.symbol}`, data.png64)
            .setColor(`${data.color}`)
            .addField(
              "***Rate***",
              `${Reply}Current: **$${rate.toFixed(
                2
              )} USD**\n  ${Reply2}All Time High: **$${allTimeHighUSD.toFixed(
                2
              )} USD**\n`
            )
            .addField("***Pairs***", `${data.pairs}`)
            .addField("***Circulating Supply***", `${data.circulatingSupply}`)
            .addField("***Volume***", `${data.volume}`)
            .addField("***Cap***", `${data.cap}`)
            .addField("***Exchanges***", `${data.exchanges}`)
            .setThumbnail(`${data.png64}`)
            .setTimestamp();
          console.log(data);
          message.reply({
            embeds: [Embed],
            allowedMentions: { repliedUser: false },
          });
        })
        .catch((err) => console.log(err));
    }
  }
});
client.on("messageCreate", (message) => {
  let prefix = "c!";
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if (!message.content.startsWith(prefix)) return;
  if (command == "info") {
    const HelpEmbed = new MessageEmbed()
      .setTitle("***Info***")
      .setDescription(
        "**Coin Bot Is A Bot That lets you see real time cryptocoin data! choise a coin by typing c!check**"
      )
      .addField("Credits", "taco - developer")
      .addField(
        "Special People",
        "**armful for helping me out whenever i need it and encouraging me to continue with this project**"
      )
      .setColor("GOLD");
    message.reply({
      embeds: [HelpEmbed],
      allowedMentions: { repliedUser: false },
    });
  }
  if (command == "coininfo") {
    const query = args[0].toUpperCase();
    if (!args[0]) return message.reply("***Please Write A Coin***");
    else {
      try {
        fetch(new Request("https://api.livecoinwatch.com/coins/single"), {
          method: "POST",
          headers: new Headers({
            "content-type": "application/json",
            "x-api-key": API_KEY,
          }),
          body: JSON.stringify({
            currency: "USD",
            code: query,
            meta: true,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.error) {
              message.reply({ content: `**${query} Is Not A Valid Coin**` });
            } else {
              const Reply2 = client.emojis.cache.find(
                (emoji) => emoji.name === "reply"
              );
              const Reply = client.emojis.cache.find(
                (emoji) => emoji.name === "reply2"
              );
              const Embed = new MessageEmbed()
                .setAuthor(`${data.name} ${data.symbol}`, data.png64)
                .setColor(`${data.color}`)
                .addField(
                  "***Rate***",
                  `${Reply}Current: **$${data.rate.toFixed(
                    2
                  )} USD**\n  ${Reply2}All Time High: **$${data.allTimeHighUSD.toFixed(
                    2
                  )} USD**\n`
                )
                .addField("***Pairs***", `${data.pairs}`)
                .addField(
                  "***Circulating Supply***",
                  `${data.circulatingSupply}`
                )
                .addField("***Volume***", `${data.volume}`)
                .addField("***Exchanges***", `${data.exchanges}`)
                .setThumbnail(`${data.png64}`)
                .setTimestamp();
              if (!data.symbol) {
                Embed.setAuthor(`${data.name}`, data.png64);
              }
              if (data.cap == null) {
                //I Cant Really Put Anything In Here
              } else {
                Embed.addField("***Cap***", `${data.cap}`);
              }
              message.reply({
                embeds: [Embed],
                allowedMentions: { repliedUser: false },
              });
            }
          });
      } catch (error) {
        return message.reply({ content: `**Something Went Wrong**` });
      }
    }
  }
  if (command == "check") {
    const Bitcoin = client.emojis.cache.find(
      (emoji) => emoji.name === "Bitcoin"
    );
    const eth = client.emojis.cache.find((emoji) => emoji.name === "eth");
    const doge = client.emojis.cache.find((emoji) => emoji.name === "doge");
    const row = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId("CoinCheck")
        .setPlaceholder("Select Coins")
        .addOptions([
          {
            emoji: Bitcoin,
            label: "Bitcoin",
            description: "Bitcoin Price, And Other Info",
            value: "first_option",
          },
          {
            emoji: eth,
            label: "Ethereum",
            description: "Etherium Price, And Other Info",
            value: "second_option",
          },
          {
            emoji: doge,
            label: "Doge Coin",
            description: "Doge Coin, Price And Other Info",
            value: "third_option",
          },
        ])
    );
    message
      .reply({ content: "***Select Coin!***", components: [row] })
      .then((msg) => {
        setTimeout(() => {
          msg.delete();
        }, 3000);
      });
  }
});
client.login(token);
