const { CommandInteraction, SlashCommandBuilder, ChannelType } = require("discord.js");
const Enmap = require("enmap");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('set-category')
		.setDescription('Updates the category that tickets will be created under!')
        .addChannelOption(option =>
            option
                .setName("category")
                .setDescription("the name of the category")
                .setRequired(true)
        ),
    /**
     * @param {CommandInteraction} interaction 
     * @param {Enmap} db
     */
	async execute(interaction, db) {
        await interaction.deferReply({ ephemeral: true });
        
        let channel = interaction.options.getChannel("category", true);
        if(channel.type !== ChannelType.GuildCategory) return interaction.editReply({ content: `:x: Channel provided isnt a category.`});

        db.set(`${interaction.guildId}_category`, channel.id);
        
        return interaction.editReply({
            content: `:white_check_mark: Tickets category updated to **${channel.name}**`
        });
	},
};