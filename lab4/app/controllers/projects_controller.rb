class ProjectsController < ApplicationController
  def index
    @title = 'Главная'
    @projects = Project.all
  end

  def admin
    @title = 'Админка'
    @projects = Project.all
  end

  def show
    @project = Project.find(params[:id])
    @title = @project.name + ' - простотр'
    @material = Material.find(@project.material_id)
    @buildings = []

    ProjectBuilding.where(project_id: params[:id]).each do |building|
      @buildings.push(Building.find(building.building_id).name)
    end
  end

  def edit
    @project = Project.find(params[:id])
    @title = @project.name + ' - редактирование'
    @buildings_id = []
    ProjectBuilding.where(project_id: params[:id]).each do |b|
      @buildings_id.push(b.building_id)
    end

    @buildings = []
    Building.all.each do |building|
      @buildings.push([building.name, building.id])
    end
    @materials = []
    Material.all.each do |material|
      @materials.push([material.name, material.id])
    end
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
    @title = 'Новый проект'

    @project = Project.new
    @buildings = []
    Building.all.each do |building|
      @buildings.push([building.name, building.id])
    end

    @materials = []
    Material.all.each do |material|
      @materials.push([material.name, material.id])
    end
  end

  def create
    @project = Project.new(project_params)
    if @project.save
      params[:project][:buildings].each do |building|
        unless building.empty?
          b = ProjectBuilding.new(:project_id => @project.id, :building_id => building)
          b.save
        end
      end
      redirect_to '/admin'
    else
      redirect_to '/projects/new'
    end
  end

  def update
    @project = Project.find(params[:id])
    @project.update(name: project_params[:name])
    @project.update(body: project_params[:body])
    @project.update(levels: project_params[:levels])
    @project.update(square: project_params[:square])
    @project.update(material_id: project_params[:material_id])

    if project_params[:picture] != nil
      @project.update(picture: project_params[:picture])
    end

    if @project.save
      @buildings = ProjectBuilding.where(project_id: params[:id])
      @buildings.each do  |building|
        building.destroy
      end

      params[:project][:buildings].each do |building|
        unless building.empty?
          b = ProjectBuilding.new(:project_id => @project.id, :building_id => building)
          b.save
        end
      end

      redirect_to '/admin'
    else
      redirect_to '/projects/new'
    end
  end

  private
    def project_params
      params.require(:project).permit(:name, :body, :levels, :square, :material_id, :picture, :buildings)
    end
end
