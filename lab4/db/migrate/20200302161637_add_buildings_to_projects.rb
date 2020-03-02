class AddBuildingsToProjects < ActiveRecord::Migration[5.1]
  def change
    add_column :projects, :buildings, :string
  end
end
