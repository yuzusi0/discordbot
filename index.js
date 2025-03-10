import { Client, Events, GatewayIntentBits } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders'; // スラッシュコマンド作成のために必要
import dotenv from 'dotenv';  // dotenvをインポートして環境変数を読み込む

dotenv.config();  // .envファイルの環境変数を読み込む

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages] });

client.once(Events.ClientReady, c => {
    console.log(`Ready! (${c.user.tag})`); // 起動した時に"Ready!"とBotの名前をコンソールに出力する
});

// グローバルコマンドの登録
client.on(Events.ClientReady, async () => {
    try {
        // グローバルコマンドとして登録
        await client.application.commands.set([
            new SlashCommandBuilder()
                .setName('mach_diplomacy')
                .setDescription('外交フォーマット')
                .addStringOption(option => 
                    option.setName('time')
                        .setDescription('時間を入力してください (例: 2310)')
                        .setRequired(true))
                .addStringOption(option => 
                    option.setName('host')
                        .setDescription('主催者を入力してください (c または ct)')
                        .setRequired(true))
                .addIntegerOption(option => 
                    option.setName('mmr')
                        .setDescription('外交MMRを入力してください')
                        .setRequired(true)),

            new SlashCommandBuilder()
                .setName('mach_information')
                .setDescription('対戦相手決定のお知らせ')
                .addRoleOption(option => 
                    option.setName('role')
                        .setDescription('メンションするロールを選択')
                        .setRequired(true)) // ロールオプションを追加
                .addStringOption(option => 
                    option.setName('opponent')
                        .setDescription('対戦相手の名前を入力してください')
                        .setRequired(true))
                .addStringOption(option => 
                    option.setName('minutes')
                        .setDescription('開設時間を入力してください (例: 05)')
                        .setRequired(true))
                .addStringOption(option => 
                    option.setName('host')
                        .setDescription('主催者を入力してください (例: yuzusio)')
                        .setRequired(true))
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
        // ユーザーが入力したオプションを取得
        const time = interaction.options.getString('time');
        const host = interaction.options.getString('host');
        const mmr = interaction.options.getInteger('mmr');

        // 主催者によって異なるメッセージを生成
        const hostMessage = host === 'c' ? '主催こちら持てます' : '主催持っていただきたいです';

        // メッセージを組み立てて送信
        await interaction.reply(`
${time}時交流戦お相手募集します！
こちらBC
${hostMessage}
平均mmr${mmr}
Sorry, Japanese clan only
#mkmg
        `);
    } else if (commandName === 'mach_information') {
        // ユーザーが入力したオプションを取得
        const role = interaction.options.getRole('role');  // ロールを取得
        const opponent = interaction.options.getString('opponent');
        const time = interaction.options.getString('minutes');
        const host = interaction.options.getString('host');

        // ロールをメンションする
        const roleMention = `<@&${role.id}>`;  // ロールメンションの形式

        // メッセージを組み立てて送信
        await interaction.reply(`
${roleMention}
対戦お相手決まりました！
BC vs  ${opponent}
${time}op
host ${host}
        `);
    }
});

// 環境変数からトークンを読み込み、ログイン
client.login(process.env.TOKEN);
