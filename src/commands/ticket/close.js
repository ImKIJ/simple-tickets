const { CommandInteraction, SlashCommandBuilder, ChannelType, InteractionResponse } = require("discord.js");
const Enmap = require("enmap");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('close')
		.setDescription('Close current ticket with no warning!'),
    /**
     * @param {CommandInteraction} interaction 
     * @param {Enmap} db
     */
	async execute(interaction, db) {
        await interaction.deferReply({ ephemeral: true });
        
        if(!db.has(interaction.channelId)) return interaction.editReply({
            content: `:x: This is not a ticket to close.`
        });

        if(!interaction.channel.deletable) return interaction.editReply({
            content: `:x: I cannot close this ticket, give me manage channels permission!`
        });

        interaction.channel.delete()
            .then(() => db.delete(interaction.channelId));
	},
};