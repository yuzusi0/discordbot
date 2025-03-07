const { Client, Events, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages] });

client.once(Events.ClientReady, c => {
    console.log(`Ready! (${c.user.tag})`); // 起動した時に"Ready!"とBotの名前をコンソールに出力する
});

console.log("DISCORD_TOKEN:", process.env.DISCORD_TOKEN); // トークンが正しく取得されているか確認

client.login(process.env.DISCORD_TOKEN)
  .then(() => {
    console.log('Successfully logged in!');
  })
  .catch(err => {
    console.error('Error during login:', err);
  });


client.on(Events.MessageCreate, message => {
    if (message.author.bot) return; // Botには反応しないようにする
    if (message.content.includes("!mach_d")) {
        message.channel.send("@\n対戦お相手決まりました！\nBCvs\n05op\nhost yuzusio\n生存確認含みます！！");
    }
    if (message.content.includes("!mach_i")) {
        message.channel.send("時交流戦お相手募集します！\nこちらBC\n主催こちら持てます\n平均mmr\nSorry, Japanese clan only\n#mkmg");
    }
});

// 環境変数からトークンを読み込み、ログイン
client.login(process.env.DISCORD_TOKEN);

