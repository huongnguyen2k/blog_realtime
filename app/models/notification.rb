class Notification < ApplicationRecord
  	belongs_to :user
  	belongs_to :notificationable, polymorphic: true

  	scope :num_not_check, ->{where(checked: false).count}
end
