class NotificationJobsJob < ApplicationJob
  queue_as :default
  def perform(notification)
      a = ApplicationController.render(
      host: 'localhost:3000',
      http_host: 'http://localhost:3000',
      partial: 'notifications/count',
      locals: {notification: notification}
    )

    ActionCable.server.broadcast "notification_channel_#{notification.user_id}", a: a, notification: notification

  end
end
