using Vizer.API.Dtos.EpisodeDtos.Responses;
using Vizer.API.Dtos.MovieDtos.Responses;
using Vizer.API.Dtos.SerieDtos.Responses;
using Vizer.API.Exceptions;
using Vizer.API.Repositories;

namespace Vizer.API.Services;

sealed public class ContentService
{
  private readonly MovieRepository _movieRepository = new();
  private readonly SerieRepository _serieRepository = new();

  public async Task<IEnumerable<GetMovieContentResponseDto>> GetMovies()
  {
    var response = await _movieRepository.GetAsync();
    return response
      .Select(GetMovieContentResponseDto.FromEntity)
      .OrderBy(m => m.Title);
  }

  public async Task<IEnumerable<GetSerieContentResponseDto>> GetSeries()
  {
    var response = await _serieRepository.GetAsync();
    return response
      .Select(GetSerieContentResponseDto.FromEntity)
      .OrderBy(s => s.Title);
  }

  public async Task<IEnumerable<GetEpisodeContentResponseDto>> GetEpisodes(
    string idSerie, int season)
  {
    var response = await _serieRepository.GetAsync(idSerie)
      ?? throw new NotFoundException("serie not found");
    
    return response.Episodes
      .Where(e => e.Season.Equals(season))
      .Select(GetEpisodeContentResponseDto.FromEntity);
  }
}
