using Vizer.API.Dtos.DashboardDtos.Responses;
using Vizer.API.Repositories;

namespace Vizer.API.Services;

sealed public class DashboardService
{
  private readonly MovieRepository _movieRepository = new();
  private readonly SerieRepository _serieRepository = new();

  public async Task<DashboardResponseDto> Get()
  {
    var moviesResponse = await _movieRepository.GetAsync();
    var seriesResponse = await _serieRepository.GetAsync();

    int episodesCount = 0;
    foreach (var serie in seriesResponse)
      episodesCount += serie.Episodes.Count;

    return new DashboardResponseDto(
      moviesResponse.Count(),
      seriesResponse.Count(),
      episodesCount,
      moviesResponse.Count() + episodesCount
    );
  }
}
