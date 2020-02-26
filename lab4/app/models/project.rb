class Project < ApplicationRecord
  belongs_to :material
  has_many :project_buildings
end
