using Vizer.API.Dtos.MovieDtos;
using Vizer.API.Entities;
using Vizer.API.Repositories;

namespace Vizer.API.Services;

public class MovieService
{
  private readonly MovieRepository _repository = new();

  public async Task<IEnumerable<Movie>> Get()
  {
    try
    {
      return await _repository.GetAsync();
    }
    catch (Exception ex)
    {
      throw new Exception(ex.Message);
    }
  }

  public async Task<Movie?> Get(string id)
  {
    try
    {
      return await _repository.GetAsync(id);
    }
    catch (Exception ex)
    {
      throw new Exception(ex.Message);
    }
  }

  public async Task Create(CreateMovieDto dto) 
  {
    try
    {
      await _repository.CreateAsync(dto.ToEntity());
    }
    catch (Exception ex)
    {
      throw new Exception(ex.Message);
    }
  } 
}
