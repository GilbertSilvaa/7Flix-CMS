using Vizer.API.Dtos.MovieDtos.Requests;
using Vizer.API.Dtos.MovieDtos.Responses;
using Vizer.API.Entities;
using Vizer.API.Exceptions;
using Vizer.API.Repositories;

namespace Vizer.API.Services;

sealed public class MovieService
{
  private readonly MovieRepository _repository = new();

  public async Task<IEnumerable<GetAllMovieResponseDto>> Get()
  {
    var response = await _repository.GetAsync();
    return response
      .Select(GetAllMovieResponseDto.FromEntity)
      .OrderByDescending(m => m.DateCreated);
  }

  public async Task<Movie?> Get(string id)
  {
    var response = await _repository.GetAsync(id)
      ?? throw new NotFoundException("movie not found");

    return response;
  }

  public async Task Create(CreateMovieDto dto)
    => await _repository.CreateAsync(dto.ToEntity());

  public async Task Update(UpdateMovieDto dto)
  {
    var entity = dto.ToEntity();

    var response = await _repository.GetAsync(entity.Id)
      ?? throw new NotFoundException("movie not found");

    entity.CreateAt = response.CreateAt;
    await _repository.UpdateAsync(dto.Id, entity);
  }

  public async Task Delete(string id)
  {
    var response = await _repository.GetAsync(id)
      ?? throw new NotFoundException("movie not found");

    await _repository.RemoveAsync(response.Id);
  }
}
