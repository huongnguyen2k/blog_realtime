class SendMessageJob < ApplicationJob
  queue_as :default

  def perform(message)
    mine = ApplicationController.render(
      host: 'localhost:3000',
      http_host: 'http://localhost:3000',
      partial: 'messages/mine',
      locals: {message: message}
    )

    theirs = ApplicationController.render(
      partial: 'messages/theirs',
      locals: {message: message}
    )

    ActionCable.server.broadcast "room_channel_#{message.room_id}", mine: mine, theirs: theirs, message: message

  end
end
