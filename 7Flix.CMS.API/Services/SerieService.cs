using Vizer.API.Dtos.EpisodeDtos.Requests;
using Vizer.API.Dtos.EpisodeDtos.Responses;
using Vizer.API.Dtos.SerieDtos.Requests;
using Vizer.API.Dtos.SerieDtos.Responses;
using Vizer.API.Entities;
using Vizer.API.Exceptions;
using Vizer.API.Repositories;

namespace Vizer.API.Services;

sealed public class SerieService
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

  public async Task Delete(string id)
  {
    var response = await _repository.GetAsync(id)
      ?? throw new NotFoundException("serie not found");

    await _repository.RemoveAsync(response.Id);
  }

  public async Task<GetAllEpisodesResponseDto> GetEpisodes(string idSerie)
  {
    var response = await _repository.GetAsync(idSerie)
      ?? throw new NotFoundException("serie not found");

    response.Episodes = [.. response.Episodes
      .OrderByDescending(e => e.Season)
      .ThenByDescending(e => e.Number)
    ];  
    return GetAllEpisodesResponseDto.FromEntity(response);
  }

  public async Task<Episode?> GetEpisode(string idSerie, string idEpisode) 
  {
    var response = await _repository.GetAsync(idSerie)
      ?? throw new NotFoundException("serie not found");

    var episode = response.Episodes.SingleOrDefault(e => e.Id == idEpisode)
      ?? throw new NotFoundException("episode not found");

    return episode;
  }

  public async Task CreateEpisode(CreateEpisodeDto dto)
  {
    var response = await _repository.GetAsync(dto.IdSerie)
      ?? throw new NotFoundException("serie not found");

    response.Episodes.Add(dto.ToEntity());
    await _repository.UpdateAsync(dto.IdSerie, response);
  }

  public async Task UpdateEpisode(UpdateEpisodeDto dto) 
  {
    var entity = dto.ToEntity();

    var response = await _repository.GetAsync(dto.IdSerie)
      ?? throw new NotFoundException("serie not found");

    var episode = response.Episodes.SingleOrDefault(e => e.Id == entity.Id)
      ?? throw new NotFoundException("episode not found");

    entity.CreateAt = episode.CreateAt;
    response.Episodes.Remove(episode);
    response.Episodes.Add(entity);

    await _repository.UpdateAsync(dto.IdSerie, response);
  }

  public async Task RemoveEpisode(string idSerie, string idEpisode)
  {
    var response = await _repository.GetAsync(idSerie)
      ?? throw new NotFoundException("serie not found");

    var episode = response.Episodes.SingleOrDefault(e => e.Id == idEpisode)
      ?? throw new NotFoundException("episode not found");

    response.Episodes.Remove(episode);
    await _repository.UpdateAsync(idSerie, response);
  }
}
