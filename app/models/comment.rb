class Comment < ApplicationRecord
  belongs_to :post
  belongs_to :user

  has_one_attached :header_image
end
