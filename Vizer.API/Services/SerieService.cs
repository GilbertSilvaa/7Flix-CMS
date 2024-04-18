using Vizer.API.Dtos.SerieDtos;
using Vizer.API.Entities;
using Vizer.API.Exceptions;
using Vizer.API.Repositories;

namespace Vizer.API.Services;

public class SerieService
{
  private readonly SerieRepository _repository = new();

  public async Task<IEnumerable<Serie>> Get()
    => await _repository.GetAsync();

  public async Task<Serie?> Get(string id)
  {
    var response = await _repository.GetAsync(id)
      ?? throw new NotFoundException("serie not found");

    return response;
  }

  public async Task Create(CreateSerieDto dto)
    => await _repository.CreateAsync(dto.ToEntity());

  public async Task AddEpisode(AddEpisodeDto dto)
  {
    var response = await _repository.GetAsync(dto.IdSerie)
      ?? throw new NotFoundException("serie not found");

    response.Episodes.Add(dto.GetEpisode());
    await _repository.UpdateAsync(dto.IdSerie, response);
  }

  public async Task RemoveEpisode(RemoveEpisodeDto dto)
  {
    var response = await _repository.GetAsync(dto.IdSerie)
      ?? throw new NotFoundException("serie not found");

    var episode = response.Episodes.SingleOrDefault(e => e.Id == dto.IdEpisode)
      ?? throw new NotFoundException("episode not found");

    response.Episodes.Remove(episode);
    await _repository.UpdateAsync(dto.IdSerie, response);
  }
}
