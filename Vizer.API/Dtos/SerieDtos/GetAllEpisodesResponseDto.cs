using Vizer.API.Entities;

namespace Vizer.API.Dtos.SerieDtos;

public class GetAllEpisodesResponseDto
{
  public string SerieTitle { get; set; } = string.Empty;
  public int NumberSeasons { get; set; }
  public IEnumerable<EpisodeDto> Episodes { get; set; } = [];

  public static GetAllEpisodesResponseDto ToEntity(Serie serie)
  {
    return new GetAllEpisodesResponseDto
    {
      SerieTitle = serie.Title,
      NumberSeasons = serie.NumberSeasons,
      Episodes = serie.Episodes.Select(EpisodeDto.ToEntity)
    };
  }

  public class EpisodeDto
  {
    public string Id { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public int Season { get; set; }
    public int Episode { get; set; }

    public static EpisodeDto ToEntity(Episode episode)
    {
      return new EpisodeDto
      {
        Id = episode.Id,
        Title = episode.Title,
        Season = episode.Season,
        Episode = episode.Number
      };
    }
  }
}
