import { Client, Events, GatewayIntentBits } from 'discord.js'; // ESモジュール形式
import { SlashCommandBuilder } from '@discordjs/builders'; // スラッシュコマンドを作成するために必要


const client = new Client({ intents: [GatewayIntentBits.Guilds] }); // ギルドのイベントを処理する

client.once(Events.ClientReady, c => {
    console.log(`Ready! (${c.user.tag})`); // ボットが起動した時に表示
});

// グローバルコマンドの登録
client.on(Events.ClientReady, async () => {
    try {
        // グローバルコマンドとして登録
        await client.application.commands.set([
            new SlashCommandBuilder().setName('mach_diplomacy').setDescription('対戦お相手決まりました！'),
            new SlashCommandBuilder().setName('mach_information').setDescription('交流戦お相手募集します！')
        ]);
        console.log('グローバルコマンドが正常に登録されました');
    } catch (error) {
        console.error('コマンド登録エラー:', error);
    }
});

// スラッシュコマンドの処理
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isCommand()) return; // スラッシュコマンドのみ処理する

    const { commandName } = interaction;

    if (commandName === 'mach_diplomacy') {
        // /mach_diplomacy コマンドが呼ばれた場合
        await interaction.reply("@\n対戦お相手決まりました！\nBCvs\n05op\nhost yuzusio\n生存確認含みます！！");
    } else if (commandName === 'mach_information') {
        // /mach_information コマンドが呼ばれた場合
        await interaction.reply("時交流戦お相手募集します！\nこちらBC\n主催こちら持てます\n平均mmr\nSorry, Japanese clan only\n#mkmg");
    }
});

// 環境変数からトークンを読み込み、ログイン
client.login(process.env.DISCORD_TOKEN);
