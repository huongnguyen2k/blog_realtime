class User < ApplicationRecord
  has_many :posts
  has_many :comments, dependent: :destroy
  has_many :messages
  validates :name, presence: true

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_one :profile, dependent: :destroy
  has_many :notifications, dependent: :destroy
end
