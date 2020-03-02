class Building < ApplicationRecord
  has_many :project_buildings
  has_many :projects, :through => :project_buildings
end
