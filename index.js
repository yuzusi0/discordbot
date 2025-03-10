const { Client, Events, GatewayIntentBits } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders'); // スラッシュコマンドを作成するために必要
const { token } = process.env; // トークンを環境変数から取得

const client = new Client({ intents: [GatewayIntentBits.Guilds] }); // メッセージコンテンツの権限は必要ないので削除

client.once(Events.ClientReady, c => {
    console.log(`Ready! (${c.user.tag})`); // 起動時に"Ready!"とBotの名前を表示
});

// グローバルコマンドの登録
client.on(Events.ClientReady, async () => {
    // グローバルコマンドとして登録
    await client.application.commands.set([
        new SlashCommandBuilder().setName('mach_diplomacy').setDescription('対戦お相手決まりました！'),
        new SlashCommandBuilder().setName('mach_information').setDescription('交流戦お相手募集します！')
    ]);
});

// スラッシュコマンドの処理
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isCommand()) return; // スラッシュコマンドのみ処理する

    const { commandName } = interaction;

    if (commandName === 'mach_dipromacy') {
        // /mach_d コマンドが呼ばれた場合
        await interaction.reply("@\n対戦お相手決まりました！\nBCvs\n05op\nhost yuzusio\n生存確認含みます！！");
    } else if (commandName === 'mach_information') {
        // /mach_i コマンドが呼ばれた場合
        await interaction.reply("時交流戦お相手募集します！\nこちらBC\n主催こちら持てます\n平均mmr\nSorry, Japanese clan only\n#mkmg");
    }
});

// トークンでログイン
client.login(token);
