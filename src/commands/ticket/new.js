const { CommandInteraction, SlashCommandBuilder, ChannelType } = require("discord.js");
const Enmap = require("enmap");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('new')
		.setDescription('Create new ticket!'),
    /**
     * @param {CommandInteraction} interaction 
     * @param {Enmap} db
     */
	async execute(interaction, db) {
        await interaction.deferReply({ ephemeral: true });

        let category = db.get(`${interaction.guildId}_category`);
        let options = {
            name: `ticket-${interaction.user.username}`,
            permissionOverwrites: [
                { id: interaction.guildId, deny: 'ViewChannel' },
                { id: interaction.user.id, allow: ["ViewChannel", "ReadMessageHistory", "EmbedLinks", "SendMessages", "AddReactions", "AttachFiles"] }
            ],
            type: ChannelType.GuildText
        };

        if(category && interaction.guild.channels.cache.get(category)) options.parent = category;

        let ticketChannel = await interaction.guild.channels.create(options);
        db.set(ticketChannel.id, { authorId: interaction.user.id, guild: interaction.guildId });
        
        return interaction.editReply({
            content: `:white_check_mark: Your ticket has been created at <#${ticketChannel.id}>`
        });

	},
};