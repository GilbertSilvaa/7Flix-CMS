using Vizer.API.Dtos.SerieDtos.Requests;
using Vizer.API.Dtos.SerieDtos.Responses;
using Vizer.API.Exceptions;
using Vizer.API.Repositories;

namespace Vizer.API.Services;

public class SerieService
{
  private readonly SerieRepository _repository = new();

  public async Task<IEnumerable<GetAllSerieResponseDto>> Get()
  {
    var response = await _repository.GetAsync();
    return response
      .Select(GetAllSerieResponseDto.FromEntity)
      .OrderByDescending(s => s.DateCreated);
  }

  public async Task<GetSerieResponseDto> Get(string id)
  {
    var response = await _repository.GetAsync(id)
      ?? throw new NotFoundException("serie not found");

    return GetSerieResponseDto.FromEntity(response);
  }

  public async Task Create(CreateSerieDto dto)
    => await _repository.CreateAsync(dto.ToEntity());

  public async Task Update(UpdateSerieDto dto)
  {
    var entity = dto.ToEntity();

    var reponse = await _repository.GetAsync(entity.Id)
      ?? throw new NotFoundException("serie not found");

    entity.Episodes = reponse.Episodes;
    entity.CreateAt = reponse.CreateAt;
    await _repository.UpdateAsync(dto.Id, entity);
  }

  public async Task CreateEpisode(CreateEpisodeDto dto)
  {
    var response = await _repository.GetAsync(dto.IdSerie)
      ?? throw new NotFoundException("serie not found");

    response.Episodes.Add(dto.ToEntity());
    await _repository.UpdateAsync(dto.IdSerie, response);
  }

  public async Task<GetAllEpisodesResponseDto> GetEpisodes(string idSerie) {
    var response = await _repository.GetAsync(idSerie)
      ?? throw new NotFoundException("serie not found");

    return GetAllEpisodesResponseDto.FromEntity(response);
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

  public async Task Delete(string id) 
  {
    var response = await _repository.GetAsync(id)
      ?? throw new NotFoundException("serie not found");

    await _repository.RemoveAsync(response.Id);
  }
}
