class Project < ApplicationRecord
  belongs_to :material
  has_many :project_buildings
  has_many :building, :through => :project_buildings
  mount_uploader :picture, PictureUploader
end
