using Vizer.API.Entities;
using Vizer.API.ValueObjects;

namespace Vizer.API.Dtos.EpisodeDtos.Responses;

sealed public record class GetEpisodeContentResponseDto
{
  public string Id { get; set; } = string.Empty;
  public string Title { get; set; } = string.Empty;
  public string Synopsis { get; set; } = string.Empty;
  public string Banner { get; set; } = string.Empty;
  public string Poster { get; set; } = string.Empty;
  public string ReleaseYear { get; set; } = string.Empty;
  public int ParentalRating { get; set; }
  public int Number { get; set; }
  public int Season { get; set; }
  public Video? Video { get; set; }

  public static GetEpisodeContentResponseDto FromEntity(Episode episode)
  {
    return new GetEpisodeContentResponseDto
    {
      Id = episode.Id,
      Title = episode.Title,
      Synopsis = episode.Synopsis,
      Banner = episode.Banner,
      Poster = episode.Poster,
      ReleaseYear = episode.ReleaseYear,
      ParentalRating = episode.ParentalRating,
      Number = episode.Number,
      Season = episode.Season,
      Video = episode.Video
    };
  }
}
