import { Client, GatewayIntentBits, REST, Routes } from 'discord.js';
import 'dotenv/config';

const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const commands = [
  {
    name: 'mach_diplomacy',
    description: '交流戦の対戦相手を募集します',
  },
  {
    name: 'mach_information',
    description: '対戦相手決定の通知メッセージを送信します',
  }
];

const rest = new REST({ version: '10' }).setToken(TOKEN);

async function registerCommands() {
  try {
    console.log('スラッシュコマンドを登録中...');
    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
    console.log('スラッシュコマンドの登録完了！');
  } catch (error) {
    console.error('コマンド登録エラー:', error);
  }
}

client.once('ready', () => {
  console.log(`ログイン完了: ${client.user.tag}`);
  registerCommands();
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'mach_diplomacy') {
    await interaction.reply(
      '時交流戦お相手募集します！\nこちらBC\n主催こちら持てます\n平均mmr\nSorry, Japanese clan only\n#mkmg'
    );
  }

  if (interaction.commandName === 'mach_information') {
    await interaction.reply(
      '@\n対戦お相手決まりました！\nBCvs\n05op\nhost yuzusio\n生存確認含みます！！'
    );
  }
});

client.login(TOKEN);
