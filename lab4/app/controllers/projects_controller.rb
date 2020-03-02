class ProjectsController < ApplicationController
  def index
    @projects = Project.all
  end

  def admin
    @projects = Project.all
  end

  def show
    @project = Project.find(params[:id])
    @material = Material.find(@project.material_id)
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
    # @project = Project.new
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
    # uploaded_file = params[:picture]
    # File.open(Rails.root.join('app', 'public', 'pictures', uploaded_file.original_filename), 'wb') do |file|
    #   file.write(uploaded_file.read)
    # end

    # buildings_id = project_params[:buildings]
    # print buildings_id
    # buildings_id.each do |id|
    #   ProjectBuilding.new(project_id: id, buildings_id: projects.id)
    # end

    if @project.save
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
