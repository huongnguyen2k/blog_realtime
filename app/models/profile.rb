class Profile < ApplicationRecord
	belongs_to :user
	validates :full_name, presence: true
	validates :birthday, presence: true
	validates :phone, presence: true
	validates :address, presence: true
	validates :intersts, presence: true
	validates :user_id, presence: true

	has_one_attached :header_image
end
