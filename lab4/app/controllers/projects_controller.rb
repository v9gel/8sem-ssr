class ProjectsController < ApplicationController
  def index
    @projects = Project.all
  end

  def admin
    @projects = Project.all
  end

  def show
    @project = Project.find(params[:id])
    @material = Material.find(@project.id)
    @buildings = []

    ProjectBuilding.where(project_id: params[:id]).each do |building|
      @buildings.push(Building.find(building.building_id).name)
    end
  end

  def edit
    @project = Project.find(params[:id])
    @buildings_id = ProjectBuilding.where(project_id: params[:id])

    @buildings = Building.all
    @materials = Material.all
  end

  def delete
    @buildings = ProjectBuilding.where(project_id: params[:id])
    @buildings.each do  |building|
      building.destroy
    end

    @project = Project.find(params[:id])
    @project.destroy

    redirect_to '/admin'
  end

  def new
  end
end
