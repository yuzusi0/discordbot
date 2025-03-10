import { Client, Events, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';  // dotenvをインポートして環境変数を読み込む

dotenv.config();  // .envファイルの環境変数を読み込む

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages] });

client.once(Events.ClientReady, c => {
    console.log(`Ready! (${c.user.tag})`); // 起動した時に"Ready!"とBotの名前をコンソールに出力する
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
client.login(process.env.TOKEN);
