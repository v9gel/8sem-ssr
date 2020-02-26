class CreateProjectBuildings < ActiveRecord::Migration[5.1]
  def change
    create_table :project_buildings do |t|
      t.references :project, foreign_key: true
      t.references :building, foreign_key: true

      t.timestamps
    end
  end
end
